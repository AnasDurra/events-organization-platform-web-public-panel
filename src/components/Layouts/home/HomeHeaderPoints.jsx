import React, { useEffect } from 'react';
import { TiTicket } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import { useLazyGetAttendeeBalanceQuery } from '../../../features/Ticketing Packages/TicketingPackagesSlice';
import {
    useLazyGetAttendeePointsQuery,
    useLazyGetAttendeeRPsQuery,
} from '../../../features/gamification/gamificationSlice';

export default function HomeHeaderPoints() {
    const navigate = useNavigate();

    const [
        queryAttendeeBalance,
        {
            data: { result: balance } = { result: {} },
            isLoading: isBalanceLoading,
            isSuccess: isGetAttendeeBalanceSuccess,
        },
    ] = useLazyGetAttendeeBalanceQuery();
    const [
        queryAttendeePoints,
        { data: { result: platformPoints } = { result: {} }, isSuccess: isGetAttendeePointsSuccess },
    ] = useLazyGetAttendeePointsQuery();
    const [queryAttendeeRPs, { data: { result: pointsRp } = { result: {} }, isSuccess: isGetAttendeeRPsSuccess }] =
        useLazyGetAttendeeRPsQuery();

    useEffect(() => {
        setTimeout(() => {
            if (getLoggedInUserV2().attendee_id) {
                queryAttendeePoints(getLoggedInUserV2().attendee_id);
                queryAttendeeRPs(getLoggedInUserV2().attendee_id);
                queryAttendeeBalance(getLoggedInUserV2().attendee_id);
            }
        }, []);
    }, [queryAttendeeBalance, queryAttendeePoints, queryAttendeeRPs]);
    return (
        <>
            {isGetAttendeeBalanceSuccess && isGetAttendeeRPsSuccess && isGetAttendeePointsSuccess && (
                <div className='flex  justify-center items-center h-[5svh] '>
                    <div
                        onClick={() => navigate('/home/tickets')}
                        className=' hover:border-secondary hover:cursor-pointer  p-2 flex  w-[5em] justify-center  items-center space-x-1 border-y-2  border-primary bg-secondary/15  h-[5svh] border-l-2 rounded-l-full'
                    >
                        <div className='text-textPrimary'>{balance?.balance} </div>

                        <TiTicket className='text-textPrimary text-[2rem]'></TiTicket>
                    </div>

                    <div
                        onClick={() => navigate('/home/RPs')}
                        className='hover:border-secondary hover:cursor-pointer  p-2  flex  justify-center w-[5em]  items-center space-x-1 border-2  border-primary bg-secondary/15  h-[5svh]'
                    >
                        <div className='text-textPrimary'>{pointsRp?.points} </div>
                        <img
                            src='/static/images/points-rp.svg'
                            className='w-[2em] mb-[-0.5em] '
                        ></img>
                    </div>
                    <div
                        onClick={() => navigate('/home/points')}
                        className='hover:border-secondary hover:cursor-pointer  p-2  flex justify-center w-[5.2em]  items-center space-x-1 border-y-2  border-r-2 rounded-r-full  border-primary bg-secondary/15  h-[5svh]'
                    >
                        <div className='text-green-900'>{platformPoints?.points} </div>
                        <img
                            src='/static/images/game-point.svg'
                            className='w-[2em] mb-[-0.5em] '
                        ></img>
                    </div>
                </div>
            )}
        </>
    );
}
