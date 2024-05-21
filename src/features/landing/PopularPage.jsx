import { Divider, Spin, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import EventCardWithDate from './components/cards/EventCardWithDate';
import { useLazyGetPopularEventsQuery } from './feedsSlice';

const { useToken } = theme;

export default function PopularPage() {
    const { token } = useToken();
    const [currentPage, setCurrentPage] = useState(1);
    const [loadedEvents, setLoadedEvents] = useState([]);
    const [eventsCount, setEventsCount] = useState(0);
    const [eventIds] = useState(new Set());

    const [getPopularEvents, { isFetching: isEventsLoading }] = useLazyGetPopularEventsQuery();

    const loadMoreData = async () => {
        console.log('hi load');
        getPopularEvents({ page: currentPage, pageSize: 5 })
            .unwrap()
            .then((response) => {
                console.log(response);
                setEventsCount(response?.result?.count);

                const newEvents = response?.result?.events?.filter((event) => !eventIds.has(event.event_id));
                setLoadedEvents((prevEvents) => [...prevEvents, ...newEvents]);

                setCurrentPage(currentPage + 1);

                console.log(newEvents);
                newEvents.forEach((event) => eventIds.add(event.event_id));
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <>
            {isEventsLoading && (
                <Spin
                    spinning
                    className='flex w-full h-full items-center justify-center'
                />
            )}
            <div className='flex flex-col h-full mt-2'>
                <div className='w-full'>
                    <InfiniteScroll
                        dataLength={loadedEvents.length}
                        next={loadMoreData}
                        hasMore={loadedEvents.length < eventsCount}
                        loader={<Spin spinning></Spin>}
                        className='w-full space-y-4'
                        height={'100svh'}
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {loadedEvents.map((event, index) => (
                            <div
                                key={'event' + uuidv4()}
                                className='flex justify-center'
                            >
                                <div
                                    className={`rounded-3xl shadow-lg p-6 mb-6 w-full max-w-4xl
                                        ${
                                            index === 0
                                                ? 'bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400'
                                                : ''
                                        }
                                        ${index === 1 ? 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400' : ''}
                                        ${
                                            index === 2
                                                ? 'bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400'
                                                : ''
                                        }
                                        ${index > 2 ? 'bg-white' : ''}`}
                                >
                                    <Divider className='text-lg font-semibold'>{`#${index + 1}`}</Divider>
                                    <div className='mx-4'>
                                        <EventCardWithDate
                                            eventTitle={event.event_title}
                                            eventDescription={event.event_description}
                                            eventDate={event.start_day}
                                            onClick={() => {}}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
}
