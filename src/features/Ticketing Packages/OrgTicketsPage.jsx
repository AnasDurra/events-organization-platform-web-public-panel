import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Statistic, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { TiTicket } from 'react-icons/ti';
import { getLoggedInUserV2 } from '../../api/services/auth';
import OrgTicketsPageTicketsTab from './OrgTicketsPageTicketsTab';
import OrgTicketsPageWithdrawTab from './OrgTicketsPageWithdrawTab';
import { useGetOrgBalanceQuery, useGetOrgWithdrawsQuery, useWithdrawMutation } from './TicketingPackagesSlice';
import WithdrawModal from './WithdrawModal';

export default function OrgTicketsPage() {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    const { data: { result: balanceObj } = { result: {} } } = useGetOrgBalanceQuery(
        getLoggedInUserV2()?.organization_id
    );
    const { data: { result: withdraws } = { result: [] }, isLoading: isFetchWithdrawLoading } = useGetOrgWithdrawsQuery(
        getLoggedInUserV2()?.organization_id
    );

    const [withdraw, { isLoading: isWithdrawLoading }] = useWithdrawMutation();

    const handleWithdrawFinish = (fields) => {
        withdraw(fields)
            .unwrap()
            .then((res) => {
                message.success('Withdraw request sent successfully');
                setIsWithdrawModalOpen(false);
            })
            .catch((e) => {
                message.error('Withdraw request failed');
            });
    };

    const totalWaitingWithdraws = withdraws
        .filter((withdraw) => withdraw.status === 'waiting')
        .reduce((acc, withdraw) => acc + withdraw.amount, 0);

    const adjustedBalance = balanceObj?.balance - totalWaitingWithdraws;

    const items = [
        {
            key: '1',
            label: 'Tickets',
            children: <OrgTicketsPageTicketsTab />,
        },
        {
            key: '2',
            label: (
                <Badge
                    size='small'
                    color='orange'
                    showZero
                    count={withdraws.filter((withdraw) => withdraw.status == 'waiting').length}
                >
                    <div className='p-1'>Withdraws</div>
                </Badge>
            ),
            children: (
                <OrgTicketsPageWithdrawTab
                    withdraws={withdraws}
                    loading={isFetchWithdrawLoading}
                />
            ),
        },
    ];

    return (
        <div className='container'>
            <div className='flex items-center'>
                <div className='w-fit flex justify-start rounded-lg items-center p-4 m-4 space-x-8 bg-gradient-to-r from-[#8ed6bc] to-[#f0a2cf] via-[#a794e5]'>
                    <Card bordered={false}>
                        <Statistic
                            title='Waiting To Withdraw'
                            value={totalWaitingWithdraws}
                            prefix={<ClockCircleOutlined className='text-gray-500 text-[1.5rem] mr-2' />}
                        />
                    </Card>
                    <Card bordered={false}>
                        <Statistic
                            title='Current Tickets Balance'
                            value={adjustedBalance}
                            prefix={<TiTicket className='text-yellow-500 text-[1.5rem] mr-2 mt-1' />}
                        />
                    </Card>
                    <Card bordered={false}>
                        <Statistic
                            title='Last Month Tickets'
                            value={900}
                            prefix={<TiTicket className='text-yellow-500 text-[1.5rem] mr-2 mt-1' />}
                        />
                    </Card>
                    <Card bordered={false}>
                        <Statistic
                            title='Total Tickets Sold'
                            value={2500}
                            prefix={<TiTicket className='text-yellow-500 text-[1.5rem] mr-2 mt-1' />}
                        />
                    </Card>
                </div>
                <Button
                    type='primary'
                    onClick={() => {
                        if (adjustedBalance <= 0) message.info("You don't have any tickets to withdraw");
                        else setIsWithdrawModalOpen(true);
                    }}
                >
                    Withdraw
                </Button>
            </div>
            <Tabs
                defaultActiveKey='1'
                items={items}
            />
            <WithdrawModal
                balance={adjustedBalance}
                isOpen={isWithdrawModalOpen}
                onFinish={handleWithdrawFinish}
                loading={isWithdrawLoading}
                onCancel={() => setIsWithdrawModalOpen(false)}
            />
        </div>
    );
}
