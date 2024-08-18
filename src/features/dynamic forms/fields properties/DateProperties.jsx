import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Space, Divider, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { CheckOutlined } from '@ant-design/icons';

export default function DateProperties({ field, onNameChange, onLabelChange, onIsRequiredChange, onDelete }) {
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
                <Space.Compact>
                    <Input
                        id='date-prop-name'
                        onChangeCapture={() => setIsNameFieldTouched(true)}
                        defaultValue={field?.name}
                    />
                    {isNameFieldTouched && (
                        <Button
                            onClick={() => handleNameInputChange(document.getElementById('date-prop-name').value)}
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
                        id='date-prop-label'
                        defaultValue={field?.label}
                        onChangeCapture={() => setIsLabelFieldTouched(true)}
                    />

                    {isLabelFieldTouched && (
                        <Button
                            onClick={() => handleLabelInputChange(document.getElementById('date-prop-label').value)}
                            icon={<CheckOutlined />}
                        />
                    )}
                </Space.Compact>
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
