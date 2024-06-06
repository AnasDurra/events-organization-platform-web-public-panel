import { ConfigProvider, Layout, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCheckAccessTokenQuery } from '../../../api/services/auth';
import HomeHeader from './HomeHeader';
import '../Landing.css';

const HomeLayout = ({ roles }) => {
    const navigate = useNavigate();
    const [hideContent, setHideContent] = useState(true);

    const theme = {
        token: { colorPrimary: '#4E6C50', fontFamily: 'Roboto' },
        components: { Layout: { headerBg: lightenColor('#4E6C50', 70), bodyBg: '#F9F9F9' } },
        cssVar: true,
    };

    const {
        data: checkAccessTokenObj,
        isLoading: isAccessTokenLoading,
        error: checkAccessTokenError,
    } = useCheckAccessTokenQuery();

    useEffect(() => {
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

    return (
        <ConfigProvider theme={theme}>
            {isAccessTokenLoading && (
                <Spin
                    size='large'
                    spinning={isAccessTokenLoading}
                    className='flex w-full h-full justify-center items-center'
                />
            )}

            <Layout className='h-[100svh]' style={{ scrollbarWidth: 0 }} hidden={hideContent}>
                <HomeHeader />

                <Layout>
                    <Content
                        className='h-[84svh] md:h-[92svh] overflow-y-scroll scrollbar-hide '
                        style={{ scrollbarWidth: 'none' }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default HomeLayout;
function lightenColor(color, amount) {
    const colorValue = color.replace('#', '');
    const num = parseInt(colorValue, 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;
    const newColor = (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
        .toString(16)
        .slice(1);

    return `#${newColor}`;
}
