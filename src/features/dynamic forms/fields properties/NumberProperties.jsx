import React, { useEffect } from 'react';
import { Input, Checkbox, Space } from 'antd';
import Title from 'antd/es/typography/Title';

export default function NumberProperties({ field, onNameChange, onLabelChange, onIsRequiredChange }) {
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
            document.getElementById('num-prop-name').value = field.name || '';
            document.getElementById('num-prop-label').value = field.label || '';
            document.getElementById('num-prop-isRequired').checked = !!field.isRequired;
        }
    }, [field]);

    return (
        <Space.Compact
            direction='vertical'
            className='w-full mt-2'
            align='center'
            block
        >
            <Space.Compact
                align='center'
                direction='vertical'
                className='w-full px-4 my-2'
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
                className='w-full px-4 my-2'
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
            <Space
                align='center'
                direction='vertical'
                className='w-full px-4 my-2'
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
                    id='num-prop-isRequired'
                    defaultChecked={field?.isRequired}
                    onChange={handleIsRequiredCheckboxChange}
                />
            </Space>
        </Space.Compact>
    );
}
