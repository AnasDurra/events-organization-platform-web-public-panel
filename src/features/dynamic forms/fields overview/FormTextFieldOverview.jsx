import { FieldStringOutlined } from '@ant-design/icons';
import { Form, Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { WiStars } from 'react-icons/wi';

export default function FormTextFieldOverview({ isDragging, field, groupIndex, fieldIndex }) {
    const { label, required, validationRules } = field;
    const getValidationRulesText = () => {
        const rulesText = validationRules.map((rule) => {
            if (rule.rule === 'min') {
                return `Min characters: ${rule.value}`;
            } else if (rule.rule === 'max') {
                return `Max characters: ${rule.value}`;
            }
            return '';
        });

        return rulesText.join(' | ');
    };

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
                <div className='text-gray-700 font-semibold flex items-center space-x-2  w-full my-2'>
                    <span>{label}</span>
                    {required && <WiStars className='ml-2' />}
                </div>

                <Form.Item
                    name={['groups', groupIndex, 'fields', fieldIndex, 'name']}
                    className='my-2'
                >
                    <Input
                        className='w-[100%] '
                        disabled
                        placeholder='field name'
                        size='small'
                        variant='filled'
                        suffix={<FieldStringOutlined />}
                    />
                </Form.Item>
                {validationRules?.length > 0 && (
                    <div className='text-xs text-gray-700 font-semibold p-2'>{getValidationRulesText()}</div>
                )}
            </Space.Compact>
        </div>
    );
}
