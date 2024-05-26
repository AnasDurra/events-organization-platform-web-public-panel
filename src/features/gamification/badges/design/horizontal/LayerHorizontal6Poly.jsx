import React from 'react';

export default function LayerHorizontal6Poly({ color, zIndex = -2, width = 220, height = 220, position = 'absolute' }) {
    return (
            <div style={{ position: position, zIndex }}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={width}
                    height={height}
                    fill='none'
                    viewBox='0 0 57 41'
                >
                    <path
                        fill={color}
                        d='M49.7 27.5c7.1 11.8-.9 16.6-10.8 8.6-5.4 4.2-14.9 4.2-20.3 0-9.9 8-17.8 3.2-10.8-8.6-9.6-3.8-9.6-10.5 0-14.3C.7 1.4 8.7-3.4 18.6 4.6 24 .4 33.5.4 38.9 4.6c9.9-8 17.8-3.2 10.8 8.6 9.6 3.8 9.6 10.5 0 14.3Z'
                    ></path>
                    <defs>
                        <linearGradient id='SvgjsLinearGradient1020'>
                            <stop
                                stopColor='#f6d365'
                                offset='0'
                            ></stop>
                            <stop
                                stopColor='#fda085'
                                offset='1'
                            ></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
    );
}
