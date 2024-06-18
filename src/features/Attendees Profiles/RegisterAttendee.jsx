import { Button, Card, Checkbox, Form, Image, Input, Space, Spin, Steps, Typography } from 'antd';

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
import { GoogleOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

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
                    navigate('/login');
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
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg'>
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold text-gray-900'>Register</h2>
                    <p className='mt-2 text-sm text-gray-600'>Join us for Eventure 🚀</p>
                </div>
                <Spin spinning={false}>
                    <div className='flex items-center justify-center my-4'>
                        <span className='text-gray-500 mx-2'>
                            Register today for exclusive offers and a seamless event experience.
                        </span>
                    </div>

                    <Steps style={{ padding: '20px 0px' }} size='small' current={current} items={items} />

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
                                className='w-full'
                                size='large'
                                onClick={() => prev()}
                            >
                                Previous
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button type='primary' className='w-full' size='large' onClick={() => handleFormSubmit()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type='primary' className='w-full' size='large' onClick={onFinish}>
                                Done
                            </Button>
                        )}
                    </div>
                </Spin>
            </div>
        </div>
    );
}
