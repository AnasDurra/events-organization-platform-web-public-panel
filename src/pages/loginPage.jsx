import {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Form,
    Image,
    Input,
    Space,
    Spin,
    Typography,
} from "antd";
import Password from "antd/es/input/Password";
import Link from "antd/es/typography/Link";
import { message } from "antd";

import image1 from "../components/Attendees Profiles/assets/Hybrid-illu.png";
import "../components/Attendees Profiles/styles/styles.css";
import { useLoginMutation } from "../api/services/auth";
import { useState } from "react";
import FormWelcomeTitle from "../components/Form/FormWelcomeTitle";

export default function RegisterAttendee() {
    const [loginMutation, { isLoading, isError, error }] = useLoginMutation();

    const onFinish = async (values) => {
        const data = {
            username: values.username,
            password: values.password,
        };
        console.log(data);

        loginMutation(data)
            .unwrap()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error("Error:", error);
                message.error(error.data.message);
            });
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Card>
                <Space
                    direction="horizontal"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    <div className="registerImage">
                        <Image
                            width={320}
                            height={800}
                            src={image1}
                            preview={false}
                        />
                    </div>
                    <div>
                        <Card
                            style={{
                                minHeight: "750px",
                                width: "100%",
                                maxWidth: "430px",
                            }}
                        >
                            <Spin spinning={isLoading}>
                                <FormWelcomeTitle
                                    title={"Welcome Back !"}
                                    paragraph={
                                        <>
                                            New to Evento?{" "}
                                            <Link
                                                href="register"
                                                style={{
                                                    color: "blue",
                                                    fontWeight: "bold",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    }
                                />
                                <Form
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    layout="vertical"
                                    style={{ maxWidth: 550 }}
                                    className="my-custom-form"
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please enter your Username",
                                            },
                                            {
                                                min: 2,
                                                message:
                                                    "Username must be at least 3 characters",
                                            },
                                            {
                                                max: 50,
                                                message:
                                                    "Username cannot exceed 12 characters",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please enter your password",
                                            },
                                            {
                                                min: 8,
                                                message:
                                                    "Password must be at least 8 characters",
                                            },
                                            {
                                                max: 20,
                                                message:
                                                    "Password cannot exceed 20 characters",
                                            },
                                            // {
                                            //     pattern:
                                            //         /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            //     message:
                                            //         "Password must contain at least one letter and one number",
                                            // },
                                        ]}
                                    >
                                        <Password type="Password" />
                                    </Form.Item>
                                    <Form.Item style={{ marginTop: "2em" }}>
                                        <Typography.Paragraph
                                            style={{
                                                fontSize: "11px",
                                                color: "gray",
                                            }}
                                        >
                                            By continuing past this page, you
                                            agree to the{" "}
                                            <Link
                                                href="terms-of-use"
                                                style={{
                                                    fontSize: "12px",
                                                    color: "blue",
                                                    fontWeight: "bolder",
                                                }}
                                            >
                                                Terms of Use
                                            </Link>{" "}
                                            and understand that information will
                                            be used as described in our{" "}
                                            <Link
                                                href="privacy-policy"
                                                style={{
                                                    fontSize: "12px",
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
                                            htmlType="submit"
                                            type="primary"
                                            style={{ width: "100%" }}
                                        >
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Spin>
                        </Card>
                    </div>
                </Space>
            </Card>
        </div>
    );
}
