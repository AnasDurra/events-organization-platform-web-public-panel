import {
    CalendarOutlined,
    CheckCircleOutlined,
    FieldNumberOutlined,
    FieldStringOutlined,
    GroupOutlined,
} from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Divider,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Tag,
    TreeSelect,
    Typography,
} from 'antd';
import React, { useState } from 'react';
import { SidebarItemsIDs } from '../constants';
import Title from 'antd/es/typography/Title';
import useNumberFieldState from './useNumberFieldState';

const fieldIcons = {
    [SidebarItemsIDs.TEXTFIELD]: <FieldStringOutlined />,
    [SidebarItemsIDs.NUMBER]: <FieldNumberOutlined />,
    [SidebarItemsIDs.DATE]: <CalendarOutlined />,
    [SidebarItemsIDs.RADIO]: <CheckCircleOutlined />,
};

const getFieldIcon = (fieldType) => {
    return fieldIcons[fieldType] || null;
};

export default function Filter() {
    const [selectedFieldsIds, setSelectedFieldsIds] = useState([]);
    const { operator, showRangeInputs, fromValue, toValue, handleOperatorChange, setFromValue, setToValue } =
        useNumberFieldState();

    const filterOptions = {
        [SidebarItemsIDs.TEXTFIELD]: (field) => (
            <Row justify={'space-between'}>
                <Col span={10}>
                    <Typography.Text>
                        <Typography.Text>{`➥ ${field.name}`}</Typography.Text>
                        <Typography.Text type='secondary'>{` (id:${field.id})`}</Typography.Text>
                    </Typography.Text>
                </Col>
                <Col span={14}>
                    <Input
                        size='small'
                        variant='filled'
                        placeholder='write a sentence you are looking for'
                    />
                </Col>
            </Row>
        ),
        [SidebarItemsIDs.NUMBER]: (field) => {
            return (
                <Row justify={'space-between'}>
                    <Col span={10}>
                        <Typography.Text>
                            <Typography.Text>{`➥ ${field.name}`}</Typography.Text>
                            <Typography.Text type='secondary'>{` (id:${field.id})`}</Typography.Text>
                        </Typography.Text>
                    </Col>
                    <Col span={14}>
                        <Space.Compact className='w-full'>
                            <Select
                                className='w-full'
                                size='small'
                                variant='filled'
                                placeholder='Select operator'
                                onChange={(value) => handleOperatorChange(field.id, value)}
                            >
                                <Select.Option value='lessThan'>Less Than</Select.Option>
                                <Select.Option value='moreThan'>More Than</Select.Option>
                                <Select.Option value='lessOrEqual'>Less or Equal</Select.Option>
                                <Select.Option value='moreOrEqual'>More or Equal</Select.Option>
                                <Select.Option value='betweenRange'>Between Range</Select.Option>
                            </Select>
                            {showRangeInputs[field.id] == 'betweenRange' ? (
                                <Space.Compact size={8}>
                                    <InputNumber
                                        size='small'
                                        variant='filled'
                                        placeholder='From'
                                        className='w-full'
                                        value={fromValue[field.id]}
                                        onChange={(value) =>
                                            setFromValue((prevState) => ({ ...prevState, [field.id]: value }))
                                        }
                                    />
                                    <InputNumber
                                        size='small'
                                        variant='filled'
                                        className='w-full'
                                        placeholder='To'
                                        value={toValue[field.id]}
                                        onChange={(value) =>
                                            setToValue((prevState) => ({ ...prevState, [field.id]: value }))
                                        }
                                    />
                                </Space.Compact>
                            ) : showRangeInputs[field.id] ? (
                                <Space.Compact size={8}>
                                    <InputNumber
                                        className='w-full'
                                        size='small'
                                        variant='filled'
                                        placeholder='number'
                                        value={fromValue[field.id]}
                                        onChange={(value) =>
                                            setFromValue((prevState) => ({ ...prevState, [field.id]: value }))
                                        }
                                    />
                                </Space.Compact>
                            ) : null}
                        </Space.Compact>
                    </Col>
                </Row>
            );
        },

        [SidebarItemsIDs.DATE]: (field) => {
            return (
                <Row justify={'space-between'}>
                    <Col span={10}>
                        <Typography.Text>
                            <Typography.Text>{`➥ ${field.name}`}</Typography.Text>
                            <Typography.Text type='secondary'>{` (id:${field.id})`}</Typography.Text>
                        </Typography.Text>
                    </Col>
                    <Col span={14}>
                        <Space.Compact className='w-full'>
                            <Select
                                className='w-full'
                                size='small'
                                variant='filled'
                                placeholder='Select operator'
                                onChange={(value) => handleOperatorChange(field.id, value)}
                            >
                                <Select.Option value='lessThan'>Less Than</Select.Option>
                                <Select.Option value='moreThan'>More Than</Select.Option>
                                <Select.Option value='lessOrEqual'>Less or Equal</Select.Option>
                                <Select.Option value='moreOrEqual'>More or Equal</Select.Option>
                                <Select.Option value='betweenRange'>Between Range</Select.Option>
                            </Select>
                            {showRangeInputs[field.id] == 'betweenRange' ? (
                                <Space.Compact
                                    size={12}
                                    className='w-full'
                                >
                                    <DatePicker.RangePicker
                                        className='w-full'
                                        size='small'
                                        variant='filled'
                                        placeholder='From Date'
                                        value={fromValue[field.id]}
                                        onChange={(value) =>
                                            setFromValue((prevState) => ({ ...prevState, [field.id]: value }))
                                        }
                                    />
                                </Space.Compact>
                            ) : showRangeInputs[field.id] ? (
                                <Space.Compact
                                    size={12}
                                    className='w-full'
                                >
                                    <DatePicker
                                        className='w-full'
                                        size='small'
                                        variant='filled'
                                        placeholder='Select Date'
                                        value={fromValue[field.id]}
                                        onChange={(value) =>
                                            setFromValue((prevState) => ({ ...prevState, [field.id]: value }))
                                        }
                                    />
                                </Space.Compact>
                            ) : null}
                        </Space.Compact>
                    </Col>
                </Row>
            );
        },

        [SidebarItemsIDs.RADIO]: (field) => (
            <Row justify={'space-between'}>
                <Col span={10}>
                    <Typography.Text>
                        <Typography.Text>{`➥ ${field.name}`}</Typography.Text>
                        <Typography.Text type='secondary'>{` (id:${field.id})`}</Typography.Text>
                    </Typography.Text>
                </Col>
                <Col span={14}>
                    <Select
                        className='w-full'
                        size='small'
                        placeholder='click and Select option'
                        variant='filled'
                    >
                        {selectedFieldsIds.length > 0 &&
                            fake_form.groups
                                .flatMap((group) => group.fields)
                                .find((innerField) => innerField.id === field.id)
                                ?.options?.map((option) => (
                                    <Select.Option
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.name}
                                    </Select.Option>
                                ))}
                    </Select>
                </Col>
            </Row>
        ),
    };

    return (
        <div>
            <div className='flex justify-center items-center mt-2 mb-6'>
                <div className='w-full flex  flex-col justify-center items-center'>
                    <Title level={5}>select fields</Title>
                    <TreeSelect
                        className='w-full overflow-auto b'
                        variant='outlined'
                        placeholder='Please select field to add filter'
                        treeLine
                        multiple
                        treeDefaultExpandAll
                        onChange={setSelectedFieldsIds}
                        treeData={fake_form.groups.map((group) => ({
                            value: group.id,
                            title: `${group.name} (${group.description ? group.description : 'no description'})`,
                            selectable: false,
                            children: group.fields.map((field) => ({
                                value: field.id,
                                title: field.name,
                                icon: getFieldIcon(field.fieldType.id),
                            })),
                        }))}
                        treeIcon
                        switcherIcon={<GroupOutlined />}
                        onSelect={(selected_value) => console.log(selected_value)}
                        tagRender={(props) => (
                            <Tag className='bg-transparent'> {`${props.label} (id:${props.value})`}</Tag>
                        )}
                        allowClear
                    />
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <Title level={5}>filtered fields</Title>
                <div className='w-full mx-2 my-2'>
                    {selectedFieldsIds.map((fieldId) => {
                        const field = fake_form.groups
                            .flatMap((group) => group.fields)
                            .find((field) => field.id === fieldId);

                        return (
                            <div
                                className='my-2'
                                key={fieldId}
                            >
                                {filterOptions[field.fieldType.id](field)}
                            </div>
                        );
                    })}
                </div>
                {selectedFieldsIds.length ? (
                    <Button
                        type='dashed'
                        className='w-full'
                    >
                        OR
                    </Button>
                ) : null}
            </div>
        </div>
    );
}

const fake_form = {
    id: '3',
    createdAt: '2024-04-06T14:14:26.087Z',
    updatedAt: '2024-04-06T14:14:26.087Z',
    deletedAt: null,
    name: 'form name',
    description: 'form desc',
    groups: [
        {
            id: '6',
            createdAt: '2024-04-06T14:14:26.087Z',
            updatedAt: '2024-04-06T14:14:26.087Z',
            deletedAt: null,
            name: 'group1',
            description: null,
            position: 1,
            fields: [
                {
                    id: '8',
                    createdAt: '2024-04-06T14:14:26.087Z',
                    updatedAt: '2024-04-06T14:14:26.087Z',
                    deletedAt: null,
                    name: 'field1',
                    label: 'label1',
                    required: false,
                    position: 1,
                    fieldTypeId: '3',
                    options: [],
                    fieldType: {
                        id: '3',
                        createdAt: '2024-04-03T19:25:49.918Z',
                        updatedAt: '2024-04-03T19:25:49.918Z',
                        deletedAt: null,
                        name: 'TEXT',
                        fieldTypeOperators: [],
                    },
                },
            ],
        },
        {
            id: '7',
            createdAt: '2024-04-06T14:14:26.087Z',
            updatedAt: '2024-04-06T14:14:26.087Z',
            deletedAt: null,
            name: 'group2',
            description: null,
            position: 2,
            fields: [
                {
                    id: '9',
                    createdAt: '2024-04-06T14:14:26.097Z',
                    updatedAt: '2024-04-06T14:14:26.097Z',
                    deletedAt: null,
                    name: 'field2',
                    label: 'label2',
                    required: false,
                    position: 1,
                    fieldTypeId: '4',
                    options: [
                        {
                            id: '5',
                            createdAt: '2024-04-06T14:14:26.103Z',
                            updatedAt: '2024-04-06T14:14:26.103Z',
                            deletedAt: null,
                            name: 'op2',
                            formFieldId: '9',
                        },
                        {
                            id: '6',
                            createdAt: '2024-04-06T14:14:26.105Z',
                            updatedAt: '2024-04-06T14:14:26.105Z',
                            deletedAt: null,
                            name: 'op1',
                            formFieldId: '9',
                        },
                    ],
                    fieldType: {
                        id: '4',
                        createdAt: '2024-04-03T19:25:49.918Z',
                        updatedAt: '2024-04-03T19:25:49.918Z',
                        deletedAt: null,
                        name: 'RADIO_BUTTON',
                        fieldTypeOperators: [],
                    },
                },
                {
                    id: '10',
                    createdAt: '2024-04-06T14:14:26.098Z',
                    updatedAt: '2024-04-06T14:14:26.098Z',
                    deletedAt: null,
                    name: 'number field',
                    label: 'label21',
                    required: false,
                    position: 2,
                    fieldTypeId: '2',
                    options: [],
                    fieldType: {
                        id: '2',
                        createdAt: '2024-04-03T19:25:49.918Z',
                        updatedAt: '2024-04-03T19:25:49.918Z',
                        deletedAt: null,
                        name: 'NUMBER',
                        fieldTypeOperators: [],
                    },
                },
            ],
        },
    ],
};
