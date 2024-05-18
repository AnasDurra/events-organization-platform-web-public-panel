import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Image, Space, Typography, Divider, Spin, Button } from 'antd';
const { Meta } = Card;
import { DatePicker } from 'antd';
// import 'antd/dist/antd.css'; // Import Ant Design styles

import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { useShowAttendeeEventsQuery } from '../../api/services/attendeeProfile';
import { ArrowLeftOutlined } from '@ant-design/icons';
const AttendeeEvents = () => {
    const { data, error, isLoading } = useShowAttendeeEventsQuery();
    // const data = {
    //     status: true,
    //     path: '/api/attendee/events',
    //     statusCode: 200,
    //     result: [
    //         {
    //             id: '6',
    //             createdAt: '2024-03-30T00:15:02.526Z',
    //             updatedAt: '2024-03-30T00:28:15.349Z',
    //             deletedAt: null,
    //             status: 'accepted',
    //             event: {
    //                 organization: {
    //                     name: 'ORG1',
    //                     bio: null,
    //                     description: null,
    //                 },
    //                 location: {
    //                     latitude: '38.2451',
    //                     longitude: '-52.0364',
    //                 },
    //                 address: null,
    //                 address_notes: 'in the old street(updated)',
    //                 title: 'The Future of AI',
    //                 cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1711787472208-885641970.jpg',
    //                 description: 'this is an event about artificial intelligence',
    //                 capacity: 32,
    //                 event_type: 'online',
    //                 registration_start_date: '2024-04-01 12:25:00',
    //                 registration_end_date: '2024-04-10 12:30:00',
    //                 age_groups: [
    //                     {
    //                         event_age_group_id: '33',
    //                         age_group_id: '3',
    //                         age_group_name: '18 - 25',
    //                     },
    //                     {
    //                         event_age_group_id: '34',
    //                         age_group_id: '1',
    //                         age_group_name: '5 - 12',
    //                     },
    //                 ],
    //                 tags: [
    //                     {
    //                         event_tag_id: '64',
    //                         tag: {
    //                             value: '1',
    //                             label: 'IT',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '65',
    //                         tag: {
    //                             value: '2',
    //                             label: 'Design',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '66',
    //                         tag: {
    //                             value: '3',
    //                             label: 'Programming',
    //                         },
    //                     },
    //                 ],
    //                 days: [
    //                     {
    //                         day_date: '2024-01-02',
    //                         slots: [
    //                             {
    //                                 label: 'Introduction',
    //                                 start_time: '2024-02-01 12:23:00',
    //                                 end_time: '2024-02-01 15:23:00',
    //                                 slot_status: {
    //                                     value: '1',
    //                                     label: 'Pending',
    //                                 },
    //                             },
    //                         ],
    //                     },
    //                 ],
    //                 photos: null,
    //                 attachments: null,
    //                 approval_statuses: null,
    //             },
    //         },
    //         {
    //             id: '6',
    //             createdAt: '2024-03-30T00:15:02.526Z',
    //             updatedAt: '2024-03-30T00:28:15.349Z',
    //             deletedAt: null,
    //             status: 'accepted',
    //             event: {
    //                 organization: {
    //                     name: 'ORG1',
    //                     bio: null,
    //                     description: null,
    //                 },
    //                 location: {
    //                     latitude: '38.2451',
    //                     longitude: '-52.0364',
    //                 },
    //                 address: null,
    //                 address_notes: 'in the old street(updated)',
    //                 title: 'The Future of AI',
    //                 cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1711787472208-885641970.jpg',
    //                 description: 'this is an event about artificial intelligence',
    //                 capacity: 32,
    //                 event_type: 'online',
    //                 registration_start_date: '2024-04-01 12:25:00',
    //                 registration_end_date: '2024-04-10 12:30:00',
    //                 age_groups: [
    //                     {
    //                         event_age_group_id: '33',
    //                         age_group_id: '3',
    //                         age_group_name: '18 - 25',
    //                     },
    //                     {
    //                         event_age_group_id: '34',
    //                         age_group_id: '1',
    //                         age_group_name: '5 - 12',
    //                     },
    //                 ],
    //                 tags: [
    //                     {
    //                         event_tag_id: '64',
    //                         tag: {
    //                             value: '1',
    //                             label: 'IT',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '65',
    //                         tag: {
    //                             value: '2',
    //                             label: 'Design',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '66',
    //                         tag: {
    //                             value: '3',
    //                             label: 'Programming',
    //                         },
    //                     },
    //                 ],
    //                 days: [
    //                     {
    //                         day_date: '2024-01-02',
    //                         slots: [
    //                             {
    //                                 label: 'Introduction',
    //                                 start_time: '2024-02-01 12:23:00',
    //                                 end_time: '2024-02-01 15:23:00',
    //                                 slot_status: {
    //                                     value: '1',
    //                                     label: 'Pending',
    //                                 },
    //                             },
    //                         ],
    //                     },
    //                 ],
    //                 photos: null,
    //                 attachments: null,
    //                 approval_statuses: null,
    //             },
    //         },
    //         {
    //             id: '6',
    //             createdAt: '2024-03-30T00:15:02.526Z',
    //             updatedAt: '2024-03-30T00:28:15.349Z',
    //             deletedAt: null,
    //             status: 'accepted',
    //             event: {
    //                 organization: {
    //                     name: 'ORG1',
    //                     bio: null,
    //                     description: null,
    //                 },
    //                 location: {
    //                     latitude: '38.2451',
    //                     longitude: '-52.0364',
    //                 },
    //                 address: null,
    //                 address_notes: 'in the old street(updated)',
    //                 title: 'The Future of AI',
    //                 cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1711787472208-885641970.jpg',
    //                 description: 'this is an event about artificial intelligence',
    //                 capacity: 32,
    //                 event_type: 'online',
    //                 registration_start_date: '2024-04-01 12:25:00',
    //                 registration_end_date: '2024-04-10 12:30:00',
    //                 age_groups: [
    //                     {
    //                         event_age_group_id: '33',
    //                         age_group_id: '3',
    //                         age_group_name: '18 - 25',
    //                     },
    //                     {
    //                         event_age_group_id: '34',
    //                         age_group_id: '1',
    //                         age_group_name: '5 - 12',
    //                     },
    //                 ],
    //                 tags: [
    //                     {
    //                         event_tag_id: '64',
    //                         tag: {
    //                             value: '1',
    //                             label: 'IT',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '65',
    //                         tag: {
    //                             value: '2',
    //                             label: 'Design',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '66',
    //                         tag: {
    //                             value: '3',
    //                             label: 'Programming',
    //                         },
    //                     },
    //                 ],
    //                 days: [
    //                     {
    //                         day_date: '2024-01-02',
    //                         slots: [
    //                             {
    //                                 label: 'Introduction',
    //                                 start_time: '2024-02-01 12:23:00',
    //                                 end_time: '2024-02-01 15:23:00',
    //                                 slot_status: {
    //                                     value: '1',
    //                                     label: 'Pending',
    //                                 },
    //                             },
    //                         ],
    //                     },
    //                 ],
    //                 photos: null,
    //                 attachments: null,
    //                 approval_statuses: null,
    //             },
    //         },
    //         {
    //             id: '6',
    //             createdAt: '2024-03-30T00:15:02.526Z',
    //             updatedAt: '2024-03-30T00:28:15.349Z',
    //             deletedAt: null,
    //             status: 'accepted',
    //             event: {
    //                 organization: {
    //                     name: 'ORG1',
    //                     bio: null,
    //                     description: null,
    //                 },
    //                 location: {
    //                     latitude: '38.2451',
    //                     longitude: '-52.0364',
    //                 },
    //                 address: null,
    //                 address_notes: 'in the old street(updated)',
    //                 title: 'The Future of AI',
    //                 cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1711787472208-885641970.jpg',
    //                 description: 'this is an event about artificial intelligence',
    //                 capacity: 32,
    //                 event_type: 'online',
    //                 registration_start_date: '2024-04-01 12:25:00',
    //                 registration_end_date: '2024-04-10 12:30:00',
    //                 age_groups: [
    //                     {
    //                         event_age_group_id: '33',
    //                         age_group_id: '3',
    //                         age_group_name: '18 - 25',
    //                     },
    //                     {
    //                         event_age_group_id: '34',
    //                         age_group_id: '1',
    //                         age_group_name: '5 - 12',
    //                     },
    //                 ],
    //                 tags: [
    //                     {
    //                         event_tag_id: '64',
    //                         tag: {
    //                             value: '1',
    //                             label: 'IT',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '65',
    //                         tag: {
    //                             value: '2',
    //                             label: 'Design',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '66',
    //                         tag: {
    //                             value: '3',
    //                             label: 'Programming',
    //                         },
    //                     },
    //                 ],
    //                 days: [
    //                     {
    //                         day_date: '2024-01-02',
    //                         slots: [
    //                             {
    //                                 label: 'Introduction',
    //                                 start_time: '2024-02-01 12:23:00',
    //                                 end_time: '2024-02-01 15:23:00',
    //                                 slot_status: {
    //                                     value: '1',
    //                                     label: 'Pending',
    //                                 },
    //                             },
    //                         ],
    //                     },
    //                 ],
    //                 photos: null,
    //                 attachments: null,
    //                 approval_statuses: null,
    //             },
    //         },
    //         {
    //             id: '6',
    //             createdAt: '2024-03-30T00:15:02.526Z',
    //             updatedAt: '2024-03-30T00:28:15.349Z',
    //             deletedAt: null,
    //             status: 'accepted',
    //             event: {
    //                 organization: {
    //                     name: 'ORG1',
    //                     bio: null,
    //                     description: null,
    //                 },
    //                 location: {
    //                     latitude: '38.2451',
    //                     longitude: '-52.0364',
    //                 },
    //                 address: null,
    //                 address_notes: 'in the old street(updated)',
    //                 title: 'The Future of AI',
    //                 cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1711787472208-885641970.jpg',
    //                 description: 'this is an event about artificial intelligence',
    //                 capacity: 32,
    //                 event_type: 'online',
    //                 registration_start_date: '2024-04-01 12:25:00',
    //                 registration_end_date: '2024-04-10 12:30:00',
    //                 age_groups: [
    //                     {
    //                         event_age_group_id: '33',
    //                         age_group_id: '3',
    //                         age_group_name: '18 - 25',
    //                     },
    //                     {
    //                         event_age_group_id: '34',
    //                         age_group_id: '1',
    //                         age_group_name: '5 - 12',
    //                     },
    //                 ],
    //                 tags: [
    //                     {
    //                         event_tag_id: '64',
    //                         tag: {
    //                             value: '1',
    //                             label: 'IT',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '65',
    //                         tag: {
    //                             value: '2',
    //                             label: 'Design',
    //                         },
    //                     },
    //                     {
    //                         event_tag_id: '66',
    //                         tag: {
    //                             value: '3',
    //                             label: 'Programming',
    //                         },
    //                     },
    //                 ],
    //                 days: [
    //                     {
    //                         day_date: '2024-01-02',
    //                         slots: [
    //                             {
    //                                 label: 'Introduction',
    //                                 start_time: '2024-02-01 12:23:00',
    //                                 end_time: '2024-02-01 15:23:00',
    //                                 slot_status: {
    //                                     value: '1',
    //                                     label: 'Pending',
    //                                 },
    //                             },
    //                         ],
    //                     },
    //                 ],
    //                 photos: null,
    //                 attachments: null,
    //                 approval_statuses: null,
    //             },
    //         },
    //     ],
    // };

    const navigate = useNavigate();
    const [selectedRange, setSelectedRange] = useState(null);

    const handleDateChange = (dates, dateStrings) => {
        if (dateStrings[0] == '' || dateStrings[1] == '') {
            setSelectedRange(null);
        } else {
            setSelectedRange(dateStrings);
        }
    };

    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div>
            <Col>
                <Button size="large" icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate(-1)} />
            </Col>
            <Typography.Title level={3} style={{ marginBottom: '20px', textAlign: 'center' }}>
                My Previous Events
            </Typography.Title>
            <Spin size="large" spinning={isLoading}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Row gutter={[36, 30]} style={{ display: 'flex', justifyContent: 'flex-start', width: '70%' }}>
                        <Col style={{ marginTop: '20px' }} span={24}>
                            <Space style={{ width: '100%' }} direction="vertical" size={12}>
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
                        {data?.result?.map((event) => (
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
                                    size="small"
                                    cover={
                                        <Image
                                            preview={false}
                                            style={{ width: '100%', height: '23vh' }}
                                            src="https://picsum.photos/400/400"
                                        />
                                    }
                                    style={{ width: '100%' }}
                                    onClick={() => {
                                        navigate(`/event/show/${event?.id}`);
                                    }}
                                >
                                    <Meta
                                        description={
                                            <Typography.Text style={{ fontWeight: 'bold' }}>
                                                {event?.status === 'accepted' && (
                                                    <span
                                                        style={{
                                                            fontSize: '13px',
                                                            color: '#52c41a',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                        }}
                                                    >
                                                        {event.status}
                                                    </span>
                                                )}
                                                {event?.status === 'waiting' && (
                                                    <span
                                                        style={{
                                                            fontSize: '13px',
                                                            color: '#faad14',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                        }}
                                                    >
                                                        {event.status}
                                                    </span>
                                                )}
                                                {event?.status === 'rejected' && (
                                                    <span
                                                        style={{
                                                            fontSize: '13px',
                                                            color: '#f5222d',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '1px',
                                                        }}
                                                    >
                                                        {event.status}
                                                    </span>
                                                )}
                                            </Typography.Text>
                                        }
                                    />
                                    <Space size={30} style={{ marginTop: '10px' }}>
                                        <Space align="center" size={0} direction="vertical">
                                            <Typography.Text style={{ color: 'red', fontSize: '13px' }}>
                                                {getMonthAndDay(event.event.days[0].dayDate).month}
                                            </Typography.Text>
                                            <Typography.Text strong style={{ fontSize: '18px' }}>
                                                {getMonthAndDay(event.event.days[0].dayDate).day}
                                                {console.log(event)}
                                            </Typography.Text>
                                        </Space>

                                        <Space direction="vertical">
                                            <Typography.Text style={{ fontSize: '13px' }}>
                                                ({event.event.eventType})
                                            </Typography.Text>
                                            <Typography.Text strong>{event.event.title}</Typography.Text>
                                        </Space>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
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
