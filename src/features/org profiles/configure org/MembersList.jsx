import { Row, Col, Button, List, Skeleton, Avatar } from 'antd';
import React, { useState } from 'react';
import ModalNewMember from './modal-new member';
import ModalEditMember from './modal-edit member';
import { URL } from '../../../api/constants';

export default function MembersList({ org }) {
    const [isEditMOdalOpen, setIsEditModalOpen] = useState(false);
    const [isNewMOdalOpen, setIsNewModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    return (
        <>
            <Row className='w-full'>
                <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    xl={{ span: 24 }}
                    span={24}
                >
                    <List
                        footer={
                            <Row justify={'end'}>
                                <Col>
                                    <Button
                                        style={{ margin: '0' }}
                                        type='primary'
                                        onClick={() => setIsNewModalOpen(true)}
                                    >
                                        new member
                                    </Button>
                                </Col>
                            </Row>
                        }
                        itemLayout='horizontal'
                        dataSource={org?.employees}
                        renderItem={(emp) => (
                            <List.Item
                                actions={[
                                    <a
                                        key='list-edit'
                                        style={{ color: 'darkblue' }}
                                        onClick={() => {
                                            setSelectedEmployee(emp);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        edit
                                    </a>,
                                    <a
                                        key='list-activate'
                                        style={{ color: 'darkblue' }}
                                    >
                                        activate
                                    </a>,
                                    <a
                                        key='list-remove'
                                        style={{ color: 'red' }}
                                    >
                                        remove
                                    </a>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            size={'large'}
                                            src={URL + emp.profile_picture}
                                        />
                                    }
                                    title={<a href='https://ant.design'>{`${emp.first_name} ${emp.last_name}`}</a>}
                                    description={emp.user?.username}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>

            <ModalNewMember
                orgId={org?.id}
                isOpen={isNewMOdalOpen}
                onOk={() => setIsNewModalOpen(false)}
                onCancel={() => setIsNewModalOpen(false)}
            />

            <ModalEditMember
                orgId={org?.id}
                employee={selectedEmployee}
                isOpen={isEditMOdalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                onOk={() => setIsEditModalOpen(false)}
            />
        </>
    );
}
