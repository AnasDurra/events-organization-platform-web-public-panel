import { Menu } from 'antd';
import React from 'react';
import { CgPushChevronUpR } from 'react-icons/cg';
import { GiHummingbird } from 'react-icons/gi';
import { MdCardGiftcard } from 'react-icons/md';
import { TiTicket } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const items = [
    {
        type: 'group',
        label: <div className='text-center text-lg'>Categories</div>,
    },
    {
        key: 'tickets',
        label: (
            <div className='flex w-full h-full  justify-between items-center text-lg'>
                <div>Tickets</div>

                <TiTicket className='text-xl'></TiTicket>
            </div>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'discount',
        label: (
            <div className='flex w-full h-full  justify-between items-center text-lg'>
                <div>Discount cards</div>

                <MdCardGiftcard className='text-xl'></MdCardGiftcard>
            </div>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'form',
        label: (
            <div className='flex w-full h-full  justify-between items-center text-lg'>
                <div>Form booster</div>

                <CgPushChevronUpR className='text-xl'></CgPushChevronUpR>
            </div>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'early',
        label: (
            <div className='flex w-full h-full  justify-between items-center text-lg'>
                <div>Early access</div>

                <GiHummingbird className='text-xl'></GiHummingbird>
            </div>
        ),
    },
];

export default function CategoriesMenu() {
    const navigate = useNavigate();
    const onClick = (e) => {
        if (e.key == 'tickets') navigate('/home/shop');
    };
    return (
        <Menu
            onClick={onClick}
            defaultSelectedKeys={['tickets']}
            mode='inline'
            items={items}
            className=' rounded-lg h-fit shadow-lg  '
        />
    );
}
