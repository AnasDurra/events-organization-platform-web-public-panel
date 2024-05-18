import { Button, Image, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
const { Sider: AntDSider } = Layout;

import './menuStyles.css';

export default function Sider({ isSiderOpen, setIsSiderOpen, userMenu, userMenuIsLoading }) {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const [items, setItems] = useState([]);

    const handleMenuClick = (item) => {
        navigate(item.key);
    };

    useEffect(() => {
        if (userMenu) {
            const formattedMenuItems = userMenu.map((item) => {
                if (item.sub_menu) {
                    const children = item.sub_menu.map((subItem) => {
                        return getItem(subItem.name, subItem.url, null, null);
                    });
                    return getItem(item.name, item.url, null, children);
                } else {
                    return getItem(
                        item.name,
                        item.url,
                        <Icon
                            icon={`${item.icon}`}
                            style={{ fontSize: '24px', marginRight: '5px', color: '#2B3856' }}
                        ></Icon>,

                        null
                    );
                }
            });

            setItems(formattedMenuItems);
        }
    }, [userMenu]);

    return (
        <AntDSider
            collapsedWidth={80}
            style={{ backgroundColor: 'transparent' }}
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
                defaultSelectedKeys={1}
                style={{ backgroundColor: 'transparent', height: '85vh' }}
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
