import { Button, Dropdown, Menu, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const DropdownSider = ({ menu }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const handleVisibleChange = (flag) => {
        setIsDropdownVisible(flag);
    };

    const menuItems = (
        <Menu
            style={{
                minWidth: '250px',
                padding: '8px',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                background: '#ffffff',
            }}
        >
            {menu.map((item) => (
                <Menu.Item
                    key={item.id}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s',
                        color: '#333333',
                    }}
                    onClick={() => {
                        setIsDropdownVisible(false);
                    }}
                >
                    <Link to={item.url}>
                        <Space size={15}>
                            {item.icon && <Icon icon={`${item.icon}`} style={{ fontSize: '20px' }} />}
                            <span style={{ fontWeight: '600', color: '#333333' }}>{item.name}</span>
                        </Space>
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <>
            <Dropdown
                arrow
                overlay={menuItems}
                trigger={['click']}
                visible={isDropdownVisible}
                onVisibleChange={handleVisibleChange}
            >
                <Button
                    type='text'
                    // className='bg-blue-500 md:bg-red-500'
                    style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
                    icon={
                        <Icon
                            icon='line-md:menu-unfold-right'
                            style={{
                                fontSize: '32px',
                                color: '#fff',
                            }}
                        />
                    }
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.2)';
                        e.target.style.color = '#40a9ff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.color = '#fff';
                    }}
                />
            </Dropdown>
        </>
    );
};

export default DropdownSider;
