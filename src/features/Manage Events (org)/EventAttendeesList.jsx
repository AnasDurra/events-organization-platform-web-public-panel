import { CheckCircleOutlined, ExclamationCircleOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Empty, List, Modal, Space, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateSubmissionStatusMutation } from '../dynamic forms/dynamicFormsSlice';
import { useNotification } from '../../utils/NotificationContext';

const EventAttendeesList = ({ attendees, type }) => {
    const { openNotification } = useNotification();
    const navigate = useNavigate();
    const { id: eventID } = useParams();

    const [updateSubmissionStatus, { isLoading }] = useUpdateSubmissionStatusMutation();

    const [filteredAttendees, setFilteredAttendees] = useState(
        type === 'all' ? attendees : attendees?.filter((attendee) => attendee?.status === type)
    );
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleClick = (attendeeId) => {
        navigate(`/attendee-profile/${attendeeId}`);
    };

    useEffect(() => {
        setFilteredAttendees(type === 'all' ? attendees : attendees?.filter((attendee) => attendee?.status === type));
    }, [attendees, type]);

    return (
        <div>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <Typography.Text style={{ fontWeight: 'bold', marginRight: '8px' }}>
                    Total{' '}
                    <span
                        style={{
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            color:
                                type === 'waiting'
                                    ? '#bababa'
                                    : type === 'accepted'
                                    ? '#52c41a'
                                    : type === 'rejected'
                                    ? '#f5222d'
                                    : '#0056b3',
                        }}
                    >
                        {type !== 'all' ? type : ''}
                    </span>{' '}
                    Attendees:
                </Typography.Text>
                <Typography.Text style={{ fontSize: '14px', color: '#1890ff' }}>
                    {filteredAttendees?.length ?? 0}
                </Typography.Text>
            </div>
            <List
                loading={isLoading}
                itemLayout='horizontal'
                dataSource={filteredAttendees}
                renderItem={(attendee, index) => (
                    <a
                        href='#'
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(attendee.attendee.id);
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                            display: 'block',
                            textDecoration: 'none',
                        }}
                    >
                        <List.Item
                            style={{
                                padding: '12px 0',
                                borderBottom: '1px solid #f0f0f0',
                                transition: 'background-color 0.3s',
                                backgroundColor: hoveredIndex === index ? '#f0f0f0' : 'inherit',
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={attendee.attendee.profilePictureUrl || '/default-avatar.jpg'}
                                        size={48}
                                    />
                                }
                                title={
                                    <div>
                                        <Typography.Text
                                            strong
                                        >{`${attendee.attendee.firstName} ${attendee.attendee.lastName}`}</Typography.Text>
                                        {attendee.status === 'accepted' && (
                                            <Badge
                                                status='success'
                                                text={
                                                    <Typography.Text
                                                        style={{
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textAlign: 'center',
                                                            color: '#52c41a',
                                                        }}
                                                    >
                                                        Accepted
                                                    </Typography.Text>
                                                }
                                                style={{
                                                    marginLeft: '10px',

                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                }}
                                            />
                                        )}
                                        {attendee.status === 'rejected' && (
                                            <Badge
                                                status='error'
                                                text={
                                                    <Typography.Text
                                                        style={{
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textAlign: 'center',
                                                            color: '#f5222d',
                                                        }}
                                                    >
                                                        Rejected
                                                    </Typography.Text>
                                                }
                                                style={{
                                                    marginLeft: '10px',

                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                }}
                                            />
                                        )}
                                        {attendee.status === 'waiting' && (
                                            <Badge
                                                status='default'
                                                text={
                                                    <Typography.Text
                                                        style={{
                                                            fontSize: '13px',
                                                            fontWeight: 'bold',
                                                            textAlign: 'center',
                                                            color: '#bababa',
                                                        }}
                                                    >
                                                        Waiting
                                                    </Typography.Text>
                                                }
                                                style={{
                                                    marginLeft: '10px',
                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                }}
                                            />
                                        )}
                                    </div>
                                }
                                description={
                                    <>
                                        <Typography.Text style={{ marginBottom: '4px', display: 'block' }}>
                                            {attendee.attendee.bio}
                                        </Typography.Text>
                                        <Typography.Text type='secondary'>
                                            Joined: {moment(attendee.createdAt).format('MMM DD, YYYY')}
                                        </Typography.Text>
                                    </>
                                }
                            />
                            {attendee.status === 'waiting' && (
                                <Space size={0}>
                                    <Button
                                        type='text'
                                        style={{ marginLeft: '0.5em' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Modal.confirm({
                                                title: 'Accept Action',
                                                icon: (
                                                    <Icon
                                                        icon='el:ok'
                                                        style={{
                                                            color: 'green',
                                                            fontSize: '24px',
                                                            marginRight: '0.5em',
                                                        }}
                                                    />
                                                ),
                                                content: 'Are you sure you want to accept this attendee?',
                                                onOk() {
                                                    updateSubmissionStatus({
                                                        event_id: parseInt(eventID),
                                                        attendee_id: parseInt(attendee?.attendee?.id),
                                                        status: 'accepted',
                                                    })
                                                        .then((res) => {
                                                            if (res.status === 201) {
                                                                openNotification(
                                                                    'success',
                                                                    `${
                                                                        attendee?.attendee?.firstName +
                                                                        ' ' +
                                                                        attendee?.attendee?.lastName
                                                                    } has been accepted successfully`
                                                                );
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            openNotification('warning', error.data.message);
                                                            console.error('Error:', error);
                                                        });
                                                },
                                            });
                                        }}
                                    >
                                        <Icon icon='el:ok' fontSize={'18px'} color='green' />
                                    </Button>
                                    <Button
                                        type='text'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Modal.confirm({
                                                title: 'Reject Action',
                                                icon: (
                                                    <Icon
                                                        icon='mdi:cancel-bold'
                                                        style={{ color: 'red', fontSize: '24px', marginRight: '0.5em' }}
                                                    />
                                                ),
                                                content: 'Are you sure you want to reject this attendee?',
                                                onOk() {
                                                    updateSubmissionStatus({
                                                        event_id: parseInt(eventID),
                                                        attendee_id: parseInt(attendee?.attendee?.id),
                                                        status: 'accepted',
                                                    })
                                                        .then((res) => {
                                                            if (res.status === 201) {
                                                                openNotification(
                                                                    'success',
                                                                    `${
                                                                        attendee?.attendee?.firstName +
                                                                        ' ' +
                                                                        attendee?.attendee?.lastName
                                                                    } has been rejected successfully`
                                                                );
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            openNotification('warning', error.data.message);
                                                            console.error('Error:', error);
                                                        });
                                                },
                                            });
                                        }}
                                    >
                                        <Icon icon='mdi:cancel-bold' fontSize={'18px'} color='red' />
                                    </Button>
                                </Space>
                            )}
                        </List.Item>
                    </a>
                )}
                locale={{
                    emptyText: (
                        <Empty
                            image={<UserOutlined style={{ fontSize: 48 }} />}
                            imageStyle={{ height: 60 }}
                            description={<span>No attendees found.</span>}
                        />
                    ),
                }}
            />
        </div>
    );
};

export default EventAttendeesList;
