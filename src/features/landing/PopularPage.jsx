import React from 'react';
import EventRankCard from './components/cards/EventRankCard';
import CompactEventCard from './components/cards/CompactEventCard';
import { Divider, theme } from 'antd';

const { useToken } = theme;
export default function PopularPage() {
    const { token } = useToken();

    console.log(token);
    return (
        <div className={`grid grid-cols-2 gap-4 px-2 pt-2 h-full`}>
            {/*  <div className='col-span-2 mx-[20%]'>
                <EventRankCard
                    rank={1}
                    imgUrl={'/assets/event-1.png'}
                />
            </div>
            <div>
                <EventRankCard
                    rank={2}
                    imgUrl={'/assets/event-2.png'}
                />
            </div>
            <div>
                <EventRankCard
                    rank={3}
                    imgUrl={'/assets/event-3.png'}
                />
            </div> */}

            <div className='w-full flex flex-col col-span-2 space-y-4  h-full'>
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
            </div>
        </div>
    );
}
