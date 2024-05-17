import { ConfigProvider } from 'antd';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/index.jsx';
import { store } from './store.js';
import { NotificationProvider } from './utils/NotificationContext.jsx';
import { getLoggedInUserV2 } from './api/services/auth.js';

const user = getLoggedInUserV2();
const theme = {
    token: {
        colorPrimary: user?.user_role == 2 ? '#022140' : '#00474f',
    },
    components: {
        Layout: {
            headerBg: user?.user_role == 2 ? '#265077' : '#00474f',
        },
    },
    cssVar: true,
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ConfigProvider theme={theme}>
            <NotificationProvider>
                <RouterProvider router={router} />
            </NotificationProvider>
        </ConfigProvider>
    </Provider>
);
