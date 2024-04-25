import React, { useState } from 'react';
import { List, Input, Button, Avatar, Divider } from 'antd';
import Message from './Message';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';
import moment from 'moment';

const EventChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [user] = useState({ name: 'Alice' });

    const fakeData = [
        {
            date: '2024-04-25',
            messages: [
                {
                    text: 'Hello, how are you?',
                    user: {
                        name: 'Alice',
                        avatar: 'https://i.pravatar.cc/40',
                    },
                    timestamp: '2024-04-25 10:30 AM',
                },
                {
                    text: 'Any plans for the weekend?',
                    user: {
                        name: 'Alice',
                        avatar: 'https://i.pravatar.cc/40',
                    },
                    timestamp: '2024-04-25 10:35 AM',
                },
                {
                    text: 'I am doing well, thank you!',
                    user: {
                        name: 'Bob',
                        avatar: 'https://i.pravatar.cc/41',
                    },
                    timestamp: '2024-04-26 10:32 AM',
                },
                {
                    text: 'I am doing well, thank you!',
                    user: {
                        name: 'Bob',
                        avatar: 'https://i.pravatar.cc/41',
                    },
                    timestamp: '2024-04-26 10:32 AM',
                },

                {
                    text: 'Hello, how are you?',
                    user: {
                        name: 'SOSO',
                        avatar: 'https://i.pravatar.cc/40',
                    },
                    timestamp: '2024-04-25 10:30 AM',
                },
            ],
        },
        {
            date: '2024-04-26',
            messages: [
                {
                    text: 'I am doing well, thank you!',
                    user: {
                        name: 'Bob',
                        avatar: 'https://i.pravatar.cc/41',
                    },
                    timestamp: '2024-04-26 10:32 AM',
                },
            ],
        },
    ];

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            const newMessage = {
                text: inputValue,
                user: {
                    name: 'Alice',
                    avatar: 'https://i.pravatar.cc/40',
                },
                timestamp: new Date().toLocaleString(),
            };
            setMessages([...messages, newMessage]);
            setInputValue('');
        }
    };

    return (
        <div style={{ width: '100%', margin: '0 auto', padding: '10px' }}>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {fakeData.map((dateGroup) => (
                    <div key={dateGroup.date}>
                        <Divider orientation="left">{moment(dateGroup.date).format('MMMM DD, YYYY')}</Divider>
                        <List
                            itemLayout="horizontal"
                            dataSource={dateGroup.messages}
                            renderItem={(item, index) => (
                                <Message
                                    key={item.timestamp}
                                    user={item.user}
                                    previousUser={index > 0 ? dateGroup.messages[index - 1]?.user : null}
                                    content={item.text}
                                    date={moment(item.timestamp).format('h:mm A')}
                                    type={item.user.name === user.name ? TYPE_SENT_MESSAGE : TYPE_RECEIVED_MESSAGE}
                                />
                            )}
                        />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <Input
                    style={{ flex: 1, marginRight: '10px' }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onPressEnter={handleSendMessage}
                    placeholder="Type your message..."
                />
                <Button style={{ width: '80px' }} type="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default EventChat;
