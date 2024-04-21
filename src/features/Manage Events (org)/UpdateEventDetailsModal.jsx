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
import { useEffect, useState } from 'react';
import ShowMap from './ShowMap';
import LocationOnMapsModal from './LocationOnMapsModal';
import { useForm } from 'antd/es/form/Form';
const { Title, Paragraph } = Typography;

import moment from 'moment';
import dayjs from 'dayjs';

import { useUpdateDetailsMutation } from '../../api/services/events';
import { useParams } from 'react-router-dom';
import RegistrationScheduleForm from './RegistrationScheduleForm';
const UpdateEventDetailsModal = ({
    isUpdateEventDetailsModalOpen,
    setIsUpdateEventDetailsModalOpen,
    eventData,
    refetch,
}) => {
    const { id } = useParams();

    const [updateDetailsMutation, { isLoading: UpdateDetailsIsLoading }] = useUpdateDetailsMutation();

    const [form] = useForm();

    const [eventRegistrationForm] = useForm();
    const [days, setDays] = useState([
        {
            id: null,
            day_date: null,
            slots: [
                { id: null, start_time: null, end_time: null, label: null, slot_status: { label: null, value: null } },
            ],
        },
    ]);

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

        capacity: eventData?.result?.capacity.toString(),
        description: eventData?.result?.description,
        event_type: eventData?.result?.event_type,
        title: eventData?.result?.title,
        lat: eventData?.result?.location?.latitude ? eventData.result.location.latitude : null,
        lng: eventData?.result?.location?.longitude ? eventData.result.location.longitude : null,
    };

    const handleEventDetailsOk = () => {
        form.validateFields()
            .then((values) => {
                eventRegistrationForm.validateFields().then((registration_form_values) => {
                    form.submit();
                    eventRegistrationForm.submit();
                    values = {
                        ...values,
                        capacity: values?.capacity.toString(),
                        registration_start_date: registration_form_values['registration_start_end_date']
                            ? registration_form_values['registration_start_end_date'][0].format('YYYY-MM-DD HH:mm:ss')
                            : null,
                        registration_end_date: registration_form_values['registration_start_end_date']
                            ? registration_form_values['registration_start_end_date'][1].format('YYYY-MM-DD HH:mm:ss')
                            : null,
                        days: days ?? null,
                    };
                    if (position?.lat && position?.lng) {
                        values = {
                            ...values,
                            location: {
                                latitude: position?.lat?.toString() ?? null,
                                longitude: position?.lng?.toString() ?? null,
                            },
                        };
                    } else {
                        console.log('no position');
                        values = {
                            ...values,
                            location: null,
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
                });
            })
            .catch((error) => {
                // console.error('Validation error:', error);
            });
    };

    useEffect(() => {
        setDays(eventData?.result?.days);
        console.log(days);
    }, [eventData]);
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
                                                    message.warning('Loacation Deleted Successfully ..   ');
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

                            <Title level={3}>Event Settings</Title>
                            <Form.Item label="Capacity" name="capacity">
                                <InputNumber prefix={<TeamOutlined />} min={0} style={{ width: '100%' }} />
                            </Form.Item>

                            <Title level={3}>Event Scheduling Settings</Title>
                            <Form.Item>
                                <RegistrationScheduleForm
                                    eventRegistrationForm={eventRegistrationForm}
                                    days={days}
                                    setDays={setDays}
                                    eventData={eventData}
                                />
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
