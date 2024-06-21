/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Modal, Select, Table, Button, Spin, Avatar, Descriptions, Tag, Divider, Popover } from 'antd';
import './QrStyles.css';
import { useShowQuery } from '../../api/services/events';
import { useAttendeesListQuery, useConfirmAttendanceMutation } from '../../api/services/attendance';
import Title from 'antd/es/typography/Title';
import { useNotification } from '../../utils/NotificationContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import moment from 'moment';

const { Option } = Select;

const AttendeesModal = ({ visible, onClose, eventId }) => {
    const { openNotification } = useNotification();
    const { data: eventData, isLoading: eventDataIsLoading } = useShowQuery(eventId);
    const [selectedDay, setSelectedDay] = useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (eventData?.result?.days) {
            const todayEvent = eventData.result.days.find((day) => day.day_date === today);
            if (todayEvent) {
                setSelectedDay(todayEvent.id);
            }
        }
    }, [eventData]);

    const {
        data: attendeesData,
        isLoading: attendeesLoading,
        refetch: fetchAttendees,
        error,
    } = useAttendeesListQuery(
        { event_day_id: selectedDay, page: pagination.current, pageSize: pagination.pageSize },
        { skip: !selectedDay }
    );

    const [confirmAttendance, { loading: isConfirmAttendanceLoading }] = useConfirmAttendanceMutation();

    const handleTableChange = (pagination) => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    const handleConfirmAttendance = (id) => {
        Modal.confirm({
            title: 'Confirm Attendance',
            content: 'Are you sure you want to confirm this attendee’s attendance?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                confirmAttendance(id)
                    .unwrap()
                    .then((res) => {
                        openNotification('success', 'Attendance has been confirmed successfully!');
                    })
                    .catch((error) => {
                        openNotification('warning', error?.data?.message || 'Failed to confirm attendance');
                        console.error('Error:', error);
                    });
            },
        });
    };

    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (text, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={record.profile_image} size='large' style={{ marginRight: 8 }} />
                    <span>{record.full_name}</span>
                </div>
            ),
            width: 200,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            width: 100,
            render: (text) => (text ? text : 'N/A'),
        },
        {
            title: 'Attendance Status',
            dataIndex: 'attendance_status',
            key: 'attendance_status',
            width: 110,
        },
        {
            title: 'Last Reviewed',
            dataIndex: 'last_review',
            key: 'last_review',
            render: (text) => (text ? moment(text).format('MMMM Do YYYY, h:mm:ss a') : 'N/A'),
            width: 100,
        },
        {
            title: 'Reviewed By',
            dataIndex: 'checked_by',
            key: 'checked_by',
            width: 100,
            render: (text, record) => (
                <Popover
                    content={
                        <Descriptions size='small' column={1} bordered>
                            <Descriptions.Item label='Name'>
                                {record.checked_by.employee.first_name} {record.checked_by.employee.last_name}
                            </Descriptions.Item>
                            <Descriptions.Item label='Email'>{record.checked_by.user_email}</Descriptions.Item>
                            <Descriptions.Item label='Phone'>
                                {record.checked_by.employee.phone_number}
                            </Descriptions.Item>
                            <Descriptions.Item label='Role'>{record.checked_by.user_role.role_name}</Descriptions.Item>
                        </Descriptions>
                    }
                    title='Employee Info'
                    trigger='hover'
                >
                    <span style={{ cursor: 'pointer', color: '#1890ff' }}>@{record.checked_by.username}</span>
                </Popover>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button
                    type='primary'
                    onClick={() => handleConfirmAttendance(record.key)}
                    disabled={
                        (selectedDay &&
                            eventData?.result?.days.find((day) => day.id === selectedDay)?.day_date !== today) ||
                        record.checked_by
                    }
                >
                    {record?.checked_by ? 'Confirmed' : 'Confirm'}
                </Button>
            ),
        },
    ];

    const tableData = attendeesData?.result.data.map((item) => ({
        key: item.id,
        full_name: item.attendee.full_name,
        phone: item.attendee.phone_number,
        attendance_status: item.attendance_status,
        last_review: item.last_review,
        checked_by: item.checked_by,
        profile_image: item.attendee.profile_image || 'default-profile.png',
        attendee: item.attendee,
    }));

    useEffect(() => {
        if (selectedDay) {
            fetchAttendees();
        }
    }, [selectedDay, fetchAttendees, pagination]);

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon='arcticons:one-hand-operation' style={{ marginRight: '8px', fontSize: '32px' }} />
                    Manual Attendee Confirmation Modal
                </div>
            }
            width={800}
            footer={[
                <Button key='cancel' size='large' disabled={isConfirmAttendanceLoading} onClick={onClose}>
                    Back to events
                </Button>,
            ]}
            closable={false}
            destroyOnClose
            maskClosable={false}
            keyboard={false}
        >
            {eventDataIsLoading ? (
                <Spin size='large' />
            ) : (
                <div className='space-y-6'>
                    <Title level={2} className='page-title'>
                        {eventData?.result?.title}
                    </Title>

                    <Descriptions
                        title={<Title level={5}>Event Details</Title>}
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                    >
                        <Descriptions.Item label='Title'>{eventData?.result?.title}</Descriptions.Item>
                        <Descriptions.Item label='Organization'>
                            {eventData?.result?.organization?.name || 'N/A'}
                        </Descriptions.Item>
                        <Descriptions.Item label='Address'>{eventData?.result?.address?.label}</Descriptions.Item>
                        <Descriptions.Item label='Start Date'>
                            {moment(eventData?.result?.days[0]?.day_date).format('YYYY-MM-DD')}
                        </Descriptions.Item>
                        <Descriptions.Item label='End Date'>
                            {moment(eventData?.result?.days[eventData?.result?.days.length - 1]?.day_date).format(
                                'YYYY-MM-DD'
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label='Capacity'>{eventData?.result?.capacity}</Descriptions.Item>
                        <Descriptions.Item label='Event Type'>{eventData?.result?.event_type}</Descriptions.Item>
                        <Descriptions.Item label='Age Groups'>
                            {eventData?.result?.age_groups.map((age) => (
                                <Tag key={age.age_group_id}>{age.age_group_name}</Tag>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label='Tags'>
                            {eventData?.result?.tags.map((tag) => (
                                <Tag key={tag.event_tag_id}>{tag.tag.label}</Tag>
                            ))}
                        </Descriptions.Item>
                        <Descriptions.Item label='Chatting Enabled'>
                            {eventData?.result?.is_chatting_enabled ? 'Yes' : 'No'}
                        </Descriptions.Item>
                        {eventData?.result?.is_chatting_enabled && (
                            <Descriptions.Item label='Chat Group'>
                                {eventData?.result?.chat_group?.title} (Members:{' '}
                                {eventData?.result?.chat_group?.member_count})
                            </Descriptions.Item>
                        )}
                    </Descriptions>
                    <Divider />
                    <div className='flex flex-col space-y-4'>
                        <Title level={5}>Select Event Date:</Title>
                        <Select
                            placeholder='Select Event Date'
                            className='w-full'
                            onChange={setSelectedDay}
                            value={selectedDay}
                            style={{
                                borderColor:
                                    selectedDay &&
                                    eventData?.result?.days.find((day) => day.id === selectedDay)?.day_date === today
                                        ? 'green'
                                        : '',
                            }}
                        >
                            {eventData?.result?.days.map((day) => (
                                <Option key={day.id} value={day.id}>
                                    {moment(day.day_date).format('YYYY-MM-DD')}
                                    {day.day_date === today && <span className='text-green-500 ml-2'>(Today)</span>}
                                </Option>
                            ))}
                        </Select>
                        <div style={{ color: 'gray', fontSize: '12px', marginTop: '5px' }}>
                            Please select the date for which you want to view and manage attendees.
                        </div>
                    </div>

                    {selectedDay && (
                        <div>
                            {attendeesLoading ? (
                                <div className='flex justify-center items-center h-64'>
                                    <Spin size='large' />
                                </div>
                            ) : (
                                <Table
                                    dataSource={tableData}
                                    columns={columns}
                                    rowKey='key'
                                    pagination={{
                                        current: pagination.current,
                                        pageSize: pagination.pageSize,
                                        total: attendeesData?.result.meta_data.total,
                                        onChange: (page, pageSize) => {
                                            setPagination({ current: page, pageSize });
                                        },
                                    }}
                                    className='bg-white shadow rounded'
                                    scroll={{ x: 'max-content', y: 'max-content' }}
                                    style={{ overflowX: 'auto' }}
                                />
                            )}
                            <div style={{ color: 'gray', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
                                Click "Confirm" to mark an attendee as present. This action cannot be undone.
                            </div>
                        </div>
                    )}
                    <Divider />
                </div>
            )}
        </Modal>
    );
};

export default AttendeesModal;
