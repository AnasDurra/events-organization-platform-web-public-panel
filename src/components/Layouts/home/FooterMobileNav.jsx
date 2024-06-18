import {
    ExperimentFilled,
    ExperimentOutlined,
    FireFilled,
    FireOutlined,
    HomeFilled,
    HomeOutlined,
} from '@ant-design/icons';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { GoNorthStar } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

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


export default function FooterMobileNav() {
    const { token } = useToken();
    const navigate = useNavigate();

    const [navIndex, setNavIndex] = useState(0);

    const handleNavigationClick = (index) => {
        index--;
        console.log(index)
        setNavIndex(index);
        navigate(navigationItems[index].path);
    };
    return (
        <Footer
            className='h-[8svh] p-0 md:hidden'
            style={{ backgroundColor: token?.colorPrimary }}
        >
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
                <BottomNavigationAction
                    label='Profile'
                    style={{ color: 'white' }}
                    icon={
                        <img
                            className='w-[2em] aspect-square rounded-full'
                            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                            alt='Profile'
                        />
                    }
                />
            </BottomNavigation>
        </Footer>
    );
}
