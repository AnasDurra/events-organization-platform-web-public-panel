import {
    EditOutlined,
    EllipsisOutlined,
    EnvironmentFilled,
    FileAddOutlined,
    FileImageOutlined,
    InboxOutlined,
    MailOutlined,
    MobileOutlined,
    WarningOutlined,
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
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import LocationOnMapsModal from "../Modals/LocationOnMapsModal";

import mapImage from "./assets/map.png";

const CreateEvent = () => {
    const [coverImage, setCoverImage] = useState(null);
    const [isLocationOnMapModalOpen, setIsLocationOnMapModalOpen] =
        useState(null);

    const [days, setDays] = useState([{ value: null, timestamps: [null] }]);

    // For Select Location on Maps
    const [position, setPosition] = useState(null);

    const addTimestamp = (dayIndex) => {
        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].timestamps.push(null);
            return newDays;
        });
    };
    const deleteTimestamp = (dayIndex, timestampIndex) => {
        const newDays = [...days];
        if (newDays[dayIndex]?.timestamps?.length > 1) {
            newDays[dayIndex].timestamps.splice(timestampIndex, 1);
            setDays(newDays);
        }
    };
    const addDay = () => {
        setDays((prevDays) => [
            ...prevDays,
            { value: null, timestamps: [null] },
        ]);
        console.log(days);
    };
    const removeDay = (dayIndex) => {
        if (days.length > 1) {
            setDays((prevDays) =>
                prevDays.filter((day, index) => index !== dayIndex)
            );
        }
    };

    const handleTimestampChange = (dayIndex, timestampIndex, value) => {
        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].timestamps[timestampIndex] = value;
            return newDays;
        });
    };
    const handleDateChange = (date, dateString, dayIndex) => {
        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].value = date;
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
                            <Form layout="vertical">
                                <Form.Item label="Event Name">
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Event Descreption">
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Event Capacity">
                                    <Slider />
                                </Form.Item>
                                <Form.Item label="Event Type (Online - Onsite)">
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

                                <Form.Item label="Target Age Group">
                                    <Select
                                        allowClear
                                        options={[
                                            {
                                                value: "1",
                                                label: "+12",
                                            },
                                            {
                                                value: "2",
                                                label: "+23",
                                            },
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item label="Tags">
                                    <Select
                                        allowClear
                                        options={[
                                            {
                                                value: "1",
                                                label: "Games",
                                            },
                                            {
                                                value: "2",
                                                label: "Programming",
                                            },
                                        ]}
                                    />
                                </Form.Item>

                                <Form.Item label="Address">
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
                                </Form.Item>

                                <Form.Item label="Select on Google Maps">
                                    <Card size="small">
                                        <Space wrap size={40}>
                                            {position && (
                                                <Tooltip
                                                    trigger="hover"
                                                    defaultOpen
                                                    title="Click here to show the selected location on Maps"
                                                >
                                                    <Button
                                                        style={{
                                                            padding: 0,
                                                            // border: "none",
                                                            display:
                                                                "inline-block",
                                                            width: 110,
                                                            height: 100,
                                                        }}
                                                        onClick={() =>
                                                            setIsLocationOnMapModalOpen(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            preview={false}
                                                            width={100}
                                                            height={90}
                                                            src={mapImage}
                                                            // onClick={(e) =>
                                                            //     e.stopPropagation()
                                                            // }
                                                        />
                                                    </Button>
                                                </Tooltip>
                                            )}
                                            <Space size={30} wrap>
                                                <Button
                                                    type="primary"
                                                    onClick={() =>
                                                        setIsLocationOnMapModalOpen(
                                                            true
                                                        )
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
                            <Form
                                layout="vertical"
                                style={
                                    {
                                        //     maxWidth: 600,
                                        // width: "80%",
                                    }
                                }
                            >
                                <Form.Item label="Photos">
                                    <Form.Item
                                        name="photos"
                                        // valuePropName="fileList"
                                        // getValueFromEvent={normFile}
                                        noStyle
                                    >
                                        <Upload.Dragger
                                            name="files"
                                            beforeUpload={() => false}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <FileImageOutlined />
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag photo to this area
                                                to upload
                                            </p>
                                            <p className="ant-upload-hint">
                                                Support for a single or bulk
                                                upload.
                                            </p>
                                        </Upload.Dragger>
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="attachments">
                                    <Form.Item
                                        name="attachments"
                                        // valuePropName="fileList"
                                        // getValueFromEvent={normFile}
                                        noStyle
                                    >
                                        <Upload.Dragger
                                            beforeUpload={() => false}
                                            name="attachments"
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <FileAddOutlined />
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag attachments to
                                                this area to upload
                                            </p>
                                            <p className="ant-upload-hint">
                                                Support for a single or bulk
                                                upload.
                                            </p>
                                        </Upload.Dragger>
                                    </Form.Item>
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
                                layout="vertical"
                                style={
                                    {
                                        //     maxWidth: 600,
                                        // width: "80%",
                                    }
                                }
                            >
                                <Form.Item label="Registration Date (Start - End)">
                                    <DatePicker.RangePicker
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
                                                <Col span={12}>
                                                    <Form.Item
                                                        label={`Day ${
                                                            dayIndex + 1
                                                        }`}
                                                    >
                                                        <DatePicker
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            value={
                                                                days[dayIndex]
                                                                    .value
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
                                                            <Button
                                                                size="small"
                                                                type="primary"
                                                                onClick={() =>
                                                                    addDay()
                                                                }
                                                                style={{
                                                                    marginRight:
                                                                        "10px",
                                                                    // backgroundColor:
                                                                    //     "#1890ff",
                                                                    // color: "white",
                                                                    // border: "none",
                                                                }}
                                                            >
                                                                + Add Day
                                                            </Button>
                                                        )}
                                                        <Button
                                                            size="small"
                                                            danger
                                                            type="primary"
                                                            onClick={() =>
                                                                removeDay(
                                                                    dayIndex
                                                                )
                                                            }
                                                            style={
                                                                {
                                                                    //   backgroundColor:
                                                                    //       "#ff4d4f",
                                                                    //   color: "white",
                                                                    //   border: "none",
                                                                }
                                                            }
                                                        >
                                                            - Delete Day
                                                        </Button>
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    {days[
                                                        dayIndex
                                                    ]?.timestamps?.map(
                                                        (
                                                            timestamp,
                                                            timestampIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    timestampIndex
                                                                }
                                                            >
                                                                <Form.Item
                                                                    label={`Timestamp ${
                                                                        timestampIndex +
                                                                        1
                                                                    }`}
                                                                >
                                                                    <TimePicker.RangePicker
                                                                        value={
                                                                            timestamp
                                                                        }
                                                                        onChange={(
                                                                            value
                                                                        ) =>
                                                                            handleTimestampChange(
                                                                                dayIndex,
                                                                                timestampIndex,
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                                <Button
                                                                    size="small"
                                                                    danger
                                                                    type="primary"
                                                                    onClick={() =>
                                                                        deleteTimestamp(
                                                                            dayIndex,
                                                                            timestampIndex
                                                                        )
                                                                    }
                                                                    style={{
                                                                        //     backgroundColor:
                                                                        //         "#ff4d4f",
                                                                        //     color: "white",
                                                                        //     border: "none",
                                                                        marginBottom:
                                                                            "10px",
                                                                    }}
                                                                >
                                                                    - Delete
                                                                    Timestamp
                                                                </Button>
                                                            </div>
                                                        )
                                                    )}
                                                    <div>
                                                        <Button
                                                            size="small"
                                                            type="primary"
                                                            onClick={() =>
                                                                addTimestamp(
                                                                    dayIndex
                                                                )
                                                            }
                                                        >
                                                            + Add Timestamp
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
