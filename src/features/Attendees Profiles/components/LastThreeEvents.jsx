// src/components/LastThreeEvents.jsx

import React from 'react';
import { List, Avatar, Typography, Image, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import './LastThreeEvents.css';

const { Title, Text } = Typography;

const LastThreeEvents = ({ events }) => {
    // Sort events by registration_end_date and slice the last 3 events
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
                    <List.Item className='list-item'>
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
                                        <span>{event.organization.name}</span>
                                        <span>{event.description}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default LastThreeEvents;
