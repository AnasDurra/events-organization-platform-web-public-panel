import { Button, Empty, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import EventCard from './cards/EventCard';
import { useGetSoonEventsQuery } from '../feedsSlice';
import { events } from '../../../api/services/events';
import { useNavigate } from 'react-router-dom';

export default function HappeningNowSection() {
    const navigate = useNavigate();

    const {
        data: { result: { data: events } = { data: [] } } = { result: {} },
        isSuccess,
        isLoading,
        isError,
    } = useGetSoonEventsQuery({ page: 1, pageSize: 3 });

    return (
        <div className='grid grid-cols-8 w-full my-8'>
            <div className='col-span-8 sm:col-span-6 sm:col-start-2'>
                <div className='flex flex-col w-full p-4'>
                    <div className='flex justify-between items-center my-2'>
                        <div className='text-2xl m-2 font-extrabold font-serif text-pretty text-textPrimary'>
                            Happening Now
                        </div>
                        {/*   <div
                            className='text-[#4E6C50] text-xl font-bold hover:cursor-pointer hover:shadow-2xl hover:animate-pulse px-2'
                            onClick={() => navigate('orgs')}
                        >
                            See More
                        </div> */}
                    </div>
                    <Skeleton loading={isLoading}>
                        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
                            {Array.isArray(events) && events.length > 0 ? (
                                events.slice(0, 3).map((event) => <EventCard key={event.id} event={event} />)
                            ) : (
                                <Empty description={'No Events!'} />
                            )}
                        </div>
                    </Skeleton>
                </div>
            </div>
        </div>
    );
}
