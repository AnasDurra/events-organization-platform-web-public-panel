import { Avatar, Button, Popover, Space, Typography, Dropdown, Menu, Modal } from 'antd';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';

import { useEffect, useState } from 'react';
import moment from 'moment';
import { getLoggedInUserV2 } from '../../api/services/auth';
import { userReacted } from '../../chatSocket';
import { Icon } from '@iconify/react';
import MessageReactions from './MessageReactions';
import ReportMessageModal from './ReportMessageModal';
import { useLazyIsMessageReportedQuery } from '../../api/services/reports';
import { useDeleteMessageMutation } from '../../api/services/chats';
import { useNotification } from '../../utils/NotificationContext';

import './Message.css';
import Roles from '../../api/Roles';

function Message({
    message,
    previousUser,
    type,
    replyOnMessage,
    scrollToRepliedMessage,
    isFocused,
    isDeleted,
    chat_group_id,
    eventID,
    orgID,
}) {
    const { openNotification } = useNotification();

    const [checkIsMessageReported, { isFetching: isIsMessageReportedFetching }] = useLazyIsMessageReportedQuery();
    const [deleteMessage, { isLoading: isDeleteMessageIsLoading }] = useDeleteMessageMutation();

    const [user] = useState(getLoggedInUserV2());
    const [showDots, setShowDots] = useState(false);
    const [showReactions, setShowReactions] = useState(true);
    const [showReportMessageModal, setShowReportMessageModal] = useState(false);

    const [hideFocused, setHideFocused] = useState(false);

    const messageStyle = {
        minWidth: '5em',
        width: '100%',
        margin: '0.5rem 0',
        padding: '0.8rem',
        border: '2px solid transparent',
        boxShadow: isFocused && !hideFocused ? '1px 1px 15px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'box-shadow 0.9s ease',
        outline: 'none',
    };

    const replyMessageStyle = {
        textAlign: 'start',
        width: '100%',
        maxWidth: '30vw',
        margin: '0.5rem 0',
        padding: '0.4rem',
        borderRadius: '0rem 1.5rem 1.5rem 0rem',
        borderLeft: '4px solid blue',
    };

    const containerStyle = {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        marginBottom: previousUser?.user_id === message?.user?.user_id ? '-10px' : '5px',
    };

    switch (type) {
        case TYPE_SENT_MESSAGE:
            messageStyle.borderRadius = '1.5rem 1.5rem 0rem 1.5rem';
            messageStyle.backgroundColor = '#C8E6C9';
            messageStyle.marginRight = '1.5em';
            replyMessageStyle.backgroundColor = '#EDF5FB';
            containerStyle.direction = 'rtl';

            break;
        case TYPE_RECEIVED_MESSAGE:
            messageStyle.borderRadius = '1.5rem 1.5rem 1.5rem 0rem';
            messageStyle.backgroundColor = '#BBDEFB';
            replyMessageStyle.backgroundColor = '#EDF5FB';
            containerStyle.direction = 'ltr';
            break;

        case TYPE_SYSTEM_MESSAGE:
            messageStyle.borderRadius = '0';
            messageStyle.fontSize = 12;
            messageStyle.backgroundColor = '#f3f3f3';
            messageStyle.borderRadius = '2rem';
            messageStyle.textAlign = 'center';
            replyMessageStyle.borderRadius = '0';
            replyMessageStyle.fontSize = 12;
            replyMessageStyle.backgroundColor = '#f3f3f3';
            replyMessageStyle.borderRadius = '2rem';
            replyMessageStyle.textAlign = 'center';

            containerStyle.justifyContent = 'center';
            break;

        default:
            break;
    }

    const handleReaction = (reaction, message_id) => {
        const reactionData = {
            group_id: chat_group_id,
            reaction_id: reaction === 'love' ? 1 : 2,
            message_id: message_id,
        };
        userReacted(reactionData);
        setShowReactions(false);
    };

    const handleDeleteMessage = () => {
        deleteMessage(message?.message_id)
            .unwrap()
            .then((res) => {
                console.log(res);
                openNotification('info', 'Message deleted successfully', null, 'topLeft');
            })
            .catch(() => {
                openNotification('error', 'Failed to delete the message', null, 'bottomRight');
            });
    };

    const dotsMenu = (
        <Menu>
            <Menu.Item
                onClick={() => replyOnMessage(message)}
                key='1'
                icon={<Icon icon='icomoon-free:reply' style={{ fontSize: '18px' }} />}
                disabled={isDeleted}
            >
                Reply
            </Menu.Item>

            {user.user_id != message.user.user_id && user?.user_role === Roles?.ATTENDEE && (
                <Menu.Item
                    onClick={() => {
                        checkIsMessageReported(message?.message_id)
                            .unwrap()
                            .then((res) => {
                                console.log(res);
                                if (res.error) {
                                    openNotification(
                                        'error',
                                        'Error',
                                        'There was an error checking the report status. Please try again later.',
                                        'bottomRight'
                                    );
                                } else if (res?.result === false) {
                                    setShowReportMessageModal(true);
                                } else {
                                    openNotification(
                                        'info',
                                        'Already Reported',
                                        'You have already reported this message, and is under review.',
                                        'topLeft'
                                    );
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                    key='2'
                    icon={<Icon icon='ic:round-report-problem' style={{ fontSize: '18px', color: '#ffc800' }} />}
                >
                    Report
                </Menu.Item>
            )}
            {user?.user_role === Roles?.EMPLOYEE && user?.organization_id === orgID && (
                <Menu.Item
                    key='3'
                    icon={<Icon icon='material-symbols:delete' style={{ color: 'red', fontSize: '18px' }} />}
                    onClick={() => {
                        Modal.confirm({
                            title: 'Are you sure you want to delete this message?',
                            okText: 'Yes, Delete it',
                            cancelText: 'Cancel',
                            onOk: () => {
                                handleDeleteMessage();
                            },
                        });
                    }}
                >
                    Delete
                </Menu.Item>
            )}
        </Menu>
    );
    const reactionsContent = (
        <Space size={15} style={{ display: 'flex', alignItems: 'center' }}>
            <div
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                style={{ transition: 'transform 0.2s' }}
            >
                <Button
                    type='text'
                    icon={
                        <Icon
                            icon={'mdi:like'}
                            style={{
                                fontSize: '18px',
                                color: 'blue',
                            }}
                        />
                    }
                    onClick={() => handleReaction('like', message?.message_id)}
                />
            </div>
            <div
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                style={{ transition: 'transform 0.2s' }}
            >
                <Button
                    type='text'
                    icon={
                        <Icon
                            icon={'flat-color-icons:like'}
                            style={{
                                fontSize: '18px',
                                color: 'blue',
                            }}
                        />
                    }
                    onClick={() => handleReaction('love', message?.message_id)}
                />
            </div>
            {/* <div
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                style={{ transition: 'transform 0.2s' }}
            >
                <Button
                    type='text'
                    icon={
                        <Icon
                            icon={'mdi:dislike-outline'}
                            style={{
                                fontSize: '18px',
                                color: 'blue',
                            }}
                        />
                    }
                    onClick={() => handleReaction('dislike', message?.message_id)}
                />
            </div> */}
        </Space>
    );

    useEffect(() => {
        setHideFocused(false);
        if (isFocused === true) {
            setTimeout(() => {
                setHideFocused(true);
            }, 2000);
        }
    }, [isFocused]);
    return (
        <div
            className={isDeleted ? 'deleted-message-indicator' : ''}
            style={containerStyle}
            onMouseEnter={() => setShowDots(true)}
            onMouseLeave={() => setShowDots(false)}
        >
            <Space
                style={{ display: 'flex', alignItems: 'center', width: '80%' }}
                onMouseLeave={() => setShowReactions(true)}
            >
                {message?.user?.user_id != user?.user_id && <Avatar size={50} src={message?.user?.avatar} />}
                <Popover
                    placement='top'
                    content={reactionsContent}
                    trigger='hover'
                    defaultOpen={1}
                    open={showReactions ? null : false}
                >
                    <div
                        id={message?.message_id}
                        style={messageStyle}
                        onDoubleClick={() => {
                            !isDeleted ? replyOnMessage(message) : null;
                        }}
                    >
                        {message?.user?.user_id !== user?.user_id && (
                            <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                {message?.user?.username}
                            </div>
                        )}

                        <Space direction='vertical'>
                            {message?.replied_message && (
                                <button
                                    style={replyMessageStyle}
                                    onClick={() => {
                                        scrollToRepliedMessage(message.replied_message?.message_id);
                                    }}
                                >
                                    <div
                                        style={{
                                            color: '#1679AB',
                                            fontWeight: 'bold',
                                            fontSize: '13px',
                                            marginBottom: '4px',
                                            padding: '5px',
                                            direction: 'ltr',
                                        }}
                                    >
                                        @{message?.replied_message?.sender_username}
                                    </div>

                                    <div style={{ fontSize: '14px', direction: 'ltr' }}>
                                        <Typography.Text dir='auto' ellipsis={{ rows: 1 }}>
                                            {message?.replied_message?.message_content}
                                        </Typography.Text>
                                    </div>
                                </button>
                            )}

                            <Space direction='vertical'>
                                <Typography.Text dir='auto' style={{ fontSize: '14px' }}>
                                    {isDeleted ? (
                                        <span className='deleted-message-text'>This message was deleted</span>
                                    ) : (
                                        message?.text?.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))
                                    )}
                                </Typography.Text>
                                <Space size={20} style={{ marginTop: '1em' }}>
                                    <div style={{ fontSize: '10px', color: 'gray', marginTop: '4px' }}>
                                        {moment(message?.timestamp).format('h:mm A')}
                                    </div>
                                    <MessageReactions message={message} handleReaction={handleReaction} />
                                </Space>
                            </Space>
                        </Space>
                    </div>
                </Popover>
                {showDots && (
                    <Dropdown
                        overlay={dotsMenu}
                        trigger={'click'}
                        placement={type === TYPE_RECEIVED_MESSAGE ? 'bottomLeft' : 'bottomRight'}
                    >
                        <Button
                            loading={isIsMessageReportedFetching || isDeleteMessageIsLoading}
                            type='text'
                            icon={<Icon icon='zondicons:dots-horizontal-triple' />}
                            style={{ fontSize: '18px', marginRight: '20px' }}
                        />
                    </Dropdown>
                )}
            </Space>
            {showReportMessageModal && (
                <ReportMessageModal
                    message={message}
                    eventID={eventID}
                    orgID={orgID}
                    showReportMessageModal={showReportMessageModal}
                    setShowReportMessageModal={setShowReportMessageModal}
                />
            )}
        </div>
    );
}
export default Message;
