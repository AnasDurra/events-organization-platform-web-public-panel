import { FieldStringOutlined } from '@ant-design/icons';
import { Form, Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { WiStars } from 'react-icons/wi';

export default function FormTextFieldOverview({ isDragging, field, groupIndex, fieldIndex }) {
    return (
        <div
            className='bg-gray-100 w-full px-4 border-2 border-zinc-200'
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <div className='text-gray-500 flex items-center space-x-2  w-full my-2'>
                    <span>{field?.label}</span>
                    {field?.required && <WiStars className='ml-2' />}
                </div>

                <Form.Item name={['groups', groupIndex, 'fields', fieldIndex, 'name']}>
                    <Input
                        className='w-[100%] '
                        disabled
                        placeholder='field name'
                        size='small'
                        variant='filled'
                        suffix={<FieldStringOutlined />}
                    />
                </Form.Item>
            </Space.Compact>
        </div>
    );
}
