import React, { useEffect } from 'react';
import { Input, Checkbox, Space, Divider, Button } from 'antd';
import Title from 'antd/es/typography/Title';

export default function DateProperties({ field, onNameChange, onLabelChange, onIsRequiredChange, onDelete }) {
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

    useEffect(() => {
        if (field) {
            document.getElementById('date-prop-name').value = field.name || '';
            document.getElementById('date-prop-label').value = field.label || '';
            document.getElementById('date-prop-isRequired').checked = !!field.isRequired;
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
                className='w-full my-2'
            >
                <Title
                    level={5}
                    htmlFor='name'
                >
                    Name
                </Title>
                <Input
                    id='date-prop-name'
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
                    id='date-prop-label'
                    defaultValue={field?.label}
                    onChange={handleLabelInputChange}
                />
            </Space.Compact>
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
                    {' '}
                    Is Required
                </Title>
                <Checkbox
                    id='date-prop-isRequired'
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
