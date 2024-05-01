import React from 'react';
import { Space, Typography, Form, Input } from 'antd';
import { WiStars } from 'react-icons/wi';
import { FieldStringOutlined } from '@ant-design/icons';
export default function FormTextField({ field, groupIndex, fieldIndex }) {
    return (
        <div className='bg-gray-100/50 w-full px-4 border-2 rounded-lg border-zinc-200'>
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <div className='flex items-center space-x-2  w-full my-2'>
                    <span>{field?.label}</span>
                    {field?.required && <WiStars className='ml-2' />}
                </div>

                <Form.Item
                    name={['groups', groupIndex, 'fields', fieldIndex, 'field_id']}
                    initialValue={field?.id}
                    hidden
                />

                <Form.Item
                    name={['groups', groupIndex, 'fields', fieldIndex, 'value']}
                    rules={[{ required: field?.required, message: 'Required Field'}]}
                >
                    <Input
                        placeholder='name'
                        className='sm:w-[50%] w-full'
                        variant='borderless'
                        size='medium'
                        suffix={<FieldStringOutlined />}
                    />
                </Form.Item>
            </Space.Compact>
        </div>
    );
}
