import { ArrowUpOutlined, DollarCircleFilled } from '@ant-design/icons';
import { Avatar, Button, Card, Statistic, Table, Tabs, Typography } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { TiTicket } from 'react-icons/ti';

export default function OrgTicketsPage() {
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
            label: 'Withdraws',
            children: <div>hi</div>,
        },
    ];

    return (
        <div className='container'>
            <div className='w-full flex justify-start items-center p-4 m-4 space-x-8'>
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
                        value={1500}
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
                <Button type='primary'> Withdraw</Button>
            </div>
            <Tabs
                defaultActiveKey='1'
                items={items}
            />
        </div>
    );
}
