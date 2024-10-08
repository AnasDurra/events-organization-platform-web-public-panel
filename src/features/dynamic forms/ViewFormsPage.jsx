import { ContainerOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Input, Row, Spin, theme } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewFormMutation, useGetFormsQuery } from './dynamicFormsSlice';
import AddFormModal from './modals/AddFormModal';
import SelectFormEventModal from './submission/SelectFormEventModal';
const { useToken } = theme;

import { getLoggedInUserV2 } from '../../api/services/auth';

export default function ViewFormsPage() {
    const { token } = useToken();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSelectEventModalOpen, setIsSelectEventModalOpen] = useState(false);
    const [selectedFormID, setSelectedFormID] = useState(null);
    let organization_id = getLoggedInUserV2().organization_id;
    const navigate = useNavigate();

    const { data: { result: forms } = { result: [] }, isLoading: isFetchFormsLoading } =
        useGetFormsQuery(organization_id);
    const [addNewForm] = useAddNewFormMutation();

    return (
        <div className='h-full'>
            <Row className='my-4'>
                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 12 }}>
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
                        Add
                    </Button>
                </Col>
                <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 10, offset: 6 }} lg={{ span: 8, offset: 4 }}>
                    <Input.Search placeholder='search' />
                </Col>
            </Row>
            <Spin spinning={isFetchFormsLoading} wrapperClassName='h-full'>
                <Row
                    className='h-full'
                    gutter={[
                        { xs: 20, sm: 20, md: 40, lg: 40 },
                        { xs: 20, sm: 20, md: 40, lg: 40 },
                    ]}
                >
                    {forms.length ? (
                        forms.map((form) => (
                            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} key={form.id}>
                                <Card
                                    className={`shadow-md hover:shadow-sm shadow-[${token.colorPrimary}] border-6 border-[${token.colorPrimary}]`}
                                    actions={[
                                        /*<div
                                            key={'actions-div-3'}
                                            className='flex flex-row justify-center items-center space-x-2'
                                        >
                                            <PaperClipOutlined />
                                            <span>event</span>
                                        </div>,*/
                                        <div
                                            key={'actions-div-1'}
                                            className='flex flex-row justify-center items-center space-x-2'
                                            onClick={() => {
                                                setSelectedFormID(form.id);
                                                setIsSelectEventModalOpen(true);
                                            }}
                                        >
                                            <ContainerOutlined />
                                            <span>submissions</span>
                                        </div>,
                                        <div
                                            key={'actions-div-2'}
                                            className='flex flex-row justify-center items-center space-x-2'
                                            onClick={() => navigate(`/forms/${form.id}/edit`)}
                                        >
                                            <SettingOutlined key='edit' />
                                            <span>edit</span>
                                        </div>,
                                    ]}
                                    bordered
                                >
                                    <Meta
                                        title={form.name}
                                        description={form.description ? form.description : 'no description'}
                                    />
                                    {/*  <Divider className='mb-1'></Divider>
              <div className='flex items-start justify-start flex-wrap space-x-2'>
                  <Tag
                      className='m-1'
                      color='blue'
                  >
                      +100
                  </Tag>
                  <Tag
                      className='m-1'
                      color='cyan'
                  >
                      deadline in 2 days
                  </Tag>
                  <Tag
                      className='m-1'
                      color='green'
                  >
                      Accepted 120
                  </Tag>
                  <Tag
                      className='m-1'
                      color='geekblue'
                  >
                      on hold 40
                  </Tag>
              </div> */}
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col span={24}>
                            {!isFetchFormsLoading && <Empty className='mt-10' description='No forms' />}
                        </Col>
                    )}
                </Row>
            </Spin>
            <AddFormModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={(fields) => {
                    addNewForm(fields).then(() => setIsAddModalOpen(false));
                }}
            />

            <SelectFormEventModal
                form_id={selectedFormID}
                isOpen={isSelectEventModalOpen}
                onClose={() => {
                    setSelectedFormID(null);
                    setIsSelectEventModalOpen(false);
                }}
                onSelectEvent={(eventID) => {
                    setIsSelectEventModalOpen(false);
                    navigate(`/forms/${selectedFormID}/event/${eventID}/submissions`);
                }}
            />
        </div>
    );
}
