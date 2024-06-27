import { Typography, Button, Input, Select, Dropdown, Menu, Spin, Tabs } from 'antd';
import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Search } = Input;
const { Option } = Select;

import { useNavigate, useParams } from 'react-router-dom';

import { useShowEventAttendeesQuery } from '../../api/services/events';
import EventAttendeesList from './EventAttendeesList';

import './tabStyle.css';

const ShowEventAttendees = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useShowEventAttendeesQuery(id);
    const navigate = useNavigate();

    const [filteredAttendees, setFilteredAttendees] = useState(data?.result);
    const [searchType, setSearchType] = useState('name');

    const tabItems = [
        {
            key: '1',
            label: 'Waiting Attendees',
            children: <EventAttendeesList attendees={filteredAttendees} type={'waiting'} />,
        },
        {
            key: '2',
            label: 'Accepted Attendees',
            children: <EventAttendeesList attendees={filteredAttendees} type={'accepted'} />,
        },
        {
            key: '3',
            label: 'Rejected Attendees',
            children: <EventAttendeesList attendees={filteredAttendees} type={'rejected'} />,
        },
        {
            key: '4',
            label: 'All Attendees',
            children: <EventAttendeesList attendees={filteredAttendees} type={'all'} />,
        },
    ];

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSearch = (value) => {
        if (searchType === 'status' && !value) {
            setFilteredAttendees(data?.result);
        } else {
            const filtered = data?.result.filter((attendee) => {
                if (searchType === 'name') {
                    return (
                        attendee.attendee.firstName.toLowerCase().includes(value.toLowerCase()) ||
                        attendee.attendee.lastName.toLowerCase().includes(value.toLowerCase())
                    );
                } else if (searchType === 'status') {
                    return attendee?.status?.toLowerCase().includes(value?.toLowerCase());
                }
                return false;
            });
            setFilteredAttendees(filtered);
        }
    };

    const handleSearchTypeSelect = ({ key }) => {
        setSearchType(key);
    };

    const searchMenu = (
        <Menu onClick={handleSearchTypeSelect}>
            <Menu.Item key='name'>Search by Name</Menu.Item>
            <Menu.Item key='status'>Search by Status</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        console.log(data);
        setFilteredAttendees(data?.result);
    }, [data]);
    return (
        <div style={{ padding: '20px', width: '100%', margin: '0 auto' }}>
            <Button type='text' size='large' style={{ padding: '0px' }}>
                <LeftOutlined onClick={handleGoBack} />
            </Button>

            <Spin size='large' spinning={isLoading}>
                <Typography.Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>
                    Attendees
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
                            placeholder={`Search by ${searchType === 'name' ? 'name' : 'status'}`}
                            allowClear
                            enterButton='Search'
                            size='large'
                            onSearch={handleSearch}
                        />
                    )}
                    {searchType === 'status' && (
                        <div style={{ display: 'flex', width: '100%' }}>
                            <Select
                                placeholder={`Search by ${searchType === 'name' ? 'name' : 'status'}`}
                                allowClear
                                size='large'
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
                                size='large'
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
                <Tabs
                    defaultActiveKey='1'
                    items={tabItems}
                    className='custom-tabs'
                    onChange={() => {
                        handleSearch('');
                        setSearchType('name');
                    }}
                />
            </Spin>
        </div>
    );
};

export default ShowEventAttendees;
