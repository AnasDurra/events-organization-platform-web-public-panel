import { ContainerOutlined, SolutionOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
const { Sider: AntDSider } = Layout;
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('forms', '/forms', <ContainerOutlined />),
    getItem('profile', '/org', <SolutionOutlined />),
    getItem('members', '/members', <SolutionOutlined />),
];

export default function Sider({ isSiderOpen }) {
    const navigate = useNavigate();

    const handleMenuClick = (item) => {
        navigate(item.key);
    };

    return (
        <AntDSider collapsedWidth="0" trigger={null} collapsed={!isSiderOpen} className="h-[90vh] overflow-y-auto">
            <Menu mode="inline" items={items} onClick={handleMenuClick} className="min-h-[90vh]" />
        </AntDSider>
    );
}
