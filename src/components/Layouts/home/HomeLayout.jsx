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
        token: { colorPrimary: '#4E6C50' },
        components: { Layout: { headerBg: '#395144' } },
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

            <Layout
                className='h-[100svh]'
                style={{ scrollbarWidth: 0 }}
                hidden={hideContent}
            >
                <HomeHeader />

                <Layout>
                    <Content
                        className='h-[84svh] md:h-[92svh] overflow-y-scroll scrollbar-hide'
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
