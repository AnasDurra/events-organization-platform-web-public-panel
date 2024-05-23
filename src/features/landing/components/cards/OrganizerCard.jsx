import { Descriptions, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;
export default function OrganizerCard({ orgName, orgID, attendanceCount, eventsCount, className }) {
    const { token } = useToken();
    const navigate = useNavigate();

    return (
        <div
            className=' rounded-2xl bg-  shadow-sm hover:shadow-lg flex flex-col items-center justify-center w-[100%] h-[100%] bg-gray-100/85 space-y-2 hover:cursor-pointer '
            style={{ borderColor: token.colorPrimary }}
            onClick={() => navigate(`/org/${orgID}`)}
        >
            <div className='relative h-[19svh] w-full rounded-2xl '>
                <img
                    src='/assets/3.jpeg'
                    alt='Cover Image'
                    className={`h-[14svh] w-full object-fill  ${className} rounded-t-2xl `}
                />

                <div className='absolute inset-0  w-full h-full aspect-square flex items-center justify-center'>
                    <img
                        src='/assets/5.jpeg'
                        alt='Profile Image'
                        className='h-[12svh] mt-[12svh] aspect-square  rounded-full object-fill border-4 border-[#4E6C50]'
                    />
                </div>
            </div>

            <div className='h-full flex flex-col justify-center items-center w-full space-y-2 bg-transparent my-2 text-center p-2'>
                <div className='text-lg font-bold my-2'>{orgName}</div>

                <div className='flex justify-center space-x-8 pt-4'>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-lg font-bold font-mono'>800k</div>
                        <div className='text-md  text-gray-500'>Followers</div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-lg font-bold font-mono'>140</div>
                        <div className='text-md  text-gray-500'>Events</div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <div className='text-lg font-bold font-mono'>250</div>
                        <div className='text-md  text-gray-500'>Attendees</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
