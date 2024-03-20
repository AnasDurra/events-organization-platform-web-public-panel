import {
    LoadingOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Cascader,
    Checkbox,
    Col,
    ColorPicker,
    DatePicker,
    Form,
    Image,
    Input,
    Radio,
    Row,
    Select,
    Slider,
    Space,
    Spin,
    Typography,
    Upload,
} from "antd";
import Password from "antd/es/input/Password";
import Link from "antd/es/typography/Link";
import { message } from "antd";
import ImgCrop from "antd-img-crop";

import image1 from "./assets/Hybrid-illu.png";
import "./styles/styles.css";
import { useSignupMutation } from "../../api/services/auth";
import { useState } from "react";

export default function RegisterAttendee() {
    const [signupMutation, { isLoading, isError, error }] = useSignupMutation();

    const [imageFile, setImageFile] = useState(null);
    const [imageSrc, setImageSrc] = useState("");

    function getFileUrl(file, callback) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const url = event.target.result;
            callback(url);
        };

        setImageFile(file);
        reader.readAsDataURL(file);
    }

    const handleFileChange = (file) => {
        // const file = event.target.files[0];
        getFileUrl(file, (url) => {
            setImageSrc(url);
        });
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onFinish = async (values) => {
        const data = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            username: values.username,
            password: values.password,
            birth_date: `${(values.birth_date.$M + 1)
                .toString()
                .padStart(2, "0")}-${values.birth_date.$D
                .toString()
                .padStart(2, "0")}-${values.birth_date.$y}`,
            profile_img: imageFile?.file.originFileObj ?? null,
        };
        console.log(data);

        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        signupMutation(formData)
            .unwrap()
            .then((res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    message.success("Registered Successfully !");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                message.error(error.data.result.message);
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
                            width={350}
                            height={1014}
                            src={image1}
                            preview={false}
                        />
                    </div>
                    <div>
                        <Card style={{ height: "950px" }}>
                            <Spin spinning={isLoading}>
                                <div>
                                    <Typography.Title
                                        style={{ marginTop: "0px" }}
                                        level={2}
                                    >
                                        Join us for Evento!
                                    </Typography.Title>
                                    <Typography.Paragraph
                                        style={{
                                            marginBottom: "2em",
                                            fontSize: "13px",
                                        }}
                                    >
                                        Register today for exclusive offers and
                                        a seamless event experience. <br></br>
                                        Already have an Evento Account?{" "}
                                        <Link
                                            href="login"
                                            style={{
                                                color: "blue",
                                                fontWeight: "bold",
                                                fontSize: "13   px",
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                    </Typography.Paragraph>
                                </div>
                                <Form
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    layout="vertical"
                                    style={{ maxWidth: 550 }}
                                    className="my-custom-form"
                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                type: "email",
                                                message:
                                                    "Please enter a valid email address",
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
                                                        message:
                                                            "Please enter your first name",
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
                                                        message:
                                                            "Please enter your last name",
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
                                                width: "30%",
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Profile Picture"
                                        name="profile_img"
                                        rules={
                                            [
                                                // {
                                                //     required: true,
                                                //     message:
                                                //         "Please upload your profile picture",
                                                // },
                                                // {
                                                //     validator: (_, value) => {
                                                //         if (
                                                //             !value ||
                                                //             value.length === 0
                                                //         ) {
                                                //             return Promise.resolve();
                                                //         }
                                                //         const isFileSizeValid =
                                                //             value[0].size <=
                                                //             5 * 1024 * 1024; // 5MB in bytes;
                                                //         console.log("here");
                                                //         return isFileSizeValid
                                                //             ? Promise.resolve()
                                                //             : Promise.reject(
                                                //                   `File size must be less than ${
                                                //                       1 / 1000000
                                                //                   } MB`
                                                //               );
                                                //     },
                                                // },
                                                // { validator: (_, value) => {
                                                //     if (!value || value.length === 0) {
                                                //         return Promise.resolve();
                                                //     }
                                                //     return new Promise((resolve, reject) => {
                                                //         const img = new Image();
                                                //         img.onload = function () {
                                                //             const width = this.width;
                                                //             const height = this.height;
                                                //             if (width >= MIN_WIDTH && height >= MIN_HEIGHT) {
                                                //                 resolve();
                                                //             } else {
                                                //                 reject(`Image dimensions must be at least ${MIN_WIDTH}x${MIN_HEIGHT}`);
                                                //             }
                                                //         };
                                                //         img.onerror = function () {
                                                //             reject('Failed to load image');
                                                //         };
                                                //         img.src = URL.createObjectURL(value[0]);
                                                //     });
                                                // }},
                                            ]
                                        }
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                            }}
                                        >
                                            {imageSrc && (
                                                <Avatar
                                                    style={{
                                                        marginRight: "0.5em",
                                                        width: 130,
                                                    }}
                                                    size={100}
                                                    src={imageSrc}
                                                />
                                            )}
                                            <ImgCrop
                                                onModalOk={handleFileChange}
                                                rotationSlider
                                            >
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
                                                    {imageSrc
                                                        ? "+Change Picture"
                                                        : "+Upload"}
                                                </Upload>
                                            </ImgCrop>

                                            {/* <img src={imageSrc} /> */}
                                        </div>

                                        <div>
                                            {/* <ImgCrop
                                            onModalOk={handleFileChange}
                                            rotationSlider
                                        >
                                            <Upload
                                                // showUploadList={false}
                                                // beforeUpload={(file) => {
                                                //     return new Promise((resolve, reject) => {
                                                //         if (file.size > 2) {
                                                //             reject("file exceed size limit");
                                                //         } else {
                                                //             resolve("success");
                                                //         }
                                                //     });
                                                // }}
                                                onChange={handleFileChange}
                                            >
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    Upload Image
                                                </Button>
                                            </Upload>
                                        </ImgCrop> */}
                                            {/* <img src={imageSrc} /> */}
                                        </div>
                                    </Form.Item>

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
                                            {
                                                pattern:
                                                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                message:
                                                    "Password must contain at least one letter and one number",
                                            },
                                        ]}
                                    >
                                        <Password type="Password" />
                                    </Form.Item>
                                    <Form.Item style={{ marginTop: "3em" }}>
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
                                            Sign Up
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
