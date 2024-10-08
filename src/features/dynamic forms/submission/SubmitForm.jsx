import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormGroup from './FormGroup';
import { Typography, Form, Button, Badge, Spin, ConfigProvider } from 'antd';
import './SubmitForm.css';
import { useGetFormQuery, useSubmitFormMutation } from '../dynamicFormsSlice';
import dayjs from 'dayjs';
import { useNotification } from '../../../utils/NotificationContext';
import { lightenColor } from '../../../utils/colors';

export default function SubmitForm({ prop_event_id, prop_form_id }) {
    const navigate = useNavigate();
    const { openNotification } = useNotification();

    let { form_id = prop_form_id, event_id = prop_event_id } = useParams();
    const {
        data: { result: DBform } = { result: {} },
        isSuccess: isFetchFormSuccess,
        isLoading,
    } = useGetFormQuery(form_id);
    const [submitForm] = useSubmitFormMutation();

    const [form] = Form.useForm();

    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

    // const { groups } = fakeForm;

    const handleNext = () => {
        console.log(form.getFieldsValue());
        form.validateFields([['groups', currentGroupIndex]], { recursive: true })
            .then((values) => {
                setCurrentGroupIndex((prevIndex) => prevIndex + 1);
            })
            .catch((errorInfo) => {
                form.scrollToField(errorInfo.errorFields[0].name, {
                    behavior: 'smooth',
                    block: 'start',
                });
            });
    };

    const handlePrevious = () => {
        setCurrentGroupIndex((prevIndex) => prevIndex - 1);
    };

    const handleFormFinish = (fields) => {
        const obj = {
            event_id: parseInt(event_id),
            form_id: parseInt(form_id),
            fields: fields.groups.flatMap((group) =>
                group.fields
                    .filter((field) => field.value || field.option_id)
                    .map((field) => ({
                        field_id: parseInt(field.field_id),
                        value: dayjs.isDayjs(field.value) ? field.value.format('YYYY-MM-DD') : field.value,
                        option_id: field.option_id,
                    }))
            ),
        };

        submitForm(obj).then((res) => {
            if (res.error) {
                openNotification('warning', res?.error?.data?.message);
            } else navigate('../success');
        });
    };

    const theme = {
        token: { colorPrimary: '#2A9D8F', fontFamily: 'Playfair Display' },
        components: {
            Layout: { headerBg: lightenColor('#2A9D8F', 100), bodyBg: '#F9F9F9' },
        },
        cssVar: true,
    };
    return (
        <ConfigProvider theme={theme}>
            <div className='min-h-[100vh] paper '>
                {isLoading ? (
                    <Spin
                        size='large'
                        spinning
                        fullscreen
                        tip={
                            <div className='m-2 flex flex-col justify-between h-full '>
                                <span>loading form...</span>
                                {/* TODO link */}
                                <Button type='primary'>Back to event</Button>
                            </div>
                        }
                    />
                ) : (
                    <div className='grid grid-cols-12 pb-4'>
                        <div className='sm:col-start-4 sm:col-span-6  col-span-12'>
                            {/*  <Typography.Title
                            level={2}
                            className='text-center mt-2'
                        >
                            {' '}
                            Event name
                        </Typography.Title> */}
                            <Form
                                form={form}
                                onFinish={handleFormFinish}
                                requiredMark={'optional'}
                                layout='vertical'
                            >
                                {DBform?.groups?.map((group, index) => (
                                    <div
                                        key={group.id}
                                        style={{ display: index == currentGroupIndex ? 'block' : 'none' }}
                                    >
                                        <FormGroup
                                            group={group}
                                            groupsLength={DBform.groups?.length}
                                            groupIndex={index}
                                        />
                                    </div>
                                ))}

                                <div className='text-gray-500 text-center'>
                                    {' '}
                                    {`<${currentGroupIndex + 1}/${DBform?.groups?.length}>`}
                                </div>
                                <div className='flex justify-center space-x-2 m-4'>
                                    <Button
                                        onClick={handlePrevious}
                                        disabled={currentGroupIndex === 0}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        style={{
                                            display:
                                                currentGroupIndex + 1 === DBform?.groups?.length ? 'block' : 'none',
                                        }}
                                    >
                                        Submit
                                    </Button>

                                    <Button
                                        onClick={handleNext}
                                        type='primary'
                                        style={{
                                            display:
                                                currentGroupIndex + 1 === DBform?.groups?.length ? 'none' : 'block',
                                        }}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </div>
        </ConfigProvider>
    );
}



const fakeForm = {
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
