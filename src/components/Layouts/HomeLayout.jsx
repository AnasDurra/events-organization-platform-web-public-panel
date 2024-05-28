import {
    CalendarOutlined,
    DownOutlined,
    ExperimentFilled,
    ExperimentOutlined,
    FireFilled,
    FireOutlined,
    HomeFilled,
    HomeOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Badge, Button, Col, ConfigProvider, Dropdown, Layout, Menu, Row, Spin, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getLoggedInUserV2, useCheckAccessTokenQuery } from '../../api/services/auth';
import { useGetAttendeeBalanceQuery } from '../../features/Ticketing Packages/TicketingPackagesSlice';
import './Landing.css';
import TicketsCard from '../../features/landing/TicketsCard';
import { IoCreateSharp } from 'react-icons/io5';
import { GoNorthStar } from 'react-icons/go';

import { chatSocket, joinChannel, setChatSocketHeader } from '../../chatSocket';
import Cookies from 'js-cookie';
import { useJoinedGroupsQuery } from '../../api/services/chats';

const navigationItems = [
    {
        label: 'Home',
        filledIcon: <HomeFilled />,
        outlinedIcon: <HomeOutlined />,
        path: '/home',
    },
    {
        label: 'Following',
        filledIcon: <GoNorthStar className=' text-[1.2em]' />,
        outlinedIcon: <GoNorthStar className=' text-[1.2em]' />,
        path: '/home/following',
    },
    {
        label: 'Popular',
        filledIcon: <FireFilled className='text-red-300 text-[1.2em]' />,
        outlinedIcon: <FireFilled className='text-red-300 text-[1.2em]' />,
        path: '/home/popular',
        fire: true,
    },
    {
        label: 'Explore',
        filledIcon: <ExperimentFilled />,
        outlinedIcon: <ExperimentOutlined />,
        path: '/home/explore',
    },
];

export default function HomeLayout({ roles }) {
    const navigate = useNavigate();
    const [navIndex, setNavIndex] = useState(0);
    const [hideContent, setHideContent] = useState(true);

    const theme = {
        token: {
            colorPrimary: '#116466',
        },
        components: {
            Layout: {
                headerBg: '#116466',
            },
        },
        cssVar: true,
    };

    const {
        data: checkAccessTokenObj,
        isLoading: isAccessTokenLoading,
        error: checkAccessTokenError,
    } = useCheckAccessTokenQuery();

    const { data: { result: balance } = { result: {} }, isLoading: isBalanceLoading } = useGetAttendeeBalanceQuery(
        getLoggedInUserV2()?.attendee_id
    );
    const { data: { result: joinedGroups } = { result: [] }, isLoading: isJoinedGroupsLoading } =
        useJoinedGroupsQuery();

    const menu = (
        <Menu style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: '180px' }}>
            <Menu.Item
                key='profile'
                style={{
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'background-color 0.3s',
                }}
                onClick={() => {
                    navigate('profile');
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <UserOutlined style={{ marginRight: '8px' }} /> My Profile
                </span>
            </Menu.Item>

            <Menu.Item
                key='events'
                style={{
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'background-color 0.3s',
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarOutlined style={{ marginRight: '8px' }} /> My Events
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
                    transition: 'background-color 0.3s',
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <LogoutOutlined style={{ marginRight: '8px' }} /> Logout
                </span>
            </Menu.Item>
        </Menu>
    );

    const handleNavigationClick = (index) => {
        setNavIndex(index);
        navigate(navigationItems[index].path);
    };

    const getNavIndexByPath = (path) => {
        const item = navigationItems.find((item) => item.path == path);
        return item ? navigationItems.indexOf(item) : 0;
    };
    const user = getLoggedInUserV2();

    useEffect(() => {
        // console.log(checkAccessTokenObj);
        if (checkAccessTokenObj?.result) {
            if (!roles?.includes(checkAccessTokenObj?.result?.user_role?.id)) {
                navigate('/not-found');
            } else {
                setHideContent(false);
            }
        }
    }, [checkAccessTokenObj, roles]);

    useEffect(() => {
        if (checkAccessTokenError) {
            navigate('/login');
        }
    }, [checkAccessTokenError]);

    // start here
    const authToken = Cookies.get('accessToken');
    useEffect(() => {
        function onGroupsJoined(group) {
            joinChannel(group.channel);
            console.log('joined group !!', group);
        }

        function chatRecieved(message) {
            console.log(message);
        }

        if (authToken) {
            console.log(authToken);
            setChatSocketHeader(authToken);
        }

        chatSocket.on('group-joined', onGroupsJoined);
        chatSocket.on('notification-received', chatRecieved);

        return () => {
            chatSocket.off('group-joined', onGroupsJoined);
        };
    }, [authToken]);

    useEffect(() => {
        console.log('layout', joinedGroups);

        joinedGroups?.map((group) => {
            const { channel } = group;
            joinChannel(channel);
        });
    }, [joinedGroups]);

    return (
        <ConfigProvider theme={theme}>
            {isAccessTokenLoading && (
                <Spin
                    size='large'
                    spinning={isAccessTokenLoading}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                />
            )}

            <Layout className='h-[100svh]' hidden={hideContent}>
                <Header className='h-[8svh] px-2'>
                    <Row justify={'space-between'} className='h-full px-2'>
                        <Col xs={{ span: 8 }} className='h-full flex items-center'>
                            {' '}
                            <Title style={{ margin: 0, color: 'whitesmoke' }} level={3} className='font-serif'>
                                Eventure
                            </Title>
                        </Col>
                        <Col xs={{ span: 16 }} className='h-full pr-2'>
                            <div className='w-full flex  mx-2 h-full items-center justify-end'>
                                <div
                                    onClick={() => navigate('tickets')}
                                    className='flex items-center mr-2 space-x-2 px-2 bg-gray-400 shadow-sm shadow-gray-300 rounded-3xl h-[4svh] shadow-lg hover:shadow-sm hover:cursor-pointer overflow-hidden'
                                    style={{ transition: 'transform 0.3s', overflow: 'hidden' }}
                                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                                >
                                    <TicketsCard ticketsCount={balance?.balance} />
                                </div>

                                <Badge count={5} size='small'>
                                    <Button
                                        type='text'
                                        classNames={{ icon: 'text-2xl text-white' }}
                                        icon={<IoMdNotificationsOutline />}
                                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
                                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                                    />
                                </Badge>
                                <Dropdown
                                    arrow
                                    overlay={menu}
                                    placement='bottomLeft'
                                    //  trigger={['click']}
                                >
                                    <Link onClick={(e) => e.preventDefault()}>
                                        {/* The image */}
                                        <img
                                            className='w-[2.5em] aspect-square rounded-full hidden md:block md:ml-4'
                                            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                                            alt='Profile'
                                            style={{ transition: 'transform 0.3s', padding: '1px' }}
                                            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                                            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                                        />
                                    </Link>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    {/* <Sider
                        theme='light'
                        className='hidden md:block'
                        style={{ backgroundColor: 'whitesmoke' }}
                        width={'20%'}
                    >
                        <div className='flex flex-col h-full mt-4 p-4 space-y-2'>
                            {navigationItems.map((item, index) => (
                                <SiderNavigationItem
                                    key={uuidv4()}
                                    item={item}
                                    isActive={navIndex == index}
                                    onClick={() => handleNavigationClick(index)}
                                    label={item.label}
                                    filledIcon={item.filledIcon}
                                    outLinedIcon={item.outlinedIcon}
                                    fire={item.fire}
                                />
                            ))}
                        </div>
                    </Sider> */}

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

                <Footer className={`h-[8svh] p-0 md:hidden`} style={{ backgroundColor: theme.token.colorPrimary }}>
                    <BottomNavigation
                        showLabels
                        value={navIndex}
                        onChange={(event, newValue) => {
                            setNavIndex(newValue);
                        }}
                        style={{ height: '100%', backgroundColor: theme.token.colorPrimary }}
                    >
                        <BottomNavigationAction
                            label={<div className='mt-[0.8em]'>Home</div>}
                            style={{ color: 'white' }}
                            icon={
                                navIndex == 0 ? (
                                    <HomeFilled className='text-[1.2em]' />
                                ) : (
                                    <HomeOutlined className='text-[1.2em]' />
                                )
                            }
                        />
                        <BottomNavigationAction
                            label={
                                navIndex == 1 ? (
                                    <div className='mt-[0.8em]  text-red-500'>Popular</div>
                                ) : (
                                    <div className='mt-[0.8em] '>Popular</div>
                                )
                            }
                            style={{ color: 'white ' }}
                            icon={
                                navIndex == 1 ? (
                                    <FireFilled className='text-[1.2em]  text-red-300' />
                                ) : (
                                    <FireOutlined className='text-[1.2em]' />
                                )
                            }
                        />

                        <BottomNavigationAction
                            label={<div className='mt-[0.8em]'>Explore</div>}
                            style={{ color: 'white ' }}
                            icon={
                                navIndex == 2 ? (
                                    <ExperimentFilled className='text-[1.2em] ' />
                                ) : (
                                    <ExperimentOutlined className='text-[1.2em]' />
                                )
                            }
                        />

                        <BottomNavigationAction
                            label='profile'
                            style={{ color: 'white ' }}
                            icon={
                                <img
                                    className='w-[2em] aspect-square rounded-full'
                                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                                />
                            }
                        />
                    </BottomNavigation>
                </Footer>
            </Layout>
        </ConfigProvider>
    );
}

function SiderNavigationItem({ label, outLinedIcon, filledIcon, isActive, onClick, fire }) {
    return (
        <div
            className={`rounded-lg flex space-x-2 p-4 bg-[#00474f]/0 hover:bg-[#00474f]/30 hover:cursor-pointer ${
                isActive ? 'bg-[#00474f]/30 ' : null
            }
            ${fire ? '  hover:bg-red-300/30' : null}
            `}
            onClick={onClick}
        >
            {isActive ? filledIcon : outLinedIcon}
            <span className='text-lg'>{label}</span>
        </div>
    );
}

function BottomNavigationItem({ label, outLinedIcon, filledIcon, isActive, id }) {
    return (
        <BottomNavigationAction
            label={<div className='mt-2'>{label}</div>}
            style={{ color: 'white' }}
            icon={isActive ? filledIcon : outLinedIcon}
            value={id}
        />
    );
}
