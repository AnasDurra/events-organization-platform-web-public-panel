import React, { useEffect, useState } from 'react';
import EventRankCard from './components/cards/EventRankCard';
import { Divider, Spin, theme } from 'antd';
import CompactEventCard from './components/cards/CompactEventCard';
import EventCardWithDate from './components/cards/EventCardWithDate';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyGetPopularEventsQuery } from './feedsSlice';
import { v4 as uuidv4 } from 'uuid';

const { useToken } = theme;

export default function PopularPage() {
    const { token } = useToken();
    const [currentPage, setCurrentPage] = useState(1);
    const [loadedEvents, setLoadedEvents] = useState([]);
    const [eventsCount, setEventsCount] = useState(0);
    const [eventIds] = useState(new Set());

    const [getPopularEvents] = useLazyGetPopularEventsQuery();

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
        <div className={`flex flex-col h-full mt-2 `}>
            {/*    <div className='mx-[5%] hover:cursor-pointer '>
                <EventRankCard
                    rank={1}
                    imgUrl={'/assets/event-1.png'}
                />
            </div>
            <div className='mx-[5%]'>
                <EventRankCard
                    rank={2}
                    imgUrl={'/assets/event-2.png'}
                />
            </div>
            <div className='mx-[5%]'>
                <EventRankCard
                    rank={3}
                    imgUrl={'/assets/event-3.png'}
                />
            </div> */}
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
                        <div key={'event' + uuidv4()}>
                            <div
                                className={
                                    'rounded-3xl ' +
                                    (index == 0
                                        ? 'bg-yellow-50 p-2 pb-6'
                                        : index == 1
                                        ? 'bg-slate-200 p-2 pb-6 '
                                        : index == 2
                                        ? 'bg-orange-100 p-2 pb-6'
                                        : null)
                                }
                            >
                                <Divider>#{index + 1}</Divider>
                                <div className=' mx-4'>
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

            {/*      <div className='bg-slate-200 p-2 pb-6 '>
                <Divider>#2</Divider>
                <div className=' mx-4'>
                    <EventCardWithDate />
                </div>
            </div>

            <div className='bg-orange-100 p-2 pb-6'>
                <Divider>#3</Divider>
                <div className=' mx-4'>
                    <EventCardWithDate />
                </div>
            </div>

            <Divider></Divider>
            <div className=' mx-4'>
                <EventCardWithDate />
            </div>
            <div className=' mx-4'>
                <EventCardWithDate />
            </div> */}

            {/*  <CompactEventCard rank={4} />
            <CompactEventCard rank={5} />
            <CompactEventCard rank={4} />
            <CompactEventCard rank={5} />
            <CompactEventCard rank={4} />
            <CompactEventCard rank={5} /> */}

            {/* <div className='w-full flex flex-col col-span-2 space-y-4  h-full'>
                <div className='bg-[#eaba3a]  px-4 py-4 rounded-t-3xl '>
                    <div className='text-center w-full text-white text-lg font-bold mb-2'>TOP 3</div>
                    <div className=' bg-[#cd9630] flex space-y-2  px-2 py-4 flex-col rounded-2xl '>
                        <CompactEventCard rank={1} />
                        <CompactEventCard rank={2} />
                        <CompactEventCard rank={3} />
                    </div>
                </div>
                <Divider />
                <div className='mt-2 flex flex-col space-y-2'>
                    <CompactEventCard rank={4} />
                    <CompactEventCard rank={5} />
                </div>
            </div> */}
        </div>
    );
}
