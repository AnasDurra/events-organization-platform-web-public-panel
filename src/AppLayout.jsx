import { Grid, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { isLargerThanLG } from './utils/antd.utils';
import Sider from './components/Sider';

export default function AppLayout() {
    const screens = Grid.useBreakpoint();

    const [isLargerThanLGScreen, setIsLargerThanLGScreen] = useState(isLargerThanLG(screens));
    const [isSiderOpen, setIsSiderOpen] = useState(true);

    useEffect(() => {
        setIsSiderOpen(isLargerThanLGScreen);
    }, [isLargerThanLGScreen]);

    useEffect(() => {
        setIsLargerThanLGScreen(isLargerThanLG(screens));
    }, [screens]);

    return (
        <Layout>
            <Header
                onTriggerSiderIconClicked={() => {
                    setIsSiderOpen(!isSiderOpen);
                }}
            />
            <Layout>
                <Sider isSiderOpen={isSiderOpen} />
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
