import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Form, Image, InputNumber, List, Row, Select, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetFormQuery } from '../dynamicFormsSlice';
import Filter from './Filter';
import FormGroup from './FormGroup';
import styles from './paper.module.css';

const data = ['pending: 100', 'accepted: 40', 'rejected: 30', 'filtered out: 33'];

export default function ViewFormSubmissions() {
    const [form] = Form.useForm();
    let { form_id = 1 } = useParams();
    const {
        data: { result: DBform } = { result: {} },
        isSuccess: isFetchFormSuccess,
        isLoading,
    } = useGetFormQuery(form_id);

    return (
        <div className={`grid grid-cols-12 min-h-[100vh] ${styles.paper} `}>
            {isLoading ? (
                <Spin
                    size='large'
                    spinning
                    fullscreen
                    tip={
                        <div className='m-2 flex flex-col justify-between h-full '>
                            <span>loading Submissions...</span>
                            {/* TODO link */}
                            <Button type='primary'>Return</Button>
                        </div>
                    }
                />
            ) : (
                <>
                    <div className='sm:col-span-1 sm:col-start-2  mt-20 hidden lg:block '>
                        <List
                            //                    split={false}
                            size='small'
                            dataSource={data}
                            renderItem={(item, index) => <List.Item> {item}</List.Item>}
                            header={'Status'}
                            bordered
                            //  className='border-2 border-slate-500 p-4 rounded-lg text-center'
                        />
                    </div>
                    <div className='col-span-12 sm:col-span-8 sm:col-start-3  h-full w-full'>
                        <Title
                            level={2}
                            className='text-center my-2'
                        >
                            Submissions
                        </Title>

                        <div className='grid grid-cols-8'>
                            <div className='col-span-8 lg:col-span-6 lg:col-start-2   '>
                                <Row
                                    className='bg-gray-200/50 border-2 shadow shadow-lg border-slate-500 rounded-lg'
                                    align={'middle'}
                                    justify={'space-between'}
                                >
                                    <Col
                                        xs={{ span: 10 }}
                                        sm={{ span: 10 }}
                                        md={{ span: 10 }}
                                        lg={{ span: 6 }}
                                    >
                                        <Row
                                            justify={'space-evenly'}
                                            align={'middle'}
                                        >
                                            <Col span={4}>
                                                <Button
                                                    type='text'
                                                    icon={<LeftOutlined></LeftOutlined>}
                                                ></Button>
                                            </Col>
                                            <Col
                                                xs={{ span: 8 }}
                                                sm={{ span: 8 }}
                                                md={{ span: 8 }}
                                                lg={{ span: 6 }}
                                                className='p-2'
                                            >
                                                <InputNumber
                                                    style={{ width: '100%', textAlign: 'center' }}
                                                    size='small'
                                                    defaultValue={1}
                                                    controls={false}
                                                />
                                            </Col>
                                            <Col span={6}>
                                                <span> of 42</span>
                                            </Col>
                                            <Col span={4}>
                                                <Button
                                                    type='text'
                                                    icon={<RightOutlined></RightOutlined>}
                                                ></Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col
                                        xs={{ span: 14 }}
                                        sm={{ span: 14 }}
                                        md={{ span: 14 }}
                                        lg={{ span: 10 }}
                                    >
                                        <Row
                                            align={'middle'}
                                            justify={'end'}
                                            className='w-full'
                                            gutter={{ xs: 40, sm: 40, md: 40, xl: 16 }}
                                        >
                                            <Col span={8}>
                                                <Select
                                                    size='small'
                                                    variant='borderless'
                                                    showAction={true}
                                                    onChange={() => {}}
                                                    defaultValue={'jack'}
                                                    options={[
                                                        {
                                                            value: 'jack',
                                                            label: 'pending',
                                                        },
                                                        {
                                                            value: 'lucy',
                                                            label: 'accepted',
                                                        },
                                                        {
                                                            value: 'Yiminghe',
                                                            label: 'rejected',
                                                        },
                                                        {
                                                            value: 'disabled',
                                                            label: 'Disabled',
                                                            disabled: true,
                                                        },
                                                    ]}
                                                />
                                            </Col>
                                            <Col span={4}>
                                                <Button
                                                    type='text'
                                                    icon={<DeleteOutlined></DeleteOutlined>}
                                                ></Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <div className='my-2'>
                                    <Filter onFilter={(fields) => {}} />
                                </div>
                                <Row
                                    className='mt-4'
                                    align={'middle'}
                                    justify={'space-evenly'}
                                    gutter={16}
                                >
                                    <Col
                                        xs={12}
                                        sm={10}
                                        md={10}
                                        lg={8}
                                    >
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Image
                                                    className='rounded-lg'
                                                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                                                />
                                            </Col>
                                            <Col span={16}>
                                                <div className='flex flex-col items-start justify-center'>
                                                    <a>@username</a>
                                                    <span>submission time</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Button>History</Button>
                                    </Col>
                                </Row>
                                <Form
                                    form={form}
                                    disabled
                                    requiredMark={'optional'}
                                    layout='vertical'
                                >
                                    {DBform?.groups?.map((group, index) => (
                                        <div key={group.id}>
                                            <FormGroup
                                                isCustomStyle
                                                group={group}
                                                groupsLength={DBform.groups?.length}
                                                groupIndex={index}
                                            />
                                            <div className='text-gray-500 text-center'>
                                                {`<${index + 1}/${DBform?.groups?.length}>`}
                                            </div>
                                        </div>
                                    ))}
                                </Form>
                            </div>
                        </div>
                    </div>
                </>
            )}
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
