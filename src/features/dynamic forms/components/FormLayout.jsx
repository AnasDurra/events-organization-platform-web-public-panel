import { SyncOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space } from 'antd';
import debounce from 'lodash.debounce';
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { debounceTime } from '../constants';
import { useGetFormQuery, useUpdateFormMutation } from '../dynamicFormsSlice';
import styles from './FormLayout.module.css';

export default function FormLayout({children}) {
    let { form_id } = useParams();
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
                            <Col offset={1}>
                                <ul className='flex space-x-4'>
                                    <li
                                        onClick={() => {
                                            console.log('submissions');
                                        }}
                                        className='cursor-pointer hover:text-blue-500'
                                    >
                                        Submissions
                                    </li>
                                    {/* <li
                                onClick={() => {
                                    console.log('settings');
                                }}
                                className='cursor-pointer hover:text-blue-500'
                            >
                                Settings
                            </li> */}
                                </ul>
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
                        currently assigned to
                        <a className='text-sky-600'> @event</a>
                    </Col>
                </Row>
            </header>
            <main className={`border flex-1 ${styles.paper}`}>{children}</main>
        </div>
    );
}
