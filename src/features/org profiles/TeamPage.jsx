import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Avatar, Button, Space, Input, Spin } from 'antd';
import { CheckCircleFilled, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import ModalNewMember from './configure org/modal-new member';
import { useGetOrgQuery } from './orgSlice';
import { getLoggedInUserV2 } from '../../api/services/auth';
import ModalEditMember from './configure org/modal-edit member';

const employees = [
    {
        id: 1,
        name: 'Alexa Douglas',
        title: 'Community Manager',
        phone: '773-499-8188',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: 2,
        name: 'Arianna Fowler',
        title: 'Designer',
        phone: '941-337-6322',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: 3,
        name: 'Aubree Matthews',
        title: 'Art Director',
        phone: '',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: 4,
        name: 'Eli Warren',
        title: 'Systems Administrator',
        phone: '503-646-6739',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: 5,
        name: 'Jack Lee',
        title: 'Engineer',
        phone: '971-700-9847',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: 6,
        name: 'James Merriweather',
        title: 'Executive Assistant',
        phone: '',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: 7,
        name: 'Julian Davis',
        title: 'Director of Engineering',
        phone: '780-689-3483',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
];

const iconStyle = { transition: 'transform 0.3s', cursor: 'pointer' };
const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
};

const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
};

const TeamPage = () => {
    const [isNewEmpModalOpen, setIsNewEmpModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const { data: { result: org } = { result: {} }, isLoading: isGetOrgLoading } = useGetOrgQuery(
        getLoggedInUserV2().organization_id
    );

    const handleClick = (e, action, employee) => {
        e.stopPropagation();
        if (action == 'edit') {
            setSelectedEmployee(employee);
            setIsEditModalOpen(true);
        }
    };

    useEffect(() => {
        console.log(org);
    }, [org]);

    return (
        <div style={{ padding: '24px' }}>
            <Spin spinning={isGetOrgLoading}>
                <Row gutter={[20, 30]} justify='start'>
                    <Col span={24}>
                        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                            <Input.Search
                                // className='org-attendees-search'
                                placeholder='Search by name'
                                enterButton
                                size='large'
                                // onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                        <div
                            style={{
                                textAlign: 'center',
                                boxShadow: 'none',
                                padding: '20px',
                            }}
                        >
                            <Space
                                size={15}
                                style={{
                                    width: 130,
                                    height: 130,
                                    borderRadius: '50%',
                                    border: '2px solid #e8e8e8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    margin: '0 auto 16px',
                                }}
                            >
                                <div style={{ fontSize: '42px', lineHeight: '1' }}>{org?.employees?.length}</div>
                                <div style={{ fontSize: '14px', lineHeight: '1' }}>EMPLOYEES</div>
                            </Space>
                            <Button
                                block
                                type='primary'
                                icon={<PlusOutlined />}
                                onClick={() => setIsNewEmpModalOpen(true)}
                            >
                                New Employee
                            </Button>
                        </div>
                    </Col>
                    {org?.employees?.map((employee) => (
                        <Col key={employee.id} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                            <Card
                                onClick={() => {
                                    console.log('card clicked');
                                }}
                                size='small'
                                style={{
                                    height: '100%',
                                    textAlign: 'center',
                                    transition: 'box-shadow 0.3s',
                                    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
                                }}
                                hoverable
                                cover={
                                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
                                        <Avatar
                                            size={150}
                                            alt={employee?.first_name + employee?.last_name}
                                            src={employee?.profile_picture ?? null}
                                        />
                                    </div>
                                }
                                actions={[
                                    <CheckCircleFilled
                                        style={iconStyle}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={(e) => handleClick(e, 'active')}
                                        key='activate'
                                    />,
                                    // TODO For deactivate user
                                    // <CloseCircleFilled
                                    // style={iconStyle}
                                    // onMouseEnter={handleMouseEnter}
                                    // onClick={(e)=>handleClick(e,"disactive")}
                                    // onMouseLeave={handleMouseLeave}
                                    //     key='Deactivate'
                                    // />,
                                    <EditOutlined
                                        style={iconStyle}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={(e) => handleClick(e, 'edit', employee)}
                                        key='edit'
                                    />,
                                    <DeleteOutlined
                                        style={{ ...iconStyle, color: 'red', fontSize: '18px' }}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={(e) => handleClick(e, 'remove')}
                                        key='remove'
                                    />,
                                ]}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.boxShadow =
                                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 15px 20px rgba(0, 71, 79, 0.2)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.boxShadow = '0 2px 2px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <Card.Meta
                                    title={employee?.first_name + employee?.last_name}
                                    description={employee?.user?.username}
                                />
                                <p style={{ marginTop: '8px' }}>{employee?.phone_number}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Spin>

            <ModalNewMember
                isOpen={isNewEmpModalOpen}
                onOk={() => setIsNewEmpModalOpen(false)}
                onCancel={() => setIsNewEmpModalOpen(false)}
            />

            <ModalEditMember
                orgId={getLoggedInUserV2().organization_id}
                employee={selectedEmployee}
                isOpen={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                onOk={() => setIsEditModalOpen(false)}
            />
        </div>
    );
};

export default TeamPage;
