import { Icon } from '@iconify/react/dist/iconify.js';
import { Alert, Avatar, Col, Typography, Divider, Modal, Row, Spin, Button } from 'antd';
import { useCheckAttendanceRecordQuery, useConfirmAttendanceMutation } from '../../api/services/attendance';
import { useEffect } from 'react';

import './AttendeeInfoModal.css';
import { useNotification } from '../../utils/NotificationContext';
const { Title, Text } = Typography;

const AttendeeInfoModal = ({ scannedResult, visible, onClose }) => {
    const { openNotification } = useNotification();

    const { data, error, isLoading } = useCheckAttendanceRecordQuery(scannedResult);
    const [confirmAttendance, { isLoading: isConfirmAttendanceLoading }] = useConfirmAttendanceMutation();

    const handleCheckAttendance = () => {
        Modal.confirm({
            title: 'Confirm Attendance',
            content: 'Are you sure you want to confirm this attendee’s attendance?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                confirmAttendance(data?.result?.id)
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

    useEffect(() => {
        console.log(data);
        console.log(error);
    }, [data, error]);
    return (
        <Modal
            title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon='streamline:information-desk-solid' style={{ marginRight: '8px', fontSize: '24px' }} />{' '}
                    QR Code Attendance Scanner
                </div>
            }
            open={visible}
            onOk={onClose}
            onCancel={onClose}
            width={800}
            footer={[
                <Button key='cancel' size='large' disabled={isConfirmAttendanceLoading} onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key='check'
                    size='large'
                    loading={isConfirmAttendanceLoading}
                    type='primary'
                    onClick={handleCheckAttendance}
                    disabled={data?.result?.checked_by?.username}
                >
                    Check Attendance
                </Button>,
            ]}
            closable={false}
            destroyOnClose
            maskClosable={false}
            keyboard={false}
        >
            {isLoading ? (
                <Spin tip='Loading...' />
            ) : error ? (
                <Alert message='Error' description='Failed to load attendee information' type='error' showIcon />
            ) : (
                data && (
                    <div className='attendee-info-container'>
                        {/* <Divider style={{ marginTop: '0px' }} /> */}
                        <Title level={4} style={{ marginBottom: '16px' }}>
                            Attendee Information
                        </Title>
                        <div className='info-section'>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Text strong>Full Name:</Text>
                                    <Text className='info-text'>{data?.result?.attendee?.full_name}</Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text strong>Phone Number:</Text>
                                    <Text className='info-text'>{data?.result?.attendee?.phone_number}</Text>
                                </Col>
                                <Col xs={24}>
                                    <Text strong>Bio:</Text>
                                    <Text className='info-text'>{data?.result?.attendee?.bio}</Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text strong>Job:</Text>
                                    <Text className='info-text'>{data?.result?.attendee?.job?.label}</Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text strong>Address:</Text>
                                    <Text className='info-text'>{data?.result?.attendee?.address?.label}</Text>
                                </Col>
                            </Row>
                        </div>
                        <Divider />
                        <Title level={4} style={{ marginBottom: '16px' }}>
                            Event Information
                        </Title>
                        <div className='info-section'>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Text strong>Event Title:</Text>
                                    <Text className='info-text'>{data?.result?.event?.title}</Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text strong>Date:</Text>
                                    <Text className='info-text'>{data?.result?.event_day?.day_date}</Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text strong>Location:</Text>
                                    <Text className='info-text'>{data?.result?.event?.address?.label}</Text>
                                </Col>
                            </Row>
                        </div>
                        <Divider />
                        <Title level={4} style={{ marginBottom: '16px' }}>
                            Attendance Status
                        </Title>
                        <div className='info-section'>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Text strong>Status:</Text>
                                    <Text className='info-text'>{data?.result?.attendance_status}</Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text strong>Checked By:</Text>
                                    <Text className='info-text'>@{data?.result?.checked_by?.username || 'N/A'}</Text>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Text strong>Last Reviewed On:</Text>
                                    <Text className='info-text'>{data?.result?.last_review}</Text>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            )}
        </Modal>
    );
};

export default AttendeeInfoModal;
