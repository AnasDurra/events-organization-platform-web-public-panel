import React from 'react';

export default function EventRankCard({ rank, imgUrl }) {
    let textColorClass = '';

    switch (rank) {
        case 1:
            textColorClass = 'text-yellow-500'; // Gold color for rank 1
            break;
        case 2:
            textColorClass = 'text-gray-400'; // Silver color for rank 2
            break;
        case 3:
            textColorClass = 'text-orange-400'; // Bronze color for rank 3
            break;
        default:
            textColorClass = 'text-black'; // Default color for other ranks
    }

    return (
        <div
            className={`relative h-[24svh]  bg-white shadow-md p-6  bg-[length:100%_100%] rounded-tl-3xl rounded-br-3xl rounded-tr-3xl `}
            style={{ backgroundImage: `url('${imgUrl}')` }}
        >
            <div
                style={{ WebkitTextStroke: '2px white' }}
                className={`absolute bottom-[-10px] shadow-sm bg-transparent   left-[-10px] text-7xl font-bold text-primary ${textColorClass}`}
            >
                <span className='text-5xl'>#</span>
                <span>{rank}</span>
            </div>
        </div>
    );
}
