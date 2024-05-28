import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Space, Button, Divider, InputNumber } from 'antd';
import Title from 'antd/es/typography/Title';
import { useAddValidationRuleMutation, useRemoveValidationRuleMutation } from '../dynamicFormsSlice';
import { CloseOutlined } from '@ant-design/icons';

export default function TextFieldProperties({
    field,
    onNameChange,
    onLabelChange,
    onIsRequiredChange,
    onDelete,
    onValidationRulesChange,
}) {
    const [, { isError: isErrorRemovingValidationRule }] = useRemoveValidationRuleMutation({
        fixedCacheKey: 'shared-update-val-rule',
    });
    const [, { isError: isErrorAddingValidationRule }] = useAddValidationRuleMutation({
        fixedCacheKey: 'shared-update-val-rule',
    });
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);

    const handleNameInputChange = (e) => {
        const newName = e.target.value;
        onNameChange(newName);
    };

    const handleLabelInputChange = (e) => {
        const newLabel = e.target.value;
        onLabelChange(newLabel);
    };

    const handleIsRequiredCheckboxChange = (e) => {
        const newIsRequired = e.target.checked;
        onIsRequiredChange(newIsRequired);
    };

    const handleValidationRulesChange = (ruleWithVal) => {
        if (ruleWithVal.rule == 'min') {
            setMinValue(ruleWithVal.value);
        }
        if (ruleWithVal.rule == 'max') {
            setMaxValue(ruleWithVal.value);
        }
        onValidationRulesChange(ruleWithVal);
    };

    useEffect(() => {
        if (field) {
            document.getElementById('tf-prop-name').value = field.name || '';
            document.getElementById('tf-prop-label').value = field.label || '';
            document.getElementById('tf-prop-isRequired').checked = !!field.isRequired;

            const minRule = field.validationRules.find((rule) => rule.rule == 'min');
            setMinValue(minRule?.value || '');

            const maxRule = field.validationRules.find((rule) => rule.rule == 'max');
            setMaxValue(maxRule?.value || '');
        }
    }, [field]);

    return (
        <Space.Compact
            direction='vertical'
            className='w-full mt-2 px-4'
            align='center'
            block
        >
            <Space.Compact
                align='center'
                direction='vertical'
                className='w-full  my-2'
            >
                <Title
                    level={5}
                    htmlFor='name'
                >
                    Name
                </Title>
                <Input
                    id='tf-prop-name'
                    onChange={handleNameInputChange}
                    defaultValue={field?.name}
                />
            </Space.Compact>
            <Space.Compact
                align='center'
                direction='vertical'
                className='w-full  my-2'
            >
                <Title
                    level={5}
                    htmlFor='label'
                >
                    Label
                </Title>
                <Input
                    id='tf-prop-label'
                    defaultValue={field?.label}
                    onChange={handleLabelInputChange}
                />
            </Space.Compact>
            <Divider>Rules</Divider>
            <div className='flex flex-col space-y-4'>
                <div className='flex  items-start'>
                    <InputNumber
                        size='small'
                        controls={false}
                        id='num-prop-rule-min'
                        value={minValue}
                        addonBefore={'minimum'}
                        addonAfter={
                            <CloseOutlined
                                style={{ color: 'GrayText' }}
                                className='hover:cursor-pointer'
                                onClick={() =>
                                    handleValidationRulesChange({
                                        rule: 'min',
                                        delete: true,
                                        validation_rule_id: field.validationRules.find((rule) => rule.rule === 'min')
                                            .id,
                                    })
                                }
                            />
                        }
                        onBlur={(e) => handleValidationRulesChange({ rule: 'min', value: e.target.value })}
                    />
                </div>
                <div className='flex items-start'>
                    <InputNumber
                        size='small'
                        controls={false}
                        id='num-prop-rule-max'
                        value={maxValue}
                        addonBefore={'maximum'}
                        addonAfter={
                            <CloseOutlined
                                style={{ color: 'GrayText' }}
                                className='hover:cursor-pointer'
                                onClick={() =>
                                    handleValidationRulesChange({
                                        rule: 'max',
                                        delete: true,
                                        validation_rule_id: field.validationRules.find((rule) => rule.rule === 'max')
                                            .id,
                                    })
                                }
                            />
                        }
                        onBlur={(e) => handleValidationRulesChange({ rule: 'max', value: e.target.value })}
                    />
                </div>
            </div>
            <Divider />
            <Space
                align='center'
                direction='vertical'
                className='w-full  my-2'
            >
                <Title
                    level={5}
                    htmlFor='isRequired'
                    style={{ margin: 0 }}
                >
                    {' '}
                    Is Required
                </Title>
                <Checkbox
                    id='tf-prop-isRequired'
                    defaultChecked={field?.required}
                    onChange={handleIsRequiredCheckboxChange}
                />
            </Space>

            <Divider />
            <Button
                type='primary'
                danger
                onClick={onDelete}
            >
                Delete Field
            </Button>
        </Space.Compact>
    );
}
