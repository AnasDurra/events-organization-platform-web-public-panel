import { theme } from 'antd';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
const { useToken } = theme;

export default function EventCardWithDate({ onClick, eventTitle, eventDescription, eventDate }) {
    const { token } = useToken();

    const backgroundColors = ['#eef8ec', '#f8ecec', '#f8ecf8', '#eceff8'];

    const randomIndex = useMemo(() => Math.floor(Math.random() * backgroundColors.length), []);

    const randomBackgroundColor = backgroundColors[randomIndex];

    const formatDate = (dateString) => {
        const date = dayjs(dateString);
        const startDay = date.date();
        const endDay = date.add(9, 'day').date(); // Assuming the end day is 10 days after the start day
        const month = date.format('MMM').toUpperCase();
        const time = date.format('HH:mm');

        return (
            <div>
                <span>{`${startDay}-${endDay} ${month}`}</span> <br/>
                <span>{time}</span>
            </div>
        );
    };

    return (
        <div
            style={{ borderColor: token?.colorPrimary }}
            onClick={onclick}
            className={`bg-gradient-to-r from-green-50/50 from-10% via-green-100/60 via-80% to-green-200/30 to-100% flex items-center justify-between border-8 hover:transition hover:ease-in-out hover:delay-150 hover:-translate-y-1 hover:scale-80 duration-300 border-separate rounded-tl-none rounded-br-none border-[${token.colorPrimary}] space-x-2 p-4 bg-neutral-100 border-2 shadow-md hover:shadow-none hover:cursor-pointer  px-2 rounded-3xl`}
        >
            <div
                className={`p-4 text-center bg-${randomBackgroundColor} flex flex-col w-36`}
                style={{ backgroundColor: randomBackgroundColor }}
            >
                {eventDate && formatDate(eventDate)}
            </div>

            <div className='flex flex-col flex-1 w-50 p-4'>
                <div className='font-bold line-clamp-2'>{eventTitle}</div>
                <div className='text-gray-400 overflow-hidden line-clamp-3 text-sm'>{eventDescription}</div>
            </div>
        </div>
    );
}
