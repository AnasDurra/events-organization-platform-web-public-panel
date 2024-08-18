import { Form, Input, Modal } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAddNewFormMutation } from '../dynamicFormsSlice';
import { getLoggedInUserV2 } from '../../../api/services/auth';

export default function AddFormModal({ isOpen, onClose ,onSubmit}) {
    const [form] = Form.useForm();
    let organization_id = getLoggedInUserV2().organization_id;

    const handleFormSubmit = (fields) => {
        onSubmit({ ...fields, groups: [], organization_id });
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
                onCancel={onClose}
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
