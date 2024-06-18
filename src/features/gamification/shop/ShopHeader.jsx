import React from 'react';
import { useGetAttendeeBalanceQuery } from '../../Ticketing Packages/TicketingPackagesSlice';
import { getLoggedInUserV2 } from '../../../api/services/auth';

export default function ShopHeader({ rp_value }) {
    return (
        <div className='flex justify-between items-center text-lg space-x-4 flex-col sm:flex '>
            <div className='text-3xl text-primary font-[bangers]'>Shop</div>
            <div className='flex space-x-2 items-center justify-center'>
                <div className='font-mono'>Your balance: {rp_value}</div>
                <img
                    className='w-[2em]'
                    src='../assets/points-rp.svg'
                ></img>
            </div>
        </div>
    );
}
