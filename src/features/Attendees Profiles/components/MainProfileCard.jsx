import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Image, Menu, Modal, Space, Tooltip, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../utils/NotificationContext';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import ContactInfo from './ContactInfo';
import { Icon } from '@iconify/react/dist/iconify.js';

const MainProfileCard = ({
    id,
    full_name,
    bio,
    job,
    profile_img,
    contacts,
    address,
    join_date,
    blockMutation,
    unBlockMutation,
    isBlocked,
    fetchIsBlocked,
    setIsUpdateModalOpen,
}) => {
    const navigate = useNavigate();
    const { openNotification } = useNotification();
    const user = getLoggedInUserV2();
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
                        openNotification('success', `${full_name} has been blocked successfully`);
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
                        openNotification('success', `${full_name} has been unblocked successfully`);
                        fetchIsBlocked(id);
                    })
                    .catch((error) => {
                        openNotification('warning', error.data.message);
                        console.error('Error:', error);
                    });
            },
        });
    };

    return (
        <div style={{ width: '100%', maxWidth: 250 }}>
            <Card
                style={{
                    width: '100%',

                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.3s ease',
                    // position: 'relative',
                }}
                cover={
                    <div style={{ position: 'relative' }}>
                        <Image
                            style={{ minHeight: '20vh', objectFit: 'cover' }}
                            width={'100%'}
                            alt='example'
                            src={profile_img ?? 'https://picsum.photos/300/300'}
                        />
                        <div className='md:hidden absolute bottom-2.5 left-2.5 flex justify-end'>
                            <Space size={10} direction='vertical'>
                                <Typography.Title
                                    style={{
                                        ...coverImageStyle.text,
                                        ...coverImageStyle.title,
                                        fontSize: '20px',
                                    }}
                                    level={5}
                                >
                                    {full_name ?? ''}
                                </Typography.Title>
                                <Typography.Title
                                    style={{
                                        ...coverImageStyle.text,
                                        ...coverImageStyle.description,
                                        fontSize: '11px',
                                    }}
                                    level={5}
                                >
                                    {address?.label}
                                </Typography.Title>
                            </Space>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            {user?.user_id == id && (
                                <>
                                    <Space.Compact>
                                        <Tooltip title='Edit Your Profile'>
                                            <Button
                                                type='primary'
                                                icon={<EditOutlined />}
                                                onClick={() => setIsUpdateModalOpen(true)}
                                                // style={{ marginRight: 8 }}
                                            />
                                        </Tooltip>
                                        <Tooltip title='Show Your Events'>
                                            <Button
                                                type='primary'
                                                icon={<CalendarOutlined />}
                                                onClick={() => navigate(`/home/profile/events`)}
                                            />
                                        </Tooltip>
                                    </Space.Compact>
                                </>
                            )}

                            {user?.user_role == 2 && (
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Dropdown
                                        placement='bottomLeft'
                                        arrow
                                        //TODO replace this
                                        overlay={
                                            <Menu
                                                onClick={
                                                    isBlocked?.result ? confirmUnblockAttendee : confirmBlockAttendee
                                                }
                                            >
                                                <Menu.Item key='block' style={{ color: 'red' }}>
                                                    {isBlocked?.result ? 'Unblock Attendee' : 'Block Attendee'}
                                                </Menu.Item>
                                            </Menu>
                                        }
                                        trigger={['click']}
                                    >
                                        <Tooltip title='Block Attendee'>
                                            <Button
                                                type='text'
                                                icon={<Icon icon='tabler:dots' color='#fff' fontSize={'32px'} />}
                                                onClick={(e) => e.preventDefault()}
                                            />
                                        </Tooltip>
                                    </Dropdown>
                                </div>
                            )}
                        </div>
                    </div>
                }
            >
                <Meta title='About' description={bio ?? 'No bio found'} />
                <Meta style={{ marginTop: '2em' }} title='Job' description={job ?? 'No job found'} />

                <Meta style={{ marginTop: '2em' }} title='Contact' description={<ContactInfo contacts={contacts} />} />
                <Meta style={{ marginTop: '1em' }} title='Joined' description={formatDate(join_date)} />
            </Card>
        </div>
    );
};

export default MainProfileCard;

function formatDate(dateString) {
    if (dateString) {
        const dateParts = dateString.split('-');
        const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    return '';
}

const coverImageStyle = {
    container: {
        position: 'relative',
        display: 'inline-block',
    },
    overlay: {
        position: 'absolute',
        top: -4,
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
    },
    subtitle: {
        fontSize: '14px',
        marginBottom: '0px',
        marginTop: '10px',
    },
    description: {
        fontSize: '14px',
        marginTop: '0px',
    },
    link: {
        color: 'white',
        fontFamily: "'Roboto', sans-serif",
    },
};
