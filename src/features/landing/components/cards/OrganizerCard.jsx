import { Button, Descriptions, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;

export default function OrganizerCard({
    orgName,
    orgID,
    profilePicURL,
    attendanceCount,
    eventsCount,
    follower_count,
    className,
}) {
    const { token } = useToken();
    const navigate = useNavigate();

    return (
        <div
            className='rounded-2xl min-h-[21svh] px-1 shadow-xl hover:shadow-2xl flex flex-col items-center justify-center w-[100%] bg-gray-100/85 space-y-2 hover:cursor-pointer'
            style={{ borderColor: token.colorPrimary }}
            onClick={() => navigate(`/org/${orgID}`)}
        >
            <div className='relative min-h-[14svh] w-full rounded-2xl overflow-hidden'>
                <div
                    // src='/assets/3.jpeg'
                    // alt='Cover Image'
                    className={`h-[28svh] absolute inset-y-[-18svh] w-full object-fill ${className} rounded-b-full bg-primary`}
                />
                <div className='absolute inset-0 flex items-center justify-center'>
                    <img
                        src={`${profilePicURL ? profilePicURL : '/assets/5.jpeg'}`}
                        alt='Profile Image'
                        className='h-[12svh] aspect-square rounded-full object-fill border-4 border-t-primary border-b-primary border-r-primary border-l-primary'
                    />
                </div>
            </div>

            <div className='h-full flex flex-col justify-center items-center w-full bg-transparent text-center'>
                <div className='text-lg font-bold'>{orgName}</div>
                <div className='text-md text-gray-500 text-pretty'>This is the description.</div>

                <div className='flex justify-center space-x-8 p-4'>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-lg font-bold font-mono'>{follower_count || 0}k</div>
                        <div className='text-md text-gray-500'>Followers</div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-lg font-bold font-mono'>{eventsCount || 0}</div>
                        <div className='text-md text-gray-500'>Events</div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-lg font-bold font-mono'>{attendanceCount || 0}</div>
                        <div className='text-md text-gray-500'>Attendees</div>
                    </div>
                </div>

                <div className='flex justify-center items-center space-x-4 my-4'>
                    <Button type='primary'>Follow</Button>
                    <Button className='text-primary border-primary'>Contact</Button>
                </div>
            </div>
        </div>
    );
}
