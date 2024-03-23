import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    UploadOutlined,
    UserOutlined,
    WhatsAppOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Row,
    Select,
    Space,
    Tooltip,
    Typography,
    Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const UpdateProfileModal = ({ data }) => {
    return (
        <div>
            <Card style={{ width: "100%" }}>
                <Space size={30} direction="vertical">
                    <Space size={50} direction="horizontal">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    size={70}
                                    icon={<UserOutlined />}
                                    //   src={avatarUrl}
                                    style={{
                                        textAlign: "center",
                                        // marginRight: "20px",
                                        marginBottom: "10px",
                                    }}
                                />
                                <Upload
                                    name="avatar"
                                    action="/api/upload-avatar"
                                    //   onChange={handleChange}
                                    showUploadList={false}
                                >
                                    <Button size="small">
                                        <UploadOutlined /> Change Avatar
                                    </Button>
                                </Upload>
                            </div>
                        </div>

                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <Typography.Title level={4}>
                                {data ? data.result.full_name : ""}
                            </Typography.Title>
                            <Space size={10}>
                                <Tooltip
                                //   title={contact.contact_name}
                                //   key={contact.id}
                                >
                                    <a
                                        // href={getContactLink(
                                        //     contact.contact_name
                                        // )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Space size={5}>
                                            {"WhatsApp" && (
                                                <WhatsAppOutlined
                                                    style={{
                                                        fontSize: "19px",
                                                        color: "#25D366",
                                                    }}
                                                />
                                            )}
                                            {"Linkedin" && (
                                                <LinkedinOutlined
                                                    style={{
                                                        fontSize: "19px",
                                                        color: "#0077B5",
                                                    }}
                                                />
                                            )}
                                            {"Facebook" && (
                                                <FacebookOutlined
                                                    style={{
                                                        fontSize: "19px",
                                                        color: "#3b5998",
                                                    }}
                                                />
                                            )}
                                            {"Twitter" && (
                                                <TwitterOutlined
                                                    style={{
                                                        fontSize: "19px",
                                                        color: "#1DA1F2",
                                                    }}
                                                />
                                            )}
                                        </Space>

                                        <Form
                                            // form={form}
                                            autoComplete="off"
                                            layout="vertical"
                                            style={{ maxWidth: 550 }}
                                            className="my-custom-form"
                                        >
                                            <Form.Item
                                                label="Profile Picture"
                                                name="profile_img"
                                            ></Form.Item>

                                            <Form.Item
                                                label="Birth Date"
                                                name="birth_date"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please select your birth date",
                                                    },
                                                ]}
                                            >
                                                <DatePicker
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                />
                                            </Form.Item>

                                            <Form.Item label="Job" name="job">
                                                <Select
                                                    //   loading={isLoading}
                                                    showSearch
                                                    placeholder="Select your job"
                                                    options={data?.result.jobs}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="Address"
                                                name="address"
                                            >
                                                <Select
                                                    //   loading={isLoading}
                                                    showSearch
                                                    placeholder="Select your address"
                                                    options={
                                                        data?.result.addresses
                                                    }
                                                />
                                            </Form.Item>

                                            <Form.Item label="Bio" name="bio">
                                                <TextArea
                                                    placeholder="Tell us about yourself..."
                                                    allowClear
                                                />
                                            </Form.Item>
                                        </Form>
                                    </a>
                                </Tooltip>
                            </Space>
                        </div>
                    </Space>
                </Space>
            </Card>
        </div>
    );
};

export default UpdateProfileModal;
