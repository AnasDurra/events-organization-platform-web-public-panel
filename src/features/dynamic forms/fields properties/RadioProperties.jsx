import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Space, Divider, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { CloseCircleOutlined } from '@ant-design/icons';
import {
    useAddNewFieldOptionMutation,
    useRemoveFieldMutation,
    useRemoveFieldOptionMutation,
    useUpdateGroupFieldMutation,
} from '../dynamicFormsSlice';
import { v4 as uuidv4 } from 'uuid';

export default function RadioProperties({
    field,
    onNameChange,
    onLabelChange,
    onIsRequiredChange,
    onOptionsChange,
    onDelete,
}) {
    const [, { isError: isErrorRemovingOption }] = useRemoveFieldOptionMutation({
        fixedCacheKey: 'shared-update-option',
    });
    const [, { isError: isErrorAddingOption }] = useAddNewFieldOptionMutation({
        fixedCacheKey: 'shared-update-option',
    });
    const [, { isError: isUpdateFormFieldError }] = useUpdateGroupFieldMutation({
        fixedCacheKey: 'shared-update-field',
    });

    const [options, setOptions] = useState(field?.options || []);

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

    const handleOptionAdd = () => {
        const newOptions = [...options, { id: uuidv4(), name: '' }];
        onOptionsChange(newOptions);
    };

    const handleOptionRemove = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        onOptionsChange(updatedOptions);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = { ...updatedOptions[index], name: value };
        setOptions(updatedOptions);
        onOptionsChange(updatedOptions);
    };

    useEffect(() => {
        console.log('update fild: ', field);
        if (field) {
            document.getElementById('tf-prop-name').value = field.name || '';
            document.getElementById('tf-prop-label').value = field.label || '';
            document.getElementById('tf-prop-isRequired').checked = !!field.isRequired;
            setOptions(field.options || []);
        }
    }, [field, isErrorAddingOption, isErrorRemovingOption, isUpdateFormFieldError]);

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
                    onBlur={handleNameInputChange}
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

            <Divider style={{ marginTop: '3em' }}>Options</Divider>

            {options.map((option, index) => (
                <div
                    key={option.id}
                    style={{ display: 'flex', marginBottom: '0.5rem' }}
                >
                    <Input
                        value={option.name}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        style={{ flex: 1 }}
                    />
                    {options.length == 1 && index == 0 ? null : (
                        <Button
                            type='danger'
                            icon={<CloseCircleOutlined />}
                            onClick={() => handleOptionRemove(index)}
                        />
                    )}
                </div>
            ))}

            <Button
                type='primary'
                onClick={handleOptionAdd}
                disabled={options.some((option) => option.name.trim() === '')}
            >
                Add Option
            </Button>
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
