import React, { useEffect, useState } from 'react';
import { useGetCategoryEventsQuery, useLazyGetCategoryEventsQuery, useLazyGetFollowingEventsQuery } from './feedsSlice';
import Title from 'antd/es/typography/Title';
import { Pagination, Spin } from 'antd';
import EventCardWithImage from './components/cards/EventCardWithImage';
import { useParams } from 'react-router-dom';

export default function ViewCategoryPage() {
    let { category_name, category_id } = useParams();

    const [currentPage, setCurrentPage] = useState(1);

    const [
        getCategoryEvents,
        {
            data: { result: { events, count: totalPages } } = { result: { events: [], count: 0 } },
            isFetching: isEventsLoading,
        },
    ] = useLazyGetCategoryEventsQuery({ page: 1, pageSize: 9, category_id });

    useEffect(() => {
        getCategoryEvents({ page: currentPage, pageSize: 9, category_id });
    }, []);

    useEffect(() => {
        getCategoryEvents({ page: currentPage, pageSize: 9, category_id });
    }, [currentPage]);

    return (
        <div className='grid grid-cols-8 w-full  mb-4'>
            <div className='col-span-8 sm:col-span-6 sm:col-start-2 '>
                <div className='flex flex-col h-full justify-between'>
                    <div className='w-full text-center'>
                        <Title
                            level={3}
                            className='my-2 text-pretty'
                        >
                            {category_name}
                        </Title>
                    </div>
                    <Spin
                        spinning={isEventsLoading}
                        tip={'loading'}
                        size='large'
                    >
                        <div className='grid grid-cols-12 gap-4 p-4'>
                            {console.log('events', events)}

                            {events?.map((event) => (
                                <div
                                    key={event.id}
                                    className='col-start-2 col-span-10 md:col-span-4'
                                >
                                    <EventCardWithImage
                                        id={event.id}
                                        title={event.title}
                                        description={event.description}
                                        tags={event.tags.map((tag) => tag.tag?.label)}
                                        organizationProfilePictureURL={
                                            URL + '/organization/mainPicture/' + event.organization?.main_picture
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
            </div>
        </div>
    );
}
