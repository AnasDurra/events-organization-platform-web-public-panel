import { Button, Card, Col, Empty, Modal, Popover, Row, Select, Spin, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import useToken from 'antd/es/theme/useToken';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa6';
import { GoCheckCircle } from 'react-icons/go';
import { useAddNewFormMutation, useGetFormsQuery } from '../dynamic forms/dynamicFormsSlice';
import AddFormModal from '../dynamic forms/modals/AddFormModal';
import { IoMdDesktop } from 'react-icons/io';
import { SlOptionsVertical } from 'react-icons/sl';
import { DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function AttachForm({ onAttach, organization_id, attachedForm, onDetachForm }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFormSelect = (form) => {
        onAttach(form);
        setIsModalOpen(false);
    };

    const handleOpenModal = (e) => {
        setIsModalOpen(true);
    };
    const handleDetachForm = () => {
        onDetachForm();
    };
    return (
        <div className='relative flex flex-col space-y-4 flex-grow justify-center items-center rounded-lg bg-gray-100/50 hover:bg-gray-100/100 hover:shadow-sm border-2 border-dashed cursor-pointer'>
            {attachedForm ? (
                <>
                    <Button
                        type='text'
                        className='absolute  bg-transparent top-4 right-4'
                        icon={<MinusCircleOutlined />}
                        onClick={handleDetachForm}
                    />

                    <div
                        onClickCapture={handleOpenModal}
                        className='p-8 flex flex-col space-y-4 items-center justify-center '
                    >
                        <Title level={5}>
                            form {attachedForm.name} is Attached{' '}
                            <Typography.Text type='secondary'> (click to update)</Typography.Text>
                        </Title>{' '}
                        <GoCheckCircle className='text-green-600 text-4xl' />
                    </div>
                </>
            ) : (
                <div
                    className='p-8 flex flex-col space-y-4 items-center justify-center '
                    onClickCapture={handleOpenModal}
                >
                    <span>Attach Form</span>
                    <FaPaperclip />
                </div>
            )}

            <ModalChooseForm
                isModalOpen={isModalOpen}
                handleOk={() => {}}
                handleCancel={() => setIsModalOpen(false)}
                organization_id={organization_id}
                onSelectForm={handleFormSelect}
            />
        </div>
    );
}

const ModalChooseForm = ({ isModalOpen, handleOk, handleCancel, organization_id, onSelectForm }) => {
    const { token } = useToken();
    const navigate  = useNavigate();
    const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);
    const { data: { result: forms } = { result: [] }, isLoading: isFetchFormsLoading } =
        useGetFormsQuery(organization_id);
    const [addNewForm] = useAddNewFormMutation();

    const handleAddForm = (form) => {
        addNewForm(form).then((res) => {
            onSelectForm(res?.data?.result);
            setIsAddFormModalOpen(false);
            //TODO with no event id
            window.open(`${window.location.origin}/forms/${res?.data?.result?.id}/edit`)

        });
    };

    const handleCloseAddFormModal = () => setIsAddFormModalOpen(false);

    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose
            width={'70vw'}
            title={<Title level={5}>Choose one of the existing forms</Title>}
            footer={
                <Button
                    type='primary'
                    onClick={() => setIsAddFormModalOpen(true)}
                >
                    create new form
                </Button>
            }
            classNames={{
                header: 'text-center',
                body: 'p-4 w-full h-[60vh] overflow-y-auto overflow-x-hidden ',
                footer: 'flex justify-center',
            }}
        >
            <Spin
                spinning={isFetchFormsLoading}
                className='w-full h-full'
            >
                <Row
                    className='h-full'
                    gutter={[{ xs: 20, sm: 20, md: 40, lg: 40 }, 20]}
                >
                    {forms.length ? (
                        forms.map((form) => (
                            <Col
                                xs={24}
                                sm={24}
                                md={16}
                                lg={12}
                                key={form.id}
                            >
                                <Card
                                    className={`m-2 bg-gray-100/75 shadow-[${token?.colorPrimary}] border-6 border-[${token?.colorPrimary}]`}
                                    bordered
                                    hoverable
                                    onClick={() => onSelectForm(form)}
                                >
                                    <Meta
                                        title={form.name}
                                        description={form.description || 'no description'}
                                    />
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col span={24}>{!isFetchFormsLoading && <Empty description='No forms' />}</Col>
                    )}
                </Row>
            </Spin>
            <AddFormModal
                isOpen={isAddFormModalOpen}
                onSubmit={handleAddForm}
                onClose={handleCloseAddFormModal}
            />
        </Modal>
    );
};
