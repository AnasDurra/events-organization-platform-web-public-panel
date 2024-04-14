import { Form, InputNumber, Space } from 'antd';
import React from 'react';
import { WiStars } from 'react-icons/wi';
export default function FormNumberField({ field, groupIndex, fieldIndex }) {
    return (
        <div className='bg-gray-100 w-full p-4 border-2 rounded-lg border-zinc-200'>
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <div className='flex items-center space-x-2  w-full mb-2'>
                    <span>{field.label}</span>
                    {field?.required && <WiStars className='ml-2' />}
                    <WiStars />
                </div>

                <Form.Item
                    name={['groups', groupIndex, 'fields', fieldIndex, 'field_id']}
                    initialValue={field?.id}
                    hidden
                />

                <Form.Item
                    name={['groups', groupIndex, 'fields', fieldIndex, 'value']}
                    required={field?.required}
                    rules={[{ type: 'number' }]}
                >
                    <InputNumber
                        placeholder='enter number'
                        className='sm:w-[50%] w-full'
                    />
                </Form.Item>
            </Space.Compact>
        </div>
    );
}
