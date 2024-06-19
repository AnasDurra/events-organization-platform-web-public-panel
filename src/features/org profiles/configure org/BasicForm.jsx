import { Button, Col, Form, Input, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { useConfigureOrgMutation, useGetOrgQuery } from '../orgSlice';

export default function BasicForm({ form, orgData, onFinish, loading }) {
    return (
        <Form
            name='basic'
            form={form}
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
            <div className='mb-8'>
                <img
                    className='h-[32svh] w-full object-fill rounded-md border-b-8 border-b-secondary border-separate'
                    src={'/public/assets/fakeCover.jpg'}
                />
                <img
                    className='h-[28svh] ml-8 aspect-square border-8 z-10 border-x-secondary border-t-secondary border-b-secondary rounded-full mt-[-16svh] object-fill'
                    src={'/public/assets/fakeProfile.png'}
                />
            </div>

            <Row
                justify={'start'}
                gutter={40}
            >
                <Col span={24}>
                    <Form.Item
                        label='Profile Image'
                        name='profileImage'
                    >
                        <Upload
                            name='profileImage'
                            listType='picture'
                            maxCount={1}
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            <Row
                justify={'start'}
                gutter={40}
            >
                <Col span={24}>
                    <Form.Item
                        label='Cover Image'
                        name='coverImage'
                    >
                        <Upload
                            name='coverImage'
                            listType='picture'
                            maxCount={1}
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>

            <Row
                justify={'start'}
                gutter={40}
            >
                <Col span={24}>
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your organization name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row
                justify={'start'}
                gutter={40}
            >
                <Col span={24}>
                    <Form.Item
                        label='Bio'
                        name='bio'
                    >
                        <TextArea
                            placeholder='Brief introduction to your organization'
                            autoSize={{
                                minRows: 2,
                                maxRows: 6,
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row
                justify={'start'}
                gutter={40}
            >
                <Col span={24}>
                    <Form.Item
                        label='Description'
                        name='description'
                    >
                        <TextArea
                            placeholder='Describe your organization'
                            autoSize={{
                                minRows: 4,
                                maxRows: 6,
                            }}
                        />
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
