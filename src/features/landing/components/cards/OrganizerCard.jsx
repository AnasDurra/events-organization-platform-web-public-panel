import { theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { useToken } = theme;
export default function OrganizerCard({ orgName, orgID, attendanceCount, eventsCount, className }) {
    const { token } = useToken();
    const navigate = useNavigate();

    return (
        <div
            className={` rounded-tr-3xl  shadow-sm hover:shadow-lg   flex flex-col items-center justify-center w-[100%] h-[100%] bg-transparent space-y-2 hover:cursor-pointer ${className} `}
            style={{ borderColor: token.colorPrimary }}
            onClick={() => navigate(`/org/${orgID}`)}
        >
            <div className='relative h-[14svh] w-full  '>
                <img
                    src='/assets/3.jpeg'
                    alt='Cover Image'
                    className={`h-[14svh] w-full object-fill rounded-tr-3xl ${className} `}
                />

                <div className='absolute inset-0  w-full h-full aspect-square flex items-center justify-center'>
                    <img
                        src='/assets/5.jpeg'
                        alt='Profile Image'
                        className='h-[10svh] aspect-square rounded-full object-fill border-4 border-white'
                    />
                </div>
            </div>

            <div className='h-full flex flex-col justify-center items-center w-full space-y-2 bg-transparent my-2 text-center p-2'>
                <Title
                    level={4}
                    style={{ marginBottom: 0 }}
                >
                    {orgName}
                </Title>
                <div className='flex flex-col justify-center  items-center text-gray-500 '>
                    <div>
                        <span>+{eventsCount}</span> <span> events</span>
                    </div>
                    <div>+{attendanceCount} Attendants</div>
                </div>
            </div>
        </div>
    );
}
