import { ConfigProvider } from 'antd';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/index.jsx';
import { store } from './store.js';
import { NotificationProvider } from './utils/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <NotificationProvider>
            <RouterProvider router={router} />
        </NotificationProvider>
    </Provider>
);
