import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Input, List, Modal, Row, Space } from 'antd';
import debounce from 'lodash.debounce';
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { debounceTime } from '../constants';
import { useGetFormEventsQuery, useGetFormQuery, useUpdateFormMutation } from '../dynamicFormsSlice';
import styles from './FormLayout.module.css';
import { events } from '../../../api/services/events';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

export default function FormLayout({ children }) {
    let { form_id } = useParams();
    const navigate = useNavigate();

    const {
        data: { result: events } = { result: [] },
        isLoading: isFormEventsLoading,
        isFetching: isFormEventsFetching,
    } = useGetFormEventsQuery(form_id);
    const {
        data: { result: form } = { result: {} },
        isLoading: isFormLoading,
        isFetching: isFormFetching,
    } = useGetFormQuery(form_id);
    const [updateForm] = useUpdateFormMutation();

    const debounceUpdateForm = debounce(updateForm, debounceTime);

    const handleFormNameChange = (e) => {
        debounceUpdateForm({ fields: { name: e.target.value }, form_id });
    };
    return (
        <div className='flex flex-col  h-screen bg-gray-100 max-h-[100vh]'>
            <Space.Compact className='fixed bottom-4 left-4 '>
                <Button>-</Button>
                <Button>+</Button>
            </Space.Compact>
            <header className='sticky top-0 z-10 my-2'>
                <Row
                    align={'middle'}
                    justify={'space-between'}
                >
                    <Col span={8}>
                        <Row align={'middle'}>
                            <Col>
                                <FaFileAlt className='text-xl mx-2'></FaFileAlt>
                            </Col>
                            <Col>
                                {form.name && (
                                    <Input
                                        placeholder='Form name'
                                        variant='filled'
                                        defaultValue={form.name}
                                        onChange={handleFormNameChange}
                                    />
                                )}
                            </Col>
                           
                        </Row>
                    </Col>

                    <Col
                        span={8}
                        className='text-gray-500'
                    >
                        {isFormFetching && (
                            <div>
                                <SyncOutlined
                                    spin
                                    className='mr-2'
                                />
                                {isFormLoading ? 'loading..' : 'saving...'}
                            </div>
                        )}
                    </Col>

                    <Col
                        className='mr-5'
                        offset={1}
                    >
                        {Array.isArray(events) && events.length == 0 ? (
                            'No Assigned Events'
                        ) : (
                            <span>
                                <span>currently assigned to</span>
                                <a
                                    className='text-sky-600'
                                    onClick={() => navigate(`/event/show/${events[0].id}`)}
                                >
                                    {' '}
                                    {events[0].title}
                                </a>
                                {events.length > 1 ? (
                                    <span
                                        onClick={() => {
                                            Modal.info({
                                                title: 'Events List',
                                                content: (
                                                    <List
                                                        itemLayout='horizontal'
                                                        dataSource={events}
                                                        renderItem={(event, index) => (
                                                            <List.Item className='hover:cursor-pointer shadow-sm hover:shadow-none hover:border-2 px-2 '>
                                                                <List.Item.Meta
                                                                    title={<span className='p-2'>{event.title}</span>}
                                                                    description={event.date}
                                                                />
                                                            </List.Item>
                                                        )}
                                                    />
                                                ),
                                                icon: null,
                                                maskClosable: true,
                                                footer: null,
                                                styles: {
                                                    body: {
                                                        maxHeight: '60svh',
                                                        overflowY: 'scroll',
                                                        scrollbarWidth: 'thin',
                                                    },
                                                },
                                            });
                                        }}
                                        className='hover:text-blue-400 hover:cursor-pointer'
                                    >
                                        {' '}
                                        +{events.length - 1} more
                                    </span>
                                ) : null}
                            </span>
                        )}
                    </Col>
                </Row>
            </header>
            <main className={`border flex-1 ${styles.paper}`}>{children}</main>
        </div>
    );
}
