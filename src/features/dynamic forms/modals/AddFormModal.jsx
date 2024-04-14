import { Form, Input, Modal } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAddNewFormMutation } from '../dynamicFormsSlice';

export default function AddFormModal({ isOpen, onClose }) {
    const [form] = Form.useForm();
    let { organization_id = 1 } = useParams();
    const [addNewForm] = useAddNewFormMutation();

    const handleFormSubmit = (fields) => {
        addNewForm({ ...fields, groups: [], organization_id });
        onClose();
    };

    return (
        <Form
            form={form}
            onFinish={handleFormSubmit}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 16,
            }}
            labelAlign='left'
            className='mt-4'
        >
            <Modal
                open={isOpen}
                title={'Add new form'}
                okText={'Add'}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    onClose();
                }}
                destroyOnClose
            >
                <Form.Item
                    label='name'
                    name='name'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='description'
                    name='description'
                >
                    <Input.TextArea />
                </Form.Item>
            </Modal>
        </Form>
    );
}
