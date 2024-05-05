import { useEffect, useRef, useState } from 'react';
import { List, Input, Button, Avatar, Divider, Space, Spin } from 'antd';
import Message from './Message';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';
import moment from 'moment';
import ReplyMessage from './ReplyMessage';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useGroupChatListQuery } from '../../api/services/chats';

const EventChat = ({ chat_group_id }) => {
    console.log(chat_group_id);
    const [pageSize, setPageSize] = useState(3);
    const [page, setPage] = useState(1);

    const { data, error, isLoading, refetch, isFetching } = useGroupChatListQuery({ chat_group_id, pageSize, page });

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [user] = useState({ name: 'Alice' });

    const [isReplying, setIsReplying] = useState(false);
    const [replyMessage, setReplyMessage] = useState(null);
    const [focusedMessageId, setFocusedMessageId] = useState(null);

    const messagesEndRef = useRef(null);

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

    const scrollToRepliedMessage = (messageId) => {
        if (messageId) {
            const repliedMessageElement = document.getElementById(messageId);
            console.log(repliedMessageElement);
            if (repliedMessageElement) {
                repliedMessageElement.scrollIntoView({ behavior: 'smooth' });

                setFocusedMessageId(messageId);
            }
        }
    };

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
        refetch({ chat_group_id, pageSize, page });
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        if (data) {
            setMessages((prevMessages) => [...prevMessages, ...data.result.messages]);
        }
        console.log(data);
    }, [data]);

    return (
        <div style={{ width: '100%', margin: '0 auto', padding: '10px' }}>
            <Spin spinning={isLoading}>
                <div ref={messagesEndRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 300,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        <InfiniteScroll
                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                            dataLength={data?.result?.meta_data?.page_size ?? 0}
                            next={fetchMoreData}
                            inverse={true}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                            endMessage={null} // TODO
                            scrollableTarget="scrollableDiv"
                        >
                            {messages.map((message, index) => (
                                <div key={message.message_id}>
                                    {index < messages.length &&
                                        moment(messages[index + 1]?.timestamp).format('DD-MM-YYYY') !=
                                            moment(message.timestamp).format('DD-MM-YYYY') && (
                                            <Divider orientation="left">
                                                {moment(message?.timestamp).format('MMMM DD, YYYY')}
                                            </Divider>
                                        )}
                                    <Message
                                        message={message}
                                        previousUser={index < messages.length ? messages[index - 1]?.user : null}
                                        type={
                                            message.user.name === user.name ? TYPE_SENT_MESSAGE : TYPE_RECEIVED_MESSAGE
                                        }
                                        replyOnMessage={replyOnMessage}
                                        scrollToRepliedMessage={scrollToRepliedMessage}
                                        isFocused={focusedMessageId === message.id}
                                    />
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </Spin>
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
