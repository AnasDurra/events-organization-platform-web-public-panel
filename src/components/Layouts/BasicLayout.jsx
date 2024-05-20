import { ConfigProvider } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const BasicLayout = () => {
    const theme = {
        token: {
            colorPrimary: '#022140',
        },
        components: {
            Layout: {
                headerBg: '#265077',
            },
        },
        cssVar: true,
    };
    return (
        <ConfigProvider theme={theme}>
            <Outlet />
        </ConfigProvider>
    );
};

export default BasicLayout;
