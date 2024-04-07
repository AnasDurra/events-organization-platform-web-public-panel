import { Badge, Form, Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { WiStars } from 'react-icons/wi';

export default function FormTextFieldOverview({ isDragging, field, groupIndex, fieldIndex }) {
    return (
        <div
            className='bg-gray-100 w-full p-4 border-2 border-zinc-200'
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <Title
                    style={{ color: 'gray' }}
                    level={5}
                >
                    {field?.label ? field.label : 'label'}
                </Title>

                <Space.Compact className='w-[50%] flex items-center'>
                    <Form.Item
                        label='name'
                        name={['groups', groupIndex, 'fields', fieldIndex]}
                    >
                        <Input
                            className='w-[100%] '
                            disabled
                            placeholder='field name'
                        />
                        {field?.isRequired && <WiStars className='ml-2' />}
                    </Form.Item>
                </Space.Compact>
            </Space.Compact>
        </div>
    );
}
