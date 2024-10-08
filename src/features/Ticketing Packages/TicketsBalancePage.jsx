import { Card, Col, Divider, Row, Skeleton, Spin, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { TiTicket } from 'react-icons/ti';
import PackageCard from './PackageCard';
import { useCheckoutMutation, useGetAttendeeBalanceQuery, useGetPackagesQuery } from './TicketingPackagesSlice';
import { useNotification } from '../../utils/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserV2 } from '../../api/services/auth';
import AttendeeTicketsHistory from './AttendeeTicketsHistory';

export default function TicketsBalancePage() {
    const { openNotification } = useNotification();

    const { data: { result: packages } = { result: [] }, isLoading: isPackagesLoading } = useGetPackagesQuery();
    const { data: { result: balanceObj } = { result: {} }, isLoading: isBalanceLoading } = useGetAttendeeBalanceQuery(
        getLoggedInUserV2()?.attendee_id
    );
    const [checkout] = useCheckoutMutation();

    const handleCheckoutRequest = (price_id) => {
        checkout({ price_id, quantity: 1 }).then((res) => {
            if (res.error) {
                openNotification('error', 'Something went Wrong!');
            } else {
                console.log(res);
                window.location.href = res.data.result.url;
            }
        });
    };

    return (
        <div className='grid grid-cols-8 w-full  mb-4'>
            <div className='col-span-8 sm:col-span-6 sm:col-start-2 '>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='flex flex-col justify-center items-center space-y-4 mt-4'>
                        <Typography.Text className='text-[2em] font-semibold font-mono'>
                            {' '}
                            Tickets Balance
                        </Typography.Text>
                        <TiTicket className='text-[5em] text-textPrimary' />
                        <Spin spinning={isBalanceLoading}>
                            <Typography.Text
                                code
                                className='text-[2em]'
                            >
                                {balanceObj?.balance}
                            </Typography.Text>
                        </Spin>
                    </div>

                    <Divider>History</Divider>
                    <AttendeeTicketsHistory />

                    <Divider> Buy More</Divider>
                    <Skeleton loading={isPackagesLoading}>
                        <div className='grid grid-cols-1 gap-4 gap-y-8  lg:grid-cols-4 lg:gap-8 lg:gap-y-12 w-full p-12 lg:p-0'>
                            {packages
                                .filter((pck) => pck.active)
                                .map((pck, idx) => (
                                    <PackageCard
                                        key={'package_' + idx}
                                        name={pck.name}
                                        status={pck.active ? 'Active' : 'Archived'}
                                        price={pck.default_price?.unit_amount / 100}
                                        tickets={pck.metadata.value}
                                        onBuyClick={() => handleCheckoutRequest(pck.default_price?.id)}
                                    />
                                ))}
                        </div>
                    </Skeleton>
                </div>
            </div>
        </div>
    );
}
