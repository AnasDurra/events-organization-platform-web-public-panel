import React, { useEffect } from 'react';
import { Input, Checkbox, Space, Button, Divider, InputNumber } from 'antd';
import Title from 'antd/es/typography/Title';

export default function NumberProperties({
    field,
    onNameChange,
    onLabelChange,
    onIsRequiredChange,
    onDelete,
    onValidationRulesChange,
}) {
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
        onValidationRulesChange(ruleWithVal)
    };

    useEffect(() => {
        if (field) {
            document.getElementById('num-prop-name').value = field.name || '';
            document.getElementById('num-prop-label').value = field.label || '';
            document.getElementById('num-prop-isRequired').checked = !!field.isRequired;
            //  document.getElementById('num-prop-rule-min').value = ;
        }
        console.log(field);
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
                className='w-full my-2'
            >
                <Title
                    level={5}
                    htmlFor='name'
                >
                    Name
                </Title>
                <Input
                    id='num-prop-name'
                    onChange={handleNameInputChange}
                    defaultValue={field?.name}
                />
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
                <Input
                    id='num-prop-label'
                    defaultValue={field?.label}
                    onChange={handleLabelInputChange}
                />
            </Space.Compact>

            <Divider>Rules</Divider>
            <div className='flex flex-col space-y-4'>
                <div className='flex  items-start'>
                    <div className='w-40 text-left'>minimum:</div>
                    <InputNumber
                        size='small'
                        className='w-40'
                        id='num-prop-rule-min'
                        onBlur={(e) => handleValidationRulesChange({ rule: 'min', value: e.target.value })}
                    />
                </div>
                <div className='flex justify-between items-start'>
                    <div className='w-40 text-left'>maximum:</div>
                    <InputNumber
                        size='small'
                        className='w-40'
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
