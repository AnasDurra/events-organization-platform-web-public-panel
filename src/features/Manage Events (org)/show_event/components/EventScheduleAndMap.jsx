import { ArrowRightOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Card, Col, List, Row, Space, Typography } from 'antd';
import React from 'react';
import ShowMap from '../../ShowMap';
import moment from 'moment';

const EventScheduleAndMap = ({ days, address_notes, location }) => {
    return (
        <div style={{ position: 'sticky', top: 1 }}>
            <Row gutter={[30, 20]}>
                <Col xs={24}>
                    <Card
                        type='inner'
                        style={{
                            borderRadius: '8px',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#fafafa', //card
                            // backgroundColor: 'transparent', //card
                        }}
                    >
                        <Space direction='vertical' style={{ width: '100%' }} size={30}>
                            {days?.map((dateObj, index) => (
                                <Space
                                    direction='vertical'
                                    style={{
                                        width: '100%',
                                    }}
                                    size={10}
                                    key={index}
                                >
                                    <Space>
                                        <CalendarOutlined style={{ fontSize: '14px', color: '#A2A2A2' }} />
                                        <Typography.Text
                                            strong
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                            }}
                                        >
                                            {moment(dateObj.day_date).format('ddd, MMMM D, YYYY')}
                                        </Typography.Text>
                                    </Space>
                                    <List
                                        bordered
                                        dataSource={dateObj.slots}
                                        renderItem={(slot, i) => (
                                            <>
                                                <div
                                                    style={{
                                                        fontWeight: 'bold',
                                                        padding: '12px',
                                                    }}
                                                >
                                                    {slot.label}
                                                </div>
                                                <List.Item
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <div>
                                                        <Typography.Text>{formatDate(slot.start_time)}</Typography.Text>
                                                    </div>

                                                    <ArrowRightOutlined
                                                        style={{
                                                            margin: '0em 1em',
                                                        }}
                                                    />
                                                    <div>
                                                        <Typography.Text>{formatDate(slot.end_time)}</Typography.Text>
                                                    </div>
                                                </List.Item>
                                            </>
                                        )}
                                    />
                                </Space>
                            ))}
                            <Space style={{ width: '100%' }} direction='vertical' size={10}>
                                <Space>
                                    <EnvironmentOutlined style={{ fontSize: '14px', color: '#A2A2A2' }} />
                                    <Typography.Text>
                                        <strong>Address Note:</strong> {address_notes ?? 'No additional notes'}
                                    </Typography.Text>
                                </Space>
                            </Space>
                        </Space>
                    </Card>
                </Col>
                <Col span={24}>
                    <div style={{ marginTop: '-1.5em' }}>
                        {location?.latitude && (
                            <ShowMap
                                position={{
                                    lat: location?.latitude ? parseFloat(location.latitude) : 0,
                                    lng: location?.longitude ? parseFloat(location.longitude) : 0,
                                }}
                            />
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default EventScheduleAndMap;

function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return formattedTime;
}
