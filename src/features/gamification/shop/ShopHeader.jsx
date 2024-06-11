import React from 'react';

export default function ShopHeader() {
    return (
        <div className='flex justify-between items-center text-lg '>
            <div className='text-2xl'>Shop</div>
            <div className='flex space-x-2 items-center justify-center'>
                <div className='font-mono'>Your balance: 1500</div>
                <img
                    className='w-[2em]'
                    src='../assets/points-rp.svg'
                ></img>
            </div>
        </div>
    );
}
