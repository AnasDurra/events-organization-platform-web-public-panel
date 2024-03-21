import {
    Button,
    Card,
    Form,
    Image,
    Space,
    Spin,
    Steps,
    Typography,
} from "antd";

import Link from "antd/es/typography/Link";
import { message } from "antd";

import image1 from "./assets/Hybrid-illu.png";
import "./styles/styles.css";
import { useSignupMutation } from "../../api/services/auth";
import BasicInfoRegistrationForm from "../Form/BasicInfoRegistrationForm";
import AdditionalInfoRegistrationForm from "../Form/AdditionalInfoRegistrationForm";
import ContactInfoRegistrationForm from "../Form/ContactInfoRegistrationForm";
import FormWelcomeTitle from "../Form/FormWelcomeTitle";
import { useState } from "react";

export default function RegisterAttendee() {
    const [signupMutation, { isLoading }] = useSignupMutation();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();

    const steps = [
        {
            title: "First",
            content: (
                <BasicInfoRegistrationForm
                    queryMutation={signupMutation}
                    form={form1}
                />
            ),
        },
        {
            title: "Second",
            content: (
                <AdditionalInfoRegistrationForm
                    queryMutation={signupMutation}
                    form={form2}
                />
            ),
        },
        {
            title: "Last",
            content: (
                <ContactInfoRegistrationForm
                    queryMutation={signupMutation}
                    form={form3}
                />
            ),
        },
    ];

    const handleForm1Submit = async () => {
        next();
        // try {
        //     await form1.validateFields();

        //     next();
        // } catch (errorInfo) {
        //     // console.log("Validation errors:", errorInfo);
        //     message.error("Please check the fields.");
        // }
    };

    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        marginTop: 16,
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
                        overflow: "auto",
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
                                    title={"Join us for Evento!"}
                                    paragraph={
                                        <>
                                            Register today for exclusive offers
                                            and a seamless event experience.{" "}
                                            <br></br>
                                            Already have an Evento Account?{" "}
                                            <Link
                                                href="login"
                                                style={{
                                                    color: "blue",
                                                    fontWeight: "bold",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                Sign In
                                            </Link>
                                        </>
                                    }
                                />

                                <Steps current={current} items={items} />

                                <div style={contentStyle}>
                                    {steps[current].content}
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: 24,
                                    }}
                                >
                                    {current > 0 && (
                                        <Button
                                            style={{
                                                margin: "0 8px",
                                            }}
                                            onClick={() => prev()}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {current < steps.length - 1 && (
                                        <Button
                                            type="primary"
                                            onClick={() => handleForm1Submit()}
                                        >
                                            Next
                                        </Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                message.success(
                                                    "Processing complete!"
                                                )
                                            }
                                        >
                                            Done
                                        </Button>
                                    )}
                                </div>
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
