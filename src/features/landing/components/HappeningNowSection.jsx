import { Button, Empty, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import EventCard from './cards/EventCard';
import { useGetSoonEventsQuery } from '../feedsSlice';
import { events } from '../../../api/services/events';

export default function HappeningNowSection() {
    const {
        data: { result: { data: events } = { data: [] } } = { result: {} },
        isSuccess,
        isLoading,
        isError,
    } = useGetSoonEventsQuery({ page: 1, pageSize: 1 });
    return (
        <div className='flex flex-col w-full p-4'>
            <div className='flex justify-between items-center'>
                <Title level={3}>Happening now</Title>
                <div
                    type='text'
                    className='text-gray-500 hover:cursor-pointer hover:shadow-2xl hover:animate-pulse px-2'
                >
                    see more
                </div>
            </div>
            <Skeleton loading={isLoading}>
                {Array.isArray(events) && events.length > 0 ? <EventCard /> : <Empty description={'No Events!'} />}
            </Skeleton>
        </div>
    );
}
