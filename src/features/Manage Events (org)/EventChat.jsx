import { useEffect, useRef, useState } from 'react';
import { List, Input, Button, Avatar, Divider, Space } from 'antd';
import Message from './Message';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';
import moment from 'moment';
import ReplyMessage from './ReplyMessage';

const EventChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [user] = useState({ name: 'Alice' });

    const [isReplying, setIsReplying] = useState(false);
    const [replyMessage, setReplyMessage] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, []);

    const fakeData = [
        {
            date: '2024-04-25',
            messages: [
                {
                    text: 'Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you?Hello, how are you? Hello, how are you? Hello, how are you? Hello, how are you?',
                    user: {
                        name: 'Alice',
                        avatar: 'https://i.pravatar.cc/40',
                    },
                    timestamp: '2024-04-25 10:30 AM',
                    reactions: [
                        {
                            like: 2,
                        },
                        {
                            love: 10,
                        },
                    ],
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
                    reactions: [
                        {
                            like: 2,
                        },
                        {
                            love: 10,
                        },
                    ],
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

    const replyOnMessage = (replyMessage) => {
        setIsReplying(true);
        setReplyMessage(replyMessage);
    };

    return (
        <div style={{ width: '100%', margin: '0 auto', padding: '10px' }}>
            <div ref={messagesEndRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {fakeData.map((dateGroup) => (
                    <div key={dateGroup.date}>
                        <Divider orientation="left">{moment(dateGroup.date).format('MMMM DD, YYYY')}</Divider>
                        <List
                            itemLayout="horizontal"
                            dataSource={dateGroup.messages}
                            renderItem={(message, index) => (
                                <Message
                                    message={message}
                                    previousUser={index > 0 ? dateGroup.messages[index - 1]?.user : null}
                                    type={message.user.name === user.name ? TYPE_SENT_MESSAGE : TYPE_RECEIVED_MESSAGE}
                                    replyOnMessage={replyOnMessage}
                                />
                            )}
                        />
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '5px' }}>
                {isReplying && <ReplyMessage message={replyMessage} setIsReplying={setIsReplying} />}

                <div style={{ display: 'flex', width: '100%' }}>
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
        </div>
    );
};

export default EventChat;
