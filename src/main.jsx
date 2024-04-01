import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/index.jsx';
import { store } from './store.js';

const theme = {
    token: {
        colorPrimary: '#00474f',
    },
    components: {
        Layout: {
            headerBg: '#00474f',
        },
    },
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ConfigProvider theme={theme}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </Provider>
);
