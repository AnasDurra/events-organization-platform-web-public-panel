import { TagsOutlined, UserOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EventDetails = ({ description, tags, age_groups }) => {
    return (
        <Row gutter={[30, 20]}>
            <Col span={24}>
                <Typography.Title style={{ margin: '0px' }} level={2} strong>
                    <span
                        style={{
                            borderBottom: '5px solid #000',
                            paddingBottom: '4px',
                        }}
                    >
                        Event
                    </span>{' '}
                    Overview
                </Typography.Title>
            </Col>
            <Col span={24}>
                <Card
                    style={{
                        height: '100%',
                        // padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                        // backgroundColor: '#fafafa', //card
                        backgroundColor: 'transparent', //card
                    }}
                >
                    <ReactQuill value={description} readOnly={true} theme={'bubble'} />
                </Card>
            </Col>
            <Col span={24}>
                <Divider />
                <Typography.Title style={{ margin: '0px' }} level={2} strong>
                    <span
                        style={{
                            borderBottom: '5px solid #000',
                            paddingBottom: '4px',
                        }}
                    >
                        Event
                    </span>{' '}
                    Detials
                </Typography.Title>
            </Col>
            <Col xs={24}>
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Row style={{ flex: 1 }} gutter={[20, 20]}>
                        <Col span={24}>
                            <Card
                                type='inner'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    // padding: '10px',
                                    borderRadius: '8px',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                    // backgroundColor: '#fafafa', //card
                                    backgroundColor: 'transparent', //card
                                }}
                            >
                                <Space style={{ width: '100%' }} direction='vertical' size={10}>
                                    <Space>
                                        <Icon
                                            icon='fluent-mdl2:calendar-settings-mirrored'
                                            style={{ fontSize: '18px' }}
                                        />
                                        <Typography.Text strong>
                                            <span
                                                style={{
                                                    borderBottom: '4px solid #000',
                                                    paddingBottom: '4px',
                                                }}
                                            >
                                                Eve
                                            </span>
                                            nt Attributes:
                                        </Typography.Text>
                                    </Space>
                                    <Divider
                                        style={{
                                            margin: '10px 0px',
                                        }}
                                    />
                                    <Space wrap>
                                        <TagsOutlined style={{ fontSize: '18px' }} />
                                        {/* <Typography.Text strong>Event Tags:</Typography.Text> */}
                                        <div>
                                            {tags.length === 0
                                                ? 'No Tags for this event'
                                                : tags.map((tag) => (
                                                      <Tag
                                                          key={tag?.tag?.value}
                                                          style={{
                                                              padding: '2px 10px',
                                                              margin: '5px',
                                                              fontSize: '15px',
                                                              backgroundColor: '#DCF2F1',
                                                          }}
                                                      >
                                                          <Typography.Text strong>{tag?.tag?.label}</Typography.Text>
                                                      </Tag>
                                                  ))}
                                        </div>
                                    </Space>

                                    <Space wrap>
                                        <UserOutlined style={{ fontSize: '18px' }} />
                                        {/* <Typography.Text strong>Event Target Age Group:</Typography.Text> */}
                                        <div>
                                            {age_groups.length === 0
                                                ? 'No Age Groups for this event'
                                                : age_groups.map((age_group) => (
                                                      <Tag
                                                          style={{
                                                              padding: '2px 10px',
                                                              margin: '5px',
                                                              fontSize: '15px',
                                                              backgroundColor: '#EEF5FF',
                                                          }}
                                                          key={age_group?.age_group_id}
                                                      >
                                                          <Typography.Text strong>
                                                              Age range {age_group?.age_group_name}
                                                          </Typography.Text>
                                                      </Tag>
                                                  ))}
                                        </div>
                                    </Space>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default EventDetails;
