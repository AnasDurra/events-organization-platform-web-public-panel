import { Button, Image, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
const { Sider: AntDSider } = Layout;

import './menuStyles.css';

export default function Sider({ isSiderOpen, userMenu, userMenuIsLoading }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKey, setSelectedKey] = useState('/org/our-events');

    const [collapsed, setCollapsed] = useState(false);

    const [items, setItems] = useState([]);

    const handleMenuClick = (item) => {
        navigate(item.key);
    };

    useEffect(() => {
        if (userMenu) {
            const formattedMenuItems = userMenu.map((item) => {
                const itemIcon = (
                    <Icon
                        icon={`${item.icon}`}
                        style={{ fontSize: '24px', marginRight: '5px', color: '#2B3856' }}
                    ></Icon>
                );
                if (item.sub_menu) {
                    const children = item.sub_menu.map((subItem) => {
                        return getItem(
                            subItem.name,
                            subItem.url,
                            <Icon
                                icon={`${subItem.icon}`}
                                style={{ fontSize: '24px', marginRight: '5px', color: '#2B3856' }}
                            ></Icon>,
                            null
                        );
                    });
                    return getItem(item.name, item.url, itemIcon, children);
                } else {
                    return getItem(item.name, item.url, itemIcon, null);
                }
            });

            setItems(formattedMenuItems);
        }
    }, [userMenu]);

    useEffect(() => {
        const currentPath = location.pathname;
        setSelectedKey(currentPath);
    }, [location.pathname]);
    return (
        <AntDSider
            style={{
                overflow: 'auto',
                height: '100vh',
                backgroundColor: 'transparent',
            }}
            collapsible={isSiderOpen}
            defaultCollapsed={!isSiderOpen}
            collapsed={!isSiderOpen ? true : collapsed}
            onCollapse={() => {
                setCollapsed(!collapsed);
            }}
            className='hidden md:block'
        >
            <Menu
                mode='inline'
                items={items}
                onClick={handleMenuClick}
                selectedKeys={[selectedKey]}
                style={{ backgroundColor: 'transparent', height: '100vh' }}
                className='custom-menu'
            />
        </AntDSider>
    );
}

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
