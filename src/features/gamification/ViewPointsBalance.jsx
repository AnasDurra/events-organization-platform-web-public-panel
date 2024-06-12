import { Divider, Spin, Typography } from 'antd';
import React from 'react';
import { getLoggedInUserV2 } from '../../api/services/auth';
import { useNotification } from '../../utils/NotificationContext';
import { useGetAttendeePointsQuery } from './gamificationSlice';
import AttendeePointsHistory from './AttendeePointsHistory';

export default function ViewPointsBalance() {
    const { openNotification } = useNotification();

    const { data: { result: balanceObj } = { result: {} }, isLoading: isBalanceLoading } = useGetAttendeePointsQuery(
        getLoggedInUserV2()?.attendee_id
    );

 

    return (
        <div className='grid grid-cols-8 w-full  mb-4'>
            <div className='col-span-8 sm:col-span-6 sm:col-start-2 '>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='flex flex-col justify-center items-center space-y-4 mt-4'>
                        <Typography.Text className='text-[2em] font-semibold font-mono'>
                            {' '}
                            Points Balance
                        </Typography.Text>
                        <img src='/public/assets/game-point.svg' className='w-[5em] text-green-500' />
                        <Spin spinning={isBalanceLoading}>
                            <Typography.Text
                                code
                                className='text-[2em]'
                            >
                                {balanceObj?.points}
                            </Typography.Text>
                        </Spin>
                    </div>

                    <Divider>History</Divider>
                    <AttendeePointsHistory />

                  
                </div>
            </div>
        </div>
    );
}
