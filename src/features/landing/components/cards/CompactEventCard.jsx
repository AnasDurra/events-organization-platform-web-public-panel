import { Button, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

export default function CompactEventCard({ rank }) {
    return (
        <div className='w-full flex items-center text-lg px-2 py-2 space-x-2 text-sm bg-gradient-to-b from-[#dee7f6] to-[#c8d7ec]    rounded-2xl border-b-2 border-gray-400 '>
            <div
                className={`basis-2/12 md:basis-1/12   text-white text-center p-1 border-2 border-[#767b8c] rounded-lg   ${
                    rank == 1
                        ? 'bg-[#f8df60]'
                        : rank == 2
                        ? 'bg-[#dfecff]'
                        : rank == 3
                        ? 'bg-[#f1a168]'
                        : 'bg-[#cbddfa]'
                }`}
            >
                <div
                    style={{ WebkitTextStroke: '0.3px black' }}
                    className={`text-center  text-white text-xl font-extrabold rounded-md  ${
                        rank == 1
                            ? 'bg-[#e5b22e]'
                            : rank == 2
                            ? 'bg-[#bfccdd]'
                            : rank == 3
                            ? 'bg-[#d9813c]'
                            : 'bg-[#a1b7cf]'
                    }`}
                >
                    {rank}
                </div>
            </div>

            <div className='basis-2/12 md:basis-1/12'>
                <img
                    className='w-[14svw] md:w-[4svw] aspect-square rounded-lg'
                    style={{ margin: 0 }}
                    src='/assets/4.jpeg'
                />
            </div>

            <div className='basis-5/12 flex flex-col justify-evenly items-start flex-1  space-y-2 font-bold'>
                <div>
                    <span>Event Title is here</span>
                </div>

                <span className='text-gray-500 text-xs'>{'Tag1  ●  Tag2  ●  Tag3'}</span>
            </div>
            <Button
                type='primary'
                className='basis-2/12 text-xs font-mono'
                // className='basis-1/6 rounded-lg h-[40%] bg-[#a7b3c9] border-2 border-[#8191a8] text-black font-bold'
            >
                TICKETS
            </Button>
        </div>
    );
}
