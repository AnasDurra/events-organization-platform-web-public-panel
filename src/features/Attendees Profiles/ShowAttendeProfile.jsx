import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
    CheckOutlined,
    EditOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
    StarFilled,
    TwitterOutlined,
    UserOutlined,
    ContactsOutlined,
    WhatsAppOutlined,
    CalendarOutlined,
    EllipsisOutlined,
    InstagramOutlined,
    FileImageOutlined,
    DeleteOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Dropdown,
    Empty,
    Image,
    Menu,
    Modal,
    Row,
    Skeleton,
    Space,
    Spin,
    Statistic,
    Tooltip,
    Typography,
} from 'antd';
const { Meta } = Card;

import { useLazyViewAttendeeProfileQuery } from '../../api/services/attendeeProfile';
import { useBlockUserMutation } from '../../api/services/ban';
import { useUnBlockUserMutation } from '../../api/services/ban';
import { useLazyIsBlockedQuery } from '../../api/services/ban';

import UpdateProfileModal from './UpdateProfileModal';

import { getLoggedInUser } from '../../api/services/auth';
import { useNotification } from '../../utils/NotificationContext';
import LastThreeEvents from './components/LastThreeEvents';

const ShowAttendeProfile = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const { openNotification } = useNotification();

    const [fetchAttendeeProfile, { data: attendeeProfile, isLoading }] = useLazyViewAttendeeProfileQuery(id);

    const [blockMutation, { isLoading: blockIsLoading }] = useBlockUserMutation();
    const [unBlockMutation, { isLoading: unBlockIsLoading }] = useUnBlockUserMutation();
    const [fetchIsBlocked, { data: isBlocked, isLoading: isBlockedIsLoading }] = useLazyIsBlockedQuery(id);

    const [data, setData] = useState(null);

    const confirmBlockAttendee = () => {
        Modal.confirm({
            title: 'Are you sure you want to block this attendee?',
            content: 'Blocking this attendee will restrict their access to certain features.',
            okText: 'Yes, Block',
            cancelText: 'Cancel',
            onOk: () => {
                blockMutation({ attendee_id: id })
                    .unwrap()
                    .then((res) => {
                        openNotification(
                            'success',
                            `${attendeeProfile?.result?.full_name} has been blocked successfully`
                        );
                        fetchIsBlocked(id);
                    })
                    .catch((error) => {
                        openNotification('warning', error?.data?.message);

                        console.error('Error:', error);
                    });
            },
        });
    };

    const confirmUnblockAttendee = () => {
        Modal.confirm({
            title: 'Are you sure you want to unblock this attendee?',
            content: 'Unblocking this attendee will restore their access to all features.',
            okText: 'Yes, Unblock',
            cancelText: 'Cancel',
            onOk: () => {
                unBlockMutation({ attendee_id: id })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                        openNotification(
                            'success',
                            `${attendeeProfile?.result?.full_name} has been unblocked successfully`
                        );
                        fetchIsBlocked(id);
                    })
                    .catch((error) => {
                        openNotification('warning', error.data.message);
                        console.error('Error:', error);
                    });
            },
        });
    };

    useEffect(() => {
        const loggedUser = getLoggedInUser();
        setUser(loggedUser);
        if (loggedUser?.role_id == 2) {
            fetchIsBlocked(id);
        }
        console.log(loggedUser);
    }, []);

    useEffect(() => {
        fetchAttendeeProfile(id);
        if (attendeeProfile) {
            if (attendeeProfile?.result?.user_id === user?.sub) {
                navigate('/home/profile');
            } else {
                setData(attendeeProfile);
            }
        }
    }, [attendeeProfile, id]);

    // Sample data for events
    const events = [
        {
            id: '30',
            title: 'GPT: The New Generation of AI',
            cover_picture_url: 'https://picsum.photos/300/200?random=1',
            registration_end_date: '2024-01-03 21:00:00',
            organization: { name: 'ORG1' },
            description: 'Here is the description of the event',
        },
        {
            id: '25',
            title: 'The Future of AI',
            cover_picture_url: 'https://picsum.photos/300/200?random=2',
            registration_end_date: '2024-04-10 09:30:00',
            organization: { name: 'ORG1' },
            description: 'This is an event about artificial intelligence',
        },
    ];
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
                bodyStyle={{ paddingTop: '0px', paddingRight: '10px' }}
                style={{
                    width: '90%',
                }}
                cover={
                    <div style={{ minHeight: '25vh' }}>
                        {data?.result?.cover_img ? (
                            <Image
                                width={'100%'}
                                style={{ height: '100%', minHeight: '25vh' }}
                                preview={{
                                    mask: (
                                        <>
                                            <Space>
                                                <Button icon={<EyeOutlined />} type='primary'>
                                                    Show
                                                </Button>
                                            </Space>
                                        </>
                                    ),
                                }}
                                src={data?.result?.cover_img}
                                fallback={
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description='No cover picture available'
                                    />
                                }
                            />
                        ) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No cover picture available' />
                        )}
                    </div>
                }
            >
                <Spin size='large' spinning={unBlockIsLoading || blockIsLoading || isBlockedIsLoading}>
                    <div>
                        <Skeleton
                            loading={isLoading}
                            active
                            avatar
                            paragraph={{
                                rows: 1,
                                width: '90%',
                            }}
                        >
                            <Row justify={{ md: 'start', sm: 'start', xs: 'center' }}>
                                <Col span={24}>
                                    {id && user?.role_id == 2 && (
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Dropdown
                                                placement='bottomRight'
                                                //TODO replace this
                                                overlay={
                                                    <Menu
                                                        onClick={
                                                            isBlocked?.result
                                                                ? confirmUnblockAttendee
                                                                : confirmBlockAttendee
                                                        }
                                                    >
                                                        <Menu.Item key='block' style={{ color: 'red' }}>
                                                            {isBlocked?.result ? 'Unblock User' : 'Block User'}
                                                        </Menu.Item>
                                                    </Menu>
                                                }
                                                trigger={['click']}
                                            >
                                                <Tooltip title='Block Attendee'>
                                                    <Button
                                                        icon={<EllipsisOutlined />}
                                                        onClick={(e) => e.preventDefault()}
                                                    />
                                                </Tooltip>
                                            </Dropdown>
                                        </div>
                                    )}
                                </Col>
                                <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-x-2 sm:space-y-0 w-full'>
                                    <div className='order-1 sm:order-none'>
                                        <a
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                            onClick={() => {
                                                Modal.info({
                                                    title: 'Avatar Picture',
                                                    content: (
                                                        <img
                                                            alt='Preview'
                                                            style={{ width: '100%' }}
                                                            src={
                                                                data?.result?.profile_img ??
                                                                'https://api.dicebear.com/7.x/miniavs/svg?seed=8'
                                                            }
                                                        />
                                                    ),
                                                    okText: 'Close',
                                                });
                                            }}
                                            type='link'
                                            size='small'
                                        >
                                            <Avatar
                                                size={100}
                                                icon={<UserOutlined />}
                                                src={
                                                    data?.result?.profile_img ??
                                                    'https://api.dicebear.com/7.x/miniavs/svg?seed=8'
                                                }
                                                style={{
                                                    textAlign: 'center',
                                                    marginBottom: '10px',
                                                    border: '3px solid white',
                                                    borderRadius: '50%',
                                                    marginTop: '-60px',
                                                }}
                                            />
                                        </a>
                                    </div>
                                    <div className='order-2 sm:order-none'>
                                        {data ? (
                                            <div style={{ textAlign: 'center' }}>
                                                <Typography.Title
                                                    style={{
                                                        // marginTop: '10px',
                                                        marginBottom: '0px',
                                                    }}
                                                    level={3}
                                                >
                                                    {data?.result?.full_name ? data.result?.full_name : ''}
                                                </Typography.Title>
                                                <Typography.Text type='secondary'>
                                                    {`Member since ${formatDate(data?.result.join_date)}
                                                    ${
                                                        data?.result.address?.label
                                                            ? `* ${data?.result.address?.label}`
                                                            : ''
                                                    }`}
                                                </Typography.Text>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </Row>
                        </Skeleton>
                    </div>

                    <Row
                        gutter={[16, 12]}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '2.5em',
                            width: '100%',
                        }}
                        align={'middle'}
                    >
                        <Col xs={24} sm={24} md={14}>
                            <Card
                                bodyStyle={{ padding: '5px' }}
                                headStyle={{ padding: '5px' }}
                                style={{
                                    height: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    boxShadow: '0 3px 18px rgba(0, 0, 0, 0.1)',
                                }}
                                title={
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Skeleton
                                            loading={isLoading}
                                            active
                                            paragraph={{
                                                rows: 0,
                                                width: '50%',
                                            }}
                                        >
                                            <Typography.Text>
                                                {data?.result.job?.label ?? 'Does Not Work'}
                                            </Typography.Text>
                                            <Space
                                                wrap
                                                size={10}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    margin: '15px 0px 15px 15px',
                                                }}
                                            >
                                                <Dropdown
                                                    placement='bottomRight'
                                                    overlay={
                                                        <Menu>
                                                            {data?.result.contacts?.map((contact) => (
                                                                <Menu.Item key={contact.id}>
                                                                    <Tooltip title={contact.contact_name}>
                                                                        <a
                                                                            href={
                                                                                contact.contact_name === 'Phone Number'
                                                                                    ? `tel:${contact.value}`
                                                                                    : getContactLink(
                                                                                          contact.contact_name
                                                                                      )
                                                                            }
                                                                            target='_blank'
                                                                            rel='noopener noreferrer'
                                                                        >
                                                                            {contact.contact_name === 'WhatsApp' && (
                                                                                <WhatsAppOutlined
                                                                                    style={getIconStyle(
                                                                                        contact.contact_name
                                                                                    )}
                                                                                />
                                                                            )}
                                                                            {contact.contact_name === 'Instagram' && (
                                                                                <InstagramOutlined
                                                                                    style={getIconStyle(
                                                                                        contact.contact_name
                                                                                    )}
                                                                                />
                                                                            )}
                                                                            {contact.contact_name === 'LinkedIn' && (
                                                                                <LinkedinOutlined
                                                                                    style={{
                                                                                        fontSize: '24px',
                                                                                        color: '#0077B5',
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            {contact.contact_name === 'Facebook' && (
                                                                                <FacebookOutlined
                                                                                    style={getIconStyle(
                                                                                        contact.contact_name
                                                                                    )}
                                                                                />
                                                                            )}
                                                                            {contact.contact_name === 'Twitter' && (
                                                                                <TwitterOutlined
                                                                                    style={getIconStyle(
                                                                                        contact.contact_name
                                                                                    )}
                                                                                />
                                                                            )}
                                                                            {contact.contact_name === 'Email' && (
                                                                                <MailOutlined
                                                                                    style={getIconStyle(
                                                                                        contact.contact_name
                                                                                    )}
                                                                                />
                                                                            )}
                                                                            {contact.contact_name ===
                                                                                'Phone Number' && (
                                                                                <PhoneOutlined
                                                                                    style={getIconStyle(
                                                                                        contact.contact_name
                                                                                    )}
                                                                                    onClick={() =>
                                                                                        (window.location.href = `tel:${contact.value}`)
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </a>
                                                                    </Tooltip>
                                                                </Menu.Item>
                                                            ))}
                                                        </Menu>
                                                    }
                                                    trigger={['click']}
                                                >
                                                    <Tooltip title='Contact Info'>
                                                        <Button
                                                            type='primary'
                                                            icon={<ContactsOutlined />}
                                                            onClick={(e) => e.preventDefault()}
                                                        />
                                                    </Tooltip>
                                                </Dropdown>
                                            </Space>
                                        </Skeleton>
                                    </div>
                                }
                            >
                                <Skeleton
                                    loading={isLoading}
                                    active
                                    avatar
                                    paragraph={{
                                        rows: 1,
                                        width: '100%',
                                    }}
                                >
                                    <Typography.Text strong>Bio</Typography.Text>
                                    <Typography.Paragraph>{data ? data.result.bio : ''}</Typography.Paragraph>
                                </Skeleton>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={10}>
                            <Card
                                bodyStyle={{ padding: '5px' }}
                                headStyle={{ padding: '5px' }}
                                style={{
                                    // height: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    boxShadow: '0 3px 18px rgba(0, 0, 0, 0.1)',
                                    paddingBottom: '0px',
                                    margin: '0px',
                                }}
                                size='small'
                                type='inner'
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <div>
                                        <Row gutter={[20, 10]}>
                                            <Col style={{ paddingBottom: '10px' }} span={12}>
                                                <Link
                                                    to={`organizations`}
                                                    style={{ textDecoration: 'none', display: 'inline-block' }}
                                                >
                                                    <div
                                                        onMouseEnter={(e) =>
                                                            (e.currentTarget.style.transform = 'scale(1.06)')
                                                        }
                                                        onMouseLeave={(e) =>
                                                            (e.currentTarget.style.transform = 'scale(1)')
                                                        }
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
                                            <Col style={{ paddingBottom: '10px' }} span={12}>
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

                                        <Row gutter={[20, 10]}>
                                            <Col style={{ paddingBottom: '10px' }} span={12}>
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

                                            <Col style={{ paddingBottom: '10px' }} span={12}>
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
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Col span={24} style={{ marginTop: '3em' }}>
                        <Typography.Title level={3} className='last-three-events-title'>
                            Last 3 Events Attended
                        </Typography.Title>
                        {/* TODO: uncomment this: */}
                        {/* <LastThreeEvents events={data?.result?.events ?? []} /> */}
                        <LastThreeEvents events={events} />
                    </Col>
                </Spin>
            </Card>
        </div>
    );
};

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

// Function to format the date
function formatDate(dateString) {
    if (dateString) {
        const dateParts = dateString.split('-');
        const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    return '';
}
export default ShowAttendeProfile;

function getContactLink(contactName) {
    switch (contactName) {
        case 'WhatsApp':
            return 'https://wa.me/';
        case 'Linkedin':
            return 'https://linkedin.com/';
        case 'Facebook':
            return 'https://facebook.com/';
        case 'Twitter':
            return 'https://twitter.com/';
        default:
            return '#';
    }
}

const getIconStyle = (contactName) => {
    switch (contactName) {
        case 'WhatsApp':
            return { color: '#25D366', fontSize: '24px' };
        case 'Instagram':
            return { color: '#E4405F', fontSize: '24px' };
        case 'LinkedIn':
            return { color: '#0077B5', fontSize: '24px' };
        case 'Facebook':
            return { color: '#3b5998', fontSize: '24px' };
        case 'Twitter':
            return { color: '#1DA1F2', fontSize: '24px' };
        case 'Email':
            return { color: 'black', fontSize: '24px' };
        default:
            return { fontSize: '24px' };
    }
};
