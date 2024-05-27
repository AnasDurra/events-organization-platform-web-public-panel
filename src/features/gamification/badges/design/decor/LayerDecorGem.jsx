import React from 'react';

export default function LayerDecorGem({ width = 100, height = 100, marginTop = '7%', position = 'absolute', color }) {
    return (
        <svg
            width={100}
            height={100}
            style={{ position, marginTop }}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 60 75'
            x='0px'
            y='0px'
        >
            <path
                fill={color}
                d='M30,39.421l16.607-20.3L40.63,14H19.37l-5.977,5.123ZM28.707,16.293a1,1,0,0,1,0,1.414l-5,5a1,1,0,0,1-1.414-1.414l5-5A1,1,0,0,1,28.707,16.293Zm-7.414,0a1,1,0,0,1,1.414,1.414l-2,2a1,1,0,0,1-1.414-1.414Z'
            />
            <polygon
                fill={color}
                points='43.473 8 16.527 8 19.503 12 40.497 12 43.473 8'
            />
            <polygon
                fill={color}
                points='57.108 18 45.625 8.459 42.359 12.849 48.369 18 57.108 18'
            />
            <polygon
                fill={color}
                points='48.474 20 31 41.357 31 51.359 57.65 20 48.474 20'
            />
            <polygon
                fill={color}
                points='29 51.359 29 41.357 11.526 20 2.35 20 29 51.359'
            />
            <polygon
                fill={color}
                points='11.631 18 17.641 12.849 14.375 8.459 2.892 18 11.631 18'
            />
        </svg>
    );
}
