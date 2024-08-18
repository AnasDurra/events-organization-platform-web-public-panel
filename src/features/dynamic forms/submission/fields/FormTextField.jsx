import React from 'react';
import { Space, Typography, Form, Input } from 'antd';
import { WiStars } from 'react-icons/wi';
import { FieldStringOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

export default function FormTextField({ field, groupIndex, fieldIndex }) {
    const validationRules = field.validationRules;

    const getValidationRulesText = () => {
        const rulesText = validationRules.map((rule) => {
            if (rule.rule === 'min') {
                return `Min: ${rule.value} characters`;
            } else if (rule.rule === 'max') {
                return `Max: ${rule.value} characters`;
            }
            return '';
        });

        return rulesText.join(' | ');
    };

    const validateText = (_, value) => {
        for (let i = 0; i < validationRules.length; i++) {
            const validationRule = validationRules[i];
            if (validationRule.rule === 'min' && value.length < parseInt(validationRule.value)) {
                return Promise.reject(`Text must be at least ${validationRule.value} characters long`);
            }
            if (validationRule.rule === 'max' && value.length > parseInt(validationRule.value)) {
                return Promise.reject(`Text must not exceed ${validationRule.value} characters`);
            }
        }
        return Promise.resolve();
    };

    return (
        <div className='bg-gray-50/100 w-full px-4 border-2 rounded-lg border-zinc-500'>
            <Space.Compact
                direction='vertical'
                className='w-full'
            >
                <div className='flex items-center space-x-2 w-full my-2'>
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
                    rules={[{ required: field?.required, message: 'Required Field' }, { validator: validateText }]}
                >
                    <TextArea
                        placeholder={field.name}
                        className='sm:w-[75%] w-full'
                        variant='filled'
                        size='medium'
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        suffix={<FieldStringOutlined />}
                    />
                </Form.Item>


                {validationRules?.length > 0 && (
                    <div className='text-xs text-gray-500 p-2'>{getValidationRulesText()}</div>
                )}
            </Space.Compact>
        </div>
    );
}
