// src/components/LastThreeEvents.jsx

import React from 'react';
import { List, Avatar, Typography, Image, Row, Col, Space, Popover } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import './LastThreeEvents.css';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { OrgPopoverContent } from '../../Manage Events (org)/show_event/components/EventCover';

const { Title, Text } = Typography;

const LastThreeEvents = ({ events }) => {
    const navigate = useNavigate();
    const sortedEvents = [...events].sort(
        (a, b) => new Date(b.registration_end_date) - new Date(a.registration_end_date)
    );
    const lastThreeEvents = sortedEvents.slice(0, 3);
    return (
        <div className='last-three-events-container'>
            <List
                itemLayout='horizontal'
                dataSource={lastThreeEvents}
                renderItem={(event) => (
                    <List.Item className='list-item' onClick={() => navigate(`/event/show/${event?.id}`)}>
                        <a>
                            <Row gutter={10} align={'middle'}>
                                <Col xs={24} sm={10} xl={8}>
                                    <img className='avatar-image' shape='square' src={event.cover_picture_url} />
                                </Col>
                                <Col xs={24} sm={14} xl={16}>
                                    <div className='list-content'>
                                        <Title level={4} className='list-item-meta-title'>
                                            {event.title}
                                        </Title>

                                        <div className='list-item-meta-description'>
                                            <span className='event-date'>
                                                <ClockCircleOutlined />{' '}
                                                {moment(event.registration_end_date).format('YYYY-MM-DD')}
                                            </span>
                                            <div style={{ fontSize: '14px', color: '#666', marginTop: '0.5em' }}>
                                                <Space>
                                                    <Icon icon='grommet-icons:organization' />
                                                    <span>
                                                        Hosted by:{' '}
                                                        <strong style={{ color: '#333' }}>
                                                            <Popover
                                                                content={
                                                                    <OrgPopoverContent
                                                                        organization={event?.organization}
                                                                    />
                                                                }
                                                                title='Organization Info'
                                                                mouseEnterDelay={1}
                                                            >
                                                                <Link
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                    }}
                                                                    to={`/org/${event?.organization?.id}`}
                                                                >
                                                                    @{event?.organization?.name}
                                                                </Link>
                                                            </Popover>
                                                        </strong>
                                                    </span>
                                                </Space>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </a>
                    </List.Item>
                )}
                locale={{
                    emptyText: 'No events attended in the last 3 events',
                }}
            />
        </div>
    );
};

export default LastThreeEvents;
