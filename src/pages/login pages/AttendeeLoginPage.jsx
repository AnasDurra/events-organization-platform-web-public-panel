// src/App.js
import React from 'react';
import { Form, Input, Button, Checkbox, Spin, Typography } from 'antd';
import { GoogleOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '../../api/services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../utils/NotificationContext';
import Roles from '../../api/Roles';

export default function AttendeeLoginPage() {
    const { openNotification } = useNotification();
    const navigate = useNavigate();

    const [loginMutation, { isLoading, isError, error }] = useLoginMutation();

    const onFinish = async (values) => {
        const data = {
            username: values.username,
            password: values.password,
            role_id: 3,
        };

        loginMutation(data)
            .unwrap()
            .then((res) => {
                openNotification(
                    'success',
                    'Login Successfully',
                    `Welcome back, ${res.result.username}! We're glad to see you again.`
                );
                if (res.result.user_role == Roles.ATTENDEE) {
                    navigate(`/home`);
                }
            })
            .catch((error) => {
                if (error.status === 401) {
                    openNotification('warning', 'Wrong username or password !');
                }
                console.error('Error:', error);
            });
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div
                className='w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg'
                style={{ marginBottom: '5em' }}
            >
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold text-primary'>Attendee Login</h2>
                    <p className='mt-2 text-sm text-gray-600'>Hi, Welcome back 👋</p>
                </div>
                <Spin spinning={isLoading}>
                    <Form
                        name='login'
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout='vertical'
                    >
                        {/*   <div className='flex items-center justify-center my-4'>
                            <span className='text-gray-500 mx-2'>or Login as Attendee </span>
                        </div> */}

                        <Form.Item
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Username',
                                },

                                {
                                    max: 50,
                                    message: 'Username cannot exceed 12 characters',
                                },
                            ]}
                        >
                            <Input
                                placeholder='Username'
                                size='large'
                            />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Password',
                                },
                                {
                                    min: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder='Password'
                                size='large'
                            />
                        </Form.Item>

                        <Form.Item
                            name='remember'
                            valuePropName='checked'
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='w-full'
                                size='large'
                            >
                                Login
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type='default'
                                icon={<UserOutlined />}
                                className='w-full mb-4 bg-white text-primary border border-gray-300'
                                size='large'
                                onClick={() => {
                                    navigate('/org/login');
                                }}
                            >
                                Login as Organizer
                            </Button>
                        </Form.Item>

                        <div className='text-center'>
                            <a
                                href='/'
                                className='text-sm text-blue-500'
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <div className='text-center mt-4'>
                            <span className='text-sm'>Not registered yet? </span>
                            <Link
                                to={'/register'}
                                className='text-sm text-blue-500'
                            >
                                Create an account
                            </Link>
                        </div>
                    </Form>
                </Spin>
            </div>
        </div>
    );
}
