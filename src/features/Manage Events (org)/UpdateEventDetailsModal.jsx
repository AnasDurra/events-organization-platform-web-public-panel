import { EditOutlined, EnvironmentFilled, InfoCircleOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Divider, Modal, Space, Tooltip, message } from 'antd';
import { Typography, Form, Input, DatePicker, InputNumber, Button } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from 'react';
import ShowMap from './ShowMap';
import LocationOnMapsModal from './LocationOnMapsModal';
const { Title, Paragraph } = Typography;

const UpdateEventDetailsModal = ({ isUpdateEventDetailsModalOpen, setIsUpdateEventDetailsModalOpen }) => {
    const handleEventDetailsOk = () => {
        // refetch();
        setIsUpdateEventDetailsModalOpen(false);
    };
    const handleEventDetailsCancel = () => {
        setIsUpdateEventDetailsModalOpen(false);
    };

    const [isLocationOnMapModalOpen, setIsLocationOnMapModalOpen] = useState(null);
    // For Select Location on Maps
    const [position, setPosition] = useState(null);
    return (
        <div>
            <Modal
                title={
                    <>
                        <Title
                            style={{ marginTop: '0px' }}
                            level={4}
                        >
                            Update Event Details
                        </Title>
                        <Divider style={{ marginBottom: '0px' }} />
                    </>
                }
                open={isUpdateEventDetailsModalOpen}
                onOk={handleEventDetailsOk}
                onCancel={handleEventDetailsCancel}
                width={750}
                okText={'Update Information'}
            >
                <div>
                    <Form
                        layout='vertical'
                        // initialValues={formData}
                        // onValuesChange={handleFormChange}
                        // onFinish={handleFormSubmit}
                    >
                        <Title level={3}>Event Information</Title>
                        <Form.Item
                            label='Title'
                            name='title'
                        >
                            <Input
                                prefix={<EditOutlined />}
                                placeholder='Event Title'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Description'
                            name='description'
                        >
                            <Input.TextArea
                                prefix={<InfoCircleOutlined />}
                                placeholder='Event Description'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Event Type'
                            name='event_type'
                        >
                            <Input
                                prefix={<SettingOutlined />}
                                placeholder='Event Type'
                            />
                        </Form.Item>

                        <Title level={3}>Location</Title>
                        <Form.Item
                            label='Location on Maps'
                            name='location'
                        >
                            <Space
                                style={{ width: '100%' }}
                                direction='vertical'
                            >
                                {!position && (
                                    <div style={{ height: '30vh' }}>
                                        <Dragger
                                            style={{
                                                border: '5px',
                                            }}
                                            disabled
                                        >
                                            <p className='ant-upload-hint'>No Location Selected Yet</p>
                                        </Dragger>
                                    </div>
                                )}
                                {position && (
                                    <Tooltip
                                        trigger='hover'
                                        defaultOpen
                                        title='Click here to show the selected location on Maps'
                                        placement='topRight'
                                    >
                                        <div>
                                            <ShowMap position={position} />
                                        </div>
                                    </Tooltip>
                                )}
                                <div style={{ textAlign: 'center' }}>
                                    <Space
                                        size={30}
                                        wrap
                                    >
                                        <Button
                                            type='primary'
                                            onClick={() => setIsLocationOnMapModalOpen(true)}
                                            icon={<EnvironmentFilled />}
                                        >
                                            {position ? 'Change Location' : 'Select Location'}
                                        </Button>

                                        <Button
                                            type='dashed'
                                            disabled={!position}
                                            danger
                                            onClick={() => {
                                                setPosition(null);
                                                message.warning('Loacation Deleted ..   ');
                                            }}
                                        >
                                            Delete Location
                                        </Button>
                                    </Space>
                                </div>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            label='Address Notes'
                            name='address_notes'
                        >
                            <Input.TextArea
                                prefix={<EditOutlined />}
                                placeholder='Address Notes'
                            />
                        </Form.Item>

                        <Title level={3}>Registration</Title>
                        <Form.Item
                            label='Start Date & Time'
                            name='registration_start_date'
                        >
                            <DatePicker showTime />
                        </Form.Item>
                        <Form.Item
                            label='End Date & Time'
                            name='registration_end_date'
                        >
                            <DatePicker showTime />
                        </Form.Item>
                        <Form.Item
                            label='Capacity'
                            name='capacity'
                        >
                            <InputNumber
                                prefix={<TeamOutlined />}
                                min={0}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            {isLocationOnMapModalOpen && (
                <LocationOnMapsModal
                    position={position}
                    setPosition={setPosition}
                    isLocationOnMapModalOpen={isLocationOnMapModalOpen}
                    setIsLocationOnMapModalOpen={setIsLocationOnMapModalOpen}
                />
            )}
        </div>
    );
};

export default UpdateEventDetailsModal;
