import React, { useState, useEffect } from 'react';
import { Modal, Select, Table, Button, Spin, Avatar, Descriptions, Tag, Divider } from 'antd';
import './QrStyles.css';
import { useShowQuery } from '../../api/services/events';
import { useAttendeesListQuery, useConfirmAttendanceMutation } from '../../api/services/attendance';
import Title from 'antd/es/typography/Title';
import { useNotification } from '../../utils/NotificationContext';
import { Icon } from '@iconify/react/dist/iconify.js';

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
                        console.log(res);
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
            title: 'Profile Image',
            dataIndex: 'profile_image',
            key: 'profile_image',
            render: (text, record) => <Avatar src={record.profile_image} size='large' />,
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Attendance Status',
            dataIndex: 'attendance_status',
            key: 'attendance_status',
        },
        {
            title: 'Last Reviewed',
            dataIndex: 'last_review',
            key: 'last_review',
            render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
        },
        {
            title: 'Reviewed By',
            dataIndex: 'checked_by',
            key: 'checked_by',
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
                    Confirm
                </Button>
            ),
        },
    ];

    const tableData = attendeesData?.result.data.map((item) => ({
        key: item.id,
        full_name: item.attendee.full_name,
        email: item.attendee.email,
        attendance_status: item.attendance_status,
        last_review: item.last_review,
        checked_by: '@' + item.checked_by.username || 'N/A',
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
                <div className='space-y-6' style={{ padding: '20px' }}>
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
                            {new Date(eventData?.result?.registration_start_date).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label='End Date'>
                            {new Date(eventData?.result?.registration_end_date).toLocaleString()}
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
                                    {new Date(day.day_date).toLocaleDateString()}
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
