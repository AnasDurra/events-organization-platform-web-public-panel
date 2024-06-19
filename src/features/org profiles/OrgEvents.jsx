import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    Row,
    Avatar,
    Button,
    Space,
    Input,
    Empty,
    Image,
    Typography,
    Menu,
    Dropdown,
    DatePicker,
    Spin,
} from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';

import moment from 'moment';
import useEventHandlers from '../Manage Events (org)/utils/eventHandlers';
import { useNavigate } from 'react-router-dom';
import { useOrgEventsQuery } from './orgSlice.js';

const OrgEvents = () => {
    // const events = {
    //     status: true,
    //     path: '/api/organization/events',
    //     statusCode: 200,
    //     result: [
    //         {
    //             event_id: '1',
    //             event_title: 'Data Science Conference',
    //             event_cover_picture_url: 'https://picsum.photos/300/200?random=1',
    //             start_day: '2024-07-20T09:00:00.000Z',
    //             tickets: 150,
    //         },
    //         {
    //             event_id: '1',
    //             event_title: 'Machine Learning Workshop',
    //             event_cover_picture_url: 'https://picsum.photos/300/200?random=2',
    //             start_day: '2024-08-15T10:30:00.000Z',
    //             tickets: 100,
    //         },
    //         {
    //             event_id: '2',
    //             event_title: 'Blockchain Summit',
    //             event_cover_picture_url: 'https://picsum.photos/300/200?random=3',
    //             start_day: '2024-09-10T09:00:00.000Z',
    //             tickets: 250,
    //         },
    //         {
    //             event_id: '2',
    //             event_title: 'Web Development Bootcamp',
    //             event_cover_picture_url: 'https://picsum.photos/300/200?random=4',
    //             start_day: '2024-10-05T08:00:00.000Z',
    //             tickets: 80,
    //         },
    //     ],
    // };
    const { data: orgEvents, isLoading: isOrgEventsLoading } = useOrgEventsQuery();
    const navigate = useNavigate();
    const [filteredEvents, setFilteredEvents] = useState(null);
    const [searchType, setSearchType] = useState('name');
    const { handleDeleteEvent } = useEventHandlers();
    const iconStyle = { transition: 'transform 0.3s', cursor: 'pointer' };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    const handleClick = (e, action, eventId) => {
        e.stopPropagation();
        if (action === 'edit') {
            navigate(`/event/show/${event.event_id}/?edit=true`);
        } else if (action === 'remove') {
            handleDeleteEvent(eventId);
        }
    };

    const handleSearchTypeSelect = ({ key }) => {
        setSearchType(key);
    };

    const searchMenu = (
        <Menu onClick={handleSearchTypeSelect}>
            <Menu.Item key='name'>Search by Name</Menu.Item>
            <Menu.Item key='date'>Search by Date</Menu.Item>
        </Menu>
    );

    const handleSearch = (value) => {
        console.log('hello');
        const filtered = orgEvents?.result?.filter((event) => {
            if (searchType === 'name') {
                return (
                    event?.event_title.toLowerCase().includes(value.toLowerCase()) ||
                    event?.event_title.toLowerCase().includes(value.toLowerCase())
                );
            } else if (searchType === 'date') {
                if (value && value.length === 2) {
                    const startDate = value[0].startOf('day');
                    const endDate = value[1].endOf('day');

                    const eventDate = moment.utc(event.start_day.split('T')[0]).startOf('day');

                    return eventDate >= startDate && eventDate <= endDate;
                } else {
                    return true;
                }
            }
            return false;
        });
        setFilteredEvents(filtered);
    };

    useEffect(() => {
        if (orgEvents) {
            setFilteredEvents(orgEvents?.result);
        }
    }, [orgEvents]);

    return (
        <div style={{ padding: '24px' }}>
            <Spin spinning={isOrgEventsLoading}>
                <Row gutter={[15, 30]} justify='start'>
                    <Col span={24}>
                        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                            <Dropdown overlay={searchMenu} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
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
                                <Input.Search
                                    placeholder={`Search by name}`}
                                    allowClear
                                    enterButton='Search'
                                    size='large'
                                    onSearch={handleSearch}
                                />
                            )}

                            {searchType === 'date' && (
                                <Space style={{ width: '100%' }} direction='vertical' size={12}>
                                    <DatePicker.RangePicker
                                        size='large'
                                        style={{ width: '100%' }}
                                        // disabled={filteredEvents?.length === 0}
                                        onChange={(dates, dateStrings) => {
                                            handleSearch(dates);
                                        }}
                                    />
                                </Space>
                            )}
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                        <div
                            style={{
                                textAlign: 'center',
                                boxShadow: 'none',
                                padding: '20px',
                            }}
                        >
                            <Space
                                size={15}
                                style={{
                                    width: 130,
                                    height: 130,
                                    borderRadius: '50%',
                                    border: '2px solid #e8e8e8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    margin: '0 auto 16px',
                                }}
                            >
                                <div style={{ fontSize: '42px', lineHeight: '1' }}>{orgEvents?.result?.length}</div>
                                <div style={{ fontSize: '14px', lineHeight: '1' }}>EVENTS</div>
                            </Space>
                            <Button
                                onClick={() => {
                                    navigate('/org/event/create');
                                }}
                                block
                                type='primary'
                                icon={<PlusOutlined />}
                            >
                                New Event
                            </Button>
                        </div>
                    </Col>
                    {filteredEvents === 0 ? (
                        <Col span={24}>
                            <Empty description='No events found' />
                        </Col>
                    ) : (
                        filteredEvents?.map((event) => (
                            <Col key={event.event_id} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                                <Card
                                    onClick={() => {
                                        navigate(`/event/show/${event.event_id}`);
                                    }}
                                    size='small'
                                    style={{
                                        height: '100%',
                                        textAlign: 'center',
                                        transition: 'box-shadow 0.3s',
                                        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
                                    }}
                                    hoverable
                                    cover={<Image preview={false} src={event.event_cover_picture_url} />}
                                    actions={[
                                        <EditOutlined
                                            style={iconStyle}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={(e) => handleClick(e, 'edit')}
                                            key='edit'
                                        />,
                                        <DeleteOutlined
                                            style={{ ...iconStyle, color: 'red', fontSize: '16px' }}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={(e) => handleClick(e, 'remove', event.event_id)}
                                            key='remove'
                                        />,
                                    ]}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 15px 20px rgba(0, 71, 79, 0.2)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.boxShadow = '0 2px 2px rgba(0, 0, 0, 0.1)';
                                    }}
                                >
                                    <Card.Meta title={event.event_title} description={`Tickets: ${event.tickets}`} />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: -1,
                                            left: 0,
                                            zIndex: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                            padding: '5px',
                                            borderRadius: '5px',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography.Text
                                            style={{ color: 'white', fontWeight: 'bold', fontSize: '10px' }}
                                        >
                                            {event.start_day
                                                ? moment(event.start_day).format('MMM DD, YYYY, hh:mm A')
                                                : 'Date not set'}
                                        </Typography.Text>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Spin>
        </div>
    );
};

export default OrgEvents;
