import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Space, Button, Divider, InputNumber } from 'antd';

import Title from 'antd/es/typography/Title';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useAddValidationRuleMutation, useRemoveValidationRuleMutation } from '../dynamicFormsSlice';

export default function NumberProperties({
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
    const [isNameFieldTouched, setIsNameFieldTouched] = useState(false);
    const [isLabelFieldTouched, setIsLabelFieldTouched] = useState(false);

    const handleNameInputChange = (newName) => {
        onNameChange(newName);
        setIsNameFieldTouched(false);
    };

    const handleLabelInputChange = (newLabel) => {
        onLabelChange(newLabel);
        setIsLabelFieldTouched(false);
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
        if (!ruleWithVal.value)
            onValidationRulesChange({
                ...ruleWithVal,
                delete: true,
                validation_rule_id:
                    ruleWithVal.rule == 'min'
                        ? field.validationRules?.find((rule) => rule.rule === 'min').id
                        : field.validationRules?.find((rule) => rule.rule === 'max').id,
            });
        else onValidationRulesChange(ruleWithVal);
    };

    useEffect(() => {
        if (field) {
            document.getElementById('num-prop-name').value = field.name || '';
            document.getElementById('num-prop-label').value = field.label || '';
            document.getElementById('num-prop-isRequired').checked = !!field.required;

            const minRule = field.validationRules?.find((rule) => rule.rule == 'min');
            setMinValue(minRule?.value || '');

            const maxRule = field.validationRules?.find((rule) => rule.rule == 'max');
            setMaxValue(maxRule?.value || '');
        }
    }, [field, isErrorRemovingValidationRule, isErrorAddingValidationRule]);

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
                className='w-full my-2'
            >
                <Title
                    level={5}
                    htmlFor='name'
                >
                    Name
                </Title>
                <Space.Compact>
                    <Input
                        id='num-prop-name'
                        onChangeCapture={() => setIsNameFieldTouched(true)}
                        defaultValue={field?.name}
                    />
                    {isNameFieldTouched && (
                        <Button
                            onClick={() => handleNameInputChange(document.getElementById('num-prop-name').value)}
                            icon={<CheckOutlined />}
                        />
                    )}
                </Space.Compact>
            </Space.Compact>
            <Space.Compact
                align='center'
                direction='vertical'
                className='w-full my-2'
            >
                <Title
                    level={5}
                    htmlFor='label'
                >
                    Label
                </Title>
                <Space.Compact>
                    <Input
                        id='num-prop-label'
                        defaultValue={field?.label}
                        onChangeCapture={() => setIsLabelFieldTouched(true)}
                    />

                    {isLabelFieldTouched && (
                        <Button
                            onClick={() => handleLabelInputChange(document.getElementById('num-prop-label').value)}
                            icon={<CheckOutlined />}
                        />
                    )}
                </Space.Compact>
            </Space.Compact>

            <Divider>Rules</Divider>
            <div className='flex flex-col space-y-4'>
                <div className='flex  items-start'>
                    <InputNumber
                        type='number'
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
                                        validation_rule_id: field.validationRules?.find((rule) => rule.rule === 'min')
                                            .id,
                                    })
                                }
                            />
                        }
                        onBlur={(e) => {
                            if (e.target.value) handleValidationRulesChange({ rule: 'min', value: e.target.value });
                            else {
                                handleValidationRulesChange({
                                    rule: 'min',
                                    delete: true,
                                    validation_rule_id: field.validationRules?.find((rule) => rule.rule === 'min').id,
                                });
                            }
                        }}
                    />
                </div>
                <div className='flex items-start'>
                    <InputNumber
                        type='number'
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
                                        validation_rule_id: field.validationRules?.find((rule) => rule.rule === 'max')
                                            .id,
                                    })
                                }
                            />
                        }
                        onBlur={(e) => {
                            if (e.target.value) handleValidationRulesChange({ rule: 'max', value: e.target.value });
                            else {
                                handleValidationRulesChange({
                                    rule: 'max',
                                    delete: true,
                                    validation_rule_id: field.validationRules?.find((rule) => rule.rule === 'max').id,
                                });
                            }
                        }}
                    />
                </div>
            </div>

            <Divider />
            <Space
                align='center'
                direction='vertical'
                className='w-full my-2'
            >
                <Title
                    level={5}
                    htmlFor='isRequired'
                    style={{ margin: 0 }}
                >
                    Is Required
                </Title>
                <Checkbox
                    id='num-prop-isRequired'
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
