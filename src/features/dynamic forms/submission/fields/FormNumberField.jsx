import { FieldNumberOutlined } from '@ant-design/icons';
import { Form, InputNumber, Space } from 'antd';
import React from 'react';
import { WiStars } from 'react-icons/wi';

export default function FormNumberField({ field, groupIndex, fieldIndex }) {
    const validationRules = field.validationRules;

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

    const validateNumber = (_, value) => {
        for (let i = 0; i < validationRules.length; i++) {
            const validationRule = validationRules[i];
            if (validationRule.rule == 'min' && value < parseFloat(validationRule.value)) {
                return Promise.reject(`Value must be at least ${validationRule.value}`);
            }
            if (validationRule.rule == 'max' && value > parseFloat(validationRule.value)) {
                return Promise.reject(`Value must no be more than ${validationRule.value}`);
            }
        }
        return Promise.resolve();
    };

    return (
        <>
            <div className='bg-gray-100/50 w-full px-4 border-2 rounded-lg border-zinc-200'>
                <Space.Compact
                    direction='vertical'
                    className='w-full'
                >
                    <div className='flex items-center space-x-2 w-full my-2'>
                        <span>{field.label}</span>
                        {field?.required && <WiStars className='ml-2' />}
                    </div>
                    <Form.Item
                        name={['groups', groupIndex, 'fields', fieldIndex, 'field_id']}
                        initialValue={field?.id}
                        hidden
                    />
                    <Form.Item
                        name={['groups', groupIndex, 'fields', fieldIndex, 'value']}
                        rules={[
                            { type: 'number' },
                            { required: field?.required, message: 'Required Field' },
                            { validator: validateNumber },
                        ]}
                    >
                        <InputNumber
                            placeholder='Enter number'
                            className='sm:w-[50%] w-full'
                            variant='borderless'
                            size='medium'
                            suffix={<FieldNumberOutlined />}
                            controls={false}
                        />
                    </Form.Item>

                    {validationRules?.length > 0 && (
                        <div className='text-xs text-gray-500 p-2'>{getValidationRulesText()}</div>
                    )}
                </Space.Compact>
            </div>
        </>
    );
}
