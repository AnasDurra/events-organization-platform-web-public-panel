import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Input, Divider, Space, Button, Empty } from 'antd';
import { ArrowLeftOutlined, MessageOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { useChattingListQuery } from '../../api/services/chats';

const { Title, Text } = Typography;
const { Search } = Input;

const ChatsList = () => {
    const { data: chatList, error, isLoading: chatListDataIsLoading, refetch, isFetching } = useChattingListQuery();

    const [searchText, setSearchText] = useState('');
    // const chatList = [
    //     {
    //         event_id: '25',
    //         chat_group_id: '5',
    //         group_title: 'Chatting Group',
    //         group_member_count: '2',
    //         group_status: 'ENABLED',
    //     },
    //     {
    //         event_id: '26',
    //         chat_group_id: '6',
    //         group_title: 'Tech Talk',
    //         group_member_count: '5',
    //         group_status: 'ENABLED',
    //     },
    //     {
    //         event_id: '27',
    //         chat_group_id: '7',
    //         group_title: 'Design Discussion',
    //         group_member_count: '3',
    //         group_status: 'ENABLED',
    //     },
    //     {
    //         event_id: '28',
    //         chat_group_id: '8',
    //         group_title: 'Music Lovers',
    //         group_member_count: '10',
    //         group_status: 'ENABLED',
    //     },
    // ];

    const filteredData = chatList?.result?.filter((item) =>
        item.group_title.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const totalChats = filteredData?.length;

    useEffect(() => {
        console.log(chatList);
    }, [chatList]);
    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            {/* <Button size="large" icon={<ArrowLeftOutlined />} type="text" onClick={() => Navigate(-1)} /> */}
            <Title level={2} style={styles.title}>
                Chat Groups
            </Title>
            <div style={styles.container}>
                <Space size={10} style={{ display: 'flex' }} direction="vertical">
                    <div style={styles.searchContainer}>
                        <Search
                            placeholder="Search chat groups"
                            prefix={<SearchOutlined />}
                            onChange={(e) => handleSearch(e.target.value)}
                            style={styles.searchInput}
                            enterButton={
                                <Button type="primary" icon={<SearchOutlined />}>
                                    Search
                                </Button>
                            }
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                            <Text style={styles.note} type="secondary">
                                * Explore active event chats. Click to continue the conversation.
                            </Text>
                            <Text style={styles.totalChats} type="secondary">
                                {totalChats} chat groups
                            </Text>
                        </div>
                    </div>
                </Space>
                <Divider style={{ marginTop: '0px' }} />
                <List
                    locale={{
                        emptyText: (
                            <Empty
                                imageStyle={{ height: '10vh' }}
                                image={<MessageOutlined style={{ fontSize: 48 }} />}
                                description={
                                    <Text type="secondary">
                                        There are currently no chats available. Join a conversation to see them here!
                                    </Text>
                                }
                            />
                        ),
                    }}
                    itemLayout="horizontal"
                    dataSource={filteredData}
                    renderItem={(item) => (
                        <Link to={`/event/show/${item?.event_id}/?showChat=true`} style={styles.groupLink}>
                            <List.Item
                                style={styles.groupItem}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://i.pravatar.cc/150?u=${item?.group_title}`} />}
                                    title={<span style={styles.groupTitle}>{item?.group_title}</span>}
                                    description={
                                        <Text style={styles.groupStatus} type="secondary">
                                            Active
                                        </Text>
                                    }
                                />
                                <div style={styles.groupInfo}>
                                    <Text style={styles.memberCount} type="secondary">
                                        {item?.group_member_count} members
                                    </Text>
                                </div>
                            </List.Item>
                        </Link>
                    )}
                />
            </div>
        </Space>
    );
};

const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#f0f0f0';
};

const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#ffffff';
};

const styles = {
    container: {
        padding: '24px',
        margin: 'auto',
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '18px',
    },
    note: {
        fontSize: '14px',
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '24px',
    },
    searchInput: {
        marginLeft: '8px',
        fontSize: '14px',
    },
    totalChats: {
        fontSize: '14px',
        color: '#999',
    },
    groupLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    groupItem: {
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
    },
    groupTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333',
    },
    groupInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    memberCount: {
        marginLeft: '8px',
        fontSize: '14px',
        color: '#666',
    },
    groupStatus: {
        fontSize: '12px',
        color: '#52c41a',
    },
};

export default ChatsList;
