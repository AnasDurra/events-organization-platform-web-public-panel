import { Button, Card, Typography, theme } from 'antd';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';

const { useToken } = theme;
export default function EventCard({ event }) {
    const { token } = useToken();

    return (
        <div
            className={` rounded-2xl border-2 shadow-xl   flex flex-col items-center justify-center w-[100%] h-[100%] bg-gray-200 space-y-2`}
            style={{ borderColor: token.colorPrimary }}
        >
            <div className='w-full px-4 flex justify-between items-start pt-2 flex-1'>
                <div className='flex  items-center'>14 sep | 11am</div>
                <div className='flex  items-center'>
                    <MdLocationOn />
                    <span>Damascus</span>
                </div>
            </div>

            <div className='flex justify-center flex-2'>Event Title</div>

            <div className='flex  items-center w-full flex-1  flex-col justify-end'>
                <div className='flex space-x-2 justify-center items-end '>
                    <Typography.Text
                        type='secondary'
                        className='text-xs'
                    >
                        from
                    </Typography.Text>
                    <span>20k s.p</span>
                </div>

                <div className='flex justify-center pb-4 pt-2'>
                    <Button
                        type='primary'
                        className='rounded-2xl'
                    >
                        BUY TICKET
                    </Button>
                </div>
            </div>
        </div>
    );
}
