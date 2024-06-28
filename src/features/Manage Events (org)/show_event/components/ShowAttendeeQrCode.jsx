import { Modal, Typography, Space, Button, Divider, Row, Col, theme, Image, Spin, Descriptions } from 'antd';
import { Icon } from '@iconify/react';
import { useAttendanceQrCodeQuery } from '../../../../api/services/attendance';
import moment from 'moment';
import { useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

const { Text, Title } = Typography;

const ShowAttendeeQrCode = ({ isVisible, onClose, eventInfo }) => {
    const { token } = theme.useToken();
    const { data: attendeeQrCode, isLoading: isAttendeeQrCodeLoading } = useAttendanceQrCodeQuery(eventInfo?.id);

    console.log(eventInfo);

    const downloadTicket = () => {
        const node = document.getElementById('ticket-modal');
        htmlToImage
            .toPng(node)
            .then((dataUrl) => {
                download(dataUrl, 'ticket.png');
            })
            .catch((error) => {
                console.error('Oops, something went wrong!', error);
            });
    };

    useEffect(() => {
        console.log(attendeeQrCode);
    }, [attendeeQrCode]);

    return (
        <Modal
            title={
                <Title level={3} style={{ marginBottom: 0 }}>
                    <Space>
                        <Icon icon='fxemoji:ticket' style={{ color: token.colorPrimary, fontSize: '32px' }} /> My Ticket
                    </Space>
                </Title>
            }
            open={isVisible}
            onCancel={onClose}
            footer={
                <Space>
                    <Button key='close' size='large' onClick={onClose}>
                        Close
                    </Button>
                    <Button key='download' size='large' onClick={downloadTicket} type='primary'>
                        <Space>
                            <Icon icon='line-md:download-outline-loop' style={{ fontSize: '24px' }} />
                            Download Ticket
                        </Space>
                    </Button>
                </Space>
            }
            width={600}
            centered
        >
            <Space
                id='ticket-modal'
                direction='vertical'
                size='large'
                style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Row gutter={[20, 10]}>
                    <Col span={24} style={{ padding: '0px' }}>
                        <div style={{ borderRadius: '8px' }}>
                            <Image
                                src={eventInfo?.cover_picture_url}
                                // style={{ borderRadius: '10px', left: 0, right: 0 }}
                                style={{
                                    borderRadius: '10px',
                                    left: 0,
                                    right: 0,
                                    width: '100%',
                                    height: '170px',
                                    objectFit: 'cover',
                                }}
                                preview={false}
                            />
                        </div>
                        <div>
                            <Title
                                level={2}
                                style={{
                                    margin: '20px 0',
                                    padding: '10px 20px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    textAlign: 'center',
                                    color: '#333',
                                }}
                            >
                                {eventInfo?.title}
                            </Title>
                            <Text style={{ fontSize: '14px', color: '#bbbbbb' }}>
                                By @{eventInfo?.organization?.name}
                            </Text>
                        </div>
                    </Col>
                    <Divider style={{ margin: '10px' }} />
                    <Col span={12}>
                        <Descriptions
                            // title={
                            //     <Title level={4} style={{ marginBottom: '16px', color: token.colorPrimary }}>
                            //         Event Information
                            //     </Title>
                            // }
                            column={1}
                        >
                            <Descriptions.Item labelStyle={{ color: token.colorPrimary }} label='Location'>
                                {eventInfo?.address?.label}
                            </Descriptions.Item>
                            <Descriptions.Item labelStyle={{ color: token.colorPrimary }} label='Date'>
                                {moment(eventInfo?.days[0]?.day_date).format('MMMM D, YYYY')}
                            </Descriptions.Item>
                            <Descriptions.Item labelStyle={{ color: token.colorPrimary }} label='Time'>
                                {moment(eventInfo?.days[0]?.slots[0]?.start_time).format('h:mm A')}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={12}>
                        <Descriptions
                            // title={
                            //     <Title level={4} style={{ marginBottom: '16px', color: token.colorPrimary }}>
                            //         Attendee Information
                            //     </Title>
                            // }
                            column={1}
                        >
                            <Descriptions.Item labelStyle={{ color: token.colorPrimary }} label='Name'>
                                {attendeeQrCode?.result?.attendee?.name}
                            </Descriptions.Item>
                            <Descriptions.Item labelStyle={{ color: token.colorPrimary }} label='Email'>
                                {attendeeQrCode?.result?.attendee?.email}
                            </Descriptions.Item>
                            <Descriptions.Item labelStyle={{ color: token.colorPrimary }} label='Ticket ID'>
                                {attendeeQrCode?.result?.attendee?.ticket_id}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>

                    <Divider style={{ margin: '10px' }} />
                    <Col xs={{ span: 24 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Space size={10} direction='vertical'>
                            <Text style={{ marginTop: '15px', color: '#888', fontStyle: 'italic' }}>SCAN QR-CODE</Text>
                        </Space>
                    </Col>
                    <Col xs={{ span: 24 }}>
                        <div id='myqrcode' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Spin spinning={isAttendeeQrCodeLoading}>
                                <Image
                                    src={attendeeQrCode?.result?.code}
                                    width={250}
                                    style={{ marginBottom: '15px', border: '1px solid #f0f0f0', borderRadius: '4px' }}
                                    preview={false}
                                />
                            </Spin>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Space size={10} direction='vertical'>
                            <Text style={{ marginTop: '15px', color: '#888', fontStyle: 'italic' }}>
                                Welcome to the {eventInfo?.title}! Please download and save your ticket. Present this
                                ticket to the event staff for a smooth check-in process. Enjoy the event!
                            </Text>
                        </Space>
                    </Col>
                    <Divider style={{ margin: '10px' }} />
                </Row>
            </Space>
        </Modal>
    );
};

export default ShowAttendeeQrCode;
