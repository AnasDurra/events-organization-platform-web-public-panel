import { Form, InputNumber, Space } from 'antd';
import { FieldNumberOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { WiStars } from 'react-icons/wi';

export default function FormNumberOverview({ isDragging, field, groupIndex, fieldIndex }) {
    const { label, required, validationRules } = field;

    const getValidationRulesText = () => {
        const rulesText = validationRules.map((rule) => {
            if (rule.rule === 'min') {
                return `Min: ${rule.value}`;
            } else if (rule.rule === 'max') {
                return `Max: ${rule.value}`;
            }
            return '';
        });

        return rulesText.join(' | ');
    };

    return (
        <div
            className='bg-gray-100 w-full px-4 border-4 border-zinc-200 rounded-3xl'
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <div className='text-gray-500 flex items-center space-x-2 w-full my-2'>
                    <span>{label}</span>
                    {required && <WiStars className='ml-2' />}
                </div>

                <Form.Item
                    name={['groups', groupIndex, 'fields', fieldIndex, 'name']}
                    rules={validationRules}
                    className='my-2'
                >
                    <InputNumber
                        className='w-full'
                        disabled
                        placeholder='Enter number'
                        suffix={<FieldNumberOutlined />}
                    />
                </Form.Item>

                {validationRules?.length > 0 && <div className='text-xs text-gray-500 p-2'>{getValidationRulesText()}</div>}
            </Space.Compact>
        </div>
    );
}
