import { Card, Col, Empty, Modal, Row, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import useToken from 'antd/es/theme/useToken';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa6';
import { useGetFormsQuery } from '../dynamic forms/dynamicFormsSlice';

export default function AttachForm({ onAttach, organization_id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className=' p-8 flex flex-col space-y-4 flex-grow justify-center items-center rounded-lg bg-gray-100/50 hover:bg-gray-100/100 hover:shadow-sm border-2 border-dashed cursor-pointer'
            onClick={(e) => setIsModalOpen(true)}
        >
            <span>Attach Form</span>
            <FaPaperclip />

            <ModalChooseForm
                isModalOpen={isModalOpen}
                handleOk={() => {}}
                handleCancel={() => {
                    console.log('cancel');
                    setIsModalOpen(false);
                }}
                organization_id={organization_id}
            />
        </div>
    );
}

const ModalChooseForm = ({ isModalOpen, handleOk, handleCancel, organization_id }) => {
    const { token } = useToken();

    const { data: { result: forms } = { result: [] }, isLoading: isFetchFormsLoading } =
        useGetFormsQuery(organization_id);

    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            //footer={null}
            destroyOnClose
            width={'70vw'}
            title={
                <Title
                    level={5}
                    className=''
                >
                    Choose one of the existing forms
                </Title>
            }
            classNames={{ header: 'text-center', body: 'p-4 mt-8 min-h-[60vh]' }}
        >
            <Spin spinning={isFetchFormsLoading}>
                <Row
                    className='h-full'
                    gutter={[
                        { xs: 20, sm: 20, md: 40, lg: 40 },
                        { xs: 20, sm: 20, md: 40, lg: 40 },
                    ]}
                >
                    {forms.length ? (
                        forms.map((form) => (
                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 16 }}
                                lg={{ span: 12 }}
                                key={form.id}
                            >
                                <Card
                                    className={`shadow-md hover:shadow-sm shadow-[${token?.colorPrimary}] border-6 border-[${token?.colorPrimary}]`}
                                    bordered
                                >
                                    <Meta
                                        title={form.name}
                                        description={form.description ? form.description : 'no description'}
                                    />
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col span={24}>{!isFetchFormsLoading && <Empty description='No forms' />}</Col>
                    )}
                </Row>
            </Spin>
        </Modal>
    );
};
