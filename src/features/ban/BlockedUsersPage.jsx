import { useEffect, useState } from 'react';
import { List, Dropdown, Button, Typography, Space, Select, Menu, Input, Badge, Modal, Spin } from 'antd';
import { UnlockOutlined, EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;
const { Search } = Input;

import moment from 'moment';

import { useBlockUserMutation, useUnBlockUserMutation } from '../../api/services/ban';
import { useNotification } from '../../utils/NotificationContext';

import { useBlockListQuery } from '../../api/services/ban';

const BlockedUsersPage = () => {
    const { openNotification } = useNotification();

    const { data, isLoading: blockListIsLoading, isFetching, refetch } = useBlockListQuery();
    const [blockMutation, { isLoading: blockIsLoading }] = useBlockUserMutation();
    const [unBlockMutation, { isLoading: unBlockIsLoading }] = useUnBlockUserMutation();

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

    const confirmBlockAttendee = (e, attendee) => {
        e.preventDefault();
        Modal.confirm({
            title: 'Are you sure you want to block this attendee?',
            content: 'Blocking this attendee will restrict their access to certain features.',
            okText: 'Yes, Block',
            cancelText: 'Cancel',
            onOk: () => {
                blockMutation({ attendee_id: attendee.id })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                        openNotification('success', `${attendee.full_name} has been blocked successfully!`);
                        refetch();
                    })
                    .catch((error) => {
                        openNotification('warning', error?.data?.message);

                        console.error('Error:', error);
                    });
            },
        });
    };

    const confirmUnblockAttendee = (e, attendee) => {
        e.preventDefault();
        Modal.confirm({
            title: 'Are you sure you want to unblock this attendee?',
            content: 'Unblocking this attendee will restore their access to all features.',
            okText: 'Yes, Unblock',
            cancelText: 'Cancel',
            onOk: () => {
                unBlockMutation({ attendee_id: attendee.id })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                        openNotification('success', `${attendee.full_name} has been unblocked successfully!`);
                        refetch();
                    })
                    .catch((error) => {
                        openNotification('warning', error.data.message);
                        console.error('Error:', error);
                    });
            },
        });
    };

    const searchMenu = (
        <Menu onClick={handleSearchTypeSelect}>
            <Menu.Item key='name'>Search by Name</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        setFilteredAttendees(data?.result);
    }, [data]);

    return (
        <div style={{ padding: '20px' }}>
            <Spin size='large' spinning={blockIsLoading || unBlockIsLoading || blockListIsLoading || isFetching}>
                <Typography.Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>
                    Blocked Users
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
                    <Text style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '8px' }}>
                        Total Blocked Users:
                    </Text>
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
                                        backgroundColor: hoveredIndex === index ? '#f0f0f0' : 'inherit',
                                    }}
                                    actions={[
                                        <Button
                                            type='dashed'
                                            danger
                                            icon={<UnlockOutlined />}
                                            key='unblock'
                                            onClick={(e) => {
                                                item?.isBlocked
                                                    ? confirmUnblockAttendee(e, item?.attendee)
                                                    : confirmBlockAttendee(e, item?.attendee);
                                            }}
                                        >
                                            {item?.result?.isBlocked ? 'Unblock' : 'Block'}
                                        </Button>,

                                        <RightOutlined style={{ fontSize: '16px' }} key='navigate' />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={
                                            <div>
                                                <Text strong>{item?.attendee?.full_name}</Text>{' '}
                                                <Badge
                                                    status='error'
                                                    text={
                                                        <Typography.Text
                                                            style={{
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                color: '#f5222d',
                                                            }}
                                                        >
                                                            Blocked
                                                        </Typography.Text>
                                                    }
                                                    style={{
                                                        marginLeft: '10px',

                                                        borderRadius: '4px',
                                                        padding: '4px 8px',
                                                    }}
                                                />
                                            </div>
                                        }
                                        description={
                                            <Space direction='vertical'>
                                                <Text>{item?.attendee?.job?.label}</Text>
                                                <Text type='secondary'>
                                                    Blocked by {item?.blocked_by?.username} on{' '}
                                                    {moment(item?.blocking_date).format('MMMM D, YYYY, h:mm A')}
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

export default BlockedUsersPage;
