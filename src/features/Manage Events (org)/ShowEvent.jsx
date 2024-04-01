import {
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Image,
    List,
    Modal,
    Row,
    Skeleton,
    Space,
    Table,
    Tag,
    Tooltip,
    Typography,
    Upload,
    message,
} from "antd";
import {
    ArrowRightOutlined,
    CalendarOutlined,
    EditOutlined,
    EnvironmentOutlined,
    FileImageOutlined,
    ScheduleFilled,
    ScheduleOutlined,
    TagsOutlined,
    UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowMap from "./ShowMap";

import { useShowQuery } from "../../api/services/events";
import UpdateEventModal from "./UpdateEventModal";

const ShowEvent = () => {
    const { id } = useParams();

    const {
        data: eventData,
        error,
        isLoading: eventDataIsLoading,
        refetch,
    } = useShowQuery();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const dataSource = [
        {
            key: "1",
            name: "General Admission",
            price: 100,
            qty: 10,
        },
    ];

    const columns = [
        {
            title: "Available Tickets",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Qty*",
            dataIndex: "qty",
            key: "qty",
        },
    ];

    const handleRegisterClicked = () => {
        message.success("registered successfully");
    };
    useEffect(() => {
        console.log(eventData);
        console.log(error);
    }, [eventData, error]);
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Skeleton
                loading={eventDataIsLoading}
                active
                round
                paragraph={{ rows: 10 }}
            >
                <Card
                    bodyStyle={{ padding: "20px 20px 20px 20px" }}
                    cover={
                        <>
                            <Image
                                height={250}
                                src="https://picsum.photos/1000/300"
                            />
                        </>
                    }
                >
                    <Row gutter={[50, 30]}>
                        <Col span={24}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Space size={0} direction="vertical">
                                    <Space>
                                        <Typography.Title
                                            style={{ marginTop: "10px" }}
                                            level={4}
                                        >
                                            {eventData?.result?.title}
                                        </Typography.Title>
                                        <Typography.Title
                                            style={{ marginTop: "10px" }}
                                            level={5}
                                            disabled
                                        >
                                            ({eventData?.result?.event_type})
                                        </Typography.Title>
                                    </Space>
                                    <Space>
                                        <Typography.Text
                                            level={5}
                                            disabled
                                            style={{ marginTop: "0px" }}
                                        >
                                            {(() => {
                                                const registrationStartDate =
                                                    new Date(
                                                        eventData?.result?.registration_start_date
                                                    );

                                                const currentDate = new Date();

                                                const differenceInMilliseconds =
                                                    currentDate -
                                                    registrationStartDate;

                                                const differenceInDays =
                                                    Math.floor(
                                                        differenceInMilliseconds /
                                                            (1000 *
                                                                60 *
                                                                60 *
                                                                24)
                                                    );

                                                return `${differenceInDays} days ago`;
                                            })()}
                                        </Typography.Text>
                                        <Typography.Text
                                            level={5}
                                            underline
                                            style={{ marginTop: "0px" }}
                                        >
                                            by @
                                            <a href="@organizer120">
                                                {
                                                    eventData?.result
                                                        ?.organization?.name
                                                }
                                            </a>
                                        </Typography.Text>
                                    </Space>
                                </Space>
                                <Tooltip title="Edit Event">
                                    <Button
                                        icon={<EditOutlined />}
                                        onClick={() =>
                                            setIsUpdateModalOpen(true)
                                        }
                                    />
                                </Tooltip>
                            </div>
                        </Col>
                        {/* <Col span={4}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            w
                        </div>
                    </Col> */}

                        <Col xs={24} md={12}>
                            <Table
                                style={{
                                    height: "100%",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                                }}
                                dataSource={dataSource}
                                columns={columns}
                                bordered
                                pagination={false}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <Descriptions
                                bordered
                                column={1}
                                style={{
                                    width: "100%",
                                }}
                            >
                                <Descriptions.Item label="Registration Start Date">
                                    {eventData?.result?.registration_start_date}
                                </Descriptions.Item>
                                <Descriptions.Item label="Registration End Date">
                                    {eventData?.result?.registration_end_date}
                                </Descriptions.Item>
                            </Descriptions>
                            <Button
                                size="large"
                                onClick={handleRegisterClicked}
                                style={{
                                    width: "100%",
                                    height: "6vh",
                                    border: "2px solid #000000",
                                    backgroundColor: "#8B0000",
                                    borderColor: "#8B0000",
                                    color: "white",
                                    borderRadius: "4px",
                                    padding: "0px 20px",

                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                Register Now
                            </Button>
                        </Col>

                        <Col span={24}>
                            <Divider />
                            <Typography.Title
                                style={{ margin: "0px" }}
                                level={3}
                                strong
                            >
                                Event Overview
                            </Typography.Title>
                        </Col>
                        <Col span={24}>
                            <Card
                                style={{
                                    height: "100%",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Space direction="vertical" wrap>
                                    <Typography.Text>
                                        {eventData?.result?.description}
                                    </Typography.Text>
                                </Space>
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Divider />
                            <Typography.Title
                                style={{ margin: "0px" }}
                                level={3}
                                strong
                            >
                                Event Detials
                            </Typography.Title>
                        </Col>
                        <Col xs={24} lg={12}>
                            <div
                                style={{
                                    display: "flex",
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                                <Row style={{ flex: 1 }} gutter={[20, 10]}>
                                    <Col span={24}>
                                        <Card
                                            type="inner"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                padding: "10px",
                                                borderRadius: "8px",
                                                boxShadow:
                                                    "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                        >
                                            <Space
                                                direction="vertical"
                                                size={30}
                                            >
                                                <Space wrap>
                                                    <TagsOutlined />
                                                    <Typography.Text strong>
                                                        Event Tags:
                                                    </Typography.Text>
                                                    <div>
                                                        {eventData?.result?.tags
                                                            .length === 0
                                                            ? "No Tags for this event"
                                                            : eventData?.result?.tags.map(
                                                                  (tag) => {
                                                                      <Tag>
                                                                          {
                                                                              tag
                                                                                  ?.tag
                                                                                  ?.label
                                                                          }
                                                                      </Tag>;
                                                                  }
                                                              )}
                                                    </div>
                                                </Space>

                                                <Space wrap Space>
                                                    <UserOutlined />
                                                    <Typography.Text strong>
                                                        Event Target Age Group:
                                                    </Typography.Text>
                                                    <div>
                                                        {eventData?.result
                                                            ?.age_groups
                                                            .length === 0
                                                            ? "No Age Groups for this event"
                                                            : eventData?.result?.age_groups.map(
                                                                  (
                                                                      age_group
                                                                  ) => {
                                                                      <Tag>
                                                                          {
                                                                              age_group?.age_group_name
                                                                          }
                                                                      </Tag>;
                                                                  }
                                                              )}
                                                    </div>
                                                </Space>
                                            </Space>
                                        </Card>
                                    </Col>
                                    <Col span={24}>
                                        <Card
                                            type="inner"
                                            style={{
                                                height: "100%",
                                                padding: "10px",
                                                borderRadius: "8px",
                                                boxShadow:
                                                    "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                        >
                                            <Space
                                                style={{ width: "100%" }}
                                                direction="vertical"
                                                size={10}
                                            >
                                                <Space>
                                                    <EnvironmentOutlined />
                                                    <Typography.Text strong>
                                                        Event Address:
                                                    </Typography.Text>
                                                </Space>
                                                <Divider
                                                    style={{
                                                        margin: "10px 0px",
                                                    }}
                                                />
                                                {eventData?.result?.location
                                                    ?.latitude && (
                                                    <ShowMap
                                                        position={{
                                                            lat: eventData
                                                                ?.result
                                                                ?.location
                                                                ?.latitude
                                                                ? parseFloat(
                                                                      eventData
                                                                          .result
                                                                          .location
                                                                          .latitude
                                                                  )
                                                                : 0,
                                                            lng: eventData
                                                                ?.result
                                                                ?.location
                                                                ?.longitude
                                                                ? parseFloat(
                                                                      eventData
                                                                          .result
                                                                          .location
                                                                          .longitude
                                                                  )
                                                                : 0,
                                                        }}
                                                    />
                                                )}
                                                <Typography.Text>
                                                    <strong>
                                                        Event Address:{" "}
                                                    </strong>
                                                    {
                                                        eventData?.result
                                                            ?.address?.label
                                                    }
                                                </Typography.Text>
                                                <Typography.Text>
                                                    <strong>
                                                        Address Note:
                                                    </strong>{" "}
                                                    {eventData?.result
                                                        ?.address_notes ??
                                                        "No additional notes"}
                                                </Typography.Text>
                                            </Space>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card
                                type="inner"
                                style={{
                                    height: "100%",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Space
                                    direction="vertical"
                                    style={{ width: "100%" }}
                                    size={20}
                                >
                                    <Space>
                                        <ScheduleOutlined />
                                        <Typography.Text
                                            strong
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Event Schedule:
                                        </Typography.Text>
                                    </Space>
                                    <Divider style={{ margin: "0px" }} />
                                    {fakeData.map((dateObj, index) => (
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: "100%",
                                            }}
                                            size={20}
                                            key={index}
                                        >
                                            <Space>
                                                <CalendarOutlined />
                                                <Typography.Text
                                                    strong
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {dateObj.day_date}
                                                </Typography.Text>
                                            </Space>
                                            <List
                                                bordered
                                                dataSource={dateObj.slots}
                                                renderItem={(slot, i) => (
                                                    <>
                                                        <Typography.Text
                                                            strong
                                                            style={{
                                                                padding:
                                                                    "12px 24px",
                                                            }}
                                                        >
                                                            {slot.label}
                                                        </Typography.Text>
                                                        <List.Item
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <div>
                                                                <Typography.Text>
                                                                    {formatDate(
                                                                        slot.start_time
                                                                    )}
                                                                </Typography.Text>
                                                            </div>

                                                            <ArrowRightOutlined
                                                                style={{
                                                                    margin: "0em 1em",
                                                                }}
                                                            />
                                                            <div>
                                                                <Typography.Text>
                                                                    {formatDate(
                                                                        slot.end_time
                                                                    )}
                                                                </Typography.Text>
                                                            </div>
                                                        </List.Item>
                                                    </>
                                                )}
                                            />
                                        </Space>
                                    ))}
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                {isUpdateModalOpen && (
                    <UpdateEventModal
                        isUpdateModalOpen={isUpdateModalOpen}
                        setIsUpdateModalOpen={setIsUpdateModalOpen}
                        eventData={eventData}
                    />
                )}
            </Skeleton>
        </div>
    );
};

export default ShowEvent;
const fakeData = [
    {
        day_date: "2024-04-01",
        slots: [
            {
                label: "intro",
                start_time: "2024-04-01 10:00:00",
                end_time: "2024-04-01 12:00:00",
                slot_status: {
                    value: "1",
                    status: "Pending",
                },
            },
            {
                label: "intro 2",
                start_time: "2024-04-01 16:00:00",
                end_time: "2024-04-01 22:00:00",
                slot_status: {
                    value: "1",
                    status: "Pending",
                },
            },
        ],
    },
    {
        day_date: "2024-04-02",
        slots: [
            {
                label: "intro",
                start_time: "2024-04-01 12:00:00",
                end_time: "2024-04-01 14:00:00",
                slot_status: {
                    value: "1",
                    status: "Pending",
                },
            },
            {
                label: "intro 2",
                start_time: "2024-04-01 13:00:00",
                end_time: "2024-04-01 19:00:00",
                slot_status: {
                    value: "1",
                    status: "Pending",
                },
            },
        ],
    },
    // More fake data entries...
];

function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return formattedTime;
}
