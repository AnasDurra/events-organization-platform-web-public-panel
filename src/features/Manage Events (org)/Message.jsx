import { Avatar, Button, Card, Input, List, Popover, Space, Typography } from 'antd';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useState } from 'react';
import { HeartOutlined, LikeOutlined, SmileOutlined } from '@ant-design/icons';

function Message({ user, previousUser, content, date, type }) {
    console.log(previousUser);
    const cardStyle = {
        width: '100%',
        margin: '0.5rem 0',
        padding: '0.8rem',
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    };

    switch (type) {
        case TYPE_SENT_MESSAGE:
            cardStyle.borderRadius = '1.5rem 1.5rem 0rem 1.5rem';
            cardStyle.backgroundColor = '#C8E6C9';
            containerStyle.justifyContent = 'end';
            break;
        case TYPE_RECEIVED_MESSAGE:
            cardStyle.borderRadius = '1.5rem 1.5rem 1.5rem 0rem';
            cardStyle.backgroundColor = '#BBDEFB';
            containerStyle.justifyContent = 'start';
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
        fontSize: '24px',
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
                <LikeOutlined onClick={() => handleReaction('like')} style={{ ...iconStyle, color: '#1890ff' }} />
            </div>
            <div
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                style={{ transition: 'transform 0.2s' }}
            >
                <HeartOutlined onClick={() => handleReaction('love')} style={{ ...iconStyle, color: '#eb2f96' }} />
            </div>
        </Space>
    );

    return (
        <div style={{ marginTop: previousUser?.name === user.name ? '-10px' : '5px' }}>
            <List.Item
                style={{
                    padding: '0px',
                    display: 'flex',
                    justifyContent: user.name === 'Alice' ? 'flex-end' : 'flex-start',
                    borderBottom: 'none',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {user.name !== 'Alice' && <Avatar src={user.avatar} style={{ marginRight: '8px' }} />}
                    <Popover
                        placement={user.name === 'Alice' ? 'left' : 'right'}
                        content={reactionsContent}
                        trigger="hover"
                    >
                        <div style={cardStyle}>
                            {previousUser?.name != user.name && (
                                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                                    {user.name}
                                </div>
                            )}

                            <div style={{ fontSize: '14px' }}>{content}</div>
                            <div style={{ fontSize: '10px', color: 'gray', marginTop: '4px' }}>{date}</div>
                        </div>
                    </Popover>
                </div>
            </List.Item>
        </div>
    );
}
export default Message;
