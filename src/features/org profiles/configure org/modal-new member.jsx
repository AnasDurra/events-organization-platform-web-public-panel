import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import moment from 'moment';
import React from 'react';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import { useGetPermissionsQuery, useNewEmployeeMutation } from '../employeeSlice';

export default function ModalNewMember({ isOpen, onOk, onCancel }) {
    const [createNewEmployee, { isLoading: isAddEmployeeLoading }] = useNewEmployeeMutation();
    const { data: { result: permissions } = { result: [] }, isLoading: isPermissionsLoading } =
        useGetPermissionsQuery();
    const [form] = Form.useForm();
    return (
        <Modal
            open={isOpen}
            title='Add new member'
            onOk={onOk}
            onCancel={onCancel}
            width={'60vw'}
            footer={
                <Button
                    type='primary'
                    onClick={() => form.submit()}
                    loading={isAddEmployeeLoading}
                >
                    Add
                </Button>
            }
        >
            {console.log(getLoggedInUserV2())}
            <Form
                form={form}
                name='new-member'
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
                    console.log(moment(fields.birth_date).format('YYYY-MM-DD'));

                    createNewEmployee({
                        ...fields,
                        organization_id: parseInt(getLoggedInUserV2().organization_id),
                        birth_date: moment(fields.birth_date).format('YYYY-MM-DD'),
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
                                    pattern: new RegExp(/^[0-9]+$/),
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
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
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
                                loading={isPermissionsLoading}
                                mode='multiple'
                                options={permissions.map((perm) => ({
                                    value: parseInt(perm.id),
                                    label: perm.name,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
