import React, { useState } from 'react';
import { Table, List, Input, Button, Typography, Tag, Space } from 'antd';
import './OrgAttendees.css';
import { ArrowLeftOutlined, DollarOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

const OrgAttendees = () => {
    const navigate = useNavigate();
    // Fake data
    const [searchText, setSearchText] = useState('');
    const data = [
        {
            status: true,
            path: '/api/organization/attendees',
            statusCode: 200,
            result: [
                {
                    id: '4',
                    firstName: 'hadi',
                    lastName: 'ba',
                    events: [
                        {
                            id: '2',
                            title: 'dasd',
                            description: 'dsadas',
                            organization: {
                                id: '1',
                            },
                            payedFees: 300,
                        },
                        {
                            id: '3',
                            title: 'dasd',
                            description: 'dsadas',
                            organization: {
                                id: '1',
                            },
                            payedFees: 300,
                        },
                        {
                            id: '4',
                            title: 'dasd',
                            description: 'dsadas',
                            organization: {
                                id: '1',
                            },
                            payedFees: 300,
                        },
                    ],
                    totalFees: 0,
                },
                {
                    id: '19',
                    firstName: 'Anas',
                    lastName: 'Rish',
                    events: [
                        {
                            id: '2',
                            title: 'dasd',
                            description: 'dsadas',
                            organization: {
                                id: '1',
                            },
                            payedFees: 0,
                        },
                    ],
                    totalFees: 50,
                },
            ],
        },
    ];

    const handleEventClick = (eventId) => {
        navigate(`/event/show/${eventId}`);
    };

    const filteredAttendees = data[0].result.filter(
        (attendee) =>
            attendee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            attendee.lastName.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = (value) => {
        setSearchText(value);
    };

    return (
        <div className='org-attendees-container'>
            <Button size='large' icon={<ArrowLeftOutlined />} type='text' onClick={() => navigate(-1)} />
            <Typography.Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>
                Organization Attendees
            </Typography.Title>

            <Input.Search
                className='org-attendees-search'
                placeholder='Search by name'
                enterButton
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Table
                rowKey='id'
                pagination={false}
                dataSource={filteredAttendees}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        width: 100,
                        align: 'center',
                    },
                    {
                        title: 'Attendee Name',
                        dataIndex: 'name',
                        key: 'name',
                        render: (text, record) => (
                            <span
                                style={{ fontWeight: 'bold', cursor: 'pointer' }}
                                onClick={() => navigate(`/attendee-profile/${record.id}`)}
                                className='hoverable-name'
                            >
                                {`${record.firstName} ${record.lastName}`}
                            </span>
                        ),
                        width: 200,
                    },
                    {
                        title: 'Events',
                        dataIndex: 'events',
                        key: 'events',
                        render: (events) => (
                            <List
                                size='small'
                                dataSource={events}
                                renderItem={(event) => (
                                    <List.Item
                                        key={event?.id}
                                        onClick={() => handleEventClick(event.id)}
                                        className='event-item'
                                    >
                                        <List.Item.Meta
                                            key={event?.id}
                                            title={event.title}
                                            description={
                                                <Space direction='vertical'>
                                                    {event.description}

                                                    <Tag
                                                        style={{ fontSize: '10px' }}
                                                        icon={<DollarOutlined />}
                                                        color={event.payedFees > 0 ? 'green' : 'red'}
                                                    >
                                                        Payed Fees: {event.payedFees}
                                                    </Tag>
                                                </Space>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        ),
                    },
                    {
                        title: 'Total Fees',
                        dataIndex: 'totalFees',
                        key: 'totalFees',
                        align: 'center',
                        width: 150,
                    },
                ]}
                bordered
                className='org-attendees-table'
                scroll={{ x: 600, y: false }}
            />
        </div>
    );
};

export default OrgAttendees;
