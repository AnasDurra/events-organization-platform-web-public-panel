import { Form, InputNumber, Space } from 'antd';
import {FieldNumberOutlined} from '@ant-design/icons'
import Title from 'antd/es/typography/Title';
import React from 'react';
import { WiStars } from 'react-icons/wi';

export default function FormNumberOverview({ isDragging, field, groupIndex, fieldIndex }) {
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
                    <InputNumber
                        className='w-[100%] '
                        disabled
                        placeholder='enter number'
                        suffix ={<FieldNumberOutlined />}
                    />
                </Form.Item>
            </Space.Compact>
        </div>
    );
}
