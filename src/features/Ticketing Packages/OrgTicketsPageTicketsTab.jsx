import { Avatar, Table, Typography } from 'antd';
import React from 'react';
import { useGetOrgTicketsHistoryQuery } from './TicketingPackagesSlice';
import { getLoggedInUserV2 } from '../../api/services/auth';
import dayjs from 'dayjs';

export default function OrgTicketsPageTicketsTab() {
    const { data: { result: ticketsHistory } = { result: [] }, isLoading: isTicketsHistoryLoading } =
        useGetOrgTicketsHistoryQuery(getLoggedInUserV2()?.organization_id);

    const filteredTicketsHistory = ticketsHistory.filter((ticket) => !ticket.withdraw_id);

    const sortedTicketsHistory = [...filteredTicketsHistory].sort(
        (a, b) => new Date(b.org_tickets_created_at) - new Date(a.org_tickets_created_at)
    );

    const columns = [
        {
            title: 'Ticket ID',
            dataIndex: 'org_tickets_id',
            key: 'ticketId',
            width: '15%',
            align: 'center',
        },
        {
            title: 'Date',
            dataIndex: 'org_tickets_created_at',
            key: 'date',
            render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
            width: '20%',
            align: 'center',
            sorter: (a, b) => new Date(a.org_tickets_created_at) - new Date(b.org_tickets_created_at),
            defaultSortOrder: 'descend',
        },
        {
            title: 'Attendee',
            key: 'attendee',
            width: '25%',
            align: 'center',
            render: (record) => {
                return (
                    <div className='flex w-full justify-start items-center'>
                        <Avatar className='ml-4 mx-6' />
                        <div className='flex flex-col text-left'>
                            <Typography.Text>
                                {record?.attendee_first_name + ' ' + record?.attendee_last_name}
                            </Typography.Text>
                            <Typography.Text type='secondary'>@{record?.user_username}</Typography.Text>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Event',
            dataIndex: 'event_title',
            key: 'event',
            width: '30%',
            align: 'center',
        },
        {
            title: 'Tickets',
            dataIndex: 'org_tickets_value',
            key: 'tickets',
            width: '10%',
            align: 'center',
        },
    ];

    return (
        <Table
            rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
            columns={columns}
            dataSource={sortedTicketsHistory}
            size='small'
            bordered
            loading={isTicketsHistoryLoading}
            pagination={{
                pageSize: 7,
                hideOnSinglePage: true,
                showSizeChanger: true,
            }}
        />
    );
}
