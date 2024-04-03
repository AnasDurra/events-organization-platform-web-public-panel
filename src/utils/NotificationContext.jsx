// NotificationContext.js
import { notification } from 'antd';
import React, { createContext, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    return (
        <NotificationContext.Provider value={{ api, contextHolder }}>
            {children} {contextHolder}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
