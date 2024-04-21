import { Input, Radio, Space, Divider, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { WiStars } from 'react-icons/wi';

export default function FormRadioOverview({ isDragging, field, groupIndex, fieldIndex }) {
    const [value, setValue] = useState();

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div
            className='bg-gray-100 w-full px-4 border-4 border-zinc-200 rounded-3xl'
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <div className='text-gray-500 flex items-center space-x-2  w-full my-2'>
                <span>{field?.label}</span>
                {field?.required && <WiStars className='ml-2' />}
            </div>

            <Radio.Group
                onChange={onChange}
                value={value}
                className='w-full'
            >
                {field.options?.length ? (
                    <Form.Item
                        name={['groups', groupIndex, 'fields', fieldIndex]}
                        className='w-full'
                    >
                        <Radio.Group  size='small' disabled>
                            <Space
                                direction='vertical'
                                className='w-full'
                            >
                                {field?.options?.map((option, index) => (
                                    <Radio
                                        key={'radio' + field.id + index}
                                        value={option.name}
                                        style={{ color: 'gray' }}
                                    >
                                        {option.name}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                ) : (
                    <Radio
                        key={'radio' + field.id + 'dummy'}
                        value={undefined}
                        style={{ color: 'gray' }}
                        
                    >
                        Add options
                    </Radio>
                )}
            </Radio.Group>
        </div>
    );
}
