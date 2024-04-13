import { List, Avatar, Typography, Button, Space, Badge, Input, Select, Dropdown, Menu, Spin } from 'antd';
import { LeftOutlined, RightOutlined, EllipsisOutlined } from '@ant-design/icons';

import moment from 'moment';
import { useEffect, useState } from 'react';

const { Search } = Input;
const { Option } = Select;

import { useNavigate } from 'react-router-dom';

import { useShowEventAttendeesQuery } from '../../api/services/events';

const ShowEventAttendees = () => {
    const { data, error, isLoading } = useShowEventAttendeesQuery(1);
    const navigate = useNavigate();

    const [filteredAttendees, setFilteredAttendees] = useState(attendees);
    const [searchType, setSearchType] = useState('name');
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleClick = (attendeeId) => {
        navigate(`/attendee-profile/${attendeeId}`);
    };
    const handleGoBack = () => {
        navigate(-1);
    };
    const handleSearchTypeSelect = ({ key }) => {
        setSearchType(key);
    };

    const handleSearch = (value) => {
        const filtered = attendees.filter((attendee) => {
            if (searchType === 'name') {
                return (
                    attendee.attendee.firstName.toLowerCase().includes(value.toLowerCase()) ||
                    attendee.attendee.lastName.toLowerCase().includes(value.toLowerCase())
                );
            } else if (searchType === 'status') {
                return attendee.status.toLowerCase().includes(value.toLowerCase());
            }
            return false;
        });
        setFilteredAttendees(filtered);
    };

    const searchMenu = (
        <Menu onClick={handleSearchTypeSelect}>
            <Menu.Item key="name">Search by Name</Menu.Item>
            <Menu.Item key="status">Search by Status</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div style={{ padding: '20px', width: '100%', margin: '0 auto' }}>
            <LeftOutlined
                style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '24px', cursor: 'pointer' }}
                onClick={handleGoBack}
            />
            <Spin size="large" spinning={isLoading}>
                <Typography.Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>
                    Attendees
                </Typography.Title>

                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Dropdown overlay={searchMenu} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            <EllipsisOutlined
                                style={{
                                    fontSize: '24px',
                                    color: '#017568',
                                    cursor: 'pointer',
                                    border: '1px solid #017568',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    marginRight: '5px',
                                }}
                            />
                        </a>
                    </Dropdown>
                    {searchType === 'name' && (
                        <Search
                            placeholder={`Search by ${searchType === 'name' ? 'name' : 'status'}`}
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={handleSearch}
                        />
                    )}
                    {searchType === 'status' && (
                        <div style={{ display: 'flex', width: '100%' }}>
                            <Select
                                placeholder={`Search by ${searchType === 'name' ? 'name' : 'status'}`}
                                allowClear
                                size="large"
                                style={{ width: '100%' }}
                                options={[
                                    {
                                        value: 'accepted',
                                        label: 'Accepted',
                                    },
                                    {
                                        value: 'rejected',
                                        label: 'Rejected',
                                    },
                                    {
                                        value: 'waiting',
                                        label: 'Waiting',
                                    },
                                ]}
                                onChange={handleSearch}
                            />
                            <Button
                                size="large"
                                style={{
                                    borderTopLeftRadius: '0',
                                    borderBottomLeftRadius: '0',
                                    borderTopRightRadius: '7px',
                                    borderBottomRightRadius: '7px',
                                    backgroundColor: '#00474F',
                                    color: '#FFFFFF',
                                    marginLeft: '-5px',
                                }}
                                // onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Typography.Text style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '8px' }}>
                        Total Attendees:
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: '14px', color: '#1890ff' }}>
                        {data?.result?.length ?? 0}
                    </Typography.Text>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={filteredAttendees}
                    renderItem={(attendee, index) => (
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(attendee.attendee.id);
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                            }}
                        >
                            <List.Item
                                style={{
                                    padding: '12px 0',
                                    borderBottom: '1px solid #f0f0f0',
                                    transition: 'background-color 0.3s',
                                    backgroundColor: hoveredIndex === index ? '#f5f5f5' : 'inherit',
                                }}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={attendee.attendee.profilePictureUrl || '/default-avatar.jpg'}
                                            size={48}
                                        />
                                    }
                                    title={
                                        <div>
                                            <Typography.Text
                                                strong
                                            >{`${attendee.attendee.firstName} ${attendee.attendee.lastName}`}</Typography.Text>
                                            {attendee.status === 'accepted' && (
                                                <Badge
                                                    status="success"
                                                    text={
                                                        <Typography.Text
                                                            style={{
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                color: '#52c41a',
                                                            }}
                                                        >
                                                            Accepted
                                                        </Typography.Text>
                                                    }
                                                    style={{
                                                        marginLeft: '10px',

                                                        borderRadius: '4px',
                                                        padding: '4px 8px',
                                                    }}
                                                />
                                            )}
                                            {attendee.status === 'rejected' && (
                                                <Badge
                                                    status="error"
                                                    text={
                                                        <Typography.Text
                                                            style={{
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                color: '#f5222d',
                                                            }}
                                                        >
                                                            Rejected
                                                        </Typography.Text>
                                                    }
                                                    style={{
                                                        marginLeft: '10px',

                                                        borderRadius: '4px',
                                                        padding: '4px 8px',
                                                    }}
                                                />
                                            )}
                                            {attendee.status === 'waiting' && (
                                                <Badge
                                                    status="default"
                                                    text={
                                                        <Typography.Text
                                                            style={{
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                color: '#d9d9d9',
                                                            }}
                                                        >
                                                            Waiting
                                                        </Typography.Text>
                                                    }
                                                    style={{
                                                        marginLeft: '10px',
                                                        borderRadius: '4px',
                                                        padding: '4px 8px',
                                                    }}
                                                />
                                            )}
                                        </div>
                                    }
                                    description={
                                        <>
                                            <Typography.Text style={{ marginBottom: '4px', display: 'block' }}>
                                                {attendee.attendee.bio}
                                            </Typography.Text>
                                            <Typography.Text type="secondary">
                                                Joined: {moment(attendee.createdAt).format('MMM DD, YYYY')}
                                            </Typography.Text>
                                        </>
                                    }
                                />
                                <Space>
                                    <RightOutlined style={{ fontSize: '16px' }} />
                                </Space>
                            </List.Item>
                        </a>
                    )}
                />
            </Spin>
        </div>
    );
};

export default ShowEventAttendees;

const attendees = [
    {
        id: '1',
        createdAt: '2024-03-30T00:15:02.526Z',
        status: 'accepted',
        attendee: {
            id: '1',
            createdAt: '2024-03-29T23:52:32.860Z',
            firstName: 'John',
            lastName: 'Doe',
            profilePictureUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
    },
    {
        id: '2',
        createdAt: '2024-03-31T10:30:00.000Z',
        status: 'accepted',
        attendee: {
            id: '2',
            createdAt: '2024-03-28T12:00:00.000Z',
            firstName: 'Jane',
            lastName: 'Smith',
            profilePictureUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
    {
        id: '3',
        createdAt: '2024-03-29T13:45:00.000Z',
        status: 'accepted',
        attendee: {
            id: '3',
            createdAt: '2024-03-25T08:00:00.000Z',
            firstName: 'Alice',
            lastName: 'Johnson',
            profilePictureUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    },
    {
        id: '4',
        createdAt: '2024-03-25T17:20:00.000Z',
        status: 'accepted',
        attendee: {
            id: '4',
            createdAt: '2024-03-20T09:30:00.000Z',
            firstName: 'Michael',
            lastName: 'Brown',
            profilePictureUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
    },
    {
        id: '5',
        createdAt: '2024-03-23T09:00:00.000Z',
        status: 'accepted',
        attendee: {
            id: '5',
            createdAt: '2024-03-18T16:45:00.000Z',
            firstName: 'Emily',
            lastName: 'Taylor',
            profilePictureUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    },
    {
        id: '6',
        createdAt: '2024-03-21T11:10:00.000Z',
        status: 'accepted',
        attendee: {
            id: '6',
            createdAt: '2024-03-15T14:20:00.000Z',
            firstName: 'David',
            lastName: 'Martinez',
            profilePictureUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
    {
        id: '7',
        createdAt: '2024-03-20T08:30:00.000Z',
        status: 'accepted',
        attendee: {
            id: '7',
            createdAt: '2024-03-10T10:00:00.000Z',
            firstName: 'Sarah',
            lastName: 'Garcia',
            profilePictureUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    },
    {
        id: '8',
        createdAt: '2024-03-18T14:45:00.000Z',
        status: 'waiting',
        attendee: {
            id: '8',
            createdAt: '2024-03-05T13:15:00.000Z',
            firstName: 'Daniel',
            lastName: 'Rodriguez',
            profilePictureUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
    },
    {
        id: '9',
        createdAt: '2024-03-16T12:20:00.000Z',
        status: 'waiting',
        attendee: {
            id: '9',
            createdAt: '2024-03-01T09:30:00.000Z',
            firstName: 'Jessica',
            lastName: 'Lopez',
            profilePictureUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    },
    {
        id: '10',
        createdAt: '2024-03-14T10:00:00.000Z',
        status: 'rejected',
        attendee: {
            id: '10',
            createdAt: '2024-02-27T14:00:00.000Z',
            firstName: 'Christopher',
            lastName: 'Hernandez',
            profilePictureUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
            coverPictureUrl: 'https://via.placeholder.com/300',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
    // Continue adding more attendees as needed
];
