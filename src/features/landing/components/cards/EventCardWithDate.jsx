import React, { useMemo } from 'react';

export default function EventCardWithDate({ onClick }) {
    const backgroundColors = ['#eef8ec', '#f8ecec', '#f8ecf8', '#eceff8'];

    const randomIndex = useMemo(() => Math.floor(Math.random() * backgroundColors.length), []);

    const randomBackgroundColor = backgroundColors[randomIndex];

    return (
        <div
            onClick={onclick}
            className='flex items-center justify-between space-x-2 bg-gray-100 border-2 shadow-md hover:shadow-none hover:cursor-pointer  px-2 rounded-lg'
        >
            <div
                className={`p-4 text-center bg-${randomBackgroundColor} flex flex-col w-36`}
                style={{ backgroundColor: randomBackgroundColor }}
            >
                <span>22-31 OCT</span>
                <span>19:00</span>
            </div>

            <div className='flex flex-col flex-1 w-50 p-4'>
                <div className='font-bold line-clamp-2'>Event Title Is Here</div>
                <div className='text-gray-400 overflow-hidden line-clamp-3 text-sm'>
                    Event Description is to be inserted here this is a current fake text or whatever. Event Description
                    is to be inserted here this is a current fake text or whatever. Event Description is to be inserted
                    here this is a current fake text or whatever. Event Description is to be inserted here this is a
                    current fake text or whatever.
                </div>
            </div>
        </div>
    );
}
