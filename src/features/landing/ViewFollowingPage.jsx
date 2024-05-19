import React, { useEffect, useState } from 'react';
import EventCardWithImage from './components/cards/EventCardWithImage';
import Title from 'antd/es/typography/Title';
import { useLazyGetFollowingEventsQuery } from './feedsSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Pagination, Spin } from 'antd';

export default function ViewFollowingPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const [getFollowingEvents, { data: { result: events } = { result: [] }, isFetching: isEventsLoading }] =
        useLazyGetFollowingEventsQuery();

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
                    {console.log('events', events)}

                    {events.map((event) => (
                        
                            <div
                                key={event.id}
                                className='col-start-2 col-span-10 md:col-span-4'
                            >
                                <EventCardWithImage
                                    title={event.title}
                                    description={event.description}
                                    tags={event.tags.map((tag) => tag.tag.label)}
                                    organizationProfilePicture={
                                        event.organization.main_picture ||
                                        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                                    }
                                    eventImage={
                                        event.cover_picture_url ||
                                        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                                    }
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
                    total={50}
                    current={currentPage}
                    disabled={isEventsLoading}
                />
            </div>
        </div>
    );
}
