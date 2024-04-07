import {
    ContainerOutlined,
    FileAddOutlined,
    FileOutlined,
    PaperClipOutlined,
    PlusOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Badge, Button, Card, Col, Divider, Empty, Input, Row, Tag, theme } from 'antd';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import AddFormModal from './modals/AddFormModal';
import { useGetFormsQuery } from './dynamicFormsSlice';
import { useNavigate, useParams } from 'react-router-dom';
const { useToken } = theme;

const fakeCardsData = [
    { id: 1, name: 'Card 1', description: 'description of Card 1' },
    { id: 2, name: 'Card 2', description: 'description of Card 2' },
    { id: 3, name: 'Card 3', description: 'description of Card 3' },
    { id: 4, name: 'Card 4', description: 'description of Card 4' },
    { id: 5, name: 'Card 5', description: 'description of Card 5' },
    { id: 6, name: 'Card 6', description: 'description of Card 6' },
    { id: 7, name: 'Card 7', description: 'description of Card 7' },
    { id: 8, name: 'Card 8', description: 'description of Card 8' },
];

export default function ViewFormsPage() {
    const { token } = useToken();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    let { organization_id } = useParams();
    const navigate = useNavigate();

    const { data: { result: forms } = { result: [] } } = useGetFormsQuery(organization_id);

    return (
        <>
            <Row>
                <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    className='mt-2 text-center'
                >
                    <Title
                        level={3}
                        className='mb-0'
                    >
                        Forms
                    </Title>
                </Col>
            </Row>
            <Row className='my-4'>
                <Col
                    xs={{ span: 12 }}
                    sm={{ span: 12 }}
                    md={{ span: 8 }}
                    lg={{ span: 12 }}
                >
                    <Button
                        type='text'
                        icon={<PlusOutlined />}
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add
                    </Button>
                </Col>
                <Col
                    xs={{ span: 12 }}
                    sm={{ span: 12 }}
                    md={{ span: 10, offset: 6 }}
                    lg={{ span: 8, offset: 4 }}
                >
                    <Input.Search placeholder='search'></Input.Search>
                </Col>
            </Row>
            <Row
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
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                            key={form.id}
                        >
                            <Card
                                className={`shadow-md hover:shadow-sm  shadow-[${token.colorPrimary}] border-6 border-[${token.colorPrimary}]`}
                                actions={[
                                    <div
                                        key={'actions-div-3'}
                                        className='flex flex-row justify-center items-center space-x-2'
                                    >
                                        <PaperClipOutlined />
                                        <span>event</span>
                                    </div>,
                                    <div
                                        key={'actions-div-1'}
                                        className='flex flex-row justify-center items-center space-x-2'
                                    >
                                        <ContainerOutlined />
                                        <span>submissions</span>
                                    </div>,
                                    <div
                                        key={'actions-div-2'}
                                        className='flex flex-row justify-center items-center space-x-2'
                                        onClick={() => navigate(`/form/${form.id}/edit`)}
                                    >
                                        <SettingOutlined key='edit' />
                                        <span>edit</span>
                                    </div>,
                                ]}
                                bordered
                            >
                                <Meta
                                    title={form.name}
                                    description={form.description}
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
                        <Empty description='No forms' />
                    </Col>
                )}
            </Row>
            <AddFormModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </>
    );
}
