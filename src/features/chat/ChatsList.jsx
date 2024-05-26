import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Input, Divider, Space, Button, Empty, Card, Image, Row, Col, Badge } from 'antd';
import { ArrowLeftOutlined, MessageOutlined, SearchOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { useChattingListQuery } from '../../api/services/chats';
import { colors } from '@mui/material';

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
        <Space direction='vertical' style={{ display: 'flex' }}>
            <Title level={2} style={styles.title}>
                Chat Groups
            </Title>
            <div style={styles.container}>
                <Space size={10} style={{ display: 'flex' }} direction='vertical'>
                    <div style={styles.searchContainer}>
                        <Search
                            placeholder='Search chat groups'
                            prefix={<SearchOutlined />}
                            onChange={(e) => handleSearch(e.target.value)}
                            style={styles.searchInput}
                            enterButton={
                                <Button type='primary' icon={<SearchOutlined />}>
                                    Search
                                </Button>
                            }
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                            <Text style={styles.note} type='secondary'>
                                * Explore active event chats. Click to continue the conversation.
                            </Text>
                            <Text style={styles.totalChats} type='secondary'>
                                {totalChats} chat groups
                            </Text>
                        </div>
                    </div>
                </Space>
                <Divider style={{ marginTop: '0px' }} />
                <Row gutter={[16, 16]}>
                    {filteredData?.length > 0 ? (
                        filteredData.map((item) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={item?.chat_group_id}>
                                <Link to={`/event/show/${item?.event_id}/?showChat=true`} style={styles.groupLink}>
                                    <Card
                                        hoverable
                                        bodyStyle={{ padding: '0px' }}
                                        cover={
                                            <div style={styles.eventCoverContainer}>
                                                <Image
                                                    width={'100%'}
                                                    height={'100%'}
                                                    // src={item?.event_cover}
                                                    src={'https://picsum.photos/300/200?random=2'}
                                                    alt={item?.group_title}
                                                    style={styles.eventCover}
                                                />
                                                <div style={styles.overlay}>
                                                    <Title level={3} style={styles.groupTitle}>
                                                        {item?.group_title}
                                                    </Title>
                                                    <div style={styles.groupInfo}>
                                                        <Badge
                                                            count={item?.group_members_count}
                                                            style={{ backgroundColor: '#52c41a' }}
                                                        >
                                                            <Avatar shape='circle' icon={<UserOutlined />} />
                                                        </Badge>
                                                        <Text style={styles.groupStatus} type='secondary'>
                                                            Active
                                                        </Text>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        style={styles.groupCard}
                                        onMouseEnter={(e) => (
                                            (e.currentTarget.style.transform = 'scale(1.01)'),
                                            (e.currentTarget.style.boxShadow = '0 3px 16px rgba(0, 0, 0, 0.4)')
                                        )}
                                        onMouseLeave={(e) => (
                                            (e.currentTarget.style.transform = 'scale(1.00)'),
                                            (e.currentTarget.style.boxShadow = 'none')
                                        )}
                                    ></Card>
                                </Link>
                            </Col>
                        ))
                    ) : (
                        <Col span={24}>
                            <Empty
                                imageStyle={{ height: '10vh' }}
                                image={<MessageOutlined style={{ fontSize: 48 }} />}
                                description={
                                    <Text type='secondary'>
                                        There are currently no chats available. Join a conversation to see them here!
                                    </Text>
                                }
                            />
                        </Col>
                    )}
                </Row>
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
    groupCard: {
        marginBottom: '16px',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
    },
    eventCoverContainer: {
        position: 'relative',
        height: '200px',
        overflow: 'hidden',
    },
    eventCover: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5))',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px',
    },
    groupTitle: {
        fontSize: '18px',
        color: '#fff',
        fontWeight: 'bold',
        margin: 0,
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        fontFamily: "'Roboto Mono', monospace",
        marginBottom: '10px',
    },
    groupStatus: {
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '4px 8px',
        backgroundColor: '#4b8d2a',
        borderRadius: '12px',
        color: '#fff',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
        fontFamily: "'Roboto Mono', monospace",
        display: 'inline-block',
    },
    groupInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    memberCount: {
        fontSize: '14px',
        color: '#fff',
        position: 'absolute',
        top: '16px',
        right: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '4px 8px',
        borderRadius: '4px',
    },
};
export default ChatsList;
