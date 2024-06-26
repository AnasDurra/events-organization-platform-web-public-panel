import { useEffect, useState } from 'react';
import { Col, Row, Button, Space, Input, Empty, Menu, Dropdown, DatePicker, Spin } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useOrgEventsQuery } from '../orgSlice.js';
import EventItem from './EventItem.jsx';

const OrgEvents = () => {
    const navigate = useNavigate();

    const { data: orgEvents, isLoading: isOrgEventsLoading } = useOrgEventsQuery();

    const [filteredEvents, setFilteredEvents] = useState(null);
    const [searchType, setSearchType] = useState('name');

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
                            <Col key={event?.event_id} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                                <EventItem event={event} />
                            </Col>
                        ))
                    )}
                </Row>
            </Spin>
        </div>
        
    );
};

export default OrgEvents;
