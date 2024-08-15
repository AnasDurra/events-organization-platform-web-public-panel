import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Image, Space, Typography, Divider, Spin, Button, Empty } from 'antd';
const { Meta } = Card;
import { DatePicker } from 'antd';
// import 'antd/dist/antd.css'; // Import Ant Design styles

import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { useShowAttendeeEventsQuery } from '../../api/services/attendeeProfile';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { URL } from '../../api/constants';
const AttendeeEvents = () => {
    const { data, isLoading } = useShowAttendeeEventsQuery();
    const [filteredEvents, setFilteredEvents] = useState(null);

    const navigate = useNavigate();
    const [selectedRange, setSelectedRange] = useState(null);

    const handleDateChange = (dates, dateStrings) => {
        if (dateStrings[0] == '' && dateStrings[1] == '') {
            setSelectedRange(null);
            setFilteredEvents(data?.result);
        }
        if (dateStrings[0] == '' || dateStrings[1] == '') {
            setSelectedRange(null);
        } else {
            setSelectedRange(dateStrings);

            const startDate = dateStrings[0];
            const endDate = dateStrings[1];

            const tempFilteredEvents = data?.result?.filter((event) => {
                console.log('comparing ', startDate, ' with ', event?.event?.days[0]?.dayDate);

                return event?.event?.days[0]?.dayDate >= startDate && event?.event?.days[0]?.dayDate <= endDate;
            });
            setFilteredEvents(tempFilteredEvents);
        }
    };

    useEffect(() => {
        setFilteredEvents(data?.result);
    }, [data]);

    return (
        <div>
            <Button size='large' icon={<ArrowLeftOutlined />} type='text' onClick={() => navigate(-1)} />

            <Typography.Title level={3} style={{ textAlign: 'center' }}>
                My Events
            </Typography.Title>
            <Spin size='large' spinning={isLoading}>
                <div className='flex justify-center px-4 sm:px-4 sm:pb-6 lg:px-24 lg:pb-24'>
                    <Row gutter={[15, 15]}>
                        <Col style={{ marginTop: '20px' }} span={24}>
                            <Space style={{ width: '100%' }} direction='vertical' size={12}>
                                <label style={{ fontWeight: 'bold' }}>Select Date Range:</label>
                                <DatePicker.RangePicker
                                    style={{ width: '100%' }}
                                    disabled={data?.result?.length === 0}
                                    onChange={handleDateChange}
                                />
                                {selectedRange && (
                                    <div>
                                        Showing Events from{' '}
                                        <strong>{moment(selectedRange[0]).format('MMMM Do, YYYY')}</strong> to{' '}
                                        <strong>{moment(selectedRange[1]).format('MMMM Do, YYYY')}</strong>
                                    </div>
                                )}
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Divider style={{ margin: '12px' }} />
                        </Col>
                        {data?.result?.length === 0 && (
                            <Typography.Text
                                style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#666' }}
                            >
                                You haven't attended any events yet. Keep an eye out for upcoming events tailored just
                                for you!
                            </Typography.Text>
                        )}
                        {filteredEvents?.map((event) => (
                            <Col
                                key={event.event.id}
                                xs={24}
                                sm={12}
                                md={8}
                                lg={8}
                                style={{ padding: '12px', width: '100%', display: 'flex', justifyContent: 'center' }}
                            >
                                <Card
                                    bordered={false}
                                    hoverable
                                    size='small'
                                    cover={
                                        <Image
                                            preview={false}
                                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                            src={`${URL}${event?.event?.coverPictureUrl}`.replace('/api/', '/')}
                                        />
                                    }
                                    style={{ width: '100%' }}
                                    onClick={() => {
                                        navigate(`/event/show/${event?.event?.id}`);
                                    }}
                                >
                                    <Meta
                                        description={
                                            <Typography.Text style={{ fontWeight: 'bold' }}>
                                                {event?.status === 'accepted' && (
                                                    <span
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#52c41a',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {event.status}
                                                    </span>
                                                )}
                                                {event?.status === 'waiting' && (
                                                    <span
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#faad14',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {event.status}
                                                    </span>
                                                )}
                                                {event?.status === 'rejected' && (
                                                    <span
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#f5222d',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {event.status}
                                                    </span>
                                                )}
                                            </Typography.Text>
                                        }
                                    />
                                    <Space size={20} style={{ marginTop: '10px' }}>
                                        <Space
                                            align='center'
                                            size={10}
                                            direction='vertical'
                                            style={{ minWidth: '2em' }}
                                        >
                                            <Typography.Text
                                                style={{ color: 'red', fontSize: '13px', fontWeight: 'bold' }}
                                            >
                                                {getMonthAndDay(event.event.days[0].dayDate).month}
                                            </Typography.Text>
                                            <Typography.Text strong style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                {getMonthAndDay(event.event.days[0].dayDate).day}
                                            </Typography.Text>
                                        </Space>

                                        <Space direction='vertical'>
                                            <Typography.Text style={{ fontSize: '13px' }}>
                                                ({event.event.eventType})
                                            </Typography.Text>
                                            <Typography.Text strong>{event.event.title}</Typography.Text>
                                        </Space>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
                        <Col span={24}>
                            {data?.result?.length == 0 ? (
                                <Empty description="You don't have any events at the moment. Keep an eye out for upcoming opportunities or explore other events that might interest you!" />
                            ) : (
                                filteredEvents?.length == 0 && (
                                    <Empty description='No events found. It looks like there are no events that match your current criteria. Please adjust your filters.' />
                                )
                            )}
                        </Col>
                    </Row>
                </div>
            </Spin>
        </div>
    );
};

export default AttendeeEvents;

function getMonthAndDay(dateString) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const dayOfMonth = date.getDate();

    const monthAbbreviation = months[monthIndex];

    return {
        month: monthAbbreviation,
        day: dayOfMonth,
    };
}
