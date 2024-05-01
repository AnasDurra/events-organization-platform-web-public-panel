import { Button, Card, Typography, theme } from 'antd';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';

const { useToken } = theme;
export default function EventCard({ event }) {
    const { token } = useToken();

    return (
        <div
            className={`relative rounded-2xl border-2 shadow-xl  flex flex-col items-center justify-center w-[100%] h-[100%] bg-gray-200 space-y-2 bg-[url('/assets/cover-event.png')] bg-[length:100%_100%]  text-white font-bold `}
            style={{ borderColor: token.colorPrimary }}
        >
        
            <div className='absolute inset-0 bg-black opacity-40  rounded-2xl'></div>

            <div className='w-full px-4 flex justify-between items-start pt-2 flex-1 z-10'>
                <div className='flex  items-center'>14 sep | 11am</div>
                <div className='flex  items-center'>
                    <MdLocationOn />
                    <span>Damascus</span>
                </div>
            </div>

            <div className='py-2 z-10'>
                <div className='flex justify-center flex-2'>Event Title</div>
                <Typography.Text
                    type='secondary'
                    className='text-xs'
                    style={{ color: 'gray' }}
                >
                    (organization name)
                </Typography.Text>
            </div>

            <div className='flex  items-center w-full flex-1  flex-col justify-end z-10'>
                <div className='flex space-x-2 justify-center items-end '>
                    <Typography.Text
                        type='secondary'
                        className='text-xs'
                        style={{ color: 'gray' }}
                    >
                        from
                    </Typography.Text>
                    <Typography.Text style={{ color: 'white' }}>20k s.p</Typography.Text>
                </div>

                <div className='flex justify-center pb-4 pt-2'>
                    <Button
                        type='primary'
                        className='rounded-2xl'
                    >
                        BUY TICKETS
                    </Button>
                </div>
            </div>
        </div>
    );
}
