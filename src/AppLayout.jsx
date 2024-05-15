import { Grid, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { isLargerThanLG } from './utils/antd.utils';
import Sider from './components/Sider';

import { useUserMenuQuery } from './api/services/auth';

export default function AppLayout() {
    const screens = Grid.useBreakpoint();

    const [isLargerThanLGScreen, setIsLargerThanLGScreen] = useState(isLargerThanLG(screens));
    const [isSiderOpen, setIsSiderOpen] = useState(true);

    const { data: userMenu2, isLoading: userMenuIsLoading } = useUserMenuQuery();

    const userMenu = {
        status: true,
        path: '/api/user/menu',
        statusCode: 200,
        result: {
            id: '3',
            role_name: 'Attendee',
            menu: [
                {
                    id: '1',
                    name: 'New Feed',
                    url: '/feed',
                    icon: null,
                },
                {
                    id: '2',
                    name: 'Events',
                    url: '/attendee-events',
                    icon: null,
                    sub_menu: [
                        {
                            id: '4',
                            name: 'Popular',
                            url: '/attendee-events/popular',
                            icon: null,
                        },
                        {
                            id: '5',
                            name: 'Near',
                            url: '/attendee-events/near',
                            icon: null,
                        },
                    ],
                },
            ],
        },
    };

    useEffect(() => {
        setIsSiderOpen(isLargerThanLGScreen);
    }, [isLargerThanLGScreen]);

    useEffect(() => {
        setIsLargerThanLGScreen(isLargerThanLG(screens));
    }, [screens]);

    useEffect(() => {
        console.log(userMenu);
    }, [userMenu]);

    return (
        <Layout>
            <Header
                onTriggerSiderIconClicked={() => {
                    setIsSiderOpen(!isSiderOpen);
                }}
            />
            <Layout>
                <Sider
                    isSiderOpen={isSiderOpen}
                    userMenu={userMenu?.result?.menu}
                    userMenuIsLoading={userMenuIsLoading}
                />
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
            <Footer />
        </Layout>
    );
}

const contentStyle = {
    padding: '1% 5%',
    backgroundColor: '#fdfdfd',
    minHeight: '82vh',
};
