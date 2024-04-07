import React from 'react';
import { List, Row, Col, Typography, Image, Tabs } from 'antd';

const { Title, Text } = Typography;

const EventsTab = ({ data }) => {
    return (
        <Tabs
            defaultActiveKey='1'
            items={getTabsItems(data)}
            onChange={() => {}}
        />
    );
};

const getTabsItems = (data) => {
    return [
        {
            key: '1',
            label: <Title level={5}>Events</Title>,
            children: (
                <List
                    pagination={{ position: 'bottom', align: 'center', pageSize: '3' }}
                    itemLayout='horizontal'
                    dataSource={data}
                    renderItem={renderEventItem}
                />
            ),
        },
        {
            key: '2',
            label: <Title level={5}>Posts</Title>,
            children: <></>,
        },
    ];
};

const renderEventItem = (item) => {
    return (
        <List.Item
            onClick={() => {}}
            style={{}}
        >
            <Row
                align='top'
                gutter={20}
                style={{ height: '100%' }}
            >
                <Col
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                    lg={{ span: 8 }}
                    style={{ display: 'inline-flex', alignSelf: 'stretch' }}
                >
                    <div>
                        <Image
                            preview={false}
                            width='100%'
                            height='100%'
                            src={item.img}
                            style={{ borderRadius: '5%', objectFit: 'cover' }}
                        />
                    </div>
                </Col>
                <Col
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                    lg={{ span: 16 }}
                >
                    <Row
                        justify='start'
                        style={{ height: '100%' }}
                    >
                        <Col
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                            lg={{ span: 16 }}
                        >
                            <Title
                                level={5}
                                style={{ margin: 0, marginTop: '0.5em' }}
                            >
                                {item.title}
                            </Title>
                        </Col>
                        <Col
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                            lg={{ span: 6 }}
                            style={{ fontWeight: 'bold', color: 'green', marginTop: '0.6em' }}
                        >
                            {item.pricing + ' Tokens'}
                        </Col>
                    </Row>
                    <Row
                        justify='start'
                        style={{ marginTop: '1.5em', color: 'GrayText' }}
                    >
                        <Col
                            sm={{ span: 16 }}
                            xs={{ span: 16 }}
                            lg={{ span: 16 }}
                        >
                            {item.tags.map((tag) => `#${tag} `)}
                        </Col>
                        <Col
                            sm={{ span: 8 }}
                            xs={{ span: 8 }}
                            lg={{ span: 4 }}
                            style={{ color: 'GrayText', textAlign: 'end' }}
                        >
                            <Text type='secondary'>{item.date}</Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </List.Item>
    );
};

export default EventsTab;
