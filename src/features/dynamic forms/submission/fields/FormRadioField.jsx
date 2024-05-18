import React, { useState } from 'react';
import { Space, Radio, Typography, Form, Input } from 'antd';
import { WiStars } from 'react-icons/wi';
export default function FormRadioField({ field, groupIndex, fieldIndex }) {
    return (
        <div className='bg-gray-100/50 w-full px-4 border-2 rounded-lg border-zinc-200'>
            <Space
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
                    name={['groups', groupIndex, 'fields', fieldIndex, 'option_id']}
                    rules={[{ required: field?.required, message: 'Required Field'}]}
                >
                    <Radio.Group
                    // value={value}
                    //onChange={handleRadioChange}
                    size='middle'
                    >
                        <Space direction='vertical'>
                            {field.options?.map((option, index) => (
                                <Radio
                                    key={'radio' + option.id + index}
                                    value={option.id}
                                >
                                    {option.name}
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </Form.Item>
            </Space>
        </div>
    );
}

