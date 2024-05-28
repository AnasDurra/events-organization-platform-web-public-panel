import { MoreOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Card, Col, Dropdown, Image, Menu, Popover, Row, Space, Tooltip, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUserV2 } from '../../../../api/services/auth';

import useEventHandlers from '../../utils/eventHandlers';
const EventCover = ({ data, setIsUpdateModalOpen }) => {
    const navigate = useNavigate();
    const { handleDeleteEvent } = useEventHandlers();
    const user = getLoggedInUserV2();
    // console.log(user);
    return (
        <div style={coverImageStyle.container}>
            <Image
                preview={false}
                height={'100%'}
                width={'100%'}
                style={{ minHeight: '40vh' }}
                src='https://picsum.photos/1000/300'
            />
            <div style={coverImageStyle.overlay}>
                <Space size={10} direction='vertical'>
                    <Space size={10} wrap>
                        <Typography.Title style={{ ...coverImageStyle.text, ...coverImageStyle.title }} level={4}>
                            {data?.title}
                        </Typography.Title>
                        <Typography.Title
                            style={{ ...coverImageStyle.text, ...coverImageStyle.subtitle }}
                            level={5}
                            // disabled
                        >
                            ({data?.event_type})
                        </Typography.Title>
                    </Space>
                    <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Space direction='vertical'>
                            <Typography.Text
                                style={{ ...coverImageStyle.text, ...coverImageStyle.description }}
                                // disabled
                            >
                                {(() => {
                                    const registrationStartDate = new Date(data?.registration_start_date);
                                    const currentDate = new Date();
                                    const differenceInMilliseconds = currentDate - registrationStartDate;
                                    const differenceInDays = Math.floor(
                                        differenceInMilliseconds / (1000 * 60 * 60 * 24)
                                    );
                                    return `${differenceInDays} days ago`;
                                })()}
                            </Typography.Text>
                            <Popover
                                content={<OrgPopoverContent organization={data?.organization} />}
                                title='Organizer Info'
                            >
                                <Link to={`/org/${data?.organization?.id}`} style={coverImageStyle.link}>
                                    <Typography.Text
                                        style={{ ...coverImageStyle.text, ...coverImageStyle.description }}
                                    >
                                        Hosted by @{data?.organization?.name}
                                    </Typography.Text>
                                </Link>
                            </Popover>
                        </Space>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            {user?.user_role == 2 && user?.organization_id == data?.organization?.id && (
                                <div style={{ textAlign: 'end' }}>
                                    <Space.Compact>
                                        <Tooltip title='Edit Event' trigger={'hover'}>
                                            <Button
                                                icon={
                                                    <Icon
                                                        icon='line-md:edit-twotone-full'
                                                        style={{ fontSize: '18px' }}
                                                    />
                                                }
                                                onClick={() => setIsUpdateModalOpen(true)}
                                            />
                                        </Tooltip>

                                        <Tooltip title='Show Attendees'>
                                            <Button
                                                icon={<Icon icon='fa6-solid:users' />}
                                                onClick={() => navigate(`/event/show/${data?.event_id}/attendees`)}
                                            />
                                        </Tooltip>

                                        <Dropdown
                                            overlay={
                                                <Menu>
                                                    <Menu.Item
                                                        key='delete'
                                                        icon={
                                                            <Icon
                                                                icon='line-md:remove'
                                                                style={{
                                                                    fontSize: '24px',
                                                                    fontWeight: 'bold',
                                                                    color: ` #ff0000`,
                                                                }}
                                                            />
                                                        }
                                                        onClick={() => {
                                                            handleDeleteEvent(data?.eventData?.result?.id);
                                                        }}
                                                    >
                                                        Delete Event
                                                    </Menu.Item>
                                                </Menu>
                                            }
                                            trigger={['click']}
                                        >
                                            <Button icon={<MoreOutlined />} />
                                        </Dropdown>
                                    </Space.Compact>
                                </div>
                            )}
                        </div>
                    </Space>
                </Space>
            </div>
        </div>
    );
};

export default EventCover;

const coverImageStyle = {
    container: {
        position: 'relative',
        display: 'inline-block',
    },
    overlay: {
        position: 'absolute',
        top: -3,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1em',
        zIndex: 1,
    },

    text: {
        fontSize: '30px',
        color: 'white',

        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontFamily: "'Roboto Mono', monospace",
    },
    title: {
        marginTop: '10px',
        marginBottom: '0px',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: '18px',
        marginBottom: '0px',
        marginTop: '10px',
    },
    description: {
        fontSize: '16px',
        marginTop: '0px',
    },
    link: {
        color: 'white',
        fontFamily: "'Roboto', sans-serif",
    },
};

const OrgPopoverContent = ({ organization }) => {
    return (
        <Card bordered={false} style={{}}>
            <Link to={`/org/${organization?.id}`} style={coverImageStyle.link}>
                <Card.Meta
                    avatar={
                        <Image
                            preview={false}
                            width={50}
                            height={50}
                            src='https://randomuser.me/api/portraits/men/4.jpg'
                            alt={organization.name}
                            style={{ borderRadius: '50%' }}
                        />
                    }
                    title={organization.name}
                    description={organization.description || 'No description available'}
                />
            </Link>
        </Card>
    );
};
