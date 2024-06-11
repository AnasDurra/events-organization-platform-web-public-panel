import { Divider } from 'antd';
import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { TiTicket } from 'react-icons/ti';

export default function ShopTicketsCard({ tickets_value, rp_price, title, onAddToBag }) {
    return (
        <div className='min-h-[30svh]  rounded-3xl flex flex-col justify-between items-center w-full h-full shadow-xl border-4  border-primary'>
            <div className='text-lg text-pretty text-center'>{title}</div>
            <div className='flex justify-center items-center flex-col  text-yellow-600 h-full'>
                <TiTicket className='text-[5.5em]'></TiTicket>
                <div> {tickets_value}</div>
            </div>

            <div
                onClick={onAddToBag}
                className='min-h-[5svh] bg-primary text-white w-[80%]  rounded-3xl  flex justify-evenly items-center p-2 mb-2 x-4 hover:cursor-pointer hover:bg-secondary'
            >
                <div>{rp_price} RP</div>
                <Divider
                    type='vertical'
                    className='text-white'
                ></Divider>
                <div className='flex items-center gap-x-1'>
                    Add to bag
                    <FiShoppingBag />
                </div>
            </div>
        </div>
    );
}
