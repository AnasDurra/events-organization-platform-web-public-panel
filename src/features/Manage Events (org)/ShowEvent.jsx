import {
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Image,
    List,
    Modal,
    Row,
    Space,
    Table,
    Tag,
    Tooltip,
    Typography,
    Upload,
    message,
} from 'antd';
import {
    ArrowRightOutlined,
    CalendarOutlined,
    EditOutlined,
    EnvironmentOutlined,
    FileImageOutlined,
    ScheduleFilled,
    ScheduleOutlined,
    TagsOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowMap from './ShowMap';

import { useShowQuery } from '../../api/services/events';
import UpdateEventModal from './UpdateEventModal';

const ShowEvent = () => {
    const { id } = useParams();

    const { data: event, error, isLoading: eventIsLoading } = useShowQuery();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const dataSource = [
        {
            key: '1',
            name: 'General Admission',
            price: 100,
            qty: 10,
        },
    ];

    const columns = [
        {
            title: 'Available Tickets',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Qty*',
            dataIndex: 'qty',
            key: 'qty',
        },
    ];

    const handleRegisterClicked = () => {
        message.success('registered successfully');
    };
    useEffect(() => {
        console.log(event);
        console.log(error);
    }, [event, error]);
    return (
        <div
            //   style={{ padding: "0px 40px 40px 40px" }}
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            <Card
                bodyStyle={{ padding: '20px 20px 20px 20px' }}
                cover={
                    <>
                        <Image
                            height={250}
                            src='https://picsum.photos/1000/300'
                        />
                    </>
                }
            >
                <Row gutter={[50, 30]}>
                    <Col span={24}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Space
                                size={0}
                                direction='vertical'
                            >
                                <Space>
                                    <Typography.Title
                                        style={{ marginTop: '10px' }}
                                        level={4}
                                    >
                                        Event Name
                                    </Typography.Title>
                                    <Typography.Title
                                        style={{ marginTop: '10px' }}
                                        level={5}
                                        disabled
                                    >
                                        (on-site)
                                    </Typography.Title>
                                </Space>
                                <Space>
                                    <Typography.Text
                                        level={5}
                                        disabled
                                        style={{ marginTop: '0px' }}
                                    >
                                        15 days ago
                                    </Typography.Text>
                                    <Typography.Text
                                        level={5}
                                        underline
                                        style={{ marginTop: '0px' }}
                                    >
                                        by <a href='@organizer120'>@organizer120</a>
                                    </Typography.Text>
                                </Space>
                            </Space>
                            <Tooltip title='Edit Event'>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => setIsUpdateModalOpen(true)}
                                />
                            </Tooltip>
                        </div>
                    </Col>
                    {/* <Col span={4}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            w
                        </div>
                    </Col> */}

                    <Col
                        xs={24}
                        md={12}
                    >
                        <Table
                            style={{
                                height: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
                            }}
                            dataSource={dataSource}
                            columns={columns}
                            bordered
                            pagination={false}
                        />
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Descriptions
                            bordered
                            column={1}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Descriptions.Item label='Registration Start Date'>
                                {'2024-04-01 12:25:00'}
                            </Descriptions.Item>
                            <Descriptions.Item label='Registration End Date'>{'2024-04-10 12:30:00'}</Descriptions.Item>
                        </Descriptions>
                        <Button
                            size='large'
                            onClick={handleRegisterClicked}
                            style={{
                                width: '100%',
                                height: '6vh',
                                border: '2px solid #000000',
                                backgroundColor: '#8B0000',
                                borderColor: '#8B0000',
                                color: 'white',
                                borderRadius: '4px',
                                padding: '0px 20px',

                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Register Now
                        </Button>
                    </Col>

                    <Col span={24}>
                        <Divider />
                        <Typography.Title
                            style={{ margin: '0px' }}
                            level={3}
                            strong
                        >
                            Event Overview
                        </Typography.Title>
                    </Col>
                    <Col span={24}>
                        <Card
                            style={{
                                height: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Space
                                direction='vertical'
                                wrap
                            >
                                <Typography.Text>
                                    The meaning of DESCRIPTION is an act of describing; specifically : discourse
                                    intended to give a mental image of something experienced. The meaning of DESCRIPTION
                                    is an act of describing; specifically : discourse intended to give a mental image of
                                    something experienced. The meaning of DESCRIPTION is an act of describing;
                                    specifically : discourse intended to give a mental image of something experienced.
                                </Typography.Text>
                            </Space>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Divider />
                        <Typography.Title
                            style={{ margin: '0px' }}
                            level={3}
                            strong
                        >
                            Event Detials
                        </Typography.Title>
                    </Col>
                    <Col
                        xs={24}
                        lg={12}
                    >
                        <div
                            style={{
                                display: 'flex',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Row
                                style={{ flex: 1 }}
                                gutter={[20, 10]}
                            >
                                <Col span={24}>
                                    <Card
                                        type='inner'
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <Space
                                            direction='vertical'
                                            size={30}
                                        >
                                            <Space wrap>
                                                <TagsOutlined />
                                                <Typography.Text strong>Event Tags:</Typography.Text>
                                                <div>
                                                    <Tag>Tag 1</Tag>
                                                    <Tag>Tag 2</Tag>
                                                </div>
                                            </Space>

                                            <Space
                                                wrap
                                                Space
                                            >
                                                <UserOutlined />
                                                <Typography.Text strong>Event Target Age Group:</Typography.Text>
                                                <div>
                                                    <Tag>Age Group 1</Tag>
                                                    <Tag>Age Group 2</Tag>
                                                </div>
                                            </Space>
                                        </Space>
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Card
                                        type='inner'
                                        style={{
                                            height: '100%',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <Space
                                            style={{ width: '100%' }}
                                            direction='vertical'
                                            size={10}
                                        >
                                            <Space>
                                                <EnvironmentOutlined />
                                                <Typography.Text strong>Event Address:</Typography.Text>
                                            </Space>
                                            <Divider style={{ margin: '10px 0px' }} />
                                            <ShowMap
                                                position={{
                                                    lat: 33.792773,
                                                    lng: 36.145962,
                                                }}
                                            />
                                            <Typography.Text>
                                                <strong>Event Address: </strong>
                                                {'123 Main St, City, Country'}
                                            </Typography.Text>
                                            <Typography.Text>
                                                <strong>Address Note:</strong> {'Near the park'}
                                            </Typography.Text>
                                        </Space>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col
                        xs={24}
                        lg={12}
                    >
                        <Card
                            type='inner'
                            style={{
                                height: '100%',
                                padding: '10px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Space
                                direction='vertical'
                                style={{ width: '100%' }}
                                size={20}
                            >
                                <Space>
                                    <ScheduleOutlined />
                                    <Typography.Text
                                        strong
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                        }}
                                    >
                                        Event Schedule:
                                    </Typography.Text>
                                </Space>
                                <Divider style={{ margin: '0px' }} />
                                {fakeData.map((dateObj, index) => (
                                    <Space
                                        direction='vertical'
                                        style={{
                                            width: '100%',
                                        }}
                                        size={20}
                                        key={index}
                                    >
                                        <Space>
                                            <CalendarOutlined />
                                            <Typography.Text
                                                strong
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {dateObj.date}
                                            </Typography.Text>
                                        </Space>
                                        <List
                                            bordered
                                            dataSource={dateObj.timestamps}
                                            renderItem={(timestamp, i) => (
                                                <List.Item
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <div>
                                                        <Typography.Text>{timestamp.startTime}</Typography.Text>
                                                    </div>

                                                    <ArrowRightOutlined
                                                        style={{
                                                            margin: '0em 1em',
                                                        }}
                                                    />
                                                    <div>
                                                        <Typography.Text>{timestamp.endTime}</Typography.Text>
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                    </Space>
                                ))}
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Card>
            {isUpdateModalOpen && (
                <UpdateEventModal
                    isUpdateModalOpen={isUpdateModalOpen}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                />
            )}
        </div>
    );
};

export default ShowEvent;
const fakeData = [
    {
        date: '2024-04-01',
        timestamps: [
            {
                startTime: '2024-04-01 10:00:00',
                endTime: '2024-04-01 12:00:00',
            },
            {
                startTime: '2024-04-01 14:00:00',
                endTime: '2024-04-01 16:00:00',
            },
        ],
    },
    {
        date: '2024-04-02',
        timestamps: [
            {
                startTime: '2024-04-02 09:00:00',
                endTime: '2024-04-02 11:00:00',
            },
            {
                startTime: '2024-04-02 15:00:00',
                endTime: '2024-04-02 17:00:00',
            },
        ],
    },
    // More fake data entries...
];
