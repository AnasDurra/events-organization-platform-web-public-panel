import { Modal, Typography, Space, Button, Divider, Row, Col, theme, Image, Spin } from 'antd';
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
                    Attendee Information
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
                        Download Ticket
                    </Button>
                </Space>
            }
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
                    <Col span={24}>
                        <div style={{ borderRadius: '8px', padding: '10px' }}>
                            <Image src={eventInfo?.cover_picture_url} style={{ borderRadius: '8px' }} preview={false} />
                        </div>
                        <div>
                            <Title level={3} style={{ margin: 0 }}>
                                {eventInfo?.title}
                            </Title>
                            <Text style={{ fontSize: '14px', color: '#bbbbbb' }}>
                                By @{eventInfo?.organization?.name}
                            </Text>
                        </div>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <div style={{ textAlign: 'left', width: '100%' }}>
                            <Title level={4} style={{ marginBottom: '16px', color: token.colorPrimary }}>
                                Attendee Information
                            </Title>
                            <Text strong>Name: </Text> <Text>{attendeeQrCode?.result?.attendee?.name}</Text>
                            <br />
                            <Text strong>Email: </Text> <Text>{attendeeQrCode?.result?.attendee?.email}</Text>
                            <br />
                            <Text strong>Ticket ID: </Text> <Text>{attendeeQrCode?.result?.attendee?.ticket_id}</Text>
                        </div>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <div style={{ textAlign: 'left', width: '100%' }}>
                            <Title level={4} style={{ marginBottom: '16px', color: token.colorPrimary }}>
                                Event Information
                            </Title>
                            <Text strong>Title: </Text> <Text>{eventInfo?.title}</Text>
                            <br />
                            <Text strong>Date: </Text>{' '}
                            <Text>{moment(eventInfo?.days[0]?.day_date).format('MMMM D, YYYY')}</Text>
                            <br />
                            <Text strong>Time: </Text>{' '}
                            <Text>{moment(eventInfo?.days[0]?.slots[0]?.start_time).format('h:mm A')}</Text>
                            <br />
                            <Text strong>Location: </Text> <Text>{eventInfo?.address?.label}</Text>
                        </div>
                        <Divider />
                    </Col>
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
                    <Divider />
                </Row>
            </Space>
        </Modal>
    );
};

export default ShowAttendeeQrCode;
