import React from 'react';

export default function LayerDecorCrystal({
    width = 100,
    height = 100,
    marginTop = '7%',
    position = 'absolute',
    color,
}) {
    return (
        <svg
            width={width}
            height={height}
            style={{ position, marginTop }}
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            x='0px'
            y='0px'
            viewBox='0 0 100 125'
            enableBackground='new 0 0 100 100'
        >
            <polygon
                fill={color}
                points='23.3,33.2 75,33.2 50.9,81.7 '
            />
            <polygon
                fill={color}
                points='48.2,82.7 7.5,74.8 21.2,35.2 '
            />
            <polygon
                fill={color}
                points='92.2,74.8 53.5,82.8 77.1,35.3 '
            />
            <polygon
                fill={color}
                points='24,30.4 50.3,1 74.3,30.4 '
            />
            <polygon
                fill={color}
                points='91.2,23.1 77.7,30 56.1,3.7 '
            />
            <polygon
                fill={color}
                points='92.7,25.5 92.7,68.3 79.1,32.5 '
            />
            <polygon
                fill={color}
                points='7.1,26.8 19.2,32.5 7.1,67.5 '
            />
            <polygon
                fill={color}
                points='43.5,4.4 20.6,30.1 8.7,24.5 '
            />
            <polygon
                fill={color}
                points='49.5,85.9 49.5,98.4 14.2,79 49.5,85.9 '
            />
            <polyline
                fill={color}
                points='52.3,85.9 85.9,79 52.3,98.4 52.3,85.9 '
            />
        </svg>
    );
}
