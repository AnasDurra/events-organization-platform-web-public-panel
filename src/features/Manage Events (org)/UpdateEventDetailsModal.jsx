import {
    EditOutlined,
    EnvironmentFilled,
    InfoCircleOutlined,
    LoadingOutlined,
    SettingOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Divider, Modal, Select, Space, Spin, Tooltip, message } from 'antd';
import { Typography, Form, Input, DatePicker, InputNumber, Button } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useState } from 'react';
import ShowMap from './ShowMap';
import LocationOnMapsModal from './LocationOnMapsModal';
import { useForm } from 'antd/es/form/Form';
const { Title, Paragraph } = Typography;

import moment from 'moment';
import dayjs from 'dayjs';

import { useUpdateDetailsMutation } from '../../api/services/events';
import { useParams } from 'react-router-dom';
const UpdateEventDetailsModal = ({
    isUpdateEventDetailsModalOpen,
    setIsUpdateEventDetailsModalOpen,
    eventData,
    refetch,
}) => {
    const { id } = useParams();

    const [updateDetailsMutation, { isLoading: UpdateDetailsIsLoading }] = useUpdateDetailsMutation();

    const [form] = useForm();

    const handleEventDetailsCancel = () => {
        setIsUpdateEventDetailsModalOpen(false);
    };

    const [isLocationOnMapModalOpen, setIsLocationOnMapModalOpen] = useState(null);
    // For Select Location on Maps
    const [position, setPosition] = useState({
        lat: eventData?.result?.location?.latitude ? parseFloat(eventData.result.location.latitude) : null,
        lng: eventData?.result?.location?.longitude ? parseFloat(eventData.result.location.longitude) : null,
    });

    const initialFormValues = {
        address_notes: eventData?.result?.address_notes,
        registration_start_date: dayjs(eventData?.result?.registration_start_date, 'YYYY-MM-DD HH:mm:ss'),
        registration_end_date: dayjs(eventData?.result?.registration_end_date, 'YYYY-MM-DD HH:mm:ss'),

        capacity: eventData?.result?.capacity,
        description: eventData?.result?.description,
        event_type: eventData?.result?.event_type,
        title: eventData?.result?.title,
        lat: eventData?.result?.location?.latitude ? eventData.result.location.latitude : null,
        lng: eventData?.result?.location?.longitude ? eventData.result.location.longitude : null,
    };

    const handleEventDetailsOk = () => {
        form.validateFields()
            .then((values) => {
                form.submit();
                if (position) {
                    values = {
                        ...values,
                        location: {
                            latitude: position?.lat?.toString(),
                            longitude: position?.lng?.toString(),
                        },
                        capacity: values.capacity.toString(),
                    };
                }
                console.log('Form values:', values);
                updateDetailsMutation({ id: id, body: values })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                        if (res.statusCode === 201) {
                            refetch();
                            message.success('Events Detials Updated Successfully !');
                            setIsUpdateEventDetailsModalOpen(false);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        error.data.result.response.message.forEach((value) => {
                            message.error(value);
                        });
                    });
            })
            .catch((error) => {
                console.error('Validation error:', error);
            });
    };
    return (
        <div>
            <Modal
                title={
                    <>
                        <Title style={{ marginTop: '0px' }} level={4}>
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
                okButtonProps={{ loading: UpdateDetailsIsLoading, disabled: UpdateDetailsIsLoading }}
                cancelButtonProps={{ disabled: UpdateDetailsIsLoading }}
                closable={!UpdateDetailsIsLoading}
                maskClosable={!UpdateDetailsIsLoading}
            >
                <Spin
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 24,
                            }}
                            spin
                        />
                    }
                    spinning={UpdateDetailsIsLoading}
                >
                    <div>
                        <Form layout="vertical" initialValues={initialFormValues} form={form}>
                            <Title level={3}>Event Information</Title>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter event Title',
                                    },
                                ]}
                            >
                                <Input prefix={<EditOutlined />} placeholder="Event Title" />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter event Description ',
                                    },
                                ]}
                            >
                                <Input.TextArea prefix={<InfoCircleOutlined />} placeholder="Event Description" />
                            </Form.Item>
                            <Form.Item
                                label="Event Type (Online - Onsite)"
                                name="event_type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter event Type ',
                                    },
                                ]}
                            >
                                <Select
                                    allowClear
                                    options={[
                                        {
                                            value: 'online',
                                            label: 'Online',
                                        },
                                        {
                                            value: 'onsite',
                                            label: 'Onsite',
                                        },
                                    ]}
                                />
                            </Form.Item>

                            <Title level={3}>Location</Title>
                            <Form.Item label="Location on Maps">
                                <Space style={{ width: '100%' }} direction="vertical">
                                    {!position?.lat && (
                                        <div style={{ height: '30vh' }}>
                                            <Dragger
                                                style={{
                                                    border: '5px',
                                                }}
                                                disabled
                                            >
                                                <p className="ant-upload-hint">No Location Selected Yet</p>
                                            </Dragger>
                                        </div>
                                    )}
                                    {position?.lat && (
                                        <Tooltip
                                            trigger="hover"
                                            defaultOpen
                                            title="Click here to show the selected location on Maps"
                                            placement="topRight"
                                        >
                                            <div>
                                                <ShowMap position={position} />
                                            </div>
                                        </Tooltip>
                                    )}
                                    <div style={{ textAlign: 'center' }}>
                                        <Space size={30} wrap>
                                            <Button
                                                type="primary"
                                                onClick={() => setIsLocationOnMapModalOpen(true)}
                                                icon={<EnvironmentFilled />}
                                            >
                                                {position?.lat ? 'Change Location' : 'Select Location'}
                                            </Button>

                                            <Button
                                                type="dashed"
                                                disabled={!position?.lat}
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
                            <Form.Item label="Address Notes" name="address_notes">
                                <Input.TextArea prefix={<EditOutlined />} placeholder="Address Notes" />
                            </Form.Item>

                            <Title level={3}>Registration</Title>
                            <Form.Item
                                label="Start Date & Time"
                                name="registration_start_date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter event Registration Start Date & Time ',
                                    },
                                ]}
                            >
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                            <Form.Item
                                label="End Date & Time"
                                name="registration_end_date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter event Registration End Date & Time ',
                                    },
                                ]}
                            >
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                            <Form.Item label="Capacity" name="capacity">
                                <InputNumber prefix={<TeamOutlined />} min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
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
