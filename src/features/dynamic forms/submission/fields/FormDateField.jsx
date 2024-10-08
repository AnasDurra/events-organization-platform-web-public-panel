import React from 'react';
import { Space, Typography, Form, Input, DatePicker } from 'antd';
import { WiStars } from 'react-icons/wi';
import moment from 'moment';
import dayjs from 'dayjs';

export default function FormDateField({ field, groupIndex, fieldIndex }) {
    return (
        <div className='bg-gray-50/100 w-full px-4 border-2 rounded-lg border-zinc-500'>
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
                    rules={[{ required: field?.required, message: 'Required Field' }]}
                >
                    <DatePicker
                        placeholder={field.name}
                        className='sm:w-[50%] w-full'
                        size='medium'
                        variant='filled'
                    />
                </Form.Item>
            </Space.Compact>
        </div>
    );
}
