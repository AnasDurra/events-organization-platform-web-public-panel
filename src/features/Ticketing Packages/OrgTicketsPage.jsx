import { ArrowUpOutlined, DollarCircleFilled } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Statistic, Table, Tabs, Typography, message } from 'antd';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { TiTicket } from 'react-icons/ti';
import { useGetOrgBalanceQuery, useGetOrgWithdrawsQuery, useWithdrawMutation } from './TicketingPackagesSlice';
import { getLoggedInUserV2 } from '../../api/services/auth';
import WithdrawModal from './WithdrawModal';
import OrgTicketsPageWithdrawTab from './OrgTicketsPageWithdrawTab';

export default function OrgTicketsPage() {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    const { data: { result: balanceObj } = { result: {} } } = useGetOrgBalanceQuery(
        getLoggedInUserV2()?.organization_id
    );
    const { data: { result: withdraws } = { result: [] },isLoading:isFetchWithdrawLoading } = useGetOrgWithdrawsQuery(
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
    const columns = [
        {
            title: 'Ticket ID',
            dataIndex: 'ticketId',
            key: 'ticketId',
            width: '15%',
            align: 'center',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
            width: '20%',
            align: 'center',
        },
        {
            title: 'Attendee',
            dataIndex: 'attendee',
            key: 'attendee',
            width: '25%',
            align: 'center',
            render: (attendee, record, index) => {
                return (
                    <div className='flex w-full justify-start items-center'>
                        <Avatar className='ml-4 mx-6' />
                        <div className='flex flex-col text-left'>
                            <Typography.Text>{attendee?.firstName + ' ' + attendee?.lastName}</Typography.Text>
                            <Typography.Text type='secondary'>@{attendee?.user?.username}</Typography.Text>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            width: '30%',
            align: 'center',
        },
        {
            title: 'Tickets',
            dataIndex: 'tickets',
            key: 'tickets',
            width: '10%',
            align: 'center',
            align: 'center',
        },
    ];

    const data = [
        {
            key: '1',
            ticketId: 'TCK-12345',
            date: '2024-05-18 10:00:00',
            attendee: 'John Doe',
            event: 'Tech Conference 2024',
            tickets: 2,
        },
        {
            key: '2',
            ticketId: 'TCK-54321',
            date: '2024-05-17 15:30:00',
            attendee: 'Jane Smith',
            event: 'Music Festival 2024',
            tickets: 1,
        },
        // Add more data objects following the same structure
    ];

    const items = [
        {
            key: '1',
            label: 'Tickets',
            children: (
                <Table
                    rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
                    columns={columns}
                    dataSource={data}
                    size='small'
                    bordered
                    loading={false}
                    pagination={{
                        pageSize: 7,
                        total: 100,
                        hideOnSinglePage: true,
                        showSizeChanger: true,
                    }}
                />
            ),
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
            children:<OrgTicketsPageWithdrawTab withdraws={withdraws} loading={isFetchWithdrawLoading}></OrgTicketsPageWithdrawTab>,
        },
    ];

    return (
        <div className='container'>
            <div className='flex   items-center'>
                <div className='w-fit flex justify-start rounded-lg items-center p-4 m-4 space-x-8 bg-gradient-to-r from-[#8ed6bc] to-[#f0a2cf] via-[#a794e5]'>
                    <Card bordered={false}>
                        <Statistic
                            title='Generated Revenue'
                            value={900}
                            prefix={<DollarCircleFilled className='text-green-900' />}
                            suffix='$'
                        />
                    </Card>
                    <Card bordered={false}>
                        <Statistic
                            title='Current Tickets Balance'
                            value={balanceObj?.balance}
                            prefix={<TiTicket className='text-yellow-500' />}
                        />
                    </Card>
                    <Card bordered={false}>
                        <Statistic
                            title='Last Month Tickets'
                            value={900}
                            prefix={<TiTicket className='text-yellow-500' />}
                        />
                    </Card>
                    <Card bordered={false}>
                        <Statistic
                            title='Total Tickets Sold'
                            value={2500}
                            prefix={<TiTicket className='text-yellow-500' />}
                        />
                    </Card>
                </div>
                <Button
                    type='primary'
                    onClick={() => {
                        if (balanceObj?.balance == 0) message.info("You don't have any tickets to withdraw");
                        else setIsWithdrawModalOpen(true);
                    }}
                >
                    {' '}
                    Withdraw
                </Button>
            </div>
            <Tabs
                defaultActiveKey='1'
                items={items}
            />
            <WithdrawModal
                balance={balanceObj?.balance}
                isOpen={isWithdrawModalOpen}
                onFinish={handleWithdrawFinish}
                loading={isWithdrawLoading}
                onCancel={() => setIsWithdrawModalOpen(false)}
            ></WithdrawModal>
        </div>
    );
}
