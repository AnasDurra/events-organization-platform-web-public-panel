import React from 'react';
import { Modal, Typography, Space, Button, Divider, Row, Col, theme } from 'antd';
import QRCode from 'qrcode.react';
import { Icon } from '@iconify/react';

const { Text, Title } = Typography;

const ShowAttendeeQrCode = ({ isVisible, onClose, attendeeInfo, eventInfo }) => {
    const { token } = theme.useToken();
    const qrValue = `Attendee: ${attendeeInfo.name}, Email: ${attendeeInfo.email}, Ticket ID: ${attendeeInfo.ticketId}`;

    const downloadQRCode = () => {
        const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = 'QRCode.png';
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <Modal
            title={
                <Title level={3} style={{ marginBottom: 0 }}>
                    Attendee Information
                </Title>
            }
            open={isVisible}
            onCancel={onClose}
            footer={
                <Button key='close' size='large' onClick={onClose} type='primary' style={{ alignSelf: 'center' }}>
                    Close
                </Button>
            }
            centered
        >
            <Space direction='vertical' size='large' style={{ width: '100%', textAlign: 'center', padding: '12px' }}>
                <Row gutter={20}>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                        <div id='myqrcode' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <QRCode value={qrValue} size={200} style={{ marginBottom: '15px' }} />
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} style={{ display: 'flex', alignItems: 'center' }}>
                        <Space size={30} direction='vertical'>
                            <Button type='primary' size='large' onClick={downloadQRCode}>
                                <Space size={10}>
                                    <Icon icon='line-md:downloading-loop' style={{ fontSize: '28px' }} />
                                    Download QR Code
                                </Space>
                            </Button>
                            <Text style={{ marginTop: '15px', color: '#888', fontStyle: 'italic' }}>
                                Please take this QR code with you or open it in the application when you attend the
                                event.
                            </Text>
                        </Space>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <div style={{ textAlign: 'left', width: '100%' }}>
                            <Title level={4} style={{ marginBottom: '16px', color: token.colorPrimary }}>
                                Attendee Information
                            </Title>
                            <Text strong>Name: </Text> <Text>{attendeeInfo.name}</Text>
                            <br />
                            <Text strong>Email: </Text> <Text>{attendeeInfo.email}</Text>
                            <br />
                            <Text strong>Ticket ID: </Text> <Text>{attendeeInfo.ticketId}</Text>
                        </div>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <div style={{ textAlign: 'left', width: '100%' }}>
                            <Title level={4} style={{ marginBottom: '16px', color: token.colorPrimary }}>
                                Event Information
                            </Title>
                            <Text strong>Title: </Text> <Text>{eventInfo.title}</Text>
                            <br />
                            <Text strong>Date: </Text> <Text>{eventInfo.date}</Text>
                            <br />
                            <Text strong>Time: </Text> <Text>{eventInfo.time}</Text>
                            <br />
                            <Text strong>Location: </Text> <Text>{eventInfo.location}</Text>
                        </div>
                        <Divider />
                    </Col>
                </Row>
            </Space>
        </Modal>
    );
};

export default ShowAttendeeQrCode;
