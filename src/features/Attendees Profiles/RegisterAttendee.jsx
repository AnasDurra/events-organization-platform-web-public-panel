import { Button, Card, Form, Image, Space, Spin, Steps, Typography } from 'antd';

import Link from 'antd/es/typography/Link';
import { message } from 'antd';

import image1 from './assets/Hybrid-illu.png';
import './styles/styles.css';
import { useSignupMutation } from '../../api/services/auth';
import BasicInfoRegistrationForm from '../Form/BasicInfoRegistrationForm';
import AdditionalInfoRegistrationForm from '../Form/AdditionalInfoRegistrationForm';
import ContactInfoRegistrationForm from '../Form/ContactInfoRegistrationForm';
import FormWelcomeTitle from '../Form/FormWelcomeTitle';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../utils/NotificationContext';

export default function RegisterAttendee() {
    const [signupMutation, { isLoading }] = useSignupMutation();
    const navigate = useNavigate();

    const { openNotification } = useNotification();

    const [imageFile, setImageFile] = useState([]);

    const [data, setData] = useState(null);

    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();

    const steps = [
        {
            title: 'Basic',
            content: <BasicInfoRegistrationForm form={form1} />,
        },
        {
            title: 'Additional',
            content: <AdditionalInfoRegistrationForm form={form2} imageFile={imageFile} setImageFile={setImageFile} />,
        },
        {
            title: 'Contact',
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
                    console.error('Validation failed:', errorInfo);
                });
        }
        // Case Form2
        else {
            setData({ ...data, ...form2.getFieldValue() });
            next();
        }
    };

    const onFinish = () => {
        // Case Form3
        const form3Data = { ...form3.getFieldValue() };
        // console.log(form3Data);
        const contacts = [];
        Object.keys(form3Data).forEach((key) => {
            contacts.push([key, form3Data[key]]);
        });
        form3Data['contacts'] = contacts;

        const finalData = { ...data, ...form3Data };
        const dataToSend = {
            first_name: finalData.first_name,
            last_name: finalData.last_name,
            email: finalData.email,
            username: finalData.username,
            password: finalData.password,
            birth_date: finalData.birth_date?.format('DD-MM-YYYY'),

            phone_number: finalData.phone_number ?? null,
            bio: finalData.bio ?? null,
            job_id: finalData.job ?? null,
            address_id: finalData.address ?? null,

            profile_img: imageFile[0]?.originFileObj ?? null,
            cover_img: finalData.cover_img?.originFileObj ?? null,
            contacts: finalData.contacts ?? null,
        };
        console.log(dataToSend);

        for (const key in dataToSend) {
            if (dataToSend[key] == null) {
                delete dataToSend[key];
            }
        }

        const formData = new FormData();
        Object.keys(dataToSend).forEach((key) => {
            if (key === 'contacts') {
                dataToSend.contacts.forEach((contact, index) => {
                    const [contact_id, contact_link] = contact;
                    formData.append(`contacts[${index}][contact_id]`, contact_id);
                    formData.append(`contacts[${index}][contact_link]`, contact_link);
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
                if (res.statusCode === 201) {
                    openNotification(
                        'success',
                        'Registered Successfully',
                        `Welcome to Eventure ${res?.result?.username}!`
                    );
                    navigate('/home');
                }
            })
            .catch((error) => {
                console.error('Error:', error);

                message.error(error?.data?.result?.response?.message[0]);
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
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Card>
                <Space
                    direction='horizontal'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <div className='registerImage'>
                        <Image width={320} height={700} src={image1} preview={false} />
                    </div>
                    <div>
                        <Typography.Title
                            level={3}
                            style={{
                                textAlign: 'center',
                                color: '#333',
                                // marginBottom: '24px',
                                fontWeight: 'bold',
                                fontSize: '28px',
                                fontFamily: 'Arial, sans-serif',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                lineHeight: '1.5',
                            }}
                        >
                            Join us for Eventure!
                        </Typography.Title>
                        <Card
                            bodyStyle={{ paddingTop: '0px' }}
                            bordered={false}
                            style={{
                                height: '600px',
                                width: '100%',
                                maxWidth: '430px',
                                overflow: 'auto',
                            }}
                        >
                            <Spin spinning={isLoading}>
                                <FormWelcomeTitle
                                    paragraph={
                                        <>
                                            Register today for exclusive offers and a seamless event experience.{' '}
                                            <br></br>
                                            Already have an Evento Account?{' '}
                                            <Link
                                                href='login'
                                                style={{
                                                    color: 'blue',
                                                    fontWeight: 'bold',
                                                    fontSize: '13px',
                                                }}
                                            >
                                                Sign In
                                            </Link>
                                        </>
                                    }
                                />

                                <Steps size='small' current={current} items={items} />

                                <div style={contentStyle}>{steps[current].content}</div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        // marginTop: 24,
                                    }}
                                >
                                    {current > 0 && (
                                        <Button
                                            style={{
                                                margin: '0 8px',
                                            }}
                                            onClick={() => prev()}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {current < steps.length - 1 && (
                                        <Button type='primary' onClick={() => handleFormSubmit()}>
                                            Next
                                        </Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Button type='primary' onClick={onFinish}>
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
