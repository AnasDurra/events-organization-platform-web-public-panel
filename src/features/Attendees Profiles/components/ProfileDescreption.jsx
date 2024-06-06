import { CheckOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Statistic, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDescreption = () => {
    return (
        <div>
            <Row gutter={[20, 10]}>
                <Col
                    style={{ textAlign: 'center', paddingBottom: '10px' }}
                    xs={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                >
                    <Link
                        to={`organizations`}
                        style={{
                            textDecoration: 'none',
                            display: 'inline-block',
                        }}
                    >
                        <div
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            style={{ transition: 'transform 0.2s' }}
                        >
                            <Statistic
                                title={
                                    <div>
                                        <h3>Following</h3>
                                    </div>
                                }
                                value={1128}
                                prefix={
                                    <UserOutlined
                                        style={{
                                            fontSize: '20px',
                                        }}
                                    />
                                }
                            />
                        </div>
                    </Link>
                </Col>
                <Col
                    style={{ textAlign: 'center', paddingBottom: '10px' }}
                    xs={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                >
                    <Statistic
                        title={
                            <div>
                                <h3>Level</h3>
                            </div>
                        }
                        value={5}
                        prefix={
                            <StarFilled
                                style={{
                                    color: '#FFD700',
                                }}
                            />
                        }
                    />
                </Col>
            </Row>

            <Row gutter={[20, 10]}>
                <Col
                    style={{ textAlign: 'center', paddingBottom: '10px' }}
                    xs={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                >
                    <Statistic
                        title={
                            <div>
                                <h3>Events</h3>
                            </div>
                        }
                        value={1128}
                        prefix={
                            <CheckOutlined
                                style={{
                                    fontSize: '20px',
                                }}
                            />
                        }
                    />
                </Col>

                <Col
                    style={{ textAlign: 'center', paddingBottom: '10px' }}
                    xs={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                >
                    <Statistic
                        title={
                            <div>
                                <h3>Badges</h3>
                            </div>
                        }
                        value={' '}
                        valueStyle={{ fontSize: '0px' }}
                        prefix={
                            <Avatar.Group>
                                {badges.map((badge) => (
                                    <Tooltip title={badge.name} key={badge.id}>
                                        <Avatar
                                            size={35}
                                            style={{
                                                backgroundColor: badge.bgcolor,
                                                marginRight: '3.5px',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginRight: '5px',
                                                }}
                                            >
                                                {badge.name}
                                            </span>
                                        </Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        }
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ProfileDescreption;

const badges = [
    {
        id: 1,
        name: 'badge 1',
        bgcolor: '#3F51B5',
    },
    {
        id: 2,
        name: 'badge 2',
        bgcolor: '#FFC107',
    },
    {
        id: 3,
        name: 'badge 3',
        bgcolor: '#4CAF50',
    },
];
