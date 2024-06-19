import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { FacebookFilled, LinkedinFilled, GithubFilled, InstagramFilled } from '@ant-design/icons';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import React from 'react';

export default function ContactInfoForm({ form, onFinish, loading }) {
    return (
        <Form
            form={form}
            name='contact_info'
            wrapperCol={{
                span: 20,
            }}
            labelCol={{
                span: 4,
            }}
            labelAlign='left'
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={() => {}}
            autoComplete='off'
        >
            <Row justify={'start'}>
                <Col span={24}>
                    <Form.Item
                        label='Phone Number'
                        name='phone_number'
                        rules={[
                            {
                                pattern: new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/),
                                message: 'Please enter a valid phone number',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={24}>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                type: 'email',
                                message: 'Please enter a valid email address',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={24}>
                    <Form.Item
                        label={
                            <Space.Compact>
                                <FaFacebook className='text-[1.5em] text-blue-500' />
                                <Typography.Text style={{ marginLeft: '1.1em' }}>Facebook</Typography.Text>
                            </Space.Compact>
                        }
                        name='facebook'
                        rules={[
                            {
                                type: 'url',
                                message: 'Please enter a valid URL',
                            },
                        ]}
                    >
                        <Input placeholder='URL link' />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={24}>
                    <Form.Item
                        label={
                            <Space.Compact>
                                <InstagramFilled className='text-[1.5em] text-[#C1358E]' />
                                <Typography.Text style={{ marginLeft: '1.1em' }}>Instagram</Typography.Text>
                            </Space.Compact>
                        }
                        name='instagram'
                        rules={[
                            {
                                type: 'url',
                                message: 'Please enter a valid URL',
                            },
                        ]}
                    >
                        <Input placeholder='URL link' />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={24}>
                    <Form.Item
                        label={
                            <Space.Compact>
                                <LinkedinFilled className='text-[1.5em] text-blue-800' />
                                <Typography.Text style={{ marginLeft: '1.1em' }}>LinkedIn</Typography.Text>
                            </Space.Compact>
                        }
                        name='linkedin'
                        rules={[
                            {
                                type: 'url',
                                message: 'Please enter a valid URL',
                            },
                        ]}
                    >
                        <Input placeholder='URL link' />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={24}>
                    <Form.Item
                        label={
                            <Space.Compact>
                                <GithubFilled className='text-[1.5em] text-blue-950' />
                                <Typography.Text style={{ marginLeft: '1.1em' }}>GitHub</Typography.Text>
                            </Space.Compact>
                        }
                        name='github'
                        rules={[
                            {
                                type: 'url',
                                message: 'Please enter a valid URL',
                            },
                        ]}
                    >
                        <Input placeholder='URL link' />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col span={24}>
                    <Form.Item
                        label={
                            <Space.Compact>
                                <FaWhatsapp className='text-[1.5em] text-green-600' />
                                <Typography.Text style={{ marginLeft: '1.1em' }}>WhatsApp</Typography.Text>
                            </Space.Compact>
                        }
                        name='whatsapp'
                        rules={[
                            {
                                type: 'url',
                                message: 'Please enter a valid URL',
                            },
                        ]}
                    >
                        <Input placeholder='URL link' />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelCol={{ span: 0 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Button
                            type='primary'
                            htmlType='submit'
                            style={{ width: '100%', marginTop: '2em' }}
                            loading={loading}
                        >
                            Save
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
