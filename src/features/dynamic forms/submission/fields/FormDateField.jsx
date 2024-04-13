import React from 'react';
import { Space, Typography, Form, Input, DatePicker } from 'antd';
import { WiStars } from 'react-icons/wi';

export default function FormDateField() {
    return (
        <div className='bg-gray-100 w-full p-4 border-2 rounded-lg border-zinc-200'>
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <div className='flex items-center space-x-2  w-full mb-2'>
                    <span>label</span>
                    {/*     {field?.isRequired && <WiStars className='ml-2' />} */}
                    <WiStars />
                </div>

                <Form.Item required>
                    <DatePicker
                        placeholder='select date'
                        className='sm:w-[50%] w-full'
                    />
                </Form.Item>
            </Space.Compact>
        </div>
    );
}
