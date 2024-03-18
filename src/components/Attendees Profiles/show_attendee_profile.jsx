import React, { useState } from "react";
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
    Row,
    Space,
    Statistic,
    Tooltip,
    Typography,
} from "antd";
const { Meta } = Card;

import image1 from "./assets/event_management.png";
import { isLargerThanLG } from "../../utils/antd.utils";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

const ShowAttendeProfile = () => {
    const screens = Grid.useBreakpoint();

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
                style={{
                    width: isLargerThanLG(screens) ? "80%" : "100%",
                }}
                cover={<Image height={250} alt="example" src={image1} />}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Meta
                        avatar={
                            <Avatar
                                size={50}
                                src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                            />
                        }
                        title="Anas Durra"
                        description="Member since feb 23,2024 * Damascus, Syria"
                    />
                    <Space size={14}>
                        <div>
                            <Space.Compact block>
                                <Tooltip title="Settings">
                                    <Button icon={<SettingOutlined />} />
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <Button icon={<EditOutlined />} />
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
                                    <Typography.Text>
                                        Software Engineer
                                    </Typography.Text>
                                    <Space size={10}>
                                        <WhatsAppOutlined />
                                        <LinkedinOutlined />
                                        <FacebookOutlined />
                                        <TwitterOutlined />
                                    </Space>
                                </div>
                            }
                        >
                            <Typography.Text strong>Bio</Typography.Text>
                            <Typography.Paragraph>
                                Display & share text in a large font directly
                                from your browser. Read phone numbers,
                                passwords, IP addresses, etc from across the
                                room.
                            </Typography.Paragraph>
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

export default ShowAttendeProfile;
