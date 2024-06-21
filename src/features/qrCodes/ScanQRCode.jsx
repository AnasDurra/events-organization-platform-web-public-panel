import { useState } from 'react';
import { Card, Typography, Spin, Modal, Row, Col, Tag, Descriptions, Divider } from 'antd';
import './QrStyles.css';
import { useShowQuery } from '../../api/services/events';
import { Icon } from '@iconify/react';

import ScanQrPlacement from './ScanQrPlacement';
import moment from 'moment';
import { useNotification } from '../../utils/NotificationContext';

const { Title, Text } = Typography;

const ScanQRCode = ({
    visible,
    onClose,
    event,
    setScannedResult,
    setIsAttendeeInfoModalVisible,
    setIsScanQrModalVisible,
}) => {
    const { openNotification } = useNotification();

    const { data: eventData, isLoading: eventDataIsLoading, isFetching } = useShowQuery(event?.event_id);

    const onScanFail = (err) => {
        // console.log(err);
    };

    const onScanSuccess = (result) => {
        const urlParams = new URLSearchParams(new URL(result).search);
        const scannedEventId = urlParams.get('eventId');

        if (scannedEventId === String(event?.event_id)) {
            setScannedResult(result);
            setIsAttendeeInfoModalVisible(true);
            setIsScanQrModalVisible(false);
        } else {
            openNotification(
                'info',
                'The QR code you tried to scan is not for this event. Please check the event details and try again.'
            );
        }
    };

    return (
        <>
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon='mdi:qrcode-scan' style={{ marginRight: '8px', fontSize: '24px' }} /> QR Code
                        Attendance Scanner
                    </div>
                }
                open={visible}
                onOk={onClose}
                onCancel={onClose}
                width={650}
                okButtonProps={{ hidden: true }}
                cancelText={'Back to events'}
                cancelButtonProps={{ size: 'large' }}
                destroyOnClose
                closable={false}
                maskClosable={false}
                keyboard={false}
            >
                <div className='qr-reader-container'>
                    {eventDataIsLoading || isFetching ? (
                        <div className='loading-container'>
                            <Spin size='large' />
                        </div>
                    ) : (
                        <Row gutter={[20, 20]}>
                            <Divider style={{ margin: '0px' }} />
                            <Col span={24}>
                                <Row>
                                    <Col span={24}>
                                        <Title level={2} className='page-title'>
                                            {eventData?.result?.title}
                                        </Title>
                                    </Col>

                                    <Col span={24}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Card className='scanner-card' style={{ backgroundColor: '#f9f9f9' }}>
                                                <ScanQrPlacement
                                                    onScanSuccess={onScanSuccess}
                                                    onScanFailure={onScanFail}
                                                />
                                                <div style={{ padding: '10px', marginTop: '10px' }}>
                                                    <Text style={{ color: '#888', fontStyle: 'italic' }}>
                                                        Please ensure the QR code is clearly visible within the frame
                                                        and that there is sufficient lighting to facilitate accurate
                                                        scanning. If any issues arise, contact technical support for
                                                        assistance.
                                                    </Text>
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Divider style={{ margin: '0px' }} />

                            <Col span={24}>
                                <div className='event-details'>
                                    <Descriptions
                                        title='Event Details'
                                        bordered
                                        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                                    >
                                        <Descriptions.Item label='Title'>{eventData?.result?.title}</Descriptions.Item>
                                        <Descriptions.Item label='Organization'>
                                            {eventData?.result?.organization?.name || 'N/A'}
                                        </Descriptions.Item>
                                        <Descriptions.Item label='Address'>
                                            {eventData?.result?.address?.label}
                                        </Descriptions.Item>

                                        <Descriptions.Item label='Start Date'>
                                            {console.log(eventData?.result)}
                                            {moment(eventData?.result?.days[0]?.day_date).format('YYYY-MM-DD')}
                                        </Descriptions.Item>
                                        <Descriptions.Item label='End Date'>
                                            {moment(
                                                eventData?.result?.days[eventData?.result?.days.length - 1]?.day_date
                                            ).format('YYYY-MM-DD')}
                                        </Descriptions.Item>
                                        <Descriptions.Item label='Capacity'>
                                            {eventData?.result?.capacity}
                                        </Descriptions.Item>
                                        <Descriptions.Item label='Event Type'>
                                            {eventData?.result?.event_type}
                                        </Descriptions.Item>
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
                                </div>
                            </Col>
                            <Divider />
                        </Row>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default ScanQRCode;
