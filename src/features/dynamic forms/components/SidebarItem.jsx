import Title from 'antd/es/typography/Title';
import React from 'react';

export default function SidebarItem({ title, Icon, isDragging }) {
    return (
        <div className='flex flex-col p-2 justify-center items-center'>
            {Icon}
            <Title level={5}>{title}</Title>
        </div>
    );
}
