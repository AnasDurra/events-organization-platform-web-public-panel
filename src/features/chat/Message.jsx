import { Avatar, Button, Card, Input, List, Popover, Space, Tooltip, Typography } from 'antd';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';

import { useRef, useState } from 'react';
import { HeartFilled, LikeFilled, MessageOutlined } from '@ant-design/icons';
import moment from 'moment';

function Message({ message, previousUser, type, replyOnMessage, scrollToRepliedMessage, isFocused }) {
    const [showText, setShowText] = useState(false);

    const messageStyle = {
        width: '85%',
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
        flexDirection: 'row',
        width: '100%',
        marginTop: previousUser?.name === message.user.name ? '-10px' : '5px',
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
        // Here you can also send a request to the backend to store the reaction
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
                    type="text"
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
                    type="text"
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
        <div style={containerStyle}>
            <List.Item
                style={{
                    padding: '0px',
                    display: 'flex',
                    borderBottom: 'none',
                }}
                onMouseEnter={() => setShowText(true)}
                onMouseLeave={() => setShowText(false)}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {message.user.name !== 'Alice' && (
                        <Avatar src={message.user.avatar} style={{ marginRight: '8px' }} />
                    )}
                    <Popover placement={'top'} content={reactionsContent} trigger="hover">
                        <div
                            id={message.id}
                            style={messageStyle}
                            onDoubleClick={() => {
                                replyOnMessage(message);
                            }}
                        >
                            {previousUser?.name != message.user.name && message.user.name != 'Alice' && (
                                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                    {message.user.name}
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
                                        <Typography.Text ellipsis={{ rows: 1 }}>
                                            {message?.replyTo.text}
                                        </Typography.Text>
                                    </div>
                                </button>
                            )}

                            <div style={{ fontSize: '14px', direction: 'ltr' }}>{message.text}</div>
                            <Space size={20} style={{ marginTop: '1em' }}>
                                <div style={{ fontSize: '10px', color: 'gray', marginTop: '4px' }}>
                                    {moment(message.timestamp).format('h:mm A')}
                                </div>
                                {message?.reactions?.length != 0 && (
                                    <Space size={0}>
                                        {message?.reactions?.map((reaction, index) => (
                                            <div key={index}>
                                                {Object.entries(reaction).map(([reactionType, count]) => (
                                                    <div
                                                        key={reactionType}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            marginRight: '10px',
                                                            direction: 'ltr',
                                                        }}
                                                    >
                                                        {reactionType === 'like' && (
                                                            <>
                                                                <Button
                                                                    size="small"
                                                                    type="text"
                                                                    icon={
                                                                        <LikeFilled
                                                                            onClick={() => handleReaction('like')}
                                                                            style={{ ...iconStyle, color: '#1890ff' }}
                                                                        />
                                                                    }
                                                                    // onClick={handleLikeClicked} //TODO implement handleLikeClicked function
                                                                />
                                                                <span style={{ marginLeft: '4px', fontSize: '14px' }}>
                                                                    {count}
                                                                </span>
                                                            </>
                                                        )}
                                                        {reactionType === 'love' && (
                                                            <>
                                                                <Button
                                                                    size="small"
                                                                    type="text"
                                                                    icon={
                                                                        <HeartFilled
                                                                            onClick={() => handleReaction('love')}
                                                                            style={{ ...iconStyle, color: '#eb2f96' }}
                                                                        />
                                                                    }
                                                                    // onClick={handleLikeClicked} //TODO implement handleLikeClicked function
                                                                />
                                                                <span style={{ marginLeft: '4px', fontSize: '14px' }}>
                                                                    {count}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </Space>
                                )}
                            </Space>
                            {showText && (
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
                            )}
                        </div>
                    </Popover>
                </div>
            </List.Item>
        </div>
    );
}
export default Message;
