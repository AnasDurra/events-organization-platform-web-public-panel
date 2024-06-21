import { Avatar, Button, Table, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { TiTicket } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';

export default function OrgTicketsPageWithdrawTab({ withdraws, loading }) {
    const sortedWithdraws = [...withdraws].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const columns = [
        {
            key: uuidv4(),
            title: 'Date',
            dataIndex: 'createdAt',
            align: 'center',

            rowScope: 'row',
            render: (date) => dayjs(date).format('YYYY-MM-DD | hh:mm'),
        },

        {
            key: uuidv4(),
            title: 'Amount',
            dataIndex: 'amount',
            align: 'center',
            render: (amount) => (
                <div className='flex justify-center items-center'>
                    <div className='flex items-center justify-between space-x-4 '>
                        {' '}
                        <div>{amount}</div>
                        <TiTicket className='text-primary text-[2em]'></TiTicket>
                    </div>
                </div>
            ),
        },
        {
            key: uuidv4(),
            title: 'Status',
            dataIndex: 'status',
            align: 'center',

            render: (status) => (
                <Tag
                    color={`${
                        status == 'accepted' ? 'green-inverse' : status != 'rejected' ? 'gold-inverse' : 'red-inverse'
                    }`}
                    className='text-[1.1em] py-2   px-2 flex justify-center items-center space-x-2 p-1 rounded-lg'
                >
                    {' '}
                    {status}
                </Tag>
            ),
        },
    ];
    return (
        <div className='grid grid-cols-10'>
            <div className='col-span-5 col-start-3'>
                <Table
                    className='w-[100%]'
                    dataSource={sortedWithdraws}
                    columns={columns}
                    loading={loading}
                    bordered
                    size='small'
                    pagination={{ pageSize: '5' }}
                />
            </div>
        </div>
    );
}
