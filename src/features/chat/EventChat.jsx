import { useEffect, useRef, useState } from 'react';
import { List, Input, Button, Avatar, Divider, Space, Spin } from 'antd';
import Message from './Message';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';
import moment from 'moment';
import ReplyMessage from './ReplyMessage';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useGroupChatListQuery } from '../../api/services/chats';
import { chatSocket, sendMessage } from '../../chatSocket';
import { getLoggedInUserV2 } from '../../api/services/auth';

const EventChat = ({ chat_group_id }) => {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const { data, error, isLoading, refetch, isFetching } = useGroupChatListQuery({ chat_group_id, pageSize, page });

    const [user] = useState(getLoggedInUserV2());
    // console.log(user);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

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
                content: inputValue,
                group_id: chat_group_id,
            };
            sendMessage(newMessage);
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

        function messageReceived(message) {
            setMessages((prevMessages) => [message.message, ...prevMessages]);
        }
        chatSocket.on(`group-${4}`, messageReceived);

        return () => {
            chatSocket.off(`group-${4}`, messageReceived);
        };
    }, []);

    useEffect(() => {
        console.log(data);
        if (data) {
            setMessages((prevMessages) => [...prevMessages, ...data.result.messages]);
        }
    }, [data]);

    return (
        <div style={{ width: '100%', margin: '0 auto', padding: '10px' }}>
            <Spin spinning={isLoading}>
                <div ref={messagesEndRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div
                        id='scrollableDiv'
                        style={{
                            height: 300,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        <InfiniteScroll
                            style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'unset' }}
                            dataLength={data?.result?.meta_data?.page_size ?? 0}
                            next={fetchMoreData}
                            inverse={true}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                            endMessage={null} // TODO
                            scrollableTarget='scrollableDiv'
                        >
                            {messages.map((message, index) => (
                                <div key={message.message_id}>
                                    {index < messages.length &&
                                        moment(messages[index + 1]?.timestamp).format('DD-MM-YYYY') !=
                                            moment(message.timestamp).format('DD-MM-YYYY') && (
                                            <Divider orientation='left'>
                                                {moment(message?.timestamp).format('MMMM DD, YYYY')}
                                            </Divider>
                                        )}
                                    <Message
                                        message={message}
                                        previousUser={index > 0 ? messages[index - 1]?.user : null}
                                        type={
                                            message?.user?.user_id === user.user_id
                                                ? TYPE_SENT_MESSAGE
                                                : TYPE_RECEIVED_MESSAGE
                                        }
                                        replyOnMessage={replyOnMessage}
                                        scrollToRepliedMessage={scrollToRepliedMessage}
                                        isFocused={focusedMessageId === message.message_id}
                                    />
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </Spin>
            <div
                style={{
                    position: 'sticky',
                    bottom: 1,
                    backgroundColor: '#fff',
                    padding: '5px',
                    borderTop: '1px solid #ccc',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {isReplying && <ReplyMessage message={replyMessage} setIsReplying={setIsReplying} />}

                    <div style={{ display: 'flex', width: '100%' }}>
                        <Input.TextArea
                            style={{ flex: 1, marginRight: '10px' }}
                            value={inputValue}
                            onChange={handleInputChange}
                            onPressEnter={handleSendMessage}
                            placeholder='Type your message...'
                        />
                        <Button style={{ width: '80px' }} type='primary' onClick={handleSendMessage}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventChat;
