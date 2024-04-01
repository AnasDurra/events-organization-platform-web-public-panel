import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useEditEmployeeMutation } from '../employeeSlice';

const dummyDate = '2022-01-01 00:00:00';
export default function ModalEditMember({ isOpen, onOk, onCancel, employee, orgId }) {
    const [form] = Form.useForm();
    const [editEmployee] = useEditEmployeeMutation();
    useEffect(() => {
        console.log('employee', employee);
        form.resetFields();
        form.setFieldsValue(employee);
        form.setFieldValue('email', employee?.user?.email);
        form.setFieldValue('username', employee?.user?.username);
        form.setFieldValue('password', employee?.user?.password);
        form.setFieldValue('birth_date', dayjs('2019-01-01', 'YYYY-MM-DD'));
    }, [employee, form, isOpen]);

    return (
        <Modal
            open={isOpen}
            title='edit member'
            onOk={onOk}
            onCancel={onCancel}
            width={'60vw'}
            footer={[
                <Button
                    key='edit-member'
                    type='primary'
                    onClick={() => form.submit()}
                >
                    Edit
                </Button>,
            ]}
        >
            <Form
                form={form}
                name='edot-member'
                wrapperCol={{
                    span: 14,
                }}
                labelCol={{
                    span: 10,
                }}
                labelAlign='left'
                initialValues={{
                    remember: true,
                }}
                onFinish={(fields) => {
                    console.log(fields);
                    editEmployee({
                        ...fields,
                        organization_id: parseInt(orgId),
                        birth_date: moment(fields.birth_date).format('YYYY-MM-DD'),
                        employee,
                    })
                        .unwrap()
                        .then(() => {
                            onOk();
                            form.resetFields();
                        })
                        .catch(() => {});
                }}
                onFinishFailed={() => {}}
                autoComplete='off'
            >
                <Row gutter={[40]}>
                    <Col span={12}>
                        <Form.Item
                            label='first name'
                            name='first_name'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='last name'
                            name='last_name'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='username'
                            name='username'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='password'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='email'
                            name={'email'}
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='phone_number'
                            label='phone number'
                            rules={[
                                {
                                    required: true,
                                    //  pattern: new RegExp(/^[0-9]+$/),
                                },
                            ]}
                        >
                            <Input style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='birth date'
                            name='birth_date'
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='permissions'
                            name='permissions'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                mode='multiple'
                                options={[
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'suzy',
                                        label: 'suzy',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='profile picture'
                            name='profile_picture'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: '100%' }}
                        >
                            <Upload
                                {...props}
                                listType='picture-circle'
                                maxCount={1}
                                multiple={false}
                            >
                                <span style={{ padding: '1em' }}>Click to upload</span>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

const props = {
    name: 'file',
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    },
};
