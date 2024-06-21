import { Modal, Typography, Space, Button, Divider, Row, Col, theme, Image, Spin } from 'antd';
import { Icon } from '@iconify/react';

import { useAttendanceQrCodeQuery } from '../../../../api/services/attendance';
import moment from 'moment';

const { Text, Title } = Typography;

const ShowAttendeeQrCode = ({ isVisible, onClose, attendeeInfo, eventInfo }) => {
    const { token } = theme.useToken();

    console.log(eventInfo);
    const { data: attendeeQrCode, isLoading: isAttendeeQrCodeLoading } = useAttendanceQrCodeQuery(eventInfo?.id);

    const downloadQRCode = () => {
        const base64Image = attendeeQrCode?.result?.code;
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                            <Spin spinning={isAttendeeQrCodeLoading}>
                                <Image
                                    src={attendeeQrCode?.result?.code}
                                    width={250}
                                    style={{ marginBottom: '15px' }}
                                />
                            </Spin>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 12 }} style={{ display: 'flex', alignItems: 'center' }}>
                        <Space size={10} direction='vertical'>
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
                </Row>
            </Space>
        </Modal>
    );
};

export default ShowAttendeeQrCode;
