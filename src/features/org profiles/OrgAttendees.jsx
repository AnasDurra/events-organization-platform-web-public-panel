import React, { useEffect, useState } from 'react';
import { Table, List, Input, Button, Typography, Tag, Space } from 'antd';
import './OrgAttendees.css';
import { ArrowLeftOutlined, DollarOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { useOrganizationAttendeesQuery } from './orgSlice';

const OrgAttendees = () => {
    const {
        data: orgAttendees,
        isLoading: isorgAttendeesLoading,
        isFetching: isorgAttendeesFetching,
    } = useOrganizationAttendeesQuery();
    const navigate = useNavigate();
    const [filteredAttendees, setfilteredAttendees] = useState(null);

    const [searchText, setSearchText] = useState('');

    // const data = [
    //     {
    //         status: true,
    //         path: '/api/organization/attendees',
    //         statusCode: 200,
    //         result: [
    //             {
    //                 id: '4',
    //                 firstName: 'hadi',
    //                 lastName: 'ba',
    //                 profile_image: 'https://randomuser.me/api/portraits/men/3.jpg',
    //                 events: [
    //                     {
    //                         id: '2',
    //                         title: 'dasd',
    //                         description: 'dsadas',
    //                         organization: {
    //                             id: '1',
    //                         },
    //                         payedFees: 300,
    //                     },
    //                     {
    //                         id: '3',
    //                         title: 'dasd',
    //                         description: 'dsadas',
    //                         organization: {
    //                             id: '1',
    //                         },
    //                         payedFees: 300,
    //                     },
    //                     {
    //                         id: '4',
    //                         title: 'dasd',
    //                         description: 'dsadas',
    //                         organization: {
    //                             id: '1',
    //                         },
    //                         payedFees: 300,
    //                     },
    //                 ],
    //                 totalFees: 0,
    //             },
    //             {
    //                 id: '19',
    //                 firstName: 'Anas',
    //                 lastName: 'Rish',
    //                 profile_image: 'https://randomuser.me/api/portraits/men/2.jpg',
    //                 events: [
    //                     {
    //                         id: '2',
    //                         title: 'dasd',
    //                         description: 'dsadas',
    //                         organization: {
    //                             id: '1',
    //                         },
    //                         payedFees: 0,
    //                     },
    //                 ],
    //                 totalFees: 50,
    //             },
    //         ],
    //     },
    // ];

    const handleEventClick = (eventId) => {
        navigate(`/event/show/${eventId}`);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    useEffect(() => {
        console.log(orgAttendees);
        setfilteredAttendees(
            orgAttendees?.result?.filter(
                (attendee) =>
                    attendee.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
                    attendee.lastName.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [orgAttendees]);

    return (
        <div className='org-attendees-container'>
            <Button size='large' icon={<ArrowLeftOutlined />} type='text' onClick={() => navigate(-1)} />

            <Typography.Title
                level={1}
                style={{
                    color: '#343a40',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    marginBottom: '24px',
                    textAlign: 'center',

                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                }}
            >
                Organization Attendees
            </Typography.Title>

            <Input.Search
                className='org-attendees-search'
                placeholder='Search by name'
                enterButton
                onChange={(e) => handleSearch(e.target.value)}
                disabled={isorgAttendeesLoading}
            />
            <Table
                rowKey='id'
                pagination={false}
                dataSource={filteredAttendees}
                loading={isorgAttendeesLoading}
                bordered
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
                                style={{ fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                onClick={() => navigate(`/attendee-profile/${record.id}`)}
                                className='hoverable-name'
                            >
                                <img
                                    src={record.profile_image}
                                    // alt={`${record.firstName} ${record.lastName}`}
                                    style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        marginRight: '12px',
                                        objectFit: 'cover',
                                    }}
                                />
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
                className='org-attendees-table'
                scroll={{ x: 600, y: false }}
            />
        </div>
    );
};

export default OrgAttendees;
