import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
const { Sider: AntDSider } = Layout;

export default function Sider({ isSiderOpen }) {
    return (
        <AntDSider collapsedWidth="0" trigger={null} collapsed={!isSiderOpen}>
            <Menu mode="inline" style={siderMenuStyle} items={items2} />
        </AntDSider>
    );
}

const siderMenuStyle = {
    height: "100%",
};

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    }
);
