import React, { useState } from 'react';
import { Space, Radio, Typography, Form, Input } from 'antd';
import { WiStars } from 'react-icons/wi';
export default function FormRadioField() {
    const [value, setValue] = useState();

    const handleRadioChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className='bg-gray-100 w-full p-4 border-2 rounded-lg border-zinc-200'>
            <Space
                direction='vertical'
                className='w-full'
            >
                <div className='flex items-center space-x-2  w-full mb-2'>
                    <span>label</span>
                    {/*     {field?.isRequired && <WiStars className='ml-2' />} */}
                    <WiStars />
                </div>

                <Form.Item>
                    <Radio.Group
                        value={value}
                        onChange={handleRadioChange}
                    >
                        <Space direction='vertical'>
                            {fakeOptions?.map((option, index) => (
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

const fakeOptions = [
    {
        id: '5',
        createdAt: '2024-04-06T14:14:26.103Z',
        updatedAt: '2024-04-06T14:14:26.103Z',
        deletedAt: null,
        name: 'op2',
        formFieldId: '9',
    },
    {
        id: '6',
        createdAt: '2024-04-06T14:14:26.105Z',
        updatedAt: '2024-04-06T14:14:26.105Z',
        deletedAt: null,
        name: 'op1',
        formFieldId: '9',
    },
];
