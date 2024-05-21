import { Pagination, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { URL } from '../../api/constants';
import EventCardWithImage from './components/cards/EventCardWithImage';
import { useLazyGetFollowingEventsQuery } from './feedsSlice';

export default function ViewFollowingPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const [
        getFollowingEvents,
        {
            data: { result: { data: events, count: totalPages } } = { result: { data: [], count: 0 } },
            isFetching: isEventsLoading,
        },
    ] = useLazyGetFollowingEventsQuery();

    useEffect(() => {
        getFollowingEvents({ page: currentPage, pageSize: 6 });
    }, []);

    useEffect(() => {
        getFollowingEvents({ page: currentPage, pageSize: 6 });
    }, [currentPage]);

    return (
        <div className='flex flex-col h-full justify-between'>
            <div className='w-full text-center'>
                <Title
                    level={3}
                    className='my-2 text-pretty'
                >
                    Events From Organizations You Follow
                </Title>
            </div>
            <Spin
                spinning={isEventsLoading}
                tip={'loading'}
                size='large'
            >
                <div className='grid grid-cols-12 gap-4 p-4'>
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className='col-start-2 col-span-10 md:col-span-4'
                        >
                            <EventCardWithImage
                                id={event.id}
                                title={event.title}
                                description={event.description}
                                tags={event.tags.map((tag) => tag.tag.label)}
                                organizationProfilePictureURL={
                                    URL + '/organization/mainPicture/' + event.organization.main_picture
                                }
                                eventImageURL={event.cover_picture_url}
                                days={event.days}
                                event_type={event.event_type}
                            />
                        </div>
                    ))}
                </div>
            </Spin>
            <div className='w-full flex justify-center  py-2'>
                <Pagination
                    className='p-4'
                    onChange={(page) => {
                        setCurrentPage(page);
                    }}
                    defaultCurrent={currentPage}
                    total={totalPages}
                    current={currentPage}
                    disabled={isEventsLoading}
                />
            </div>
        </div>
    );
}
