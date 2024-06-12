import React from 'react';
import { TiTicket } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import { useGetAttendeePointsQuery, useGetAttendeeRPsQuery } from '../../../features/gamification/gamificationSlice';
import { useGetAttendeeBalanceQuery } from '../../../features/Ticketing Packages/TicketingPackagesSlice';

export default function HomeHeaderPoints() {
    const navigate = useNavigate();

    const { data: { result: balance } = { result: {} }, isLoading: isBalanceLoading } = useGetAttendeeBalanceQuery(
        getLoggedInUserV2().attendee_id
    );
    const { data: { result: platformPoints } = { result: {} }, isLoading: isPlatformPointsLoading } =
        useGetAttendeePointsQuery(getLoggedInUserV2().attendee_id);
    const { data: { result: pointsRp } = { result: {} }, isLoading: isPointRPloading } = useGetAttendeeRPsQuery(
        getLoggedInUserV2().attendee_id
    );

    return (
        <div className='flex  justify-center items-center h-[5svh]'>
            <div
                onClick={() => navigate('tickets')}
                className='transition ease-in-out delay-150 hover:-translate-y-[0.1em] hover:cursor-pointer hover:scale-110  duration-300 flex  w-[5em]  items-center space-x-1 border-y-2 p-2 border-rose-600 bg-rose-100  h-[5svh] border-l-2 rounded-l-full'
            >
                <div className='text-rose-900'>{balance?.balance} </div>

                <TiTicket className='text-rose-600 text-[5em]'></TiTicket>
            </div>

            <div
                onClick={() => navigate('RPs')}
                className='transition ease-in-out delay-150 hover:-translate-y-[0.1em] hover:cursor-pointer hover:scale-110  duration-300  flex  w-[5em]  items-center space-x-1 border-y-2 p-2 border-yellow-600 bg-yellow-100  h-[5svh]'
            >
                <div className='text-yellow-900'>{pointsRp?.points} </div>
                <img
                    src='/public/assets/points-rp.svg'
                    className='w-[2em] mb-[-0.5em] '
                ></img>
            </div>
            <div
                onClick={() => navigate('points')}
                className='transition ease-in-out delay-150 hover:-translate-y-[0.1em] hover:cursor-pointer hover:scale-110  duration-300  flex w-[5.2em]  items-center space-x-1 border-y-2 border-r-2 rounded-r-full p-2 border-green-700 bg-green-100  h-[5svh]'
            >
                <div className='text-green-900'>{platformPoints?.points} </div>
                <img
                    src='/public/assets/game-point.svg'
                    className='w-[2em] mb-[-0.5em] '
                ></img>
            </div>
        </div>
    );
}
