import {
    CalendarOutlined,
    CheckCircleOutlined,
    DownOutlined,
    FieldNumberOutlined,
    FieldStringOutlined,
    FilterOutlined,
    GroupOutlined,
    MinusOutlined,
} from '@ant-design/icons';
import {
    Button,
    Col,
    Collapse,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Tag,
    TreeSelect,
    Typography,
} from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
import React, { useState } from 'react';
import { SidebarItemsIDs } from '../constants';
import './Filter.css';
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

export default function Filter({ onFilter }) {
    const [sets, setSets] = useState([{ selectedFieldsIds: [] }]);
    const { operator, showRangeInputs, fromValue, toValue, handleOperatorChange, setFromValue, setToValue } =
        useNumberFieldState();

    const handleAddSet = () => {
        setSets((prevSets) => [...prevSets, { selectedFieldsIds: [] }]);
    };

    // Function to handle selecting fields for a particular set
    const handleSelectFields = (selectedFields, index) => {
        setSets((prevSets) => {
            const newSets = [...prevSets];
            newSets[index].selectedFieldsIds = selectedFields;
            return newSets;
        });
    };

    const handleRemoveSet = (index) => {
        setSets((prevSets) => {
            const newSets = [...prevSets];
            newSets.splice(index, 1);
            return newSets;
        });
    };

    const handleOnFilterFinish = (fields) => {
        fields?.groups?.forEach((group) => {
            group.conditions?.forEach((condition) => {
                const matchingField = fake_form.groups
                    .flatMap((grp) => grp.fields)
                    .find((field) => field.id === condition.field_id);

                if (matchingField && matchingField.fieldType?.id == SidebarItemsIDs.DATE) {
                    condition.value = moment(condition.value).format('YYYY-MM-DD');
                }
            });
        });

        console.log('form fields: ', fields);
        onFilter(fields);
    };

    const filterOptions = {
        [SidebarItemsIDs.TEXTFIELD]: ({ field, setIndex, fieldIndex }) => {
            const options = fake_field_types
                .find((fieldType) => fieldType.id == field.fieldType.id)
                .fieldTypeOperators.map((operator) => (
                    <Select.Option
                        key={operator.query_operator.id}
                        value={operator.query_operator.id}
                    >
                        {operator.query_operator.name}
                    </Select.Option>
                ));
            return (
                <Row justify={'space-between'}>
                    <Form.Item
                        noStyle
                        name={['groups', setIndex, 'conditions', fieldIndex, 'field_id']}
                        initialValue={field.id}
                    >
                        <Input hidden />
                    </Form.Item>

                    <Col span={10}>
                        <Typography.Text>
                            <Typography.Text>{`➥ ${field.name}`}</Typography.Text>
                            <Typography.Text type='secondary'>{` (id:${field.id})`}</Typography.Text>
                        </Typography.Text>
                    </Col>
                    <Col span={14}>
                        <Space.Compact className='w-full'>
                            <Form.Item
                                noStyle
                                name={['groups', setIndex, 'conditions', fieldIndex, 'operator_id']}
                            >
                                <Select
                                    className='w-full'
                                    size='small'
                                    variant='filled'
                                    placeholder='Select operator'
                                    onChange={(value) => handleOperatorChange(field.id, value)}
                                >
                                    {options}
                                </Select>
                            </Form.Item>
                            {showRangeInputs[field.id] && (
                                <Space.Compact
                                    className='w-full'
                                    size={16}
                                >
                                    <Form.Item
                                        noStyle
                                        name={['groups', setIndex, 'conditions', fieldIndex, 'value']}
                                    >
                                        <Input
                                            size='small'
                                            variant='filled'
                                            placeholder='write here..'
                                            className='w-full'
                                        />
                                    </Form.Item>
                                </Space.Compact>
                            )}
                        </Space.Compact>
                    </Col>
                </Row>
            );
        },

        [SidebarItemsIDs.NUMBER]: ({ field, setIndex, fieldIndex }) => {
            const options = fake_field_types
                .find((fieldType) => fieldType.id == field.fieldType.id)
                .fieldTypeOperators.map((operator) => (
                    <Select.Option
                        key={operator.query_operator.id}
                        value={operator.query_operator.id}
                    >
                        {operator.query_operator.name}
                    </Select.Option>
                ));

            return (
                <Row justify={'space-between'}>
                    <Form.Item
                        noStyle
                        name={['groups', setIndex, 'conditions', fieldIndex, 'field_id']}
                        initialValue={field.id}
                    >
                        <Input hidden />
                    </Form.Item>

                    <Col span={10}>
                        <Typography.Text>
                            <Typography.Text>{`➥ ${field.name}`}</Typography.Text>
                            <Typography.Text type='secondary'>{` (id:${field.id})`}</Typography.Text>
                        </Typography.Text>
                    </Col>
                    <Col span={14}>
                        <Space.Compact className='w-full'>
                            <Form.Item
                                noStyle
                                name={['groups', setIndex, 'conditions', fieldIndex, 'operator_id']}
                            >
                                <Select
                                    className='w-full'
                                    size='small'
                                    variant='filled'
                                    placeholder='Select operator'
                                    onChange={(value) => handleOperatorChange(field.id, value)}
                                >
                                    {options}
                                </Select>
                            </Form.Item>
                            {/* TODO range operators*/}
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
                                    <Form.Item
                                        noStyle
                                        name={['groups', setIndex, 'conditions', fieldIndex, 'value']}
                                    >
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
                                    </Form.Item>
                                </Space.Compact>
                            ) : null}
                        </Space.Compact>
                    </Col>
                </Row>
            );
        },

        [SidebarItemsIDs.DATE]: ({ field, setIndex, fieldIndex }) => {
            const options = fake_field_types
                .find((fieldType) => fieldType.id == field.fieldType.id)
                .fieldTypeOperators.map((operator) => (
                    <Select.Option
                        key={operator.query_operator.id}
                        value={operator.query_operator.id}
                    >
                        {operator.query_operator.name}
                    </Select.Option>
                ));

            return (
                <Row justify={'space-between'}>
                    <Form.Item
                        noStyle
                        name={['groups', setIndex, 'conditions', fieldIndex, 'field_id']}
                        initialValue={field.id}
                    >
                        <Input hidden />
                    </Form.Item>

                    <Col span={10}>
                        <Typography.Text>
                            <Typography.Text>{`➥ ${field.name}`}</Typography.Text>
                            <Typography.Text type='secondary'>{` (id:${field.id})`}</Typography.Text>
                        </Typography.Text>
                    </Col>
                    <Col span={14}>
                        <Space.Compact className='w-full'>
                            <Form.Item
                                noStyle
                                name={['groups', setIndex, 'conditions', fieldIndex, 'operator_id']}
                            >
                                <Select
                                    className='w-full'
                                    size='small'
                                    variant='filled'
                                    placeholder='Select operator'
                                    onChange={(value) => handleOperatorChange(field.id, value)}
                                >
                                    {options}
                                </Select>
                            </Form.Item>
                            {/* TODO range complex operator */}
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
                                    <Form.Item
                                        noStyle
                                        name={['groups', setIndex, 'conditions', fieldIndex, 'value']}
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
                                    </Form.Item>
                                </Space.Compact>
                            ) : null}
                        </Space.Compact>
                    </Col>
                </Row>
            );
        },

        [SidebarItemsIDs.RADIO]: ({ field, setIndex, fieldIndex }) => {
            return (
                <Row justify={'space-between'}>
                    <Form.Item
                        noStyle
                        name={['groups', setIndex, 'conditions', fieldIndex, 'field_id']}
                        initialValue={field.id}
                    >
                        <Input hidden />
                    </Form.Item>
                    <Col span={10}>
                        <Typography.Text>
                            <Typography.Text>{`➥ ${field.name}`}</Typography.Text>
                            <Typography.Text type='secondary'>{` (id:${field.id})`}</Typography.Text>
                        </Typography.Text>
                    </Col>
                    <Col span={14}>
                        <Form.Item
                            noStyle
                            name={['groups', setIndex, 'conditions', fieldIndex, 'value']}
                        >
                            <Select
                                className='w-full'
                                size='small'
                                placeholder='click and Select option'
                                variant='filled'
                            >
                                {sets[setIndex].selectedFieldsIds.length > 0 &&
                                    fake_form.groups
                                        .flatMap((group) => group.fields)
                                        .find((innerField) => innerField.id === field.id)
                                        ?.options?.map((option) => (
                                            <Select.Option
                                                key={option.id}
                                                value={option.name}
                                            >
                                                {option.name}
                                            </Select.Option>
                                        ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            );
        },
    };

    return (
        <Collapse
            className={`shadow shadow-lg`}
            size='middle'
            expandIcon={({ isActive }) => (isActive ? <DownOutlined /> : <FilterOutlined />)}
            bordered
            items={[
                {
                    key: '1',
                    label: (
                        <div className='flex space-x-2 items-center'>
                            <span className='font-bold'>Filters</span>
                            <span>(2 active filters)</span>
                        </div>
                    ),
                    children: (
                        <div>
                            <Form onFinish={handleOnFilterFinish}>
                                {sets.map((set, setIndex) => (
                                    <div key={setIndex}>
                                        <div className='flex justify-center items-center mt-2 mb-6'>
                                            <div className='w-full flex  flex-col justify-center items-start'>
                                                {setIndex == 0 && <Title level={5}>Select Fields</Title>}
                                                <TreeSelect
                                                    className='w-full overflow-auto b'
                                                    variant='outlined'
                                                    placeholder='Please select field to add filter'
                                                    treeLine
                                                    multiple
                                                    treeDefaultExpandAll
                                                    onChange={(selectedFields) =>
                                                        handleSelectFields(selectedFields, setIndex)
                                                    }
                                                    treeData={fake_form.groups.map((group) => ({
                                                        value: group.id,
                                                        title: `${group.name} (${
                                                            group.description ? group.description : 'no description'
                                                        })`,
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
                                                        <Tag className='bg-transparent'>
                                                            {' '}
                                                            {`${props.label} (id:${props.value})`}
                                                        </Tag>
                                                    )}
                                                    allowClear
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col justify-center items-center'>
                                            {setIndex == 0 && (
                                                <Space.Compact className='w-full'>
                                                    <Space className='w-[95%] block text-center'>
                                                        <Divider level={5}>Filtered Fields</Divider>
                                                    </Space>
                                                    {sets.length > 1 && (
                                                        <Space>
                                                            <Button
                                                                type='text'
                                                                icon={<MinusOutlined />}
                                                                onClick={() => handleRemoveSet(setIndex)}
                                                            />
                                                        </Space>
                                                    )}
                                                </Space.Compact>
                                            )}
                                            <div className='w-full mx-2 my-2'>
                                                {set.selectedFieldsIds.map((fieldId, fieldIndex) => {
                                                    const field = fake_form.groups
                                                        .flatMap((group) => group.fields)
                                                        .find((field) => field.id === fieldId);

                                                    return (
                                                        <div
                                                            className='my-2'
                                                            key={fieldId}
                                                        >
                                                            {filterOptions[field.fieldType.id]({
                                                                field,
                                                                setIndex,
                                                                fieldIndex,
                                                            })}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {setIndex == sets.length - 1 && (
                                            <Space.Compact className='w-full space-x-2'>
                                                <div className='w-[50%] '>
                                                    <Button
                                                        type='primary'
                                                        size='small'
                                                        className='w-full '
                                                        onClick={handleAddSet}
                                                    >
                                                        OR
                                                    </Button>
                                                </div>
                                                <div className='w-[50%] '>
                                                    <Button
                                                        type='primary'
                                                        size='small'
                                                        className='w-full'
                                                        htmlType='submit'
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </Space.Compact>
                                        )}

                                        {setIndex != sets.length - 1 && (
                                            <Space.Compact className='w-full'>
                                                <Space className='w-[95%] block'>
                                                    <Divider>OR</Divider>
                                                </Space>
                                                <Space>
                                                    <Button
                                                        type='text'
                                                        icon={<MinusOutlined />}
                                                        onClick={() => handleRemoveSet(setIndex)}
                                                    />
                                                </Space>
                                            </Space.Compact>
                                        )}
                                    </div>
                                ))}
                            </Form>
                        </div>
                    ),
                },
            ]}
        />
    );
}

const fake_field_types = [
    {
        id: '1',
        createdAt: '2024-03-22T00:06:35.710Z',
        updatedAt: '2024-03-22T00:06:35.710Z',
        deletedAt: null,
        name: 'Text',
        fieldTypeOperators: [
            {
                id: '1',
                field_type_id: '1',
                query_operator_id: '5',
                query_operator: {
                    id: '5',
                    createdAt: '2024-03-25T15:00:55.657Z',
                    updatedAt: '2024-03-25T15:00:55.657Z',
                    deletedAt: null,
                    name: 'Equal',
                    value: '=',
                },
            },
            {
                id: '2',
                field_type_id: '1',
                query_operator_id: '6',
                query_operator: {
                    id: '6',
                    createdAt: '2024-03-25T15:01:29.793Z',
                    updatedAt: '2024-03-25T15:01:29.793Z',
                    deletedAt: null,
                    name: 'Contain',
                    value: 'LIKE',
                },
            },
            {
                id: '3',
                field_type_id: '1',
                query_operator_id: '7',
                query_operator: {
                    id: '7',
                    createdAt: '2024-03-25T15:01:29.793Z',
                    updatedAt: '2024-03-25T15:01:29.793Z',
                    deletedAt: null,
                    name: 'Not Contain',
                    value: 'NOT LIKE',
                },
            },
        ],
    },
    {
        id: '2',
        createdAt: '2024-03-22T00:06:40.090Z',
        updatedAt: '2024-03-22T00:06:40.090Z',
        deletedAt: null,
        name: 'Number',
        fieldTypeOperators: [
            {
                id: '4',
                field_type_id: '2',
                query_operator_id: '1',
                query_operator: {
                    id: '1',
                    createdAt: '2024-03-25T15:00:11.568Z',
                    updatedAt: '2024-03-25T15:00:11.568Z',
                    deletedAt: null,
                    name: 'Greater',
                    value: '>',
                },
            },
            {
                id: '5',
                field_type_id: '2',
                query_operator_id: '2',
                query_operator: {
                    id: '2',
                    createdAt: '2024-03-25T15:00:24.837Z',
                    updatedAt: '2024-03-25T15:00:24.837Z',
                    deletedAt: null,
                    name: 'Greater Or Equal',
                    value: '>=',
                },
            },
            {
                id: '6',
                field_type_id: '2',
                query_operator_id: '3',
                query_operator: {
                    id: '3',
                    createdAt: '2024-03-25T15:00:37.353Z',
                    updatedAt: '2024-03-25T15:00:37.353Z',
                    deletedAt: null,
                    name: 'Smaller',
                    value: '<',
                },
            },
            {
                id: '7',
                field_type_id: '2',
                query_operator_id: '4',
                query_operator: {
                    id: '4',
                    createdAt: '2024-03-25T15:00:47.382Z',
                    updatedAt: '2024-03-25T15:00:47.382Z',
                    deletedAt: null,
                    name: 'Smaller Or Equal',
                    value: '<=',
                },
            },
            {
                id: '8',
                field_type_id: '2',
                query_operator_id: '5',
                query_operator: {
                    id: '5',
                    createdAt: '2024-03-25T15:00:55.657Z',
                    updatedAt: '2024-03-25T15:00:55.657Z',
                    deletedAt: null,
                    name: 'Equal',
                    value: '=',
                },
            },
        ],
    },
    {
        id: '3',
        createdAt: '2024-03-22T00:37:06.189Z',
        updatedAt: '2024-03-22T00:37:06.189Z',
        deletedAt: null,
        name: 'Date',
        fieldTypeOperators: [
            {
                id: '11',
                field_type_id: '3',
                query_operator_id: '3',
                query_operator: {
                    id: '3',
                    createdAt: '2024-03-25T15:00:37.353Z',
                    updatedAt: '2024-03-25T15:00:37.353Z',
                    deletedAt: null,
                    name: 'Smaller',
                    value: '<',
                },
            },
            {
                id: '9',
                field_type_id: '3',
                query_operator_id: '1',
                query_operator: {
                    id: '1',
                    createdAt: '2024-03-25T15:00:11.568Z',
                    updatedAt: '2024-03-25T15:00:11.568Z',
                    deletedAt: null,
                    name: 'Greater',
                    value: '>',
                },
            },
            {
                id: '10',
                field_type_id: '3',
                query_operator_id: '2',
                query_operator: {
                    id: '2',
                    createdAt: '2024-03-25T15:00:24.837Z',
                    updatedAt: '2024-03-25T15:00:24.837Z',
                    deletedAt: null,
                    name: 'Greater Or Equal',
                    value: '>=',
                },
            },
            {
                id: '12',
                field_type_id: '3',
                query_operator_id: '4',
                query_operator: {
                    id: '4',
                    createdAt: '2024-03-25T15:00:47.382Z',
                    updatedAt: '2024-03-25T15:00:47.382Z',
                    deletedAt: null,
                    name: 'Smaller Or Equal',
                    value: '<=',
                },
            },
            {
                id: '13',
                field_type_id: '3',
                query_operator_id: '5',
                query_operator: {
                    id: '5',
                    createdAt: '2024-03-25T15:00:55.657Z',
                    updatedAt: '2024-03-25T15:00:55.657Z',
                    deletedAt: null,
                    name: 'Equal',
                    value: '=',
                },
            },
        ],
    },
    {
        id: '4',
        createdAt: '2024-03-22T00:37:06.189Z',
        updatedAt: '2024-03-22T00:37:06.189Z',
        deletedAt: null,
        name: 'Radio Button',
        fieldTypeOperators: [
            {
                id: '14',
                field_type_id: '4',
                query_operator_id: '5',
                query_operator: {
                    id: '5',
                    createdAt: '2024-03-25T15:00:55.657Z',
                    updatedAt: '2024-03-25T15:00:55.657Z',
                    deletedAt: null,
                    name: 'Equal',
                    value: '=',
                },
            },
        ],
    },
];
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
                    fieldTypeId: '1',
                    options: [],
                    fieldType: {
                        id: '1',
                        createdAt: '2024-04-03T19:25:49.918Z',
                        updatedAt: '2024-04-03T19:25:49.918Z',
                        deletedAt: null,
                        name: 'TEXT',
                        fieldTypeOperators: [],
                    },
                },
                {
                    id: '88',
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
                        name: 'DATE',
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
