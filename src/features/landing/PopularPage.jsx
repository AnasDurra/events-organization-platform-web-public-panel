import React from 'react';
import EventRankCard from './components/cards/EventRankCard';
import { Divider, theme } from 'antd';
import CompactEventCard from './components/cards/CompactEventCard';
import EventCardWithDate from './components/cards/EventCardWithDate';

const { useToken } = theme;
export default function PopularPage() {
    const { token } = useToken();

    console.log(token);
    return (
        <div className={`flex flex-col h-full  space-y-2 mt-2 `}>
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

            <div className=' mx-4'>
                <EventCardWithDate onClick={() => {}} />
            </div>
            <div className=' mx-4'>
                <EventCardWithDate />
            </div>
            <div className=' mx-4'>
                <EventCardWithDate />
            </div>
            <div className=' mx-4'>
                <EventCardWithDate />
            </div>
            <div className=' mx-4'>
                <EventCardWithDate />
            </div>

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
