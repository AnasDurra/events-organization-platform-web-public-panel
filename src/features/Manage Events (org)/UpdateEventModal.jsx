import { Divider, Modal, Space, Spin, Tag } from "antd";
import { useState } from "react";
import { Typography, Form, Input, DatePicker, InputNumber, Button } from "antd";
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
} from "@ant-design/icons";
import UpdateEventDetailsModal from "./UpdateEventDetailsModal";

import ShowMap from "./ShowMap";
import UpdateEventTagsModal from "./UpdateEventTagsModal";
import UpdateEventAgeGroupModal from "./UpdateEventAgeGroupModal";

const UpdateEventModal = ({
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    eventData,
    refetch,
    eventDataIsLoading,
    isFetching,
}) => {
    const handleOk = () => {
        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    const [isUpdateEventDetailsModalOpen, setIsUpdateEventDetailsModalOpen] = useState(false);

    const [isUpdateEventTagsModalOpen, setIsUpdateEventTagsModalOpen] = useState(false);
    const [isUpdateEventAgeGroupModalOpen, setIsUpdateEventAgeGroupModalOpen] = useState(false);

    return (
        <div>
            <Modal
                title={
                    <>
                        <Title style={{ marginTop: "0px" }} level={4}>
                            Update Event
                        </Title>
                        <Divider style={{ marginBottom: "0px" }} />
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
                            padding: "20px",
                            background: "#fdfdfd",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <Title level={2} style={{ margin: 0 }}>
                                Event Details
                            </Title>
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                style={{ border: "none", color: "#1890ff" }}
                                onClick={() => {
                                    setIsUpdateEventDetailsModalOpen(true);
                                }}
                            >
                                Edit
                            </Button>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <EditOutlined style={{ marginRight: "8px", color: "#1890ff" }} />{" "}
                                <strong>Title:</strong> {eventData?.result?.title}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <InfoCircleOutlined style={{ marginRight: "8px", color: "#1890ff" }} />{" "}
                                <strong>Description:</strong> {eventData?.result?.description}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <SettingOutlined style={{ marginRight: "8px", color: "#1890ff" }} />{" "}
                                <strong>Event Type:</strong> {eventData?.result?.event_type}
                            </Paragraph>

                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <EnvironmentOutlined style={{ marginRight: "8px", color: "#1890ff" }} />{" "}
                                <strong>Location:</strong>{" "}
                                {
                                    <div style={{ margin: "15px 10px" }}>
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
                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <EnvironmentOutlined style={{ marginRight: "8px", color: "#1890ff" }} />{" "}
                                <strong>Address Notes</strong>{" "}
                                {eventData?.result?.address_notes ?? "No additional notes"}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <CalendarOutlined style={{ marginRight: "8px", color: "#1890ff" }} />{" "}
                                <strong>Start Date & Time:</strong> {eventData?.result?.registration_start_date}
                            </Paragraph>
                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <CalendarOutlined style={{ marginRight: "8px", color: "#1890ff" }} />{" "}
                                <strong>End Date & Time:</strong>
                                {eventData?.result?.registration_end_date}
                            </Paragraph>

                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <TeamOutlined style={{ marginRight: "8px", color: "#1890ff" }} />{" "}
                                <strong>Capacity:</strong> {eventData?.result?.capacity}
                            </Paragraph>
                        </div>
                    </div>
                    <Divider />
                    <div
                        style={{
                            padding: "20px",
                            background: "#fdfdfd",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <Title level={2} style={{ margin: 0 }}>
                                Event Tags
                            </Title>
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                style={{ border: "none", color: "#1890ff" }}
                                onClick={() => {
                                    setIsUpdateEventTagsModalOpen(true);
                                }}
                            >
                                Edit
                            </Button>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <TagsOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                                <strong> Event Tags:</strong>{" "}
                            </Paragraph>
                            {
                                <Space wrap>
                                    <Typography.Text strong></Typography.Text>
                                    <div>
                                        {eventData?.result?.tags.length === 0
                                            ? "No Tags for this event"
                                            : eventData?.result?.tags.map((tag) => (
                                                  <Tag
                                                      key={tag?.tag?.value}
                                                      style={{
                                                          padding: "2px 10px",
                                                          margin: "5px",
                                                          fontSize: "15px",
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
                            padding: "20px",

                            background: "#fdfdfd",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <Title level={2} style={{ margin: 0 }}>
                                Event Age Group
                            </Title>
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                style={{ border: "none", color: "#1890ff" }}
                                onClick={() => {
                                    setIsUpdateEventAgeGroupModalOpen(true);
                                }}
                            >
                                Edit
                            </Button>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <Paragraph style={{ marginBottom: "12px", color: "#666" }}>
                                <UserOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                                <strong> Event Age Group:</strong>{" "}
                            </Paragraph>
                            {
                                <Space wrap>
                                    <Typography.Text strong></Typography.Text>
                                    <div>
                                        {eventData?.result?.age_groups.length === 0
                                            ? "No Age Groups for this event"
                                            : eventData?.result?.age_groups.map((age_group) => (
                                                  <Tag
                                                      key={age_group?.age_group_id}
                                                      style={{
                                                          fontSize: "15px",
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
