import {
    EditOutlined,
    EllipsisOutlined,
    EnvironmentFilled,
    FileAddOutlined,
    FileImageOutlined,
    PlusCircleFilled,
    DeleteFilled,
    UserOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Cascader,
    Col,
    DatePicker,
    Divider,
    Dropdown,
    Form,
    Image,
    Input,
    Menu,
    Modal,
    Row,
    Select,
    Skeleton,
    Slider,
    Space,
    TimePicker,
    Tooltip,
    Typography,
    Upload,
    message,
} from "antd";
import Meta from "antd/es/card/Meta";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import LocationOnMapsModal from "./LocationOnMapsModal";
import { useEventCreationListsQuery } from "../../api/services/lists";

import ShowMap from "./ShowMap";
import Dragger from "antd/es/upload/Dragger";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { useCreateMutation } from "../../api/services/events";

const CreateEvent = () => {
    const {
        data: lists,
        error,
        isLoading: listsIsLoading,
    } = useEventCreationListsQuery();

    const [createMutation, { isLoading: createEventIsLoading }] =
        useCreateMutation();

    const [coverImage, setCoverImage] = useState(null);
    const [isLocationOnMapModalOpen, setIsLocationOnMapModalOpen] =
        useState(null);

    const [days, setDays] = useState([
        {
            value: null,
            slots: [{ start_time: null, end_time: null, label: null }],
        },
    ]);

    // For Select Location on Maps
    const [position, setPosition] = useState(null);

    // Forms for each section
    const [eventDetailsForm] = useForm();
    const [eventMediaForm] = useForm();
    const [eventRegistrationForm] = useForm();

    const addSlot = (dayIndex) => {
        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].slots.push({
                start_time: null,
                end_time: null,
                label: null,
            });
            return newDays;
        });
    };
    const deleteSlot = (dayIndex, slotIndex) => {
        const newDays = [...days];
        if (newDays[dayIndex]?.slots?.length > 1) {
            newDays[dayIndex].slots.splice(slotIndex, 1);
            setDays(newDays);
        }
    };
    const addDay = () => {
        setDays((prevDays) => [...prevDays, { value: null, slots: [null] }]);
        console.log(days);
    };
    const removeDay = (dayIndex) => {
        if (days.length > 1) {
            setDays((prevDays) =>
                prevDays.filter((day, index) => index !== dayIndex)
            );
        }
    };

    const handleSlotChange = (dayIndex, slotIndex, value) => {
        let newValues = [];
        const slotLabel = days[dayIndex]?.slots[slotIndex]?.label ?? null;
        if (value) {
            const dayDate = days[dayIndex].value;
            const [day, month, year] = dayDate
                ? dayDate.split("-").map(Number)
                : [null, null, null];

            for (let key in value) {
                value[key]["$y"] = year ?? 0;
                value[key]["$M"] = month - 1 ?? 0;
                value[key]["$D"] = day ?? 0;
                newValues.push(value[key].format("YYYY-MM-DD HH:mm:ss"));
            }
            newValues = {
                start_time: newValues[0],
                end_time: newValues[1],
                label: slotLabel,
            };
        } else {
            newValues = { start_time: null, end_time: null, label: slotLabel };
        }

        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].slots[slotIndex] = newValues;
            return newDays;
        });
    };
    const handleDateChange = (date, dateString, dayIndex) => {
        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].value = dateString;
            return newDays;
        });
    };

    const normFile = (e) => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const handleCoverImageUpload = (coverImage) => {
        console.log(coverImage);
        setCoverImage(coverImage);
    };

    const handleSlotLabelChange = (dayIndex, slotIndex, value) => {
        const newValues = {
            ...days[dayIndex].slots[slotIndex],
            label: value,
        };

        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].slots[slotIndex] = newValues;
            return newDays;
        });
    };

    // Handle on Forms Finish
    const onFormsFinish = async () => {
        try {
            await eventDetailsForm.validateFields();
            await eventMediaForm.validateFields();
            await eventRegistrationForm.validateFields();

            const eventDetailsFormValues = eventDetailsForm.getFieldsValue();
            const eventMediaFormValues = eventMediaForm.getFieldsValue();
            const eventRegistrationFormValues =
                eventRegistrationForm.getFieldsValue();

            for (let key in eventMediaFormValues?.photos?.fileList) {
                eventMediaFormValues.photos.fileList[key] =
                    eventMediaFormValues.photos?.fileList[key]?.originFileObj;
            }
            for (let key in eventMediaFormValues?.attachments?.fileList) {
                eventMediaFormValues.attachments.fileList[key] =
                    eventMediaFormValues.attachments?.fileList[
                        key
                    ]?.originFileObj;
            }

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
            console.log("data", data);

            const dataToSend = {
                title: data?.title,
                description: data?.description,
                event_type: data?.event_type,
                registration_start_date: data["registration_start_end_date"]
                    ? data["registration_start_end_date"][0].format(
                          "YYYY-MM-DD HH:mm:ss"
                      )
                    : null,
                registration_end_date: data["registration_start_end_date"]
                    ? data["registration_start_end_date"][1].format(
                          "YYYY-MM-DD HH:mm:ss"
                      )
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
            };

            console.log(dataToSend);
            createMutation(dataToSend)
                .unwrap()
                .then((res) => {
                    console.log(res);
                    if (res.statusCode === 200) {
                        message.success("Registered Successfully !");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    error.data.result.response.message.forEach((value) => {
                        message.error(value);
                    });
                });
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        console.log(days);
    }, [days]);
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
                size="small"
                bodyStyle={{ padding: "12px 12px 12px 24px" }}
                style={{
                    width: "100%",
                }}
                cover={
                    <>
                        {coverImage ? (
                            <Image
                                height={250}
                                src="https://picsum.photos/1000/300"
                            />
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
                                    Click or drag photo to this area to upload
                                    cover picture
                                </p>
                            </Upload.Dragger>
                        )}
                    </>
                }
            >
                <Skeleton
                    loading={false}
                    active
                    avatar
                    paragraph={{
                        rows: 1,
                        width: "90%",
                    }}
                >
                    <Meta
                        style={{ backgroundColor: "#fdfdfd" }}
                        avatar={
                            <Avatar
                                size={60}
                                icon={<UserOutlined />}
                                src={
                                    "https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                                }
                                style={{
                                    textAlign: "center",
                                    // marginBottom: "10px",
                                    border: "0.5px solid black",
                                    borderRadius: "50%",
                                    // marginTop: "-70px",
                                }}
                            />
                        }
                        title={
                            <div style={{ marginTop: "10px" }}>Anas Durra</div>
                        }
                        description={" Host - Your Profile"}
                    />
                </Skeleton>
                <Row
                    gutter={[16, 12]}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1.5em",
                        width: "100%",
                    }}
                >
                    <Col span={12}>
                        <Card
                            size="small"
                            type="inner"
                            title="Event Details"
                            style={{ height: "100%" }}
                        >
                            <Form form={eventDetailsForm} layout="vertical">
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter event Title",
                                        },
                                    ]}
                                    label="Event Name"
                                    name="title"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Event Descreption"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter event Description ",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Event Capacity"
                                    name="capacity"
                                >
                                    <Slider />
                                </Form.Item>
                                <Form.Item
                                    label="Event Type (Online - Onsite)"
                                    name="event_type"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter event Type ",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        options={[
                                            {
                                                value: "online",
                                                label: "Online",
                                            },
                                            {
                                                value: "onsite",
                                                label: "Onsite",
                                            },
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Target Age Group"
                                    name="age_groups"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select at least one from event Age Groups ",
                                        },
                                    ]}
                                >
                                    <Select
                                        loading={listsIsLoading}
                                        allowClear
                                        mode="multiple"
                                        options={lists?.result.age_groups}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Tags"
                                    name="tags"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select at least one from event Tags ",
                                        },
                                    ]}
                                >
                                    <Select
                                        loading={listsIsLoading}
                                        mode="tags"
                                        allowClear
                                        options={lists?.result.tags}
                                    />
                                </Form.Item>

                                {/* <Form.Item label="Address" name="address_id">
                                    <Cascader
                                        options={[
                                            {
                                                value: "zhejiang",
                                                label: "Zhejiang",
                                                children: [
                                                    {
                                                        value: "hangzhou",
                                                        label: "Hangzhou",
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </Form.Item> */}

                                <Form.Item
                                    label="Address"
                                    name="address_id"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please select at least one from event Tags ",
                                        },
                                    ]}
                                >
                                    <Select
                                        loading={listsIsLoading}
                                        allowClear
                                        options={lists?.result.addresses}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Address Additional Notes"
                                    name="address_notes"
                                >
                                    <Input.TextArea />
                                </Form.Item>

                                <Form.Item label="Select Location on Maps">
                                    <Card size="small">
                                        <Space
                                            wrap
                                            size={20}
                                            direction="vertical"
                                            style={{ width: "100%" }}
                                        >
                                            {!position && (
                                                <div style={{ height: "30vh" }}>
                                                    <Dragger
                                                        style={{
                                                            border: "5px",
                                                        }}
                                                        disabled
                                                    >
                                                        <p className="ant-upload-hint">
                                                            No Location Selected
                                                            Yet
                                                        </p>
                                                    </Dragger>
                                                </div>
                                            )}
                                            {position && (
                                                <Tooltip
                                                    trigger="hover"
                                                    defaultOpen
                                                    title="Click here to show the selected location on Maps"
                                                    placement="topRight"
                                                >
                                                    <div>
                                                        <ShowMap
                                                            position={position}
                                                        />
                                                    </div>
                                                </Tooltip>
                                            )}
                                            <div
                                                style={{ textAlign: "center" }}
                                            >
                                                <Space size={30} wrap>
                                                    <Button
                                                        type="primary"
                                                        onClick={() =>
                                                            setIsLocationOnMapModalOpen(
                                                                true
                                                            )
                                                        }
                                                        icon={
                                                            <EnvironmentFilled />
                                                        }
                                                    >
                                                        {position
                                                            ? "Change Location"
                                                            : "Select Location"}
                                                    </Button>

                                                    <Button
                                                        type="dashed"
                                                        disabled={!position}
                                                        danger
                                                        onClick={() => {
                                                            setPosition(null);
                                                            message.warning(
                                                                "Loacation Deleted ..   "
                                                            );
                                                        }}
                                                    >
                                                        Delete Location
                                                    </Button>
                                                </Space>
                                            </div>
                                        </Space>
                                    </Card>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            size="small"
                            type="inner"
                            title="Media & Attachments"
                            style={{ height: "100%" }}
                        >
                            <Form form={eventMediaForm} layout="vertical">
                                <Form.Item label="Photos" name="photos">
                                    <Upload.Dragger
                                        listType="picture"
                                        name="files"
                                        beforeUpload={() => false}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <FileImageOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click or drag photo to this area to
                                            upload
                                        </p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload.
                                        </p>
                                    </Upload.Dragger>
                                </Form.Item>
                                <Form.Item
                                    label="Attachments"
                                    name="attachments"
                                >
                                    <Upload.Dragger
                                        listType="picture"
                                        beforeUpload={() => false}
                                        name="attachments"
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <FileAddOutlined />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click or drag attachments to this
                                            area to upload
                                        </p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload.
                                        </p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card
                            size="small"
                            type="inner"
                            title="Registration Schedule"
                        >
                            <Form
                                form={eventRegistrationForm}
                                layout="vertical"
                            >
                                <Form.Item
                                    label="Registration Date (Start - End)"
                                    name="registration_start_end_date"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please enter event Registration Schedule ",
                                        },
                                    ]}
                                >
                                    <DatePicker.RangePicker
                                        showTime={{ format: "HH:mm" }}
                                        format="YYYY-MM-DD HH:mm"
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </Form.Item>
                                <div
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    <Row
                                        style={{ width: "100%" }}
                                        gutter={[25, 16]}
                                    >
                                        {days.map((_, dayIndex) => (
                                            <>
                                                <Col span={10}>
                                                    <Form.Item
                                                        label={`Day ${
                                                            dayIndex + 1
                                                        }`}
                                                        name={`day_${dayIndex}`}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Please select a date",
                                                            },
                                                        ]}
                                                    >
                                                        <DatePicker
                                                            format={
                                                                "DD-MM-YYYY"
                                                            }
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            value={
                                                                days[dayIndex]
                                                                    .value
                                                                    ? dayjs(
                                                                          days[
                                                                              dayIndex
                                                                          ]
                                                                              .value,
                                                                          "DD-MM-YYYY"
                                                                      )
                                                                    : null
                                                            }
                                                            onChange={(
                                                                date,
                                                                dateString
                                                            ) =>
                                                                handleDateChange(
                                                                    date,
                                                                    dateString,
                                                                    dayIndex
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>
                                                    <Space wrap size={10}>
                                                        {days.length ===
                                                            dayIndex + 1 && (
                                                            <>
                                                                <Button
                                                                    size="small"
                                                                    type="primary"
                                                                    icon={
                                                                        <PlusCircleFilled />
                                                                    }
                                                                    onClick={() =>
                                                                        addDay()
                                                                    }
                                                                    style={{
                                                                        marginRight:
                                                                            "10px",
                                                                    }}
                                                                >
                                                                    Add Day
                                                                </Button>
                                                                <Button
                                                                    size="small"
                                                                    danger
                                                                    // type="primary"
                                                                    icon={
                                                                        <DeleteFilled />
                                                                    }
                                                                    onClick={() =>
                                                                        removeDay(
                                                                            dayIndex
                                                                        )
                                                                    }
                                                                >
                                                                    Delete Day
                                                                </Button>
                                                            </>
                                                        )}
                                                    </Space>
                                                </Col>

                                                <Col span={14}>
                                                    {days[dayIndex]?.slots?.map(
                                                        (slot, slotIndex) => (
                                                            <div
                                                                key={slotIndex}
                                                            >
                                                                <Tooltip
                                                                    title="Click here to add Slot Name"
                                                                    placement="leftTop"
                                                                    defaultOpen={
                                                                        days[
                                                                            dayIndex
                                                                        ]?.value
                                                                    }
                                                                >
                                                                    <Form.Item
                                                                        name={`${dayIndex}_${slotIndex}_slot_name`}
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    "Please select a Slot Name ",
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input
                                                                            size="small"
                                                                            placeholder="Enter Slot Name"
                                                                            disabled={
                                                                                !days[
                                                                                    dayIndex
                                                                                ]
                                                                                    ?.value
                                                                            }
                                                                            style={{
                                                                                border: "none",
                                                                                boxShadow:
                                                                                    "none",
                                                                            }}
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleSlotLabelChange(
                                                                                    dayIndex,
                                                                                    slotIndex,
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                );
                                                                            }}
                                                                            value={
                                                                                slot?.label !=
                                                                                null
                                                                                    ? slot.label
                                                                                    : ""
                                                                            }
                                                                        />
                                                                    </Form.Item>
                                                                </Tooltip>
                                                                <Form.Item
                                                                    name={`${dayIndex}_${slotIndex}`}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message:
                                                                                "Please select a Slot ",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <TimePicker.RangePicker
                                                                        disabled={
                                                                            !days[
                                                                                dayIndex
                                                                            ]
                                                                                ?.value
                                                                        }
                                                                        order={
                                                                            false
                                                                        }
                                                                        showTime={{
                                                                            format: "HH:mm",
                                                                        }}
                                                                        format={
                                                                            "HH:mm"
                                                                        }
                                                                        value={
                                                                            slot?.start_time !=
                                                                                null &&
                                                                            slot?.end_time !=
                                                                                null
                                                                                ? [
                                                                                      dayjs(
                                                                                          slot?.start_time,
                                                                                          "YYYY-MM-DD HH:mm:ss"
                                                                                      ),
                                                                                      dayjs(
                                                                                          slot?.end_time,
                                                                                          "YYYY-MM-DD HH:mm:ss"
                                                                                      ),
                                                                                  ]
                                                                                : [
                                                                                      null,
                                                                                      null,
                                                                                  ]
                                                                        }
                                                                        onChange={(
                                                                            value
                                                                        ) =>
                                                                            handleSlotChange(
                                                                                dayIndex,
                                                                                slotIndex,
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                                {days[dayIndex]
                                                                    ?.slots
                                                                    ?.length ===
                                                                    slotIndex +
                                                                        1 && (
                                                                    <Button
                                                                        size="small"
                                                                        danger
                                                                        // type="primary"
                                                                        icon={
                                                                            <DeleteFilled />
                                                                        }
                                                                        onClick={() =>
                                                                            deleteSlot(
                                                                                dayIndex,
                                                                                slotIndex
                                                                            )
                                                                        }
                                                                        style={{
                                                                            marginBottom:
                                                                                "10px",
                                                                        }}
                                                                    >
                                                                        Delete
                                                                        Slot
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                    <div>
                                                        <Button
                                                            size="small"
                                                            type="primary"
                                                            icon={
                                                                <PlusCircleFilled />
                                                            }
                                                            onClick={() =>
                                                                addSlot(
                                                                    dayIndex
                                                                )
                                                            }
                                                        >
                                                            Add Slot
                                                        </Button>
                                                    </div>
                                                </Col>
                                                {days.length > 1 && (
                                                    <Divider
                                                        style={{
                                                            margin: "12px 0px",
                                                        }}
                                                    />
                                                )}
                                            </>
                                        ))}
                                    </Row>
                                </div>
                            </Form>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "5em",
                            }}
                        >
                            <Button
                                loading={createEventIsLoading}
                                type="primary"
                                onClick={onFormsFinish}
                            >
                                Create Event
                            </Button>
                        </div>
                    </Col>
                </Row>
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
