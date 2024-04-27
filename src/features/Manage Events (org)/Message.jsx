import { Avatar, Button, Card, Input, List, Popover, Space, Tooltip, Typography } from 'antd';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useState } from 'react';
import { HeartFilled, LikeFilled, MessageOutlined } from '@ant-design/icons';
import moment from 'moment';

function Message({ message, previousUser, type, replyOnMessage }) {
    const [showText, setShowText] = useState(false);

    const cardStyle = {
        width: '80%',
        margin: '0.5rem 0',
        padding: '0.8rem',
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: previousUser?.name === message.user.name ? '-10px' : '5px',
    };

    switch (type) {
        case TYPE_SENT_MESSAGE:
            cardStyle.borderRadius = '1.5rem 1.5rem 0rem 1.5rem';
            cardStyle.backgroundColor = '#C8E6C9';
            containerStyle.direction = 'rtl';

            break;
        case TYPE_RECEIVED_MESSAGE:
            cardStyle.borderRadius = '1.5rem 1.5rem 1.5rem 0rem';
            cardStyle.backgroundColor = '#BBDEFB';
            containerStyle.direction = 'ltr';
            break;

        case TYPE_SYSTEM_MESSAGE:
            cardStyle.borderRadius = '0';
            cardStyle.fontSize = 12;
            cardStyle.backgroundColor = '#f3f3f3';
            cardStyle.borderRadius = '2rem';
            cardStyle.textAlign = 'center';

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
                    <Popover
                        // placement={message.user.name === 'Alice' ? 'left' : 'right'}
                        placement={'top'}
                        content={reactionsContent}
                        trigger="hover"
                    >
                        <div style={cardStyle}>
                            {previousUser?.name != message.user.name && (
                                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                    {message.user.name}
                                </div>
                            )}

                            <div style={{ fontSize: '14px', direction: 'ltr' }}>{message.text}</div>
                            <Space size={20} style={{ marginTop: '1em' }}>
                                <div style={{ fontSize: '10px', color: 'gray', marginTop: '4px' }}>
                                    {moment(message.timestamp).format('h:mm A')}
                                    {showText && (
                                        <div style={{ fontWeight: 'bold' }}>
                                            <MessageOutlined />{' '}
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
                        </div>
                    </Popover>
                </div>
            </List.Item>
        </div>
    );
}
export default Message;
