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
            className='bg-gray-100 w-full p-4 border-2 border-zinc-200'
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Space
                direction='vertical'
                className='w-full'
            >
                <Space.Compact block>
                    <Title
                        style={{ color: 'gray' }}
                        level={5}
                    >
                        {field?.label ? field.label : 'Label'}
                    </Title>
                    {field?.isRequired && <WiStars className='ml-2' />}
                </Space.Compact>

                <Radio.Group
                    onChange={onChange}
                    value={value}
                >
                    <Space direction='vertical'>
                        {field.options?.length ? (
                            <Form.Item name={['groups', groupIndex, 'fields', fieldIndex]}>
                                <Radio.Group>
                                    {field?.options?.map((option, index) => (
                                        <Radio
                                            key={'radio' + field.id + index}
                                            value={option.name}
                                            style={{ color: 'gray' }}
                                        >
                                            {option.name}
                                        </Radio>
                                    ))}
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
                    </Space>
                </Radio.Group>
            </Space>
        </div>
    );
}
