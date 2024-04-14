import { DeleteOutlined, FilterOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Image, Input, InputNumber, Row, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

export default function ViewFormSubmissions() {
    return (
        <div className='grid grid-cols-12 min-h-[100vh]  '>
            <div className='col-span-12 sm:col-span-8 sm:col-start-3  h-full w-full'>
                <Title
                    level={2}
                    className='text-center my-2'
                >
                    Submissions
                </Title>

                <div className='grid grid-cols-8 h-full'>
                    <div className='col-span-8 sm:col-span-6 sm:col-start-2   '>
                        <Row
                            className='bg-gray-100/50 border-2 border-slate-500 rounded-lg'
                            align={'middle'}
                            justify={'space-between'}
                        >
                            <Col
                                xs={{ span: 10 }}
                                sm={{ span: 10 }}
                                md={{ span: 10 }}
                                lg={{ span: 6 }}
                            >
                                <Row
                                    justify={'space-evenly'}
                                    align={'middle'}
                                >
                                    <Col span={4}>
                                        <Button
                                            type='text'
                                            icon={<LeftOutlined></LeftOutlined>}
                                        ></Button>
                                    </Col>
                                    <Col
                                        xs={{ span: 8 }}
                                        sm={{ span: 8 }}
                                        md={{ span: 8 }}
                                        lg={{ span: 6 }}
                                        className='p-2'
                                    >
                                        <InputNumber
                                            className='text-center w-full'
                                            size='small'
                                            defaultValue={1}
                                            controls={false}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <span> of 42</span>
                                    </Col>
                                    <Col span={4}>
                                        <Button
                                            type='text'
                                            icon={<RightOutlined></RightOutlined>}
                                        ></Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                xs={{ span: 14 }}
                                sm={{ span: 14 }}
                                md={{ span: 14 }}
                                lg={{ span: 10 }}
                            >
                                <Row
                                    align={'middle'}
                                    justify={'end'}
                                    className='w-full'
                                    gutter={{ xs: 40, sm: 40, md: 40, xl: 16 }}
                                >
                                    <Col span={8}>
                                        <Select
                                            size='small'
                                            showAction={true}
                                            onChange={() => {}}
                                            defaultValue={'jack'}
                                            options={[
                                                {
                                                    value: 'jack',
                                                    label: 'pending',
                                                },
                                                {
                                                    value: 'lucy',
                                                    label: 'accepted',
                                                },
                                                {
                                                    value: 'Yiminghe',
                                                    label: 'rejected',
                                                },
                                                {
                                                    value: 'disabled',
                                                    label: 'Disabled',
                                                    disabled: true,
                                                },
                                            ]}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <Button
                                            type='text'
                                            icon={<DeleteOutlined></DeleteOutlined>}
                                        ></Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Collapse
                            size='middle'
                            bordered={false}
                            expandIcon={({ isActive }) => <FilterOutlined></FilterOutlined>}
                            className=' my-2'
                            expandIconPosition='start'
                            items={[
                                {
                                    key: '1',
                                    label: <Title level={5}>Filters</Title>,
                                    children: <p>hi</p>,
                                },
                            ]}
                        />
                        <Row
                            className='mt-4'
                            align={'middle'}
                            justify={'space-evenly'}
                            gutter={16}
                        >
                            <Col xs={12} sm={10} md={10} lg={8}>
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <Image
                                            className='rounded-lg'
                                            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                                        />
                                    </Col>
                                    <Col span={16}>
                                        <div className='flex flex-col items-start justify-center'>
                                            <a>@username</a>
                                            <span>submission time</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Button>History</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}
