import {
    CalendarOutlined,
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
import { theme, Popover, Menu } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { GoNorthStar } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import HomeHeaderPoints from './HomeHeaderPoints';
import { CardGiftcardOutlined } from '@mui/icons-material';
import RedeemCodeModal from '../../../features/giftcards/RedeemCodeModal';
import { useLogoutMutation } from '../../../api/services/auth';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../../api/apiSlice';

const navigationItems = [
    { label: 'Home', filledIcon: <HomeFilled />, outlinedIcon: <HomeOutlined />, path: '/home' },
    {
        label: 'Following',
        filledIcon: <GoNorthStar className='text-[1.2em]' />,
        outlinedIcon: <GoNorthStar className='text-[1.2em]' />,
        path: '/home/following',
    },
    {
        label: 'Popular',
        filledIcon: <FireFilled className='text-red-300 text-[1.2em]' />,
        outlinedIcon: <FireOutlined className='text-red-300 text-[1.2em]' />,
        path: '/home/popular',
    },
    { label: 'Explore', filledIcon: <ExperimentFilled />, outlinedIcon: <ExperimentOutlined />, path: '/home/explore' },
];
const { useToken } = theme;

const ProfileDropdownContent = () => {
    const navigate = useNavigate();
    const [isRedeemCodeModalOpen, setIsRedeemCodeModalOpen] = useState(false);

    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    return (
        <Menu style={{ width: '100vw', padding: '0', borderRadius: '0' }}>
            <HomeHeaderPoints />

            <Menu.Item key='profile' onClick={() => navigate('/home/profile')}>
                <UserOutlined style={{ fontSize: '1.2rem' }} /> My Profile
            </Menu.Item>

            <Menu.Item key='redeem card' onClick={() => setIsRedeemCodeModalOpen(true)}>
                <CardGiftcardOutlined style={{ fontSize: '1.4rem' }} /> Redeem code
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                key='logout'
                onClick={() => {
                    logout().then((res) => {
                        dispatch(apiSlice.util.resetApiState());
                        navigate('/login');
                    });
                }}
            >
                <LogoutOutlined style={{ fontSize: '1.2rem' }} /> Logout
            </Menu.Item>

            <RedeemCodeModal isOpen={isRedeemCodeModalOpen} onClose={() => setIsRedeemCodeModalOpen(false)} />
        </Menu>
    );
};

export default function FooterMobileNav() {
    const { token } = useToken();
    const navigate = useNavigate();

    const [navIndex, setNavIndex] = useState(0);
    const [profileOpen, setProfileOpen] = useState(false);
    const user = getLoggedInUserV2();

    const handleNavigationClick = (index) => {
        index--;
        navigate(navigationItems[index]?.path);
    };

    const handleProfileClick = () => {
        setProfileOpen(!profileOpen);
    };

    return (
        <Footer className='h-[8svh] p-0 lg:hidden' style={{ backgroundColor: token?.colorPrimary }}>
            <BottomNavigation
                showLabels
                value={navIndex}
                onChange={(event, newValue) => handleNavigationClick(newValue)}
                style={{ height: '100%', backgroundColor: token?.colorPrimary }}
            >
                {console.log(token)}
                {navigationItems.map((item, index) => (
                    <BottomNavigationAction
                        key={index}
                        label={<div className='mt-[0.8em]'>{item.label}</div>}
                        style={{ color: 'white' }}
                        icon={navIndex === index ? item.filledIcon : item.outlinedIcon}
                    />
                ))}
                <Popover
                    content={<ProfileDropdownContent />}
                    trigger='click'
                    open={profileOpen}
                    onOpenChange={setProfileOpen}
                    placement='top'
                    overlayStyle={{ width: '100vw', padding: 0 }}
                >
                    <BottomNavigationAction
                        label='Profile'
                        style={{ color: 'white' }}
                        icon={
                            <img
                                onClick={handleProfileClick}
                                className='w-[2em] aspect-square rounded-full'
                                src={user?.profile_picture}
                                alt='Profile'
                            />
                        }
                    />
                </Popover>
            </BottomNavigation>
        </Footer>
    );
}
