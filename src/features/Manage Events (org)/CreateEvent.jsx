import { FileImageOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Image, Row, Skeleton, Spin, Upload, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useState } from 'react';
import LocationOnMapsModal from './LocationOnMapsModal';
import { useEventCreationListsQuery } from '../../api/services/lists';

import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { useCreateMutation } from '../../api/services/events';
import EventDetailsForm from './EventDetailsForm';
import MediaAndAttachmentsForm from './MediaAndAttachmentsForm';
import RegistrationScheduleForm from './RegistrationScheduleForm';

import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../utils/NotificationContext';

const CreateEvent = () => {
    const navigate = useNavigate();

    const { data: lists, error, isLoading: listsIsLoading } = useEventCreationListsQuery();
    const [createMutation, { isLoading: createEventIsLoading }] = useCreateMutation();

    const { api } = useNotification();
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description ?? null,
            placement: 'topLeft',
        });
    };

    const [coverImage, setCoverImage] = useState(null);
    const [isLocationOnMapModalOpen, setIsLocationOnMapModalOpen] = useState(null);

    const [days, setDays] = useState([
        {
            day_date: null,
            slots: [{ start_time: null, end_time: null, label: null }],
        },
    ]);

    // For Select Location on Maps
    const [position, setPosition] = useState(null);

    // Forms for each section
    const [eventDetailsForm] = useForm();
    const [eventMediaForm] = useForm();
    const [eventRegistrationForm] = useForm();

    const handleCoverImageUpload = (coverImage) => {
        setCoverImage(coverImage);
    };

    // Handle on Forms Finish
    const onFormsFinish = async () => {
        try {
            await eventDetailsForm.validateFields();
            await eventMediaForm.validateFields();
            await eventRegistrationForm.validateFields();
            if (!coverImage) {
                message.error('You have to Upload a cover picture');
            } else {
                const eventDetailsFormValues = eventDetailsForm.getFieldsValue();
                const eventMediaFormValues = eventMediaForm.getFieldsValue();
                const eventRegistrationFormValues = eventRegistrationForm.getFieldsValue();

                let data = {
                    ...eventDetailsFormValues,
                    ...eventMediaFormValues,
                    ...eventRegistrationFormValues,
                    days: days,
                };
                if (position) {
                    data = {
                        ...data,
                        location: {
                            latitude: position?.lat?.toString(),
                            longitude: position?.lng?.toString(),
                        },
                    };
                }

                console.log(data);
                const dataToSend = {
                    title: data?.title,
                    description: data?.description,
                    event_type: data?.event_type,
                    registration_start_date: data['registration_start_end_date']
                        ? data['registration_start_end_date'][0].format('YYYY-MM-DD HH:mm:ss')
                        : null,
                    registration_end_date: data['registration_start_end_date']
                        ? data['registration_start_end_date'][1].format('YYYY-MM-DD HH:mm:ss')
                        : null,
                    address_id: data?.address_id,
                    address_notes: data?.address_notes,
                    capacity: data?.capacity?.toString(),
                    tags: data?.tags.map((tag) => ({
                        tag_id: tag,
                    })),
                    age_groups: data?.age_groups.map((age_group) => ({
                        age_group_id: age_group,
                    })),
                    days: data?.days,
                    photos: data?.photos?.fileList,
                    attachments: data?.attachments?.fileList,
                    location: data?.location,
                    cover_picture: coverImage.file ?? null,
                };
                for (const key in dataToSend) {
                    if (dataToSend[key] == null) {
                        delete dataToSend[key];
                    }
                }
                const formData = new FormData();
                Object.keys(dataToSend).forEach((key) => {
                    if (key === 'tags') {
                        dataToSend.tags?.forEach((tag, index) => {
                            const tag_id = tag.tag_id;
                            formData.append(`tags[${index}][tag_id]`, tag_id);
                        });
                    } else if (key === 'age_groups') {
                        dataToSend.age_groups?.forEach((age_group, index) => {
                            const age_group_id = age_group.age_group_id;
                            formData.append(`age_groups[${index}][age_group_id]`, age_group_id);
                        });
                    } else if (key === 'days') {
                        dataToSend.days?.forEach((day, dayIndex) => {
                            const [day_date, slots] = [day.day_date, day.slots];
                            formData.append(`days[${dayIndex}][day_date]`, day_date);

                            slots.forEach((slot, slotIndex) => {
                                const [start_time, end_time, label] = [slot.start_time, slot.end_time, slot.label];
                                formData.append(`days[${dayIndex}][slots][${slotIndex}][start_time]`, start_time);
                                formData.append(`days[${dayIndex}][slots][${slotIndex}][end_time]`, end_time);
                                formData.append(`days[${dayIndex}][slots][${slotIndex}][label]`, label);
                            });
                        });
                    } else if (key === 'photos') {
                        dataToSend.photos?.forEach((photo, index) => {
                            formData.append(`photos`, photo?.originFileObj);
                        });
                    } else if (key === 'attachments') {
                        dataToSend.attachments?.forEach((attachment, index) => {
                            formData.append(`attachments`, attachment?.originFileObj);
                        });
                    } else if (key === 'location') {
                        const [latitude, longitude] = [dataToSend.location.latitude, dataToSend.location.longitude];
                        formData.append(`location[latitude]`, latitude);
                        formData.append(`location[longitude]`, longitude);
                    } else {
                        formData.append(key, dataToSend[key]);
                    }
                });

                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                createMutation(formData)
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                        if (res.statusCode === 201) {
                            openNotificationWithIcon('success', 'Event Created Successfully !');
                            navigate(`/event/show/${res.result.id}`);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        error.data.result.response.message.forEach((value) => {
                            openNotificationWithIcon('error', 'Something wend Wrong!', value);
                        });
                    });
            }
        } catch (error) {
            // console.log(error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
                size="small"
                bodyStyle={{ padding: '12px 12px 12px 24px' }}
                style={{
                    width: '100%',
                }}
                cover={
                    <>
                        {coverImage ? (
                            <Image height={250} src="https://picsum.photos/1000/300" />
                        ) : (
                            <Upload.Dragger
                                maxCount={1}
                                name="cover"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleCoverImageUpload}
                                height={250}
                            >
                                <p className="ant-upload-drag-icon">
                                    <FileImageOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag photo to this area to upload cover picture
                                </p>
                            </Upload.Dragger>
                        )}
                    </>
                }
            >
                <Spin spinning={createEventIsLoading}>
                    <Skeleton
                        loading={false}
                        active
                        avatar
                        paragraph={{
                            rows: 1,
                            width: '90%',
                        }}
                    >
                        <Meta
                            style={{ backgroundColor: '#fdfdfd' }}
                            avatar={
                                <Avatar
                                    size={60}
                                    icon={<UserOutlined />}
                                    src={'https://api.dicebear.com/7.x/miniavs/svg?seed=8'}
                                    style={{
                                        textAlign: 'center',
                                        border: '0.5px solid black',
                                        borderRadius: '50%',
                                    }}
                                />
                            }
                            title={<div style={{ marginTop: '10px' }}>Anas Durra</div>}
                            description={' Host - Your Profile'}
                        />
                    </Skeleton>
                    <Row
                        gutter={[16, 12]}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '1.5em',
                            width: '100%',
                        }}
                    >
                        <Col span={12}>
                            <Card size="small" type="inner" title="Event Details" style={{ height: '100%' }}>
                                <EventDetailsForm
                                    eventDetailsForm={eventDetailsForm}
                                    lists={lists}
                                    listsIsLoading={listsIsLoading}
                                    position={position}
                                    setIsLocationOnMapModalOpen={setIsLocationOnMapModalOpen}
                                    setPosition={setPosition}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small" type="inner" title="Media & Attachments" style={{ height: '100%' }}>
                                <MediaAndAttachmentsForm eventMediaForm={eventMediaForm} />
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Card size="small" type="inner" title="Registration Schedule">
                                <RegistrationScheduleForm
                                    eventRegistrationForm={eventRegistrationForm}
                                    days={days}
                                    setDays={setDays}
                                />
                            </Card>
                        </Col>

                        <Col span={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: '5em',
                                }}
                            >
                                <Button loading={createEventIsLoading} type="primary" onClick={onFormsFinish}>
                                    Create Event
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Spin>
            </Card>
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

export default CreateEvent;
