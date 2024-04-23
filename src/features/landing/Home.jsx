import React from 'react';
import EventCard from './EventCard';
import { Carousel } from 'antd';

export default function Home() {
    return (
        <div className='flex flex-col items-center justify-start w-full'>
            <Carousel afterChange={() => {}}>
                
                <div>
                  1
                </div>
                <div>
                  2
                </div>
                <div>
                  3
                </div>
            </Carousel>
            <EventCard />
        </div>
    );
}
