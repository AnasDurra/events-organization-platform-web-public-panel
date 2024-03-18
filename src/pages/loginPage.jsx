import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    DatePicker,
    Form,
    Image,
    Input,
    Space,
    Typography,
    Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Password from "antd/es/input/Password";
import Paragraph from "antd/es/skeleton/Paragraph";

import image1 from "../components/Attendees Profiles/assets/Hybrid-illu.png";
import "./styles.css";
import Link from "antd/es/typography/Link";

const LoginPage = () => {
    return (
        <div
            style={{
                // backgroundColor: "wheat",
                minHeight: "100%",
                display: "flex",
                justifyContent: "center",
                // alignItems: "flex-start",
            }}
        >
            <Card>
                <Space
                    // size={0}
                    direction="horizontal"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    <div className="registerImage">
                        <Image
                            width={370}
                            height={1009}
                            src={image1}
                            preview={false}
                        />
                    </div>
                    <div>
                        <div>
                            <Typography.Title>
                                Welcome to Evento
                            </Typography.Title>
                            <Typography.Paragraph
                                style={{ marginBottom: "2em" }}
                            >
                                Join us for Evento ! Register today for
                                exclusive offers and a seamless event
                                experience. <br></br>
                                Already have a Evento Account?{" "}
                                <Link
                                    href="login"
                                    style={{
                                        color: "blue",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Sign In
                                </Link>
                            </Typography.Paragraph>
                        </div>
                        <Card>
                            <Form layout="vertical" style={{ maxWidth: 550 }}>
                                <Form.Item label="First Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Last Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Birth Date">
                                    <DatePicker
                                        style={{
                                            width: "30%",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Profile Picture"
                                    valuePropName="fileList"
                                >
                                    <Upload
                                        action="/upload.do"
                                        listType="picture-card"
                                        maxCount={1}
                                    >
                                        <button
                                            style={{
                                                border: 0,
                                                background: "none",
                                            }}
                                            type="button"
                                        >
                                            <PlusOutlined />
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                }}
                                            >
                                                Upload
                                            </div>
                                        </button>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Password">
                                    <Password type="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Typography.Paragraph>
                                        By continuing past this page, you agree
                                        to the{" "}
                                        <Link
                                            href="terms-of-use"
                                            style={{
                                                color: "blue",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Terms of Use
                                        </Link>{" "}
                                        and understand that information will be
                                        used as described in our{" "}
                                        <Link
                                            href="privacy-policy"
                                            style={{
                                                color: "blue",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Privacy Policy
                                        </Link>
                                        .
                                    </Typography.Paragraph>
                                </Form.Item>
                                <Form.Item
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        style={{ width: "100%" }}
                                    >
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

export default LoginPage;
