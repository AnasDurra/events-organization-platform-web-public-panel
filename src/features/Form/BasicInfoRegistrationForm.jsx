import {
    Col,
    DatePicker,
    Input,
    Row,
    Typography,
    Upload,
    message,
    Form,
    Image,
} from "antd";
import ImgCrop from "antd-img-crop";
import Password from "antd/es/input/Password";
import Link from "antd/es/typography/Link";
import { useState } from "react";

const BasicInfoRegistrationForm = ({ form }) => {
    return (
        <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            // style={{ maxWidth: 550 }}
            className="my-custom-form"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email address",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Row gutter={15}>
                <Col span={12}>
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your first name",
                            },
                            {
                                min: 2,
                                message:
                                    "First name must be at least 2 characters",
                            },
                            {
                                max: 50,
                                message:
                                    "First name cannot exceed 50 characters",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your last name",
                            },
                            {
                                min: 2,
                                message:
                                    "Last name must be at least 2 characters",
                            },
                            {
                                max: 50,
                                message:
                                    "Last name cannot exceed 50 characters",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            {/* <Form.Item
                label="Birth Date"
                name="birth_date"
                rules={[
                    {
                        required: true,
                        message: "Please select your birth date",
                    },
                ]}
            >
                <DatePicker
                    style={{
                        width: "30%",
                    }}
                />
            </Form.Item> */}
            {/* <Form.Item label="Profile Picture" name="profile_img">
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    {imageSrc && (
                        // <Avatar
                        //     style={{
                        //         marginRight: "0.5em",
                        //         width: 130,
                        //     }}
                        //     size={100}
                        //     src={imageSrc}
                        // />
                        <Image
                            src={imageSrc}
                            style={{
                                marginRight: "0.5em",
                                width: 100,
                                borderRadius: "50%",
                            }}
                        />
                    )}
                    <ImgCrop onModalOk={handleFileChange} rotationSlider>
                        <Upload
                            listType="picture-circle"
                            showUploadList={false}
                            maxCount={1}
                            // beforeUpload={(file) => {
                            //     return new Promise(
                            //         (resolve, reject) => {
                            //             if (
                            //                 file.size >
                            //                 211212121
                            //             ) {
                            //                 reject(
                            //                     "file exceed size limit"
                            //                 );
                            //             } else {
                            //                 resolve("success");
                            //             }
                            //         }
                            //     );
                            // }}
                            onChange={handleFileChange}
                        >
                            {imageSrc ? "+Change Picture" : "+Upload"}
                        </Upload>
                    </ImgCrop>
                </div>
            </Form.Item> */}

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please enter your Username",
                    },
                    {
                        min: 2,
                        message: "Username must be at least 3 characters",
                    },
                    {
                        max: 50,
                        message: "Username cannot exceed 12 characters",
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
                        message: "Please enter your password",
                    },
                    {
                        min: 8,
                        message: "Password must be at least 8 characters",
                    },
                    {
                        max: 20,
                        message: "Password cannot exceed 20 characters",
                    },
                    {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message:
                            "Password must contain at least one letter and one number",
                    },
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
                    By continuing past this page, you agree to the{" "}
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
                    and understand that information will be used as described in
                    our{" "}
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
        </Form>
    );
};

export default BasicInfoRegistrationForm;
