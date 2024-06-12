import { CheckOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Statistic, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAttendeeBadgesQuery } from '../../gamification/gamificationSlice';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import BadgesModal from './BadgesModal';

const ProfileDescreption = () => {
    const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(true);

    const { data: { result: badges } = { result: [] } } = useGetAttendeeBadgesQuery(getLoggedInUserV2()?.attendee_id);

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
                                {/*     {badges.map((badge) => (
                                    <Tooltip
                                        title={badge.name}
                                        key={badge.id}
                                    >
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
                                ))} */}
                                {badges.slice(0, 3).map((bdg) => (
                                    <Avatar
                                        key={bdg.badge_id}
                                        size={50}
                                        className='bg-stone-100'
                                    >
                                        <img
                                            src={`data:image/svg+xml;utf8,${encodeURIComponent(bdg?.badge_shape?.svg)}`}
                                            width={50}
                                        />
                                    </Avatar>
                                ))}
                                <Avatar
                                    size={50}
                                    className='bg-stone-100 hover:bg-gray-200 hover:cursor-pointer text-black border-2 border-red-400 '
                                    onClick={() => setIsBadgesModalOpen(true)}
                                >
                                    <div
                                        className='text-lg  p-1 font-bold text-gray-600 '
                                        type='text'
                                    >
                                        View all
                                    </div>
                                </Avatar>
                            </Avatar.Group>
                        }
                    />
                </Col>
            </Row>

            <BadgesModal
                isOpen={isBadgesModalOpen}
                myBadges={badges}
                onClose={() => {
                    console.log('close');
                    setIsBadgesModalOpen(false);
                }}
            />
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
