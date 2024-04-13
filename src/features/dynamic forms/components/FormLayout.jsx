import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { FaWpforms } from 'react-icons/fa';
import { Col, Input, Menu, Row } from 'antd';
import { FaFileAlt } from 'react-icons/fa';
import styles from './FormLayout.module.css';
import { useGetFormQuery, useUpdateFormMutation } from '../dynamicFormsSlice';
import debounce from 'lodash.debounce';
export default function FormLayout() {
    let { form_id } = useParams();
    const { data: { result: form } = { result: {} } } = useGetFormQuery(form_id);
    const [updateForm] = useUpdateFormMutation();

    const debounceUpdateForm = debounce(updateForm, 500);
    
    const handleFormNameChange = (e) => {
        debounceUpdateForm({ fields: { name: e.target.value }, form_id });
    };
    return (
        <div className='flex flex-col  h-screen bg-gray-100 max-h-[100vh] overflow-y-auto '>
            <header className='sticky top-0 z-10 my-2'>
                <Row
                    align={'middle'}
                    justify={'space-between'}
                >
                    <Col
                        sm={{ span: 8 }}
                        md={{ span: 8 }}
                        lg={{ span: 4 }}
                    >
                        <Row>
                            <Col>
                                <FaFileAlt className='text-xl mx-2'></FaFileAlt>
                            </Col>
                            <Col>
                                {form.name && (
                                    <Input
                                        placeholder='Form name'
                                        defaultValue={form.name}
                                        onChange={handleFormNameChange}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Col>

                    <Col
                        sm={{ span: 4 }}
                        md={{ span: 4 }}
                        lg={{ span: 16 }}
                    >
                        <ul className='flex space-x-4'>
                            <li
                                onClick={() => {
                                    console.log('submissions');
                                }}
                                className='cursor-pointer hover:text-blue-500'
                            >
                                Submissions
                            </li>
                            <li
                                onClick={() => {
                                    console.log('settings');
                                }}
                                className='cursor-pointer hover:text-blue-500'
                            >
                                Settings
                            </li>
                        </ul>
                    </Col>
                    <Col className='mr-5'>
                        currently assigned to
                        <a className='text-sky-600'> @event</a>
                    </Col>
                </Row>
            </header>
            <main className={`border flex-1 ${styles.paper}`}>
                <Outlet />
            </main>
        </div>
    );
}
