import {
    CalendarOutlined,
    ExperimentFilled,
    ExperimentOutlined,
    FireFilled,
    FireOutlined,
    HomeFilled,
    HomeOutlined,
    LogoutOutlined,
    ShopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { GoNorthStar } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import TicketsCard from '../../../features/landing/TicketsCard';
import { Badge, Button, Divider, Dropdown, Layout, Menu, Space } from 'antd';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import { useGetAttendeeBalanceQuery } from '../../../features/Ticketing Packages/TicketingPackagesSlice';
import { SiGamejolt } from 'react-icons/si';
import { TiTick, TiTicket } from 'react-icons/ti';
import HomeHeaderPoints from './HomeHeaderPoints';

const navigationItems = [
    { label: 'Home', filledIcon: <HomeFilled />, outlinedIcon: <HomeOutlined />, path: '/home' },
    {
        label: 'Following',
        filledIcon: <GoNorthStar className='text-[1.2em]' />,
        outlinedIcon: <GoNorthStar className='text-[1.2em]' />,
        path: '/home/following',
    },
    {
        label: '🔥Trending',
        filledIcon: <FireFilled className='text-red-300 text-[1.2em]' />,
        outlinedIcon: <FireOutlined className='text-red-300 text-[1.2em]' />,
        path: '/home/popular',
    },
    { label: 'Explore', filledIcon: <ExperimentFilled />, outlinedIcon: <ExperimentOutlined />, path: '/home/explore' },
    {
        label: 'Shop',
        filledIcon: <ShopOutlined className='text-[1.2em]' />,
        outlinedIcon: <ShopOutlined className='text-[1.2em]' />,
        path: '/home/shop',
    },
];

export default function HomeHeader() {
    const navigate = useNavigate();

    
    const menu = (
        <Menu style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: '180px' }}>
            <Menu.Item
                key='profile'
                style={menuItemStyle}
                onClick={() => navigate('profile')}
            >
                <UserOutlined style={iconStyle} /> My Profile
            </Menu.Item>
            <Menu.Item
                key='events'
                style={menuItemStyle}
            >
                <CalendarOutlined style={iconStyle} /> My Events
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                key='logout'
                style={{ ...menuItemStyle, color: '#ff4d4f' }}
            >
                <LogoutOutlined style={iconStyle} /> Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout.Header className='h-[8svh] px-2'>
            <div className='flex justify-between items-center h-full w-full font-serif px-4 space-x-8'>
                <div
                    className='text-nowrap text-3xl  font-serif  hover:cursor-pointer text-primary'
                    onClick={() => navigate('/home')}
                >
                    Eventure
                </div>
                <div className='flex items-center gap-x-4 w-full justify-end  sm:justify-between w-full  '>
                    <div className=' items-center gap-x-4 hidden sm:flex'>
                        {navigationItems.map((item, index) => (
                            <div
                                key={index}
                                className='font-sans hover:cursor-pointer text-lg text-nowrap  hover:text-[#AA8B56]'
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                    <div className='flex items-center justify-end gap-x-2 w-full '>
                        <HomeHeaderPoints />
                        {/*  <div
                            onClick={() => navigate('tickets')}
                            className='flex items-center  border-2 bg-primary/10 border-primary shadow-sm rounded-3xl h-[4svh] px-2 hover:shadow-lg hover:cursor-pointer'
                            style={{ transition: 'transform 0.3s' }}
                            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            <TicketsCard ticketsCount={balance?.balance} />
                        </div> */}
                        <Badge
                            count={5}
                            size='small'
                        >
                            <Button
                                type='text'
                                icon={<IoMdNotificationsOutline className='text-2xl ' />}
                                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
                                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                            />
                        </Badge>
                        <Dropdown
                            overlay={menu}
                            placement='bottomLeft'
                            arrow
                        >
                            <Link onClick={(e) => e.preventDefault()}>
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
                </div>
            </div>
        </Layout.Header>
    );
}

const menuItemStyle = {
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
};

const iconStyle = { marginRight: '8px' };
