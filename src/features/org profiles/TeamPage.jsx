import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Input, Modal, Row, Space, Spin, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { URL } from '../../api/constants';
import { getLoggedInUserV2 } from '../../api/services/auth';
import './TeamPage.css';
import ModalEditMember from './configure org/modal-edit member';
import ModalNewMember from './configure org/modal-new member';
import { useRemoveEmployeeMutation, useRemoveEmployeeProfilePicMutation } from './employeeSlice';
import { useGetOrgQuery } from './orgSlice';

const iconStyle = { transition: 'transform 0.3s', cursor: 'pointer' };
const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
};

const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
};
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const TeamPage = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [isNewEmpModalOpen, setIsNewEmpModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isImageloading, setIsImageLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const { data: { result: org } = { result: {} }, isLoading: isGetOrgLoading } = useGetOrgQuery(
        getLoggedInUserV2().organization_id
    );

    const [removeEmployee, { isLoading: isRemoveLoading }] = useRemoveEmployeeMutation();
    const [removeEmployeeProfilePic, { isLoading: isRemoveProfilePicLoading }] = useRemoveEmployeeProfilePicMutation();

    const handleClick = (e, action, employee) => {
        e.stopPropagation();
        if (action == 'edit') {
            setSelectedEmployee(employee);
            setIsEditModalOpen(true);
        } else if (action == 'remove') {
            modal.confirm({
                title: `Remove Employee ${employee?.user?.username} Account`,
                onOk: () => {
                    message.loading();
                    removeEmployee(employee.id)
                        .unwrap()
                        .then((res) => {
                            message.destroy();
                            message.success(`Employee with username @${employee?.user?.username} deleted`);
                        })
                        .catch((e) => {
                            message.error(`Failed to delete employee with username @${employee?.user?.username}`);
                        });
                },
                onCancel: () => {},
            });
        }
    };

    const handleChange = (info) => {
        console.log('info: ', info);
        if (info.file.status === 'uploading') {
            setIsImageLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setIsImageLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type='button'
        >
            {isImageloading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    useEffect(() => {
        console.log(org);
    }, [org]);

    return (
        <>
            <div style={{ padding: '24px' }}>
                <Spin spinning={isGetOrgLoading}>
                    <Row
                        gutter={[20, 30]}
                        justify='start'
                    >
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
                        <Col
                            xs={24}
                            sm={12}
                            md={12}
                            lg={8}
                            xl={8}
                            xxl={6}
                        >
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
                            <Col
                                key={employee.id}
                                xs={24}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={8}
                                xxl={6}
                            >
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
                                    className='rounded-3xl'
                                    hoverable
                                    cover={
                                        <Upload
                                            name='profile_picture'
                                            listType='picture-circle'
                                            showUploadList={false}
                                            action={`${URL}/employee/updateProfilePicture/${employee.id}`}
                                            beforeUpload={beforeUpload}
                                            onChange={handleChange}
                                        >
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    preview={{
                                                        visible: false,
                                                        mask: (
                                                            <div className='flex space-x-2'>
                                                                <Button
                                                                    type='primary'
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        message.loading('Removing profile pic');
                                                                        removeEmployeeProfilePic(employee.id)
                                                                            .unwrap()
                                                                            .then((res) => {
                                                                                setImageUrl(null);
                                                                            });
                                                                    }}
                                                                    icon={
                                                                        <DeleteOutlined className='  '></DeleteOutlined>
                                                                    }
                                                                ></Button>
                                                                <Button
                                                                    type='primary'
                                                                    onClick={(e) => {}}
                                                                    icon={
                                                                        <UploadOutlined className='  '></UploadOutlined>
                                                                    }
                                                                ></Button>
                                                            </div>
                                                        ),
                                                    }}
                                                    alt='avatar'
                                                    className=' w-[100%] aspect-square object-contain rounded-full'
                                                    style={{ borderRadius: '9999px' }}
                                                />
                                            ) : (
                                                uploadButton
                                            )}{' '}
                                        </Upload>
                                    }
                                    styles={{ actions: { borderRadius: '9999px' } }}
                                    classNames={{
                                        actions: 'rounded-3xl bg-red-500',
                                        body: 'rounded-3xl m-2',
                                        cover: 'rounded-3xl p-4',
                                    }}
                                    actions={[
                                        <div
                                            key={'edit-emp'}
                                            className='flex  justify-center items-center  space-x-2'
                                            onClick={(e) => handleClick(e, 'edit', employee)}
                                        >
                                            <EditOutlined
                                                style={{ ...iconStyle, fontSize: '16px' }}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                key='edit'
                                            />
                                            <div className='text-xs'> Edit</div>
                                        </div>,
                                        <div
                                            key={'delete-emp'}
                                            className='flex  justify-center items-center  space-x-2'
                                            onClick={(e) => handleClick(e, 'remove', employee)}
                                        >
                                            <DeleteOutlined
                                                style={{ ...iconStyle, color: 'red', fontSize: '16px' }}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                key='remove'
                                            />
                                            <div className=' text-xs text-red-400'> Delete</div>
                                        </div>,
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
                                        description={
                                            <div>
                                                <div>@{employee?.user?.username}</div>
                                                <div>
                                                    <p>{employee?.phone_number}</p>
                                                </div>
                                            </div>
                                        }
                                    />
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
            {contextHolder}
        </>
    );
};

export default TeamPage;
