import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormGroup from './FormGroup';
import { Typography, Form, Button, Badge } from 'antd';
import './SubmitForm.css';

export default function SubmitForm() {
    let { form_id } = useParams();

    const [form] = Form.useForm();

    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

    const { groups } = fakeForm;

    const handleNext = () => {
        setCurrentGroupIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentGroupIndex((prevIndex) => prevIndex - 1);
    };
    return (
        <div className='h-[100%] paper '>
            <div className='grid grid-cols-12 pb-4'>
                <div className='sm:col-start-4 sm:col-span-6  col-span-12'>
                    <Typography.Title
                        level={2}
                        className='text-center mt-2'
                    >
                        {' '}
                        Event name
                    </Typography.Title>
                    <Form
                        form={form}
                        requiredMark={'optional'}
                        layout='vertical'
                    >
                        <FormGroup
                            group={groups[currentGroupIndex]}
                            groupsLength={groups.length}
                        />
                        <div className='flex justify-center space-x-2 m-4'>
                            <Button
                                onClick={handlePrevious}
                                disabled={currentGroupIndex === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={handleNext}
                                type='primary'
                            >
                                {currentGroupIndex === groups.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
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
