import { useEffect, useState } from 'react';
import { List, Dropdown, Button, Typography, Space, Menu, Input, Spin, Avatar } from 'antd';
import { EllipsisOutlined, RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

const { Text } = Typography;
const { Search } = Input;

import moment from 'moment';

import { useFollowersListQuery } from '../../api/services/following';

const FollowersList = () => {
    const navigate = useNavigate();
    let { orgId } = useParams();
    const { data, isLoading, error } = useFollowersListQuery(orgId);

    // const data = {
    //     status: true,
    //     path: '/api/organization/followers-list',
    //     statusCode: 200,
    //     result: [
    //         {
    //             attendee: {
    //                 id: '21',
    //                 first_name: 'Alaa Aldeeqn',
    //                 last_name: 'Zamel',
    //                 full_name: 'Alaa Aldeen Zamel',
    //                 join_date: '22-03-2024',
    //                 phone_number: '+963991146587',
    //                 birth_date: '07-08-2001',
    //                 bio: "Hi There, I'm Software Engineer working from home.",
    //                 job: null,
    //                 address: null,
    //                 contacts: [],
    //             },
    //             following_date: '2024-04-14 15:19:05',
    //         },
    //         {
    //             attendee: {
    //                 id: '21',
    //                 first_name: 'Alaa Aldeeqn',
    //                 last_name: 'Zamel',
    //                 full_name: 'Alaa Aldeen Zamel',
    //                 join_date: '22-03-2024',
    //                 phone_number: '+963991146587',
    //                 birth_date: '07-08-2001',
    //                 bio: "Hi There, I'm Software Engineer working from home.",
    //                 job: null,
    //                 address: null,
    //                 contacts: [],
    //             },
    //             following_date: '2024-04-14 15:19:05',
    //         },
    //         {
    //             attendee: {
    //                 id: '21',
    //                 first_name: 'Alaa Aldeeqn',
    //                 last_name: 'Zamel',
    //                 full_name: 'Alaa Aldeen Zamel',
    //                 join_date: '22-03-2024',
    //                 phone_number: '+963991146587',
    //                 birth_date: '07-08-2001',
    //                 bio: "Hi There, I'm Software Engineer working from home.",
    //                 job: null,
    //                 address: null,
    //                 contacts: [],
    //             },
    //             following_date: '2024-04-14 15:19:05',
    //         },
    //     ],
    // };

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [filteredAttendees, setFilteredAttendees] = useState([]);
    const [searchType, setSearchType] = useState('name');

    const handleSearchTypeSelect = ({ key }) => {
        setSearchType(key);
    };

    const handleSearch = (value) => {
        const filtered = data?.result?.filter((attendee) => {
            if (searchType === 'name') {
                return attendee.attendee.full_name.toLowerCase().includes(value.toLowerCase());
            }
            return false;
        });
        setFilteredAttendees(filtered);
    };

    const searchMenu = (
        <Menu onClick={handleSearchTypeSelect}>
            <Menu.Item key='name'>Search by Name</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        setFilteredAttendees(data?.result);
        console.log(data);
    }, [data]);

    return (
        <div style={{ padding: '20px' }}>
            <Button size='large' icon={<ArrowLeftOutlined />} type='text' onClick={() => navigate(-1)} />
            <Spin size='large' spinning={isLoading}>
                <Typography.Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>
                    Followers
                </Typography.Title>

                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Dropdown overlay={searchMenu} trigger={['click']}>
                        <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
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
                            placeholder={`Search by ${searchType}`}
                            allowClear
                            enterButton='Search'
                            size='large'
                            onSearch={handleSearch}
                        />
                    )}
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Text style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '8px' }}>Total Followers:</Text>
                    <Text style={{ fontSize: '14px', color: '#1890ff' }}>{data?.result?.length}</Text>
                </div>
                <List
                    itemLayout='horizontal'
                    dataSource={filteredAttendees}
                    renderItem={(item, index) => (
                        <div
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                            }}
                        >
                            <Link
                                to={`/attendee-profile/${item?.attendee?.id}`}
                                key={item?.attendee.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <List.Item
                                    style={{
                                        padding: '12px 0',
                                        borderBottom: '1px solid #f0f0f0',
                                        transition: 'background-color 0.3s',
                                        backgroundColor: hoveredIndex === index ? '#f5f5f5' : 'inherit',
                                    }}
                                    actions={[<RightOutlined style={{ fontSize: '16px' }} key='navigate' />]}
                                >
                                    <List.Item.Meta
                                        // TODO replace this with original image
                                        avatar={
                                            <Avatar size={48} src='https://randomuser.me/api/portraits/men/10.jpg' />
                                        }
                                        title={
                                            <div>
                                                <Text strong>{item?.attendee?.full_name}</Text>
                                            </div>
                                        }
                                        description={
                                            <Space direction='vertical'>
                                                <Text>{item?.attendee?.bio ?? '-'}</Text>
                                                <Text type='secondary'>
                                                    Following since{' '}
                                                    {moment(item?.following_date).format('MMMM D, YYYY, h:mm A')}
                                                </Text>
                                            </Space>
                                        }
                                        style={{ cursor: 'pointer' }}
                                    />
                                </List.Item>
                            </Link>
                        </div>
                    )}
                />
            </Spin>
        </div>
    );
};

export default FollowersList;
