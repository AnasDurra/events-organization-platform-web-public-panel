import { Avatar, Button, Popover, Space, Typography } from 'antd';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';

import { useEffect, useState } from 'react';
import { HeartFilled, LikeFilled, MessageOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getLoggedInUserV2 } from '../../api/services/auth';
import { userReacted } from '../../chatSocket';

function Message({ message, previousUser, type, replyOnMessage, scrollToRepliedMessage, isFocused, chat_group_id }) {
    console.log('leees');
    const [user] = useState(getLoggedInUserV2());
    const [showText, setShowText] = useState(false);
    const [showReactions, setshowReactions] = useState(true);

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
        setshowReactions(false);
    };

    const iconStyle = {
        fontSize: '20px',
        cursor: 'pointer',
    };

    const reactionsContent = (
        <Space size={15} style={{ display: 'flex', alignItems: 'center' }}>
            <div
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                style={{ transition: 'transform 0.2s' }}
            >
                <Button
                    type='text'
                    icon={<LikeFilled style={{ ...iconStyle, color: '#1890ff' }} />}
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
                    icon={<HeartFilled style={{ ...iconStyle, color: '#eb2f96' }} />}
                    onClick={() => handleReaction('love', message?.message_id)}
                />
            </div>
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
        <div style={containerStyle}>
            <Space
                style={{ display: 'flex', alignItems: 'center', width: '80%' }}
                onMouseLeave={() => setshowReactions(true)}
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
                        {/* previousUser?.user_id != message?.user?.user_id && */}
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
                                    {message?.reactions?.length != 0 && (
                                        <Space size={0}>
                                            {message?.reactions?.map((reaction, index) => (
                                                <div key={index}>
                                                    <div
                                                        key={reaction.reaction.id}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            marginRight: '10px',
                                                            direction: 'ltr',
                                                        }}
                                                    >
                                                        {reaction.reaction.id === '2' && (
                                                            <>
                                                                <Button
                                                                    size='small'
                                                                    type='text'
                                                                    icon={
                                                                        <LikeFilled
                                                                            style={{ ...iconStyle, color: '#1890ff' }}
                                                                        />
                                                                    }
                                                                    onClick={() =>
                                                                        handleReaction('like', message?.message_id)
                                                                    }
                                                                />
                                                                <span style={{ marginLeft: '4px', fontSize: '14px' }}>
                                                                    {
                                                                        message?.reactions?.filter(
                                                                            (reaction) => reaction.reaction.id === '2'
                                                                        ).length
                                                                    }
                                                                </span>
                                                            </>
                                                        )}

                                                        {reaction.reaction.id === '1' && (
                                                            <>
                                                                <Button
                                                                    size='small'
                                                                    type='text'
                                                                    icon={
                                                                        <HeartFilled
                                                                            style={{ ...iconStyle, color: '#eb2f96' }}
                                                                        />
                                                                    }
                                                                    onClick={() =>
                                                                        handleReaction('love', message?.message_id)
                                                                    }
                                                                />
                                                                <span style={{ marginLeft: '4px', fontSize: '14px' }}>
                                                                    {
                                                                        message?.reactions?.filter(
                                                                            (reaction) => reaction.reaction.id === '1'
                                                                        ).length
                                                                    }
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </Space>
                                    )}
                                </Space>
                                {/* {showText && (
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '10px',
                                            color: 'gray',
                                            marginTop: '4px',
                                        }}
                                    >
                                        <button
                                            onClick={() => {
                                                replyOnMessage(message);
                                            }}
                                        >
                                            <span style={{ textDecoration: 'underline' }}>Reply</span>
                                        </button>
                                    </div>
                                )} */}
                            </Space>
                        </Space>
                    </div>
                </Popover>
            </Space>
        </div>
    );
}
export default Message;
