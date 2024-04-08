import React from 'react';
import { Layout, Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const { Sider: AntDSider } = Layout;

const Sider = ({ isSiderOpen }) => {
    const siderMenuStyle = {
        height: '100%',
    };

    const items = [
        {
            key: 'sub1',
            icon: <UserOutlined />,
            label: 'subnav 1',
            children: Array.from({ length: 4 }, (_, j) => ({
                key: `option${j + 1}`,
                label: `option ${j + 1}`,
            })),
        },
        {
            key: 'sub2',
            icon: <LaptopOutlined />,
            label: 'subnav 2',
            children: Array.from({ length: 4 }, (_, j) => ({
                key: `option${j + 5}`,
                label: `option ${j + 5}`,
            })),
        },
        {
            key: 'sub3',
            icon: <NotificationOutlined />,
            label: 'subnav 3',
            children: Array.from({ length: 4 }, (_, j) => ({
                key: `option${j + 9}`,
                label: `option ${j + 9}`,
            })),
        },
    ];

    return (
        <AntDSider collapsedWidth="0" trigger={null} collapsed={!isSiderOpen}>
            <Menu mode="inline" style={siderMenuStyle} defaultSelectedKeys={['option1']}>
                {items.map((item) => (
                    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                        {item.children.map((child) => (
                            <Menu.Item key={child.key}>{child.label}</Menu.Item>
                        ))}
                    </Menu.SubMenu>
                ))}
            </Menu>
        </AntDSider>
    );
};

export default Sider;
