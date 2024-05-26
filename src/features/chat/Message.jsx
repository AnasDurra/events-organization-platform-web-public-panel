import { Avatar, Button, Card, Input, List, Popover, Space, Tooltip, Typography } from 'antd';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';

import { useState } from 'react';
import { HeartFilled, LikeFilled, MessageOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getLoggedInUserV2 } from '../../api/services/auth';

function Message({ message, previousUser, type, replyOnMessage, scrollToRepliedMessage, isFocused }) {
    const [user] = useState(getLoggedInUserV2());
    const [showText, setShowText] = useState(false);

    const messageStyle = {
        width: '100%',
        margin: '0.5rem 0',
        padding: '0.8rem',
        border: '2px solid transparent',
        transition: 'border-color 0.7s ease-in-out',
        borderColor: isFocused ? 'black' : 'transparent',
        outline: 'none',
    };

    const replyMessageStyle = {
        textAlign: 'start',
        width: '90%',
        margin: '0.5rem 0',
        padding: '0.4rem',
        borderRadius: '0rem 1.5rem 1.5rem 0rem',
        borderLeft: '4px solid blue',
    };

    const containerStyle = {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        marginTop: previousUser?.user_id === message?.user?.user_id ? '-10px' : '5px',
    };

    switch (type) {
        case TYPE_SENT_MESSAGE:
            messageStyle.borderRadius = '1.5rem 1.5rem 0rem 1.5rem';
            messageStyle.backgroundColor = '#C8E6C9';
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

    const [reactions, setReactions] = useState({
        like: 0,
        love: 0,
        laugh: 0,
    });

    const handleReaction = (reaction) => {
        setReactions((prevReactions) => ({
            ...prevReactions,
            [reaction]: prevReactions[reaction] + 1,
        }));
    };

    const iconStyle = {
        fontSize: '20px',
        cursor: 'pointer',
        // marginRight: '18px',
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
                    icon={
                        <LikeFilled onClick={() => handleReaction('like')} style={{ ...iconStyle, color: '#1890ff' }} />
                    }
                    // onClick={handleLikeClicked} //TODO implement handleLikeClicked function
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
                        <HeartFilled
                            onClick={() => handleReaction('love')}
                            style={{ ...iconStyle, color: '#eb2f96' }}
                        />
                    }
                    // onClick={handleLikeClicked} //TODO implement handleLikeClicked function
                />
            </div>
        </Space>
    );

    return (
        <div style={containerStyle} onMouseEnter={() => setShowText(true)} onMouseLeave={() => setShowText(false)}>
            <Space style={{ display: 'flex', alignItems: 'center', minWidth: '10vw', width: '80%' }}>
                {message?.user?.user_id != user?.user_id && <Avatar size={50} src={message?.user?.avatar} />}
                <Popover placement={'top'} content={reactionsContent} trigger='hover'>
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

                        {message?.replyTo && (
                            <button
                                style={replyMessageStyle}
                                onClick={() => {
                                    scrollToRepliedMessage(message.replyTo.id);
                                }}
                            >
                                <div
                                    style={{
                                        color: '#1679AB',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        marginBottom: '4px',
                                    }}
                                >
                                    {message?.replyTo.user.name}
                                </div>

                                <div style={{ fontSize: '14px', direction: 'ltr' }}>
                                    <Typography.Text ellipsis={{ rows: 1 }}>{message?.replyTo.text}</Typography.Text>
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
                                                    {reaction.reaction.id === 2 && (
                                                        <>
                                                            <Button
                                                                size='small'
                                                                type='text'
                                                                icon={
                                                                    <LikeFilled
                                                                        onClick={() => handleReaction('like')}
                                                                        style={{ ...iconStyle, color: '#1890ff' }}
                                                                    />
                                                                }
                                                                // onClick={handleLikeClicked} //TODO implement handleLikeClicked function
                                                            />
                                                            <span style={{ marginLeft: '4px', fontSize: '14px' }}>
                                                                {1}
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
                                                                        onClick={() => handleReaction('love')}
                                                                        style={{ ...iconStyle, color: '#eb2f96' }}
                                                                    />
                                                                }
                                                                // onClick={handleLikeClicked} //TODO implement handleLikeClicked function
                                                            />
                                                            <span style={{ marginLeft: '4px', fontSize: '14px' }}>
                                                                {1}
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
                    </div>
                </Popover>
            </Space>
        </div>
    );
}
export default Message;
