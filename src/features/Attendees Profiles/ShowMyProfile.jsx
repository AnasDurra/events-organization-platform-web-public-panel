import { useEffect, useState } from 'react';
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

import { useLazyViewMyProfileQuery } from '../../api/services/attendeeProfile';

import UpdateProfileModal from './UpdateProfileModal';

import { Link, useNavigate } from 'react-router-dom';

import { getLoggedInUser } from '../../api/services/auth';
import { useNotification } from '../../utils/NotificationContext';
import LastThreeEvents from './components/LastThreeEvents';

const ShowAttendeProfile = () => {
    const { openNotification } = useNotification();
    const navigate = useNavigate();

    const [fetchMyProfile, { data: myProfile, isLoading, isFetching: myProfileIsFetching }] =
        useLazyViewMyProfileQuery();

    const [data, setData] = useState(null);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateModalKey, setUpdateModalKey] = useState(0);

    const handleOk = () => {
        fetchMyProfile();
        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        setUpdateModalKey(updateModalKey + 1);
    };

    useEffect(() => {
        fetchMyProfile();
        setData(myProfile);
        console.log(myProfile);
    }, [myProfile]);

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
                style={{
                    width: '90%',
                }}
                bodyStyle={{ paddingTop: '0px', paddingRight: '10px' }}
                cover={
                    <div>
                        {data?.result?.cover_img ? (
                            <Image
                                width={'100%'}
                                style={{ height: '100%', minHeight: '25vh' }}
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
                <Spin size='large' spinning={isLoading || myProfileIsFetching}>
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
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Tooltip title='Edit Your Profile'>
                                            <Button
                                                icon={<EditOutlined />}
                                                onClick={() => setIsUpdateModalOpen(true)}
                                            />
                                        </Tooltip>
                                        <Tooltip title='Show Your Events'>
                                            <Button
                                                icon={<CalendarOutlined />}
                                                onClick={() => {
                                                    navigate(`/home/profile/events`);
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
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
                                                    to={'organizations'}
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
                                                <Link
                                                    to={'events'}
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
                                                        {' '}
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
                                                    </div>
                                                </Link>
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
                        <Col span={24} style={{ marginTop: '3em' }}>
                            <Typography.Title level={3} className='last-three-events-title'>
                                Last 3 Events Attended
                            </Typography.Title>
                            <LastThreeEvents events={events} />
                        </Col>
                    </Row>
                </Spin>
            </Card>

            <Modal
                title='Edit Profile'
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
                footer={null}
            >
                <UpdateProfileModal
                    destroyOnClose
                    key={updateModalKey}
                    data={data}
                    modalOk={handleOk}
                    modalCancel={handleCancel}
                />
            </Modal>
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
