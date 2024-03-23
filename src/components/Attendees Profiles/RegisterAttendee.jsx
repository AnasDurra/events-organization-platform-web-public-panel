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
import { useEffect, useState } from "react";

export default function RegisterAttendee() {
    const [signupMutation, { isLoading }] = useSignupMutation();

    const [imageFile, setImageFile] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [data, setData] = useState(null);

    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();

    const steps = [
        {
            title: "Basic",
            content: <BasicInfoRegistrationForm form={form1} />,
        },
        {
            title: "Additional",
            content: (
                <AdditionalInfoRegistrationForm
                    form={form2}
                    setImageFile={setImageFile}
                    imageSrc={imageSrc}
                    setImageSrc={setImageSrc}
                />
            ),
        },
        {
            title: "Contact",
            content: <ContactInfoRegistrationForm form={form3} />,
        },
    ];

    const handleFormSubmit = async () => {
        // Case Form1
        if (current === 0) {
            form1
                .validateFields()
                .then((values) => {
                    setData({ ...data, ...values });
                    next();
                })
                .catch((errorInfo) => {
                    console.error("Validation failed:", errorInfo);
                });
        }
        // Case Form2
        else {
            setData({ ...data, ...form2.getFieldsValue() });
            next();
        }
    };

    const onFinish = () => {
        // Case Form3
        const form3Data = form3.getFieldValue();

        form3Data["contacts"] = [];
        Object.keys(form3Data).forEach((key) => {
            if (key === "facebook") {
                form3Data["contacts"].push([1, form3Data[key]]);
            } else if (key === "twitter") {
                form3Data["contacts"].push([2, form3Data[key]]);
            } else if (key === "instagram") {
                form3Data["contacts"].push([3, form3Data[key]]);
            } else if (key === "linkedin") {
                form3Data["contacts"].push([4, form3Data[key]]);
            }
        });

        const finalData = { ...data, ...form3.getFieldValue() };
        const dataToSend = {
            first_name: finalData.first_name,
            last_name: finalData.last_name,
            email: finalData.email,
            username: finalData.username,
            password: finalData.password,
            birth_date: finalData.birth_date
                ? `${finalData.birth_date.$D.toString().padStart(2, "0")}-${(
                      finalData.birth_date.$M + 1
                  )
                      .toString()
                      .padStart(2, "0")}-${finalData.birth_date.$y}`
                : null,

            phone_number: finalData.phone_number ?? null,
            bio: finalData.bio ?? null,
            job_id: finalData.job ?? null,
            address_id: finalData.address ?? null,

            profile_img: imageFile?.file.originFileObj ?? null,
            cover_img: finalData.cover_img?.originFileObj ?? null,
            contacts: finalData.contacts ?? null,
        };

        for (const key in dataToSend) {
            if (dataToSend[key] === null) {
                delete dataToSend[key];
            }
        }

        const formData = new FormData();
        Object.keys(dataToSend).forEach((key) => {
            if (key === "contacts") {
                dataToSend.contacts.forEach((contact, index) => {
                    const [contact_id, contact_link] = contact;
                    formData.append(
                        `contacts[${index}][contact_id]`,
                        contact_id
                    );
                    formData.append(
                        `contacts[${index}][contact_link]`,
                        contact_link
                    );
                });
            } else {
                formData.append(key, dataToSend[key]);
            }
        });

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
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
                error.data.result.response.message.forEach((value) => {
                    message.error(value);
                });
            });
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
                                height: "750px",
                                width: "100%",
                                maxWidth: "430px",
                                overflow: "auto",
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

                                <Steps
                                    size="small"
                                    current={current}
                                    items={items}
                                />

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
                                            onClick={() => handleFormSubmit()}
                                        >
                                            Next
                                        </Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Button
                                            type="primary"
                                            onClick={onFinish}
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

// const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//     if (!isJpgOrPng) {
//         message.error("You can only upload JPG/PNG file!");
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//         message.error("Image must smaller than 2MB!");
//     }
//     return isJpgOrPng && isLt2M;
// };
