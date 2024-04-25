import { ContainerOutlined, SolutionOutlined } from '@ant-design/icons';
import { Layout, Menu, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
const { Sider: AntDSider } = Layout;
import { useNavigate } from 'react-router-dom';

export default function Sider({ isSiderOpen, userMenu, userMenuIsLoading }) {
    const navigate = useNavigate();

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    const [items, setItems] = useState([]);

    const handleMenuClick = (item) => {
        navigate(item.key);
    };

    useEffect(() => {
        if (userMenu) {
            const formattedMenuItems = [];

            userMenu?.forEach((item) => {
                if (item.sub_menu) {
                    const children = item.sub_menu.map((subItem) => {
                        return getItem(subItem.name, subItem.url, subItem.icon, null);
                    });
                    formattedMenuItems.push(getItem(item.name, item.url, item.icon, children));
                } else {
                    formattedMenuItems.push(getItem(item.name, item.url, item.icon, null));
                }
            });

            setItems(formattedMenuItems);
        }
    }, [userMenu]);

    return (
        <AntDSider collapsedWidth="0" trigger={null} collapsed={!isSiderOpen} className="h-[90vh] overflow-y-auto">
            <Spin spinning={userMenuIsLoading}>
                <Menu mode="inline" items={items} onClick={handleMenuClick} className="min-h-[90vh]" />
            </Spin>
        </AntDSider>
    );
}
