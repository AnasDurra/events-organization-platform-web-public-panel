import { Affix, Button, Card, Col, Descriptions, Divider, List, Modal, Row, Space, Table, Tag, Typography } from 'antd';
import {
    ArrowRightOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    InfoCircleFilled,
    InfoCircleOutlined,
    ScheduleOutlined,
    TagsOutlined,
    UserOutlined,
} from '@ant-design/icons';
import ShowMap from '../../ShowMap';
import { getLoggedInUserV2 } from '../../../../api/services/auth';
import { useState } from 'react';
import { Icon } from '@iconify/react';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Paragraph from 'antd/es/typography/Paragraph';
import moment from 'moment';
import { ShareOutlined } from '@material-ui/icons';
import EventRegistratinInfoModal from './EventRegistratinInfoModal';

const EventDetailsTab = ({ eventData, handleRegisterClicked }) => {
    const [user] = useState(getLoggedInUserV2());
    const dataSource = [
        {
            key: '1',
            name: 'General Admission',
            price: 100,
            qty: 10,
        },
    ];

    const columns = [
        {
            title: 'Available Tickets',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Qty*',
            dataIndex: 'qty',
            key: 'qty',
        },
    ];

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
                    <Row gutter={[30, 20]}>
                        <Col span={24}>
                            <Typography.Title style={{ margin: '0px' }} level={2} strong>
                                <span
                                    style={{
                                        borderBottom: '5px solid #000',
                                        paddingBottom: '4px',
                                    }}
                                >
                                    Event
                                </span>{' '}
                                Overview
                            </Typography.Title>
                        </Col>
                        <Col span={24}>
                            <Card
                                style={{
                                    height: '100%',
                                    // padding: '10px',
                                    borderRadius: '8px',
                                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                                    // backgroundColor: '#fafafa', //card
                                    backgroundColor: 'transparent', //card
                                }}
                            >
                                <Space direction='vertical' wrap>
                                    <Paragraph>
                                        <ReactQuill
                                            value={eventData?.result?.description}
                                            readOnly={true}
                                            theme={'bubble'}
                                        />
                                    </Paragraph>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Divider />
                            <Typography.Title style={{ margin: '0px' }} level={2} strong>
                                <span
                                    style={{
                                        borderBottom: '5px solid #000', // Adjust the color and thickness as needed
                                        paddingBottom: '4px', // Adjust the spacing between text and underline
                                    }}
                                >
                                    Event
                                </span>{' '}
                                Detials
                            </Typography.Title>
                        </Col>
                        <Col xs={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    height: '100%',
                                    width: '100%',
                                }}
                            >
                                <Row style={{ flex: 1 }} gutter={[20, 20]}>
                                    <Col span={24}>
                                        <Card
                                            type='inner'
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                // padding: '10px',
                                                borderRadius: '8px',
                                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                                // backgroundColor: '#fafafa', //card
                                                backgroundColor: 'transparent', //card
                                            }}
                                        >
                                            <Space style={{ width: '100%' }} direction='vertical' size={10}>
                                                <Space>
                                                    <Icon
                                                        icon='fluent-mdl2:calendar-settings-mirrored'
                                                        style={{ fontSize: '18px' }}
                                                    />
                                                    <Typography.Text strong>
                                                        <span
                                                            style={{
                                                                borderBottom: '4px solid #000',
                                                                paddingBottom: '4px',
                                                            }}
                                                        >
                                                            Eve
                                                        </span>
                                                        nt Attributes:
                                                    </Typography.Text>
                                                </Space>
                                                <Divider
                                                    style={{
                                                        margin: '10px 0px',
                                                    }}
                                                />
                                                <Space wrap>
                                                    <TagsOutlined style={{ fontSize: '18px' }} />
                                                    {/* <Typography.Text strong>Event Tags:</Typography.Text> */}
                                                    <div>
                                                        {eventData?.result?.tags.length === 0
                                                            ? 'No Tags for this event'
                                                            : eventData?.result?.tags.map((tag) => (
                                                                  <Tag
                                                                      key={tag?.tag?.value}
                                                                      style={{
                                                                          padding: '2px 10px',
                                                                          margin: '5px',
                                                                          fontSize: '15px',
                                                                          backgroundColor: '#DCF2F1',
                                                                      }}
                                                                  >
                                                                      <Typography.Text strong>
                                                                          {tag?.tag?.label}
                                                                      </Typography.Text>
                                                                  </Tag>
                                                              ))}
                                                    </div>
                                                </Space>

                                                <Space wrap>
                                                    <UserOutlined style={{ fontSize: '18px' }} />
                                                    {/* <Typography.Text strong>Event Target Age Group:</Typography.Text> */}
                                                    <div>
                                                        {eventData?.result?.age_groups.length === 0
                                                            ? 'No Age Groups for this event'
                                                            : eventData?.result?.age_groups.map((age_group) => (
                                                                  <Tag
                                                                      style={{
                                                                          padding: '2px 10px',
                                                                          margin: '5px',
                                                                          fontSize: '15px',
                                                                          backgroundColor: '#EEF5FF',
                                                                      }}
                                                                      key={age_group?.age_group_id}
                                                                  >
                                                                      <Typography.Text strong>
                                                                          Age range {age_group?.age_group_name}
                                                                      </Typography.Text>
                                                                  </Tag>
                                                              ))}
                                                    </div>
                                                </Space>
                                            </Space>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} lg={{ span: 8, order: 2 }}>
                    <div style={{ position: 'sticky', top: 1 }}>
                        <Row gutter={[30, 20]}>
                            <Col xs={24}>
                                <Card
                                    type='inner'
                                    style={{
                                        borderRadius: '8px',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                        backgroundColor: '#fafafa', //card
                                        // backgroundColor: 'transparent', //card
                                    }}
                                >
                                    <Space direction='vertical' style={{ width: '100%' }} size={30}>
                                        {eventData?.result?.days?.map((dateObj, index) => (
                                            <Space
                                                direction='vertical'
                                                style={{
                                                    width: '100%',
                                                }}
                                                size={10}
                                                key={index}
                                            >
                                                <Space>
                                                    <CalendarOutlined style={{ fontSize: '14px', color: '#A2A2A2' }} />
                                                    <Typography.Text
                                                        strong
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        {moment(dateObj.day_date).format('ddd, MMMM D, YYYY')}
                                                    </Typography.Text>
                                                </Space>
                                                <List
                                                    bordered
                                                    dataSource={dateObj.slots}
                                                    renderItem={(slot, i) => (
                                                        <>
                                                            <div
                                                                style={{
                                                                    fontWeight: 'bold',
                                                                    padding: '12px',
                                                                }}
                                                            >
                                                                {slot.label}
                                                            </div>
                                                            <List.Item
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <div>
                                                                    <Typography.Text>
                                                                        {formatDate(slot.start_time)}
                                                                    </Typography.Text>
                                                                </div>

                                                                <ArrowRightOutlined
                                                                    style={{
                                                                        margin: '0em 1em',
                                                                    }}
                                                                />
                                                                <div>
                                                                    <Typography.Text>
                                                                        {formatDate(slot.end_time)}
                                                                    </Typography.Text>
                                                                </div>
                                                            </List.Item>
                                                        </>
                                                    )}
                                                />
                                            </Space>
                                        ))}
                                        <Space style={{ width: '100%' }} direction='vertical' size={10}>
                                            <Space>
                                                <EnvironmentOutlined style={{ fontSize: '14px', color: '#A2A2A2' }} />
                                                <Typography.Text>
                                                    <strong>Address Note:</strong>{' '}
                                                    {eventData?.result?.address_notes ?? 'No additional notes'}
                                                </Typography.Text>
                                            </Space>
                                        </Space>
                                    </Space>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <div style={{ marginTop: '-1.5em' }}>
                                    {eventData?.result?.location?.latitude && (
                                        <ShowMap
                                            position={{
                                                lat: eventData?.result?.location?.latitude
                                                    ? parseFloat(eventData.result?.location.latitude)
                                                    : 0,
                                                lng: eventData?.result?.location?.longitude
                                                    ? parseFloat(eventData.result?.location.longitude)
                                                    : 0,
                                            }}
                                        />
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>

                {user?.user_role == 2 && (
                    <Col xs={{ span: 24, order: 3 }}>
                        {/* <Affix offsetBottom={0} offsetTop={120}> */}
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
                                            icon={<ShareOutlined />}
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

                                        <Button type='primary' size='large' style={{ marginTop: 10 }}>
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

function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return formattedTime;
}
