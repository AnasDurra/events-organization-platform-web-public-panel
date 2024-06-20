import React, { useEffect, useRef, useState } from 'react';
import { Card, message, Typography, Spin, Modal, Row, Col, Tag, Descriptions, Divider } from 'antd';
import QrScanner from 'qr-scanner';
import QrFrame from './qr-frame.svg';
import './QrStyles.css';
import { useShowQuery } from '../../api/services/events';
import { Icon } from '@iconify/react';
import AttendeeInfoModal from './AttendeeInfoModal';

const { Title, Text, Paragraph } = Typography;

const ScanQRCode = ({ visible, setIsScanQrModalVisible, onClose, event }) => {
    const { data: eventData, isLoading: eventDataIsLoading, isFetching } = useShowQuery(event?.event_id);

    const scanner = useRef(null);
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);
    const [scannedResult, setScannedResult] = useState('');
    const [isReading, setIsReading] = useState(false);

    const [isAttendeeInfoModalVisible, setIsAttendeeInfoModalVisible] = useState(false);

    const onScanSuccess = (result) => {
        console.log(result);
        setScannedResult(result?.data);
        setIsReading(false);
        setIsAttendeeInfoModalVisible(true);
        setIsScanQrModalVisible(false);
        // message.success('QR Code scanned successfully!');
    };

    const onScanFail = (err) => {
        console.error(err);
        // message.error('Error scanning QR code. Please try again.');
        setIsReading(false);
    };

    const onAttendeeInfoModalClose = () => {
        setIsAttendeeInfoModalVisible(false);
        setIsScanQrModalVisible(true);
    };

    useEffect(() => {
        if (videoEl.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: 'environment',
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl.current || undefined,
            });

            scanner.current
                .start()
                .then(() => {
                    setQrOn(true);
                })
                .catch((err) => {
                    console.error(err);
                    setQrOn(false);
                });
        }

        return () => {
            scanner.current?.stop();
        };
    }, [visible]);

    useEffect(() => {
        if (!qrOn) {
            alert('Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.');
        }
    }, [qrOn]);

    useEffect(() => {
        if (scannedResult) {
            setIsReading(true);
        }
    }, [scannedResult]);

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
                width={600}
                okButtonProps={{ hidden: true }}
                cancelText={'Back to events'}
                cancelButtonProps={{ size: 'large' }}
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
                                                <div className='qr-reader-wrapper'>
                                                    <video ref={videoEl} className='qr-video'></video>
                                                    <div ref={qrBoxEl} className='qr-box'>
                                                        <img src={QrFrame} alt='Qr Frame' className='qr-frame' />
                                                    </div>
                                                    {isReading && <Spin className='scanning-spinner' />}
                                                </div>
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

                                        <Descriptions.Item label='Address'>
                                            {eventData?.result?.address?.label}
                                        </Descriptions.Item>
                                        <Descriptions.Item label='Address Notes'>
                                            {eventData?.result?.address_notes}
                                        </Descriptions.Item>
                                        <Descriptions.Item label='Start Date'>
                                            {new Date(eventData?.result?.registration_start_date).toLocaleString()}
                                        </Descriptions.Item>
                                        <Descriptions.Item label='End Date'>
                                            {new Date(eventData?.result?.registration_end_date).toLocaleString()}
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
            <AttendeeInfoModal
                scannedResult={scannedResult}
                visible={isAttendeeInfoModalVisible}
                onClose={onAttendeeInfoModalClose}
            />
        </>
    );
};

export default ScanQRCode;
