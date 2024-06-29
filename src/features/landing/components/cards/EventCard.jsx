import { Button, Tag, Typography, theme } from 'antd';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

export default function EventCard({ event }) {
    const navigate = useNavigate();
    const { token } = useToken();

    return (
        <div className='text-textPrimary w-full h-72 rounded-3xl relative flex flex-col justify-end bg-gradient-to-br from-bgSecondary via-primary to-secondary '>
            <div className='h-[75%] bg-transparent w-full rounded-3xl py-4 px-4'>
                <div className='bg-white/55 border-2 border-white/50 w-full h-full rounded-3xl p-4 flex flex-col justify-center space-y-8'>
                    <div className='w-full h-full flex justify-between items-center'>
                        <div className='flex flex-col justify-center items-start'>
                            <div className='text-lg font-semibold'>{event?.title}</div>
                            <div className='text-md font-semibold text-gray-500'>By {event?.organization?.name}</div>
                        </div>

                        <div>
                            <div className='bg-white/70 border-4 rounded-3xl w-20 h-20 border-primary/30 flex flex-col justify-center items-center'>
                                <div className='text-xl'>
                                    {new Date(event?.registrationStartDate).toLocaleString('default', {
                                        month: 'short',
                                    })}
                                </div>
                                <div className='text-2xl text-secondary'>
                                    {new Date(event?.registrationStartDate).getDate()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className='h-full flex justify-start items-center'>
                            {event?.tags?.map((tag) => (
                                <Tag color='green' key={tag.id}>
                                    {tag?.tag?.tagName}
                                </Tag>
                            ))}
                        </div>
                        <Button type='primary' className='w-20' onClick={() => navigate(`/event/show/${event?.id}`)}>
                            More
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
