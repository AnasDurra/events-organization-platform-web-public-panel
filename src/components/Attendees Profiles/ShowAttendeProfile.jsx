import React, { useEffect, useState } from "react";
import {
    AntDesignOutlined,
    CheckOutlined,
    CommentOutlined,
    DownloadOutlined,
    EditOutlined,
    EllipsisOutlined,
    FacebookOutlined,
    HeartOutlined,
    LikeOutlined,
    LinkedinOutlined,
    LoadingOutlined,
    MailOutlined,
    MobileOutlined,
    PlusOutlined,
    SettingOutlined,
    ShareAltOutlined,
    StarFilled,
    StarOutlined,
    TwitterOutlined,
    UserOutlined,
    WarningOutlined,
    WhatsAppOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Col,
    Dropdown,
    Grid,
    Image,
    Menu,
    Modal,
    Row,
    Skeleton,
    Space,
    Statistic,
    Tooltip,
    Typography,
} from "antd";
const { Meta } = Card;

import image1 from "./assets/event_management.png";
import { isLargerThanLG } from "../../utils/antd.utils";
import { useViewMyProfileQuery } from "../../api/services/attendeeProfile";
import UpdateProfileModal from "../Modals/UpdateProfileModal";

const ShowAttendeProfile = () => {
    const screens = Grid.useBreakpoint();

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const showModal = () => {
        setIsUpdateModalOpen(true);
    };
    const handleOk = () => {
        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    const { data, error, isLoading } = useViewMyProfileQuery();

    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
                style={{
                    width: isLargerThanLG(screens) ? "80%" : "100%",
                }}
                cover={
                    <Image
                        height={250}
                        alt="example"
                        src={
                            data?.cover_img ?? "https://picsum.photos/1000/300"
                        }
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Skeleton
                        loading={isLoading}
                        active
                        avatar
                        paragraph={{
                            rows: 1,
                            width: "90%",
                        }}
                    >
                        <Meta
                            avatar={
                                <Avatar
                                    size={50}
                                    src={
                                        data?.result.profile_img ??
                                        "https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                                    }
                                />
                            }
                            title={data ? data.result.full_name : ""}
                            description={
                                data
                                    ? `Member since ${formatDate(
                                          data.result.join_date
                                      )} * ${data.result.address}, Syria`
                                    : ""
                            }
                        />
                    </Skeleton>

                    <Space size={14}>
                        <div>
                            <Space.Compact block>
                                <Tooltip title="Settings">
                                    <Button icon={<SettingOutlined />} />
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <Button
                                        icon={<EditOutlined />}
                                        onClick={() =>
                                            setIsUpdateModalOpen(true)
                                        }
                                    />
                                </Tooltip>

                                <Dropdown
                                    placement="bottomRight"
                                    overlay={
                                        <Menu
                                            items={[
                                                {
                                                    key: "1",
                                                    label: "Report",
                                                    icon: <WarningOutlined />,
                                                },
                                                {
                                                    key: "2",
                                                    label: "Mail",
                                                    icon: <MailOutlined />,
                                                },
                                                {
                                                    key: "3",
                                                    label: "Mobile",
                                                    icon: <MobileOutlined />,
                                                },
                                            ]}
                                        />
                                    }
                                    trigger={["click"]}
                                >
                                    <Button icon={<EllipsisOutlined />} />
                                </Dropdown>
                            </Space.Compact>
                        </div>
                    </Space>
                </div>

                <Row
                    gutter={[16, 12]}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1.5em",
                        width: "100%",
                    }}
                >
                    <Col span={isLargerThanLG(screens) ? 14 : 24}>
                        <Card
                            title={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Skeleton
                                        loading={isLoading}
                                        active
                                        paragraph={{
                                            rows: 0,
                                            width: "50%",
                                        }}
                                    >
                                        <Typography.Text>
                                            {data?.result.job ??
                                                "Does Not Work"}
                                        </Typography.Text>
                                        <Space size={10}>
                                            {data?.result.contacts?.map(
                                                (contact) => (
                                                    <Tooltip
                                                        title={
                                                            contact.contact_name
                                                        }
                                                        key={contact.id}
                                                    >
                                                        <a
                                                            href={getContactLink(
                                                                contact.contact_name
                                                            )}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {contact.contact_name ===
                                                                "WhatsApp" && (
                                                                <WhatsAppOutlined
                                                                    style={{
                                                                        fontSize:
                                                                            "24px",
                                                                        color: "#25D366",
                                                                    }}
                                                                />
                                                            )}
                                                            {contact.contact_name ===
                                                                "Linkedin" && (
                                                                <LinkedinOutlined
                                                                    style={{
                                                                        fontSize:
                                                                            "24px",
                                                                        color: "#0077B5",
                                                                    }}
                                                                />
                                                            )}
                                                            {contact.contact_name ===
                                                                "Facebook" && (
                                                                <FacebookOutlined
                                                                    style={{
                                                                        fontSize:
                                                                            "24px",
                                                                        color: "#3b5998",
                                                                    }}
                                                                />
                                                            )}
                                                            {contact.contact_name ===
                                                                "Twitter" && (
                                                                <TwitterOutlined
                                                                    style={{
                                                                        fontSize:
                                                                            "24px",
                                                                        color: "#1DA1F2",
                                                                    }}
                                                                />
                                                            )}
                                                        </a>
                                                    </Tooltip>
                                                )
                                            )}
                                        </Space>
                                    </Skeleton>
                                </div>
                            }
                        >
                            <Skeleton
                                loading={isLoading}
                                active
                                avatar
                                paragraph={{
                                    rows: 1,
                                    width: "100%",
                                }}
                            >
                                <Typography.Text strong>Bio</Typography.Text>
                                <Typography.Paragraph>
                                    {data ? data.result.bio : ""}
                                </Typography.Paragraph>
                            </Skeleton>
                        </Card>
                    </Col>
                    <Col
                        style={{ minWidth: 300 }}
                        span={isLargerThanLG(screens) ? 6 : 12}
                    >
                        <Card
                            style={{ paddingBottom: "0px", margin: "0px" }}
                            hoverable
                            size="small"
                            type="inner"
                        >
                            <div style={{ textAlign: "center" }}>
                                <div>
                                    <Row gutter={20}>
                                        <Col
                                            style={{ padding: "0px" }}
                                            span={12}
                                        >
                                            <Statistic
                                                title={
                                                    <div
                                                    // style={{
                                                    //     display: "flex",
                                                    //     justifyContent: "center",
                                                    // }}
                                                    >
                                                        <h3>Following</h3>
                                                    </div>
                                                }
                                                value={1128}
                                                prefix={
                                                    <UserOutlined
                                                        style={{
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                }
                                            />
                                        </Col>
                                        <Col
                                            style={{ padding: "0px" }}
                                            span={12}
                                        >
                                            <Statistic
                                                title={
                                                    <div
                                                    // style={{
                                                    //     display: "flex",
                                                    //     justifyContent: "center",
                                                    // }}
                                                    >
                                                        <h3>Badges</h3>
                                                    </div>
                                                }
                                                value={" "}
                                                prefix={
                                                    <Avatar.Group>
                                                        {badges.map((badge) => (
                                                            <Tooltip
                                                                title={
                                                                    badge.name
                                                                }
                                                                key={badge.id}
                                                            >
                                                                <Avatar
                                                                    size={35}
                                                                    style={{
                                                                        backgroundColor:
                                                                            badge.bgcolor,
                                                                        marginRight:
                                                                            "3.5px",
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            badge.name
                                                                        }
                                                                    </span>
                                                                </Avatar>
                                                            </Tooltip>
                                                        ))}
                                                    </Avatar.Group>
                                                }
                                            />
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col
                                            style={{ padding: "0px" }}
                                            span={12}
                                        >
                                            <Statistic
                                                title={
                                                    <div
                                                    // style={{
                                                    //     display: "flex",
                                                    //     justifyContent: "center",
                                                    // }}
                                                    >
                                                        <h3>Events</h3>
                                                    </div>
                                                }
                                                value={1128}
                                                prefix={
                                                    <CheckOutlined
                                                        style={{
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                }
                                            />
                                        </Col>

                                        <Col
                                            style={{ padding: "0px" }}
                                            span={12}
                                        >
                                            <Statistic
                                                title={
                                                    <div
                                                    // style={{
                                                    //     display: "flex",
                                                    //     justifyContent: "center",
                                                    // }}
                                                    >
                                                        <h3>Level</h3>
                                                    </div>
                                                }
                                                value={5}
                                                prefix={
                                                    <StarFilled
                                                        style={{
                                                            color: "#FFD700",
                                                        }}
                                                    />
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Modal
                title="Basic Modal"
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                <UpdateProfileModal data={data} />
            </Modal>
        </div>
    );
};

const badges = [
    {
        id: 1,
        name: "badge 1",
        bgcolor: "#3F51B5",
    },
    {
        id: 2,
        name: "badge 2",
        bgcolor: "#FFC107",
    },
    {
        id: 3,
        name: "badge 3",
        bgcolor: "#4CAF50",
    },
];

// Function to format the date
function formatDate(dateString) {
    if (dateString) {
        const dateParts = dateString.split("-");
        const date = new Date(
            `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        );
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    return "";
}
export default ShowAttendeProfile;

function getContactLink(contactName) {
    switch (contactName) {
        case "WhatsApp":
            return "https://wa.me/";
        case "Linkedin":
            return "https://linkedin.com/";
        case "Facebook":
            return "https://facebook.com/";
        case "Twitter":
            return "https://twitter.com/";
        default:
            return "#";
    }
}
