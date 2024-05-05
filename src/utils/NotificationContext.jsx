// NotificationContext.js
import { notification } from 'antd';
import React, { createContext, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, message, description, placement = 'topLeft') => {
        const style = {
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff',
            color: '#333',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        };

        const config = {
            message: message,
            description: description ?? null,
            placement: placement,
            duration: 4, // Adjust as needed
        };

        switch (type) {
            case 'success':
                notification.success({ ...config, style });
                break;
            case 'info':
                notification.info({ ...config, style });
                break;
            case 'warning':
                notification.warning({ ...config, style });
                break;
            case 'error':
                notification.error({ ...config, style });
                break;
            default:
                notification.open({ ...config, style });
        }
    };

    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {children} {contextHolder}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
