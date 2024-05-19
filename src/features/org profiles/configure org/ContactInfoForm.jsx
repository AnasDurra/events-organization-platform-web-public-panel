import { FacebookFilled, LinkedinFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import React from 'react';

export default function ContactInfoForm({ form, onFinish }) {
    return (
        <>
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
                            label='phone number'
                            name='phone_number'
                            rules={[
                                {
                                    pattern: new RegExp(/^[0-9]+$/),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Row justify={'start'}>
              <Col span={24}>
                <Form.Item
                  label='landline number'
                  name='landline number'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Space.Compact style={{ width: '100%' }}>
                    <Input
                      style={{
                        width: '20%',
                      }}
                      defaultValue='0571'
                    />
                    <Input
                      style={{
                        width: '80%',
                      }}
                      defaultValue='26888888'
                    />
                  </Space.Compact>
                </Form.Item>
              </Col>
            </Row> */}
                <Row justify={'start'}>
                    <Col span={24}>
                        <Form.Item
                            label={
                                <Space.Compact>
                                    <FacebookFilled />
                                    <Typography.Text style={{ marginLeft: '1.1em' }}>Facebook</Typography.Text>
                                </Space.Compact>
                            }
                            name='fb'
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
                                    <LinkedinFilled />
                                    <Typography.Text style={{ marginLeft: '1.1em' }}>Linkedin</Typography.Text>
                                </Space.Compact>
                            }
                            name='linkedin'
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
                                style={{ width: '100%', marginTop: '2em ' }}
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
