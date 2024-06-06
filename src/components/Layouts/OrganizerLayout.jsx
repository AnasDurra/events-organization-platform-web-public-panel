import {
    Badge,
    Button,
    Col,
    ConfigProvider,
    Divider,
    Dropdown,
    Grid,
    Layout,
    Menu,
    Modal,
    notification,
    Row,
    Spin,
    Typography,
} from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLargerThanLG } from '../../utils/antd.utils';
import Sider from '../Sider';
import { getLoggedInUserV2, useCheckAccessTokenQuery, useUserMenuQuery } from '../../api/services/auth';
import Title from 'antd/es/typography/Title';
import { BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import DropdownSider from '../DropdownSider';

import { useLogoutMutation } from '../../api/services/auth';

export default function OrganizerLayout({ roles }) {
    const screens = Grid.useBreakpoint();
    const [isLargerThanLGScreen, setIsLargerThanLGScreen] = useState(isLargerThanLG(screens));
    const user = getLoggedInUserV2();
    const [hideContent, setHideContent] = useState(true);

    const {
        data: checkAccessTokenObj,
        isLoading: isAccessTokenLoading,
        error: checkAccessTokenError,
    } = useCheckAccessTokenQuery();
    const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
    const [isSiderOpen, setIsSiderOpen] = useState(true);

    const navigate = useNavigate();

    const { data: userMenu2, isLoading: userMenuIsLoading } = useUserMenuQuery();

    const theme = {
        token: {
            colorPrimary: '#265077',
        },
        components: {
            Layout: {
                headerBg: '#265077',
            },
        },
        cssVar: true,
    };

    const userMenu = {
        status: true,
        path: '/api/user/menu',
        statusCode: 200,
        result: {
            id: '3',
            role_name: 'Organizer',
            menu: [
                {
                    id: '1',
                    name: 'Events',
                    url: '/org/our-events',
                    icon: 'twemoji:calendar',
                },
                {
                    id: '6',
                    name: 'Tickets',
                    url: '/org/tickets',
                    icon: 'typcn:ticket',
                },
                {
                    id: '2',
                    name: 'Employee',
                    url: '/org/members',
                    icon: 'fluent:people-team-add-24-filled',
                },
                {
                    id: '3',
                    name: 'Attendees',
                    url: '/org/attendees',
                    icon: 'ph:users-three-bold',
                },
                {
                    id: '4',
                    name: 'Forms',
                    url: '/org/forms',
                    icon: 'fluent:form-multiple-28-regular',
                },
                {
                    id: '5',
                    name: 'Blocklist',
                    url: '/org/blocklist',
                    icon: 'solar:user-block-bold',
                },

                // {
                //     id: '7',
                //     name: 'Forms',
                //     url: '/org/forms',
                //     icon: 'FormOutlined',
                //     sub_menu: [
                //         {
                //             id: '9',
                //             name: 'Popular',
                //             url: '/attendee-events/popular',
                //             icon: null,
                //         },
                //         {
                //             id: '10',
                //             name: 'Near',
                //             url: '/attendee-events/near',
                //             icon: null,
                //         },
                //     ],
                // },
            ],
        },
    };

    const handleLogout = () => {
        Modal.confirm({
            title: 'Are you sure you want to log out?',
            content: 'Logging out will end your current session.',
            okText: 'Yes, Logout',
            cancelText: 'Cancel',
            onOk: () => {
                logoutMutation()
                    .then((res) => {
                        console.log(res);
                        notification.success({
                            message: 'Logout Successful',
                            description: 'You have been logged out successfully.',
                        });
                        navigate('/login');
                    })
                    .catch((error) => {
                        notification.error({
                            message: 'Logout Failed',
                            description: error?.message || 'An error occurred during logout.',
                        });
                        console.error('Error:', error);
                    });
            },
        });
    };

    const menu = (
        <Menu
            style={{
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                width: '180px',
                overflow: 'hidden',
            }}
        >
            <Menu.Item
                key='profile'
                style={{
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'background-color 0.3s, color 0.3s',
                }}
                onClick={() => {
                    navigate(`/org/${user?.organization_id}`);
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <UserOutlined style={{ marginRight: '8px', fontSize: '18px' }} /> My Profile
                </span>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
                key='logout'
                style={{
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#ff4d4f',
                    transition: 'background-color 0.3s, color 0.3s',
                }}
                onClick={handleLogout}
            >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <LogoutOutlined style={{ marginRight: '8px', fontSize: '18px' }} /> Logout
                </span>
            </Menu.Item>
        </Menu>
    );

    const notifications = [
        { id: 1, message: 'New event created', timestamp: '1 min ago' },
        { id: 2, message: 'Event reminder: Tomorrow at 10 AM', timestamp: '2 hrs ago' },
        { id: 3, message: 'You have 5 pending invitations', timestamp: '3 hrs ago' },
    ];

    const notificationMenu = (
        <Menu style={{ minWidth: '300px', padding: '8px' }}>
            <Menu.ItemGroup title='New Notifications' />
            <Divider style={{ margin: '8px 0' }} />
            {notifications.map((notification) => (
                <Menu.Item key={notification.id} style={{ padding: '8px 16px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '4px 0',
                        }}
                    >
                        <div>
                            <BellOutlined style={{ color: '#40a9ff', marginRight: '8px' }} />
                            <Typography.Text style={{ paddingRight: '13px' }}>{notification.message}</Typography.Text>
                        </div>
                        <span style={{ fontSize: '12px', color: '#999' }}>{notification.timestamp}</span>
                    </div>
                </Menu.Item>
            ))}
            <Divider style={{ margin: '8px 0' }} />
            <Menu.Item style={{ textAlign: 'center' }}>
                <Button type='link' onClick={() => {}}>
                    View all notifications
                </Button>
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        setIsSiderOpen(isLargerThanLGScreen);
    }, [isLargerThanLGScreen]);

    useEffect(() => {
        setIsLargerThanLGScreen(isLargerThanLG(screens));
    }, [screens]);

    useEffect(() => {
        // console.log(checkAccessTokenObj);
        if (checkAccessTokenObj) {
            if (!roles?.includes(checkAccessTokenObj?.result?.user_role?.id)) {
                navigate('/not-found');
            } else {
                setHideContent(false);
            }
        }
    }, [checkAccessTokenObj, roles]);

    useEffect(() => {
        console.log(checkAccessTokenError);
        if (checkAccessTokenError) {
            navigate('/login');
        }
    }, [checkAccessTokenError]);

    return (
        <ConfigProvider theme={theme}>
            {/* <Spin
                size='large'
                spinning={isAccessTokenLoading || isLogoutLoading}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
            /> */}
            <Layout hidden={hideContent}>
                <Header className='h-[8svh] px-2'>
                    <Row justify={'space-between'} className='h-full px-2'>
                        <Col xs={{ span: 12 }} className='h-full flex items-center'>
                            <div className='md:hidden'>
                                <DropdownSider menu={userMenu.result.menu} />
                            </div>
                            <Title style={{ margin: 0, color: 'whitesmoke' }} level={3} className='font-serif'>
                                Eventure
                            </Title>
                        </Col>
                        <Col xs={{ span: 12 }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'end',
                                    gap: '16px',
                                    width: '100%',
                                    height: '100%',
                                    // paddingRight: '8px',
                                }}
                            >
                                <Button
                                    type='text'
                                    onClick={() => navigate('event/create')}
                                    style={{ transition: 'transform 0.3s' }}
                                    icon={
                                        <Icon
                                            icon='fluent:calendar-add-28-filled'
                                            style={{
                                                fontSize: '24px',
                                                color: '#fff',
                                                transition: 'transform 0.3s, color 0.3s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'scale(1.2)';
                                                e.target.style.color = '#40a9ff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'scale(1)';
                                                e.target.style.color = '#fff';
                                            }}
                                        />
                                    }
                                />
                                <Badge count={5} size='small'>
                                    <Dropdown arrow overlay={notificationMenu} trigger={['click']}>
                                        <Badge count={notifications.length} size='small'>
                                            <Button
                                                type='text'
                                                style={{ transition: 'transform 0.3s' }}
                                                icon={
                                                    <Icon
                                                        icon='clarity:notification-solid'
                                                        style={{
                                                            fontSize: '24px',
                                                            color: '#fff',
                                                            transition: 'transform 0.3s, color 0.3s',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.transform = 'scale(1.2)';
                                                            e.target.style.color = '#40a9ff';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.transform = 'scale(1)';
                                                            e.target.style.color = '#fff';
                                                        }}
                                                    />
                                                }
                                            />
                                        </Badge>
                                    </Dropdown>
                                </Badge>
                                <Dropdown arrow overlay={menu} placement='bottomLeft'>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <img
                                            src='https://randomuser.me/api/portraits/men/3.jpg'
                                            alt='Profile'
                                            style={{
                                                width: '3em',
                                                aspectRatio: '1',
                                                borderRadius: '50%',
                                                transition: 'transform 0.3s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'scale(1.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                        />
                                    </a>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Header>

                <Layout>
                    <Sider
                        isSiderOpen={isSiderOpen}
                        setIsSiderOpen={setIsSiderOpen}
                        userMenu={userMenu?.result?.menu}
                        userMenuIsLoading={userMenuIsLoading}
                    />
                    <div className='lg:grid lg:grid-cols-9 w-full'>
                        <Content
                            className='lg:col-span-9 lg:col-start-1 h-[84svh] lg:h-[92svh] overflow-y-scroll scrollbar-hide
                    p-2 sm:p-6 md:p-8 lg:p-12 xl:p-14'
                            style={{ scrollbarWidth: 'none' }}
                        >
                            <Outlet />
                        </Content>
                    </div>
                </Layout>
                {/* <Footer style={{ backgroundColor: '#265077', color: '#fff', padding: '1.5rem 0', textAlign: 'center' }}>
                <Typography.Text strong style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>
                    © 2024 Abdo Organization. All rights reserved.
                </Typography.Text>
                <div>
                    <a href='#' style={{ color: '#fff', margin: '0 1rem', fontSize: '1rem', textDecoration: 'none' }}>
                        Terms of Service
                    </a>
                    <a href='#' style={{ color: '#fff', margin: '0 1rem', fontSize: '1rem', textDecoration: 'none' }}>
                        Privacy Policy
                    </a>
                    <a href='#' style={{ color: '#fff', margin: '0 1rem', fontSize: '1rem', textDecoration: 'none' }}>
                        Contact Us
                    </a>
                </div>
            </Footer> */}
            </Layout>
        </ConfigProvider>
    );
}

const contentStyle = {
    padding: '1% 5%',
    backgroundColor: '#fdfdfd',
    minHeight: '82vh',
};
