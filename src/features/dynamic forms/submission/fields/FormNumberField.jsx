import { FieldNumberOutlined } from '@ant-design/icons';
import { Form, InputNumber, Space } from 'antd';
import React from 'react';
import { WiStars } from 'react-icons/wi';
export default function FormNumberField({ field, groupIndex, fieldIndex }) {
    return (
        <div className='bg-gray-100/50 w-full px-4 border-2 rounded-lg border-zinc-200'>
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <div className='flex items-center space-x-2  w-full my-2'>
                    <span>{field.label}</span>
                    {field?.required && <WiStars className='ml-2' />}
                </div>

                <Form.Item
                    name={['groups', groupIndex, 'fields', fieldIndex, 'field_id']}
                    initialValue={field?.id}
                    hidden
                />

                <Form.Item
                    name={['groups', groupIndex, 'fields', fieldIndex, 'value']}
                    rules={[{ type: 'number' }, { required: field?.required }]}
                >
                    <InputNumber
                        placeholder='enter number'
                        className='sm:w-[50%] w-full'
                        variant='filled'
                        size='small'
                        suffix={<FieldNumberOutlined />}
                    />
                </Form.Item>
            </Space.Compact>
        </div>
    );
}
