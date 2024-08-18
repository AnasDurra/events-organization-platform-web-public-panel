import { useEffect, useState } from 'react';
import { List, Dropdown, Button, Typography, Space, Menu, Input, Spin, Avatar, Empty } from 'antd';
import { EllipsisOutlined, RightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';

const { Text } = Typography;
const { Search } = Input;

import moment from 'moment';

import { useFollowersListQuery } from '../../api/services/following';

const FollowersList = () => {
    const navigate = useNavigate();
    let { orgId } = useParams();
    const { data, isLoading } = useFollowersListQuery(orgId);

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
                    locale={{
                        emptyText:
                            data?.result?.length == 0 ? (
                                <Empty
                                    description='This organization currently has no followers.'
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            ) : (
                                <Empty
                                    description='No matching attendees were found based on your search criteria.'
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            ),
                    }}
                    renderItem={(item) => (
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
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                actions={[<RightOutlined style={{ fontSize: '16px' }} key='navigate' />]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={48} src={item?.attendee?.profile_img} />}
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
                    )}
                />
            </Spin>
        </div>
    );
};

export default FollowersList;
