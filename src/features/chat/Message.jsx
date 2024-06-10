import { Avatar, Button, Popover, Space, Typography, Dropdown, Menu } from 'antd';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';

import { useEffect, useState } from 'react';
import moment from 'moment';
import { getLoggedInUserV2 } from '../../api/services/auth';
import { userReacted } from '../../chatSocket';
import { Icon } from '@iconify/react';
import MessageReactions from './MessageReactions';
import ReportMessageModal from './ReportMessageModal';

function Message({ message, previousUser, type, replyOnMessage, scrollToRepliedMessage, isFocused, chat_group_id }) {
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

    const dotsMenu = (
        <Menu>
            <Menu.Item
                onClick={() => replyOnMessage(message)}
                key='1'
                icon={<Icon icon='icomoon-free:reply' style={{ fontSize: '18px' }} />}
            >
                Reply
            </Menu.Item>
            {user.user_id != message.user.user_id && (
                <Menu.Item
                    onClick={() => setShowReportMessageModal(true)}
                    key='2'
                    icon={<Icon icon='ic:round-report-problem' style={{ fontSize: '18px', color: '#ffc800' }} />}
                >
                    Report
                </Menu.Item>
            )}
            <Menu.Item
                key='3'
                icon={<Icon icon='material-symbols:delete' style={{ color: 'red', fontSize: '18px' }} />}
            >
                Delete
            </Menu.Item>
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
        <div style={containerStyle} onMouseEnter={() => setShowDots(true)} onMouseLeave={() => setShowDots(false)}>
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
                            replyOnMessage(message);
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
                                        }}
                                    >
                                        {message?.replied_message?.sender_username}
                                    </div>

                                    <div style={{ fontSize: '14px', direction: 'ltr' }}>
                                        <Typography.Text ellipsis={{ rows: 1 }}>
                                            {message?.replied_message?.message_content}
                                        </Typography.Text>
                                    </div>
                                </button>
                            )}

                            <Space direction='vertical'>
                                <Typography.Text style={{ fontSize: '14px' }}>{message?.text}</Typography.Text>
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
                    showReportMessageModal={showReportMessageModal}
                    setShowReportMessageModal={setShowReportMessageModal}
                />
            )}
        </div>
    );
}
export default Message;
