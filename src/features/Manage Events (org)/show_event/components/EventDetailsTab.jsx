import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import { InfoCircleOutlined, ShareAltOutlined } from '@ant-design/icons';
import { getLoggedInUserV2 } from '../../../../api/services/auth';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import EventRegistratinInfoModal from './EventRegistratinInfoModal';
import EventDetails from './EventDetails';
import EventScheduleAndMap from './EventScheduleAndMap';

const EventDetailsTab = ({ eventData, handleRegisterClicked }) => {
    const [user] = useState(getLoggedInUserV2());

    const [isModalVisible, setIsModalVisible] = useState(false);

    const openRegisterationInfoModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Row gutter={[20, 50]} style={{ direction: 'revert' }}>
                <Col xs={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }} lg={{ span: 16, order: 1 }}>
                    <EventDetails
                        description={eventData?.result?.description}
                        tags={eventData?.result?.tags}
                        age_groups={eventData?.result?.age_groups}
                    />
                </Col>
                <Col xs={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} lg={{ span: 8, order: 2 }}>
                    <EventScheduleAndMap
                        days={eventData?.result?.days}
                        address_notes={eventData?.result?.address_notes}
                        location={eventData?.result?.location}
                    />
                </Col>

                {user?.user_role == 3 && (
                    <Col xs={{ span: 24, order: 3 }}>
                        <div
                            style={{
                                position: 'fixed',
                                bottom: 0,
                                width: '100%',
                                left: 1,
                                zIndex: 1,
                            }}
                        >
                            <Space
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    padding: '14px',
                                    border: '1px solid #e8e8e8',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <Space direction='vertical'>
                                    <Typography.Text strong style={{ fontSize: 16, color: '#333' }}>
                                        {moment(eventData?.result?.days[0]?.slots[0]?.start_time)
                                            .format('ddd , MMM D - h:mm A')
                                            .toUpperCase()}
                                    </Typography.Text>
                                    <Typography.Text style={{ fontSize: 18, color: '#1890ff' }}>
                                        {eventData?.result?.title}
                                    </Typography.Text>
                                </Space>

                                <Space size={40}>
                                    <Space direction='vertical'>
                                        <Typography.Text strong style={{ fontSize: 20, color: '#ff4d4f' }}>
                                            £12.50
                                        </Typography.Text>
                                        <Typography.Text style={{ fontSize: 14, color: '#666' }}>
                                            8 tickets left
                                        </Typography.Text>
                                    </Space>
                                    <Space size={10}>
                                        <Button
                                            icon={<ShareAltOutlined />}
                                            size='large'
                                            type='default'
                                            style={{ marginTop: 10, marginRight: 10 }}
                                        >
                                            Share
                                        </Button>
                                        <Button
                                            onClick={openRegisterationInfoModal}
                                            type='text'
                                            size='large'
                                            icon={<InfoCircleOutlined />}
                                            style={{ marginTop: 10 }}
                                        />

                                        <Button
                                            type='primary'
                                            size='large'
                                            style={{ marginTop: 10 }}
                                            onClick={handleRegisterClicked}
                                        >
                                            Attend
                                        </Button>
                                    </Space>
                                </Space>
                            </Space>
                        </div>
                        {/* </Affix> */}
                    </Col>
                )}
            </Row>
            <Modal title='Registration Information' open={isModalVisible} onCancel={handleCancel} footer={null}>
                <EventRegistratinInfoModal
                    registration_start_date={eventData?.result?.registration_start_date}
                    registration_end_date={eventData.result?.registration_end_date}
                />
            </Modal>
        </>
    );
};

export default EventDetailsTab;
