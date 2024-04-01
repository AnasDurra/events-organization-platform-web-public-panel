import { Divider, Modal, Space, Tag } from 'antd';
import { useState } from 'react';
import { Typography, Form, Input, DatePicker, InputNumber, Button } from 'antd';
const { Title, Paragraph } = Typography;
import {
    CalendarOutlined,
    EditOutlined,
    EnvironmentOutlined,
    FieldTimeOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    TagsOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import UpdateEventDetailsModal from './UpdateEventDetailsModal';

import ShowMap from './ShowMap';
import UpdateEventTagsModal from './UpdateEventTagsModal';
import UpdateEventAgeGroupModal from './UpdateEventAgeGroupModal';
const { RangePicker } = DatePicker;

const UpdateEventModal = ({ isUpdateModalOpen, setIsUpdateModalOpen }) => {
    const [formData, setFormData] = useState({
        address_notes: 'in the old street(updated)',
        registration_start_date: '2024-04-01 12:25:00',
        registration_end_date: '2024-04-10 12:30:00',
        capacity: '32',
        description: 'this is an event about artificial intelligence',
        event_type: 'online',
        title: 'The Future of AI',
        location: {
            latitude: '38.2451',
            longitude: '-52.0364',
        },
    });
    const handleOk = () => {
        // refetch();
        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    const handleFormChange = (changedValues, allValues) => {
        setFormData(allValues);
    };

    const handleFormSubmit = () => {
        // Handle form submission here
        console.log(formData);
    };

    const [isUpdateEventDetailsModalOpen, setIsUpdateEventDetailsModalOpen] = useState(false);

    const [isUpdateEventTagsModalOpen, setIsUpdateEventTagsModalOpen] = useState(false);
    const [isUpdateEventAgeGroupModalOpen, setIsUpdateEventAgeGroupModalOpen] = useState(false);

    return (
        <div>
            <Modal
                title={
                    <>
                        <Title
                            style={{ marginTop: '0px' }}
                            level={4}
                        >
                            Update Event
                        </Title>
                        <Divider style={{ marginBottom: '0px' }} />
                    </>
                }
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
                footer={null}
            >
                <div
                    style={{
                        padding: '20px',
                        // border: "1px solid #d9d9d9",
                        // borderRadius: "8px",
                        background: '#fdfdfd',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <Title
                            level={2}
                            style={{ margin: 0 }}
                        >
                            Event Details
                        </Title>
                        <Button
                            type='text'
                            icon={<EditOutlined />}
                            style={{ border: 'none', color: '#1890ff' }}
                            onClick={() => {
                                setIsUpdateEventDetailsModalOpen(true);
                            }}
                        >
                            Edit
                        </Button>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <EditOutlined style={{ marginRight: '8px', color: '#1890ff' }} /> <strong>Title:</strong>{' '}
                            {'hello world'}
                        </Paragraph>
                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <InfoCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                            <strong>Description:</strong> {'hello world'}
                        </Paragraph>
                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <SettingOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                            <strong>Event Type:</strong> {'hello world'}
                        </Paragraph>

                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <EnvironmentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                            <strong>Location:</strong>{' '}
                            {
                                <div style={{ margin: '25px 10px' }}>
                                    <ShowMap
                                        position={{
                                            lat: 33.792773,
                                            lng: 36.145962,
                                        }}
                                    />
                                </div>
                            }
                        </Paragraph>
                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <EnvironmentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                            <strong>Address Notes</strong> {'hello world'}
                        </Paragraph>
                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <CalendarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                            <strong>Start Date & Time:</strong> {'hello world'}
                        </Paragraph>
                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <CalendarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                            <strong>End Date & Time:</strong> {'hello world'}
                        </Paragraph>

                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <TeamOutlined style={{ marginRight: '8px', color: '#1890ff' }} /> <strong>Capacity:</strong>{' '}
                            {'hello world'}
                        </Paragraph>
                    </div>
                </div>
                <Divider />
                <div
                    style={{
                        padding: '20px',
                        // border: "1px solid #d9d9d9",
                        // borderRadius: "8px",
                        background: '#fdfdfd',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <Title
                            level={2}
                            style={{ margin: 0 }}
                        >
                            Event Tags
                        </Title>
                        <Button
                            type='text'
                            icon={<EditOutlined />}
                            style={{ border: 'none', color: '#1890ff' }}
                            onClick={() => {
                                setIsUpdateEventTagsModalOpen(true);
                            }}
                        >
                            Edit
                        </Button>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <TagsOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            <strong> Event Tags:</strong>{' '}
                        </Paragraph>
                        {
                            <Space wrap>
                                <Typography.Text strong></Typography.Text>
                                <div>
                                    <Tag style={{ fontSize: '15px' }}>Tag 1</Tag>
                                    <Tag style={{ fontSize: '15px' }}>Tag 2</Tag>
                                    <Tag style={{ fontSize: '15px' }}>Tag 3</Tag>
                                    <Tag style={{ fontSize: '15px' }}>Tag 4</Tag>
                                </div>
                            </Space>
                        }
                    </div>
                </div>
                <Divider />
                <div
                    style={{
                        padding: '20px',
                        // border: "1px solid #d9d9d9",
                        // borderRadius: "8px",
                        background: '#fdfdfd',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <Title
                            level={2}
                            style={{ margin: 0 }}
                        >
                            Event Age Group
                        </Title>
                        <Button
                            type='text'
                            icon={<EditOutlined />}
                            style={{ border: 'none', color: '#1890ff' }}
                            onClick={() => {
                                setIsUpdateEventAgeGroupModalOpen(true);
                            }}
                        >
                            Edit
                        </Button>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                            <UserOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            <strong> Event Age Group:</strong>{' '}
                        </Paragraph>
                        {
                            <Space wrap>
                                <Typography.Text strong></Typography.Text>
                                <div>
                                    <Tag style={{ fontSize: '15px' }}>Age Group 1</Tag>
                                    <Tag style={{ fontSize: '15px' }}>Age Group 2</Tag>
                                    <Tag style={{ fontSize: '15px' }}>Age Group 3</Tag>
                                    <Tag style={{ fontSize: '15px' }}>Age Group 4</Tag>
                                </div>
                            </Space>
                        }
                    </div>
                </div>
            </Modal>
            {isUpdateEventDetailsModalOpen && (
                <UpdateEventDetailsModal
                    isUpdateEventDetailsModalOpen={isUpdateEventDetailsModalOpen}
                    setIsUpdateEventDetailsModalOpen={setIsUpdateEventDetailsModalOpen}
                />
            )}
            {isUpdateEventTagsModalOpen && (
                <UpdateEventTagsModal
                    isUpdateEventTagsModalOpen={isUpdateEventTagsModalOpen}
                    setIsUpdateEventTagsModalOpen={setIsUpdateEventTagsModalOpen}
                />
            )}

            {isUpdateEventAgeGroupModalOpen && (
                <UpdateEventAgeGroupModal
                    isUpdateEventAgeGroupModalOpen={isUpdateEventAgeGroupModalOpen}
                    setIsUpdateEventAgeGroupModalOpen={setIsUpdateEventAgeGroupModalOpen}
                />
            )}
        </div>
    );
};

export default UpdateEventModal;
