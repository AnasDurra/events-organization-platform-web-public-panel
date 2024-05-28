import { Divider, Pagination, Spin, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import EventCardWithDate from './components/cards/EventCardWithDate';
import { useLazyGetPopularEventsQuery } from './feedsSlice';
import { MdLocationOn } from 'react-icons/md';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

export default function PopularPage() {
    const { token } = useToken();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [loadedEvents, setLoadedEvents] = useState([]);
    const [eventsCount, setEventsCount] = useState(0);
    const [eventIds] = useState(new Set());

    const [
        getPopularEvents,
        {
            isFetching: isEventsLoading,
            data: { result: { events: popularEvents, count: totalPages } } = { result: { events: [], count: 0 } },
        },
    ] = useLazyGetPopularEventsQuery();

    const loadMoreData = async () => {
        console.log('hi load');
        getPopularEvents({ page: page, pageSize: 5 })
            .unwrap()
            .then((response) => {
                console.log(response);
                setEventsCount(response?.result?.count);

                const newEvents = response?.result?.events?.filter((event) => !eventIds.has(event.event_id));
                setLoadedEvents((prevEvents) => [...prevEvents, ...newEvents]);

                setPage(page+1);

                console.log(newEvents);
                newEvents.forEach((event) => eventIds.add(event.event_id));
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const eventImageURL =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMMQnPqA6MJckxCQSuo9qrlwAnGbdcX2csHM912p0U2g&s';

    const cardCoverStyle = {
        backgroundImage: `url(${eventImageURL})`,
        borderColor: token.colorPrimary,
    };

    return (
        <>
            {console.log(loadedEvents)}
            <div className='grid grid-cols-8 w-full my-2 mt-8'>
                <div className='col-span-8 sm:col-span-6 sm:col-start-2'>
                    <div className='grid grid-cols-3 gap-8'>
                        {loadedEvents.map((event, index) => (
                            <div
                                key={event.event_id}
                                className='w-full h-[25svh] bg-primary rounded-3xl'
                            >
                                <div
                                    className={`relative flex flex-col items-center justify-center w-full h-full rounded-3xl bg-no-repeat bg-cover bg-center text-white font-bold font-mono`}
                                    style={{
                                        backgroundImage: `url(${event.event_cover_picture_url})`,
                                        borderColor: token.colorPrimary,
                                    }}
                                >
                                    <div className='absolute inset-0 bg-primary/60  rounded-3xl '></div>
                                    <div className='flex flex-col w-full h-full justify-between h-full'>
                                        <div className='w-full px-4 flex justify-between items-start pt-4 flex-1 shadow-2xl '>
                                            <div className='flex items-center z-20 text-lg'>{`#${
                                                index + 1
                                            } Trending`}</div>
                                            <div
                                                className='flex items-center z-20 hover:text-secondary hover:cursor-pointer '
                                                onClick={() => navigate(`/event/show/${event.event_id}`)}
                                            >
                                                <BsArrowUpRightCircle className='text-[3em]' />
                                            </div>
                                        </div>
                                        <div className='w-full px-4 flex justify-start items-start  pb-4  flex-1 shadow-2xl '>
                                            <div className='flex items-center z-20 line-clamp-3  '>
                                                {event.event_title}
                                            </div>
                                        </div>
                                        <div className='w-full px-4 flex justify-end items-end  pb-4  flex-1 shadow-2xl '>
                                            <div className='flex items-center z-20 '>
                                                <MdLocationOn />
                                                <span className='text-sm'>Damascus</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {isEventsLoading && (
                        <Spin
                            spinning
                            className='flex w-full h-full items-center  min-h-[20svh] justify-center'
                        />
                    )}
                    {/*  <div className='w-full flex justify-center  py-2'>
                        <Pagination
                            className='p-4'
                            onChange={(page) => {
                                setPage(page);
                            }}
                            hideOnSinglePage
                            defaultCurrent={page}
                            total={totalPages}
                            current={page}
                            disabled={isEventsLoading}
                        />
                    </div> */}
                </div>
            </div>
        </>
    );
}
