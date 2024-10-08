import { DatePicker, Input, Space, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { WiStars } from 'react-icons/wi';

export default function FormDateOverview({ isDragging, field, groupIndex, fieldIndex }) {
    return (
        <div
            className='bg-gray-50 w-full px-4 border-4 border-zinc-200 rounded-xl'
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <div className=' text-gray-700 font-semibold font-semibold flex items-center space-x-2  w-full my-2'>
                    <span>{field?.label}</span>
                    {field?.required && <WiStars className='ml-2' />}
                </div>

                <Form.Item
                //name={['groups', groupIndex, 'fields', fieldIndex]}
                >
                    <DatePicker
                        className='w-[100%] '
                        disabled
                        placeholder='pick a date'
                        size='small'
                    />
                </Form.Item>
            </Space.Compact>
        </div>
    );
}
