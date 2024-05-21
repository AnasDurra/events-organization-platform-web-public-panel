import { Button, Card, Form, Image, Input, Space, Spin, Typography } from 'antd';
import Password from 'antd/es/input/Password';
import image1 from '../../features/Attendees Profiles/assets/Hybrid-illu.png';
import '../../features/Attendees Profiles/styles/styles.css';
import { useLoginMutation } from '../../api/services/auth';
import FormWelcomeTitle from '../../features/Form/FormWelcomeTitle';
import { useNotification } from '../../utils/NotificationContext';
import { Link, useNavigate } from 'react-router-dom';
import Roles from '../../api/Roles';

export default function OrganizerLoginPage() {
    const { openNotification } = useNotification();
    const navigate = useNavigate();

    const [loginMutation, { isLoading, isError, error }] = useLoginMutation();

    const onFinish = async (values) => {
        const data = {
            username: values.username,
            password: values.password,
            role_id: 2,
        };

        loginMutation(data)
            .unwrap()
            .then((res) => {
                console.log(res);
                openNotification(
                    'success',
                    'Login Successfully',
                    `Welcome back, ${res.result.username}! We're glad to see you again.`
                );
                if (res.result.user_role == Roles.EMPLOYEE) {
                    navigate(`/org/our-events`);
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
                            WELCOME BACK!
                        </Typography.Title>
                        <Card
                            bodyStyle={{ paddingTop: '0px' }}
                            bordered={false}
                            style={{
                                height: '600px',
                                width: '100%',
                                maxWidth: '430px',
                            }}
                        >
                            <Spin spinning={isLoading}>
                                <FormWelcomeTitle
                                    paragraph={
                                        <>
                                            Access Your{' '}
                                            <span style={{ textDecoration: 'underline' }}>Organizer Dashboard </span>
                                            <br></br>
                                            <br></br>
                                            <Link
                                                to='/login'
                                                style={{
                                                    color: 'blue',
                                                    fontWeight: 'bold',
                                                    fontSize: '13px',
                                                }}
                                            >
                                                Login as Attendee?
                                            </Link>
                                            {'. '}
                                            Or if you new to Eventure?{' '}
                                            <Link
                                                to='/register'
                                                style={{
                                                    color: 'blue',
                                                    fontWeight: 'bold',
                                                    fontSize: '13px',
                                                }}
                                            >
                                                Sign Up Now
                                            </Link>
                                        </>
                                    }
                                />
                                <Form
                                    onFinish={onFinish}
                                    autoComplete='off'
                                    layout='vertical'
                                    style={{ maxWidth: 550 }}
                                    className='my-custom-form'
                                >
                                    <Form.Item
                                        label='Username'
                                        name='username'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your Username',
                                            },
                                            {
                                                min: 2,
                                                message: 'Username must be at least 3 characters',
                                            },
                                            {
                                                max: 50,
                                                message: 'Username cannot exceed 12 characters',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label='Password'
                                        name='password'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your password',
                                            },
                                            // {
                                            //     min: 8,
                                            //     message: 'Password must be at least 8 characters',
                                            // },
                                            {
                                                max: 20,
                                                message: 'Password cannot exceed 20 characters',
                                            },
                                            // {
                                            //     pattern:
                                            //         /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            //     message:
                                            //         "Password must contain at least one letter and one number",
                                            // },
                                        ]}
                                    >
                                        <Password type='Password' />
                                    </Form.Item>
                                    <Form.Item style={{ marginTop: '2em' }}>
                                        <Typography.Paragraph
                                            style={{
                                                fontSize: '11px',
                                                color: 'gray',
                                            }}
                                        >
                                            By continuing past this page, you agree to the{' '}
                                            <Link
                                                to='terms-of-use'
                                                style={{
                                                    fontSize: '12px',
                                                    color: 'blue',
                                                    fontWeight: 'bolder',
                                                }}
                                            >
                                                Terms of Use
                                            </Link>{' '}
                                            and understand that information will be used as described in our{' '}
                                            <Link
                                                to='privacy-policy'
                                                style={{
                                                    fontSize: '12px',
                                                    color: 'blue',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Privacy Policy
                                            </Link>
                                            .
                                        </Typography.Paragraph>
                                    </Form.Item>
                                    <Form.Item
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Button htmlType='submit' type='primary' style={{ width: '100%' }}>
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
