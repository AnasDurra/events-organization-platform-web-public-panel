import { useEffect, useRef, useState } from 'react';
import { Divider, Spin, Typography } from 'antd';
import Message from './Message';
import { TYPE_RECEIVED_MESSAGE, TYPE_SENT_MESSAGE, TYPE_SYSTEM_MESSAGE } from './CONSTANTS';
import moment from 'moment';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useGroupChatListQuery } from '../../api/services/chats';
import { chatSocket } from '../../chatSocket';
import { getLoggedInUserV2 } from '../../api/services/auth';
import InputMessage from './InputMessage';

const EventChat = ({ chat_group_id, eventID, orgID }) => {
    const pageSize = 10;
    const [page, setPage] = useState(1);
    const { data, isLoading, refetch, isFetching } = useGroupChatListQuery({ chat_group_id, pageSize, page });

    const [user] = useState(getLoggedInUserV2());
    const [messages, setMessages] = useState([]);

    const [isReplying, setIsReplying] = useState(false);
    const [replyMessage, setReplyMessage] = useState(null);
    const [focusedMessageId, setFocusedMessageId] = useState(null);

    const messagesEndRef = useRef(null);

    const replyOnMessage = (replyMessage) => {
        setIsReplying(true);
        setReplyMessage(replyMessage);
    };

    const scrollToRepliedMessage = (messageId) => {
        if (messageId) {
            const repliedMessageElement = document.getElementById(messageId);
            if (repliedMessageElement) {
                repliedMessageElement.scrollIntoView({ behavior: 'smooth' });
                setFocusedMessageId(messageId);
            }
        }
    };

    const fetchMoreData = () => {
        console.log('next');
        setPage((prevPage) => prevPage + 1);
        refetch({ chat_group_id, pageSize, page });
    };

    useEffect(() => {
        function messageReceived(message) {
            console.log('Recived message');
            setMessages((prevMessages) => [message.message, ...prevMessages]);
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollTop = 0;
            }
        }
        function reactionReceived(newMeesage) {
            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    message.message_id === newMeesage?.message.message_id ? newMeesage?.message : message
                )
            );
            console.log('done');
        }
        chatSocket.on(`group-${4}`, messageReceived);
        chatSocket.on(`group-${4}/reaction`, reactionReceived);

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
        <div
            style={{
                width: '100%',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#f4f7f6',
                border: '1px solid #e4e4e4',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
        >
            <Spin spinning={isLoading}>
                <div style={{ height: '450px', overflowY: 'auto' }}>
                    <div
                        ref={messagesEndRef}
                        id='scrollableDiv'
                        style={{
                            height: 450,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        <InfiniteScroll
                            style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'unset' }}
                            dataLength={messages.length}
                            next={fetchMoreData}
                            inverse={true}
                            hasMore={
                                data?.result?.meta_data?.current_page === data?.result?.meta_data?.last_page
                                    ? false
                                    : true
                            }
                            loader={
                                <Spin
                                    spinning={true}
                                    style={{ margin: '20px auto', fontSize: '24px', height: '5em' }}
                                />
                            }
                            endMessage={
                                <>
                                    <Typography.Title
                                        level={3}
                                        style={{ textAlign: 'center', marginTop: '20px', color: '#555' }}
                                    >
                                        Welcome to our platform!
                                    </Typography.Title>
                                    <Typography.Paragraph
                                        style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555' }}
                                    >
                                        Thanks for exploring the content.
                                    </Typography.Paragraph>
                                </>
                            } // TODO
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
                                        chat_group_id={chat_group_id}
                                        eventID={eventID}
                                        orgID={orgID}
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
                <InputMessage
                    isReplying={isReplying}
                    setIsReplying={setIsReplying}
                    replyMessage={replyMessage}
                    setReplyMessage={setReplyMessage}
                    chat_group_id={chat_group_id}
                />
            </div>
        </div>
    );
};

export default EventChat;
