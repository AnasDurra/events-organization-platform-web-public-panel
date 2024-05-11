import { Divider, Modal, Space, Spin, Tag } from 'antd';
import { useState } from 'react';
import { Typography, Form, Input, DatePicker, InputNumber, Button } from 'antd';
const { Title, Paragraph } = Typography;
import {
    CalendarOutlined,
    EditOutlined,
    EnvironmentOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    TagsOutlined,
    TeamOutlined,
    UserOutlined,
    FieldTimeOutlined,
} from '@ant-design/icons';
import UpdateEventDetailsModal from './UpdateEventDetailsModal';

import ShowMap from './ShowMap';
import UpdateEventTagsModal from './UpdateEventTagsModal';
import UpdateEventAgeGroupModal from './UpdateEventAgeGroupModal';
import AttachForm from './AttachForm';
import { useRemoveFormMutation, useUpdateDetailsMutation } from '../../api/services/events';
import { getLoggedInUserV2 } from '../../api/services/auth';

const UpdateEventModal = ({
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    eventData,
    refetch,
    eventDataIsLoading,
    isFetching,
}) => {
    const [removeForm] = useRemoveFormMutation();
    const [updateEvent] = useUpdateDetailsMutation();
    const handleOk = () => {
        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    const [isUpdateEventDetailsModalOpen, setIsUpdateEventDetailsModalOpen] = useState(false);

    const [isUpdateEventTagsModalOpen, setIsUpdateEventTagsModalOpen] = useState(false);
    const [isUpdateEventAgeGroupModalOpen, setIsUpdateEventAgeGroupModalOpen] = useState(false);

    const handleAttachForm = (form) => {
        updateEvent({ id: eventData?.result?.id, body: { form_id: form.id } });
    };
    const handleDetachForm = () => {
        console.log(eventData);
        removeForm(eventData?.result?.id);
    };


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
                <Spin spinning={eventDataIsLoading || isFetching}>
                    <div
                        style={{
                            padding: '20px',
                            background: '#FAFAFA',
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
                                <EditOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>Title:</strong> {eventData?.result?.title}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                                <InfoCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>Description:</strong> {eventData?.result?.description}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                                <SettingOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>Event Type:</strong> {eventData?.result?.event_type}
                            </Paragraph>

                            <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                                <EnvironmentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>Location:</strong>{' '}
                                {
                                    <div style={{ margin: '15px 10px' }}>
                                        {eventData?.result?.location?.latitude && (
                                            <ShowMap
                                                position={{
                                                    lat: eventData?.result?.location?.latitude
                                                        ? parseFloat(eventData.result.location.latitude)
                                                        : 0,
                                                    lng: eventData?.result?.location?.longitude
                                                        ? parseFloat(eventData.result.location.longitude)
                                                        : 0,
                                                }}
                                            />
                                        )}
                                    </div>
                                }
                            </Paragraph>
                            <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                                <EnvironmentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>Address Notes</strong>{' '}
                                {eventData?.result?.address_notes ?? 'No additional notes'}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                                <CalendarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>Start Date & Time:</strong> {eventData?.result?.registration_start_date}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                                <CalendarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>End Date & Time:</strong>
                                {eventData?.result?.registration_end_date}
                            </Paragraph>

                            <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                                <TeamOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>Capacity:</strong> {eventData?.result?.capacity}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: '12px', color: '#666' }}>
                                <FieldTimeOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
                                <strong>Event Schedule: ...</strong>{' '}
                                {
                                    <Button
                                        type='text'
                                        style={{ border: 'none', color: '#1890ff' }}
                                        onClick={() => {
                                            setIsUpdateEventDetailsModalOpen(true);
                                        }}
                                    >
                                        Show
                                    </Button>
                                }
                            </Paragraph>
                        </div>
                    </div>
                    <Divider />
                    <div
                        style={{
                            padding: '20px',
                            background: '#FAFAFA',
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
                                        {eventData?.result?.tags.length === 0
                                            ? 'No Tags for this event'
                                            : eventData?.result?.tags.map((tag) => (
                                                  <Tag
                                                      key={tag?.tag?.value}
                                                      style={{
                                                          padding: '2px 10px',
                                                          margin: '5px',
                                                          fontSize: '15px',
                                                      }}
                                                  >
                                                      {tag?.tag?.label}
                                                  </Tag>
                                              ))}
                                    </div>
                                </Space>
                            }
                        </div>
                    </div>
                    <Divider />
                    <div
                        style={{
                            padding: '20px',

                            background: '#FAFAFA',
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
                                        {eventData?.result?.age_groups.length === 0
                                            ? 'No Age Groups for this event'
                                            : eventData?.result?.age_groups.map((age_group) => (
                                                  <Tag
                                                      key={age_group?.age_group_id}
                                                      style={{
                                                          fontSize: '15px',
                                                      }}
                                                  >
                                                      {age_group?.age_group_name}
                                                  </Tag>
                                              ))}
                                    </div>
                                </Space>
                            }
                        </div>
                    </div>
                    <div className='pl p-2 bg-gray-100/50 my-2'>
                        <Title
                            level={2}
                            className='my-2 '
                        >
                            Attached Form
                        </Title>
                        <AttachForm
                            onAttach={handleAttachForm}
                            //TODO org id 
                            organization_id={getLoggedInUserV2()?.organization_id}
                            attachedForm={eventData?.result?.form}
                            onDetachForm={handleDetachForm}
                        />
                    </div>
                </Spin>
            </Modal>
            {isUpdateEventDetailsModalOpen && (
                <UpdateEventDetailsModal
                    isUpdateEventDetailsModalOpen={isUpdateEventDetailsModalOpen}
                    setIsUpdateEventDetailsModalOpen={setIsUpdateEventDetailsModalOpen}
                    eventData={eventData}
                    refetch={refetch}
                />
            )}
            {isUpdateEventTagsModalOpen && (
                <UpdateEventTagsModal
                    isUpdateEventTagsModalOpen={isUpdateEventTagsModalOpen}
                    setIsUpdateEventTagsModalOpen={setIsUpdateEventTagsModalOpen}
                    eventData={eventData}
                    refetch={refetch}
                />
            )}

            {isUpdateEventAgeGroupModalOpen && (
                <UpdateEventAgeGroupModal
                    isUpdateEventAgeGroupModalOpen={isUpdateEventAgeGroupModalOpen}
                    setIsUpdateEventAgeGroupModalOpen={setIsUpdateEventAgeGroupModalOpen}
                    eventData={eventData}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default UpdateEventModal;
