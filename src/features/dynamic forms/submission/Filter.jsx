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
import { useGetFormFieldTypesQuery, useGetFormQuery } from '../dynamicFormsSlice';
import { useParams } from 'react-router-dom';
const fieldIcons = {
    [SidebarItemsIDs.TEXTFIELD]: <FieldStringOutlined />,
    [SidebarItemsIDs.NUMBER]: <FieldNumberOutlined />,
    [SidebarItemsIDs.DATE]: <CalendarOutlined />,
    [SidebarItemsIDs.RADIO]: <CheckCircleOutlined />,
};

const getFieldIcon = (fieldTypeId) => {
    return fieldIcons[fieldTypeId] || null;
};

export default function Filter({ onFilter }) {
    let { form_id, event_id } = useParams();

    const [sets, setSets] = useState([{ selectedFieldsIds: [] }]);
    const { operator, showRangeInputs, fromValue, toValue, handleOperatorChange, setFromValue, setToValue } =
        useNumberFieldState();

    const {
        data: { result: DBform } = { result: {} },
        isSuccess: isFetchFormSuccess,
        isLoading,
    } = useGetFormQuery(form_id);
    const { data: { result: fieldTypes } = { result: {} } } = useGetFormFieldTypesQuery();

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
                if (condition.field_id) condition.field_id = parseInt(condition.field_id);
                if (condition.operator_id) condition.operator_id = parseInt(condition.operator_id);

                const matchingField = DBform.groups
                    ?.flatMap((grp) => grp.fields)
                    ?.find((field) => field.id == condition.field_id);

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
            const options = fieldTypes
                ?.find((fieldType) => fieldType.id == field.fieldType.id)
                .fieldTypeOperators?.map((operator) => (
                    <Select.Option
                        key={'operator' + operator.query_operator.id}
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
            const options = fieldTypes
                ?.find((fieldType) => fieldType.id == field.fieldType.id)
                .fieldTypeOperators?.map((operator) => (
                    <Select.Option
                        key={'select option' + operator.query_operator.id}
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
            const options = fieldTypes
                ?.find((fieldType) => fieldType.id == field.fieldType.id)
                .fieldTypeOperators?.map((operator) => (
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
                                    DBform.groups
                                        ?.flatMap((group) => group.fields)
                                        ?.find((innerField) => innerField.id === field.id)
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
                    key: 'col-item-1',
                    label: (
                        <div className='flex space-x-2 items-center'>
                            <span className='font-bold'>Filters</span>
                            <span>(2 active filters)</span>
                        </div>
                    ),
                    children: (
                        <div>
                            <Form onFinish={handleOnFilterFinish}>
                                {sets?.map((set, setIndex) => (
                                    <div key={'sets' + setIndex}>
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
                                                    treeData={DBform.groups?.map((group) => ({
                                                        value: 'group' + group.id,
                                                        title: `${group.name} (${
                                                            group.description ? group.description : 'no description'
                                                        })`,
                                                        selectable: false,
                                                        children: group.fields?.map((field) => ({
                                                            value: field.id,
                                                            title: field.name,
                                                            icon: getFieldIcon(field.fieldType.id),
                                                        })),
                                                    }))}
                                                    treeIcon
                                                    switcherIcon={<GroupOutlined />}
                                                    onSelect={(selected_value) => console.log(selected_value)}
                                                    tagRender={(props) => {
                                                        const field = DBform.groups
                                                            ?.flatMap((group) => group.fields)
                                                            ?.find((field) => field.id == props.value);

                                                        return (
                                                            <Tag
                                                                key={'tag' + props.value}
                                                                className='bg-transparent'
                                                            >
                                                                <div className='flex space-x-2 justify-between'>
                                                                    <span>{`${props.label}`}</span>
                                                                    {getFieldIcon(field?.fieldType?.id)}
                                                                </div>
                                                            </Tag>
                                                        );
                                                    }}
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
                                                {set.selectedFieldsIds?.map((fieldId, fieldIndex) => {
                                                    const field = DBform.groups
                                                        ?.flatMap((group) => group.fields)
                                                        ?.find((field) => field.id === fieldId);

                                                    return (
                                                        <div
                                                            className='my-2'
                                                            key={'options' + fieldId}
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
                                                        type='dashed'
                                                        size='small'
                                                        className='w-full rounded-lg '
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
