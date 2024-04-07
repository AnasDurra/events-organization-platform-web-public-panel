import React, { useEffect } from 'react';
import { Input, Checkbox, Space, Button, Divider } from 'antd';
import Title from 'antd/es/typography/Title';

export default function TextFieldProperties({ field, onNameChange, onLabelChange, onIsRequiredChange, onDelete }) {
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
            document.getElementById('tf-prop-name').value = field.name || '';
            document.getElementById('tf-prop-label').value = field.label || '';
            document.getElementById('tf-prop-isRequired').checked = !!field.isRequired;
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
                    defaultChecked={field?.isRequired}
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
