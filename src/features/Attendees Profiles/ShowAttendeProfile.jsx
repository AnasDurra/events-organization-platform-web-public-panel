import { useEffect, useState } from 'react';
import {
    CheckOutlined,
    EditOutlined,
    EllipsisOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    MailOutlined,
    MobileOutlined,
    PhoneOutlined,
    StarFilled,
    TwitterOutlined,
    UserOutlined,
    WarningOutlined,
    ContactsOutlined,
    WhatsAppOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Dropdown,
    Grid,
    Image,
    Menu,
    Modal,
    Row,
    Skeleton,
    Space,
    Statistic,
    Tooltip,
    Typography,
} from 'antd';
const { Meta } = Card;

import { useLazyViewMyProfileQuery } from '../../api/services/attendeeProfile';
import { useLazyViewAttendeeProfileQuery } from '../../api/services/attendeeProfile';
import UpdateProfileModal from './UpdateProfileModal';

import { useNavigate, useParams } from 'react-router-dom';

const ShowAttendeProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [fetchMyProfile, { data: myProfile, isLoading: myProfileIsLoading }] = useLazyViewMyProfileQuery();
    const [fetchAttendeeProfile, { data: attendeeProfile, isLoading: attendeeProfileIsLoading }] =
        useLazyViewAttendeeProfileQuery(id);

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const handleOk = () => {
        !id ? fetchMyProfile() : fetchAttendeeProfile(id);
        setIsLoading(true);
        setData(null);
        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    useEffect(() => {
        if (!id) {
            fetchMyProfile();
            setData(myProfile);
            if (myProfile) {
                setIsLoading(myProfileIsLoading);
            }
        } else {
            fetchAttendeeProfile(id);
            if (attendeeProfile) {
                setData(attendeeProfile);
                setIsLoading(attendeeProfileIsLoading);
            }
        }
    }, [attendeeProfile, myProfile, id]);
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
                style={{
                    width: '90%',
                }}
                cover={<Image height={250} alt="example" src={data?.cover_img ?? 'https://picsum.photos/1000/300'} />}
                // actions={[
                //     <SettingOutlined key="setting" />,
                //     <EditOutlined key="edit" />,
                //     <EllipsisOutlined key="ellipsis" />,
                // ]}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton
                        loading={isLoading}
                        active
                        avatar
                        paragraph={{
                            rows: 1,
                            width: '90%',
                        }}
                    >
                        <Meta
                            avatar={
                                <Avatar
                                    size={100}
                                    icon={<UserOutlined />}
                                    src={'https://api.dicebear.com/7.x/miniavs/svg?seed=8'}
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: '10px',
                                        border: '3px solid white',
                                        borderRadius: '50%',
                                        marginTop: '-70px',
                                    }}
                                />
                            }
                            title={
                                <Typography.Title
                                    style={{
                                        marginTop: '0px',
                                        marginBottom: '0px',
                                    }}
                                    level={3}
                                >
                                    {data?.result?.full_name ? data.result?.full_name : ''}
                                </Typography.Title>
                            }
                            description={
                                data
                                    ? `Member since ${formatDate(data?.result.join_date)} * ${
                                          data?.result.address?.label
                                      }`
                                    : ''
                            }
                        />
                    </Skeleton>

                    {!id && (
                        <Row style={{ marginLeft: '10px' }}>
                            <Tooltip title="Edit Your Profile">
                                <Button icon={<EditOutlined />} onClick={() => setIsUpdateModalOpen(true)} />
                            </Tooltip>
                            <Tooltip title="Show Your Events">
                                <Button
                                    icon={<CalendarOutlined />}
                                    onClick={() => {
                                        navigate(`/attendee/my-profile/events`);
                                    }}
                                />
                            </Tooltip>
                        </Row>
                    )}
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
                                        <Typography.Text>{data?.result.job?.label ?? 'Does Not Work'}</Typography.Text>
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
                                                placement="bottomRight"
                                                overlay={
                                                    <Menu>
                                                        {data?.result.contacts?.map((contact) => (
                                                            <Menu.Item key={contact.id}>
                                                                <Tooltip title={contact.contact_name}>
                                                                    <a
                                                                        href={
                                                                            contact.contact_name === 'Phone Number'
                                                                                ? `tel:${contact.value}`
                                                                                : getContactLink(contact.contact_name)
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {contact.contact_name === 'WhatsApp' && (
                                                                            <WhatsAppOutlined
                                                                                style={{
                                                                                    fontSize: '24px',
                                                                                    color: '#25D366',
                                                                                }}
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
                                                                                style={{
                                                                                    fontSize: '24px',
                                                                                    color: '#3b5998',
                                                                                }}
                                                                            />
                                                                        )}
                                                                        {contact.contact_name === 'Twitter' && (
                                                                            <TwitterOutlined
                                                                                style={{
                                                                                    fontSize: '24px',
                                                                                    color: '#1DA1F2',
                                                                                }}
                                                                            />
                                                                        )}
                                                                        {contact.contact_name === 'Email' && (
                                                                            <MailOutlined
                                                                                style={{
                                                                                    fontSize: '24px',
                                                                                    color: 'black',
                                                                                }}
                                                                            />
                                                                        )}
                                                                        {contact.contact_name === 'Phone Number' && (
                                                                            <PhoneOutlined
                                                                                style={{ fontSize: '24px' }}
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
                                                <Tooltip title="Contact Info">
                                                    <Button
                                                        type="primary"
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
                            size="small"
                            type="inner"
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div>
                                    <Row gutter={20}>
                                        <Col style={{ padding: '0px' }} span={12}>
                                            <Statistic
                                                title={
                                                    <div
                                                    // style={{
                                                    //     display: "flex",
                                                    //     justifyContent: "center",
                                                    // }}
                                                    >
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
                                        </Col>
                                        <Col style={{ padding: '0px' }} span={12}>
                                            <Statistic
                                                title={
                                                    <div
                                                    // style={{
                                                    //     display: "flex",
                                                    //     justifyContent: "center",
                                                    // }}
                                                    >
                                                        <h3>Badges</h3>
                                                    </div>
                                                }
                                                value={' '}
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

                                    <Row gutter={20}>
                                        <Col style={{ padding: '0px' }} span={12}>
                                            <Statistic
                                                title={
                                                    <div
                                                    // style={{
                                                    //     display: "flex",
                                                    //     justifyContent: "center",
                                                    // }}
                                                    >
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

                                        <Col style={{ padding: '0px' }} span={12}>
                                            <Statistic
                                                title={
                                                    <div
                                                    // style={{
                                                    //     display: "flex",
                                                    //     justifyContent: "center",
                                                    // }}
                                                    >
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
            </Card>
            <Modal
                title="Edit Profile"
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
                footer={null}
            >
                <UpdateProfileModal data={data} modalOk={handleOk} modalCancel={handleCancel} />
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
