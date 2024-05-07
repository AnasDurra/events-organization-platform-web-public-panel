import { Card, Col, Divider, Row, Skeleton, Spin, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { TiTicket } from 'react-icons/ti';
import PackageCard from './PackageCard';
import { useCheckoutMutation, useGetPackagesQuery } from './TicketingPackagesSlice';
import { useNotification } from '../../utils/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function TicketsBalancePage() {
    const { openNotification } = useNotification();

    const { data: { result: packages } = { result: [] }, isLoading: isPackagesLoading } = useGetPackagesQuery();
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
        <div className='flex flex-col justify-center items-center w-full'>
            <div className='flex flex-col justify-center items-center space-y-4 mt-4'>
                <Typography.Text className='text-[2em] font-semibold font-mono'> Your Tickets Balance</Typography.Text>
                <TiTicket className='text-[5em] text-yellow-500' />
                <Typography.Text
                    code
                    className='text-[2em]'
                >
                    {' '}
                    1500
                </Typography.Text>
            </div>
            <Divider> Buy More</Divider>
            <Skeleton
                loading={isPackagesLoading}
                
            >
                <div className='grid grid-cols-1 gap-4 gap-y-8  md:grid-cols-3 md:gap-8 md:gap-y-12 w-full p-12 md:p-0'>
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
    );
}
