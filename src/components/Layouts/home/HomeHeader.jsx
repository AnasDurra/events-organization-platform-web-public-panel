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
import { CardGiftcardOutlined } from '@mui/icons-material';
import { Badge, Button, Dropdown, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { GoNorthStar } from 'react-icons/go';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLoggedInUserV2, useLogoutMutation } from '../../../api/services/auth';
import RedeemCodeModal from '../../../features/giftcards/RedeemCodeModal';
import HomeHeaderPoints from './HomeHeaderPoints';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../../api/apiSlice';

const navigationItems = [
    { label: 'Home', filledIcon: <HomeFilled />, outlinedIcon: <HomeOutlined />, path: '/home' },
    // { label: 'Chats', filledIcon: <MessageOutlined />, outlinedIcon: <HomeOutlined />, path: '/home/chats' },
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
    const dispatch = useDispatch();
    const location = useLocation();

    const [isRedeemCodeModalOpen, setIsRedeemCodeModalOpen] = useState(false);

    const [selectedHeaderItem, setSelectedHeaderItem] = useState(null);

    const [logout] = useLogoutMutation();

    const menu = (
        <Menu style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: '25svw' }}>
            <Menu.Item key='profile' style={menuItemStyle} onClick={() => navigate('/home/profile')}>
                <UserOutlined style={iconStyle} /> My Profile
            </Menu.Item>
            <Menu.Item key='events' style={menuItemStyle} onClick={() => navigate('/home/profile/events')}>
                <CalendarOutlined style={iconStyle} /> My Events
            </Menu.Item>

            <Menu.Divider />
            <Menu.Item key='redeem card' style={menuItemStyle} onClick={() => setIsRedeemCodeModalOpen(true)}>
                <CardGiftcardOutlined style={iconStyle} /> Redeem code
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                key='logout'
                style={{ ...menuItemStyle, color: '#ff4d4f' }}
                onClick={() => {
                    logout().then((res) => {
                        dispatch(apiSlice.util.resetApiState());
                        navigate('/login');
                    });
                }}
            >
                <LogoutOutlined style={iconStyle} /> Logout
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        const currentPath = location.pathname;

        const isValidPath = navigationItems.some((item) => item.path === currentPath);

        if (isValidPath) {
            setSelectedHeaderItem(currentPath);
            console.log(currentPath);
        } else {
            setSelectedHeaderItem(navigationItems[0].path);
        }
    }, [location.pathname]);

    return (
        <>
            <RedeemCodeModal isOpen={isRedeemCodeModalOpen} onClose={() => setIsRedeemCodeModalOpen(false)} />
            <Layout.Header className='h-[8svh] px-2 shadow-secondary shadow-2xl '>
                <div className='flex justify-between items-center h-full w-full font-serif px-4 space-x-8'>
                    <div
                        className='text-nowrap text-3xl  font-[bangers]  hover:cursor-pointer text-primary'
                        onClick={() => navigate('/home')}
                    >
                        WEEVENTS
                    </div>
                    <div className='flex items-center gap-x-4 w-full justify-end  sm:justify-between w-full   '>
                        <div className=' items-center gap-x-4 hidden lg:flex'>
                            {navigationItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`hover:cursor-pointer text-lg text-nowrap hover:text-bgSecondary ${
                                        selectedHeaderItem === item.path ? 'text-bgSecondary ' : ''
                                    }`}
                                    onClick={() => {
                                        navigate(item.path);
                                    }}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center justify-end gap-x-2 w-full '>
                            <div className='hidden lg:flex'>
                                <HomeHeaderPoints />
                            </div>
                            {/*  <div
                                onClick={() => navigate('tickets')}
                                className='flex items-center  border-2 bg-primary/10 border-primary shadow-sm rounded-3xl h-[4svh] px-2 hover:shadow-lg hover:cursor-pointer'
                                style={{ transition: 'transform 0.3s' }}
                                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                            >
                                <TicketsCard ticketsCount={balance?.balance} />
                            </div> */}
                            <Badge count={5} size='small'>
                                <Button
                                    type='text'
                                    icon={<IoMdNotificationsOutline className='text-2xl' />}
                                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
                                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                                />
                            </Badge>
                            <Button
                                type='text'
                                onClick={() => {
                                    navigate('/home/chats');
                                }}
                                icon={<Icon icon='ph:chats-circle-fill' style={{ fontSize: '24px' }} />}
                                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
                                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                            />
                            <Dropdown
                                className='hidden lg:flex'
                                overlay={menu}
                                placement='bottomLeft'
                                arrow
                                trigger={'click'}
                            >
                                <Link onClick={(e) => e.preventDefault()}>
                                    <img
                                        className='w-[3em] aspect-square rounded-full hidden lg:block md:ml-6'
                                        // src={user?.profile_picture}
                                        src={'https://avatar.iran.liara.run/public/8'}
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
        </>
    );
}

const menuItemStyle = {
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
};

const iconStyle = { marginRight: '8px' };
