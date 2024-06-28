import React from 'react';
import { lightenColor } from '../../../../../utils/colors';

export default function LayerCenterPoly8({ color }) {
    const slighterColor = lightenColor(color, 60);
    const lighterColor = lightenColor(color, 20);
    const xlighterColor = lightenColor(color, 40);
    return (
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100%'
                height='100%'
                style={{ position: 'absolute' }}
                fill='none'
                viewBox='0 0 53 53'
            >
                <path
                    fill={color}
                    d='M52.1 26.5c0 3.2-4.3 5.6-5.5 8.4-1.2 2.9.1 7.6-2.1 9.8-2.2 2.2-6.9.9-9.8 2.1-2.8 1.2-5.2 5.5-8.4 5.5s-5.6-4.3-8.4-5.5c-2.9-1.2-7.6.1-9.8-2.1-2.2-2.2-.9-6.9-2.1-9.8C4.8 32.1.5 29.7.5 26.5s4.3-5.6 5.5-8.4c1.2-2.9-.1-7.6 2.1-9.8 2.2-2.2 6.9-.9 9.8-2.1C20.7 5 23.1.7 26.3.7s5.6 4.3 8.4 5.5c2.9 1.2 7.6-.1 9.8 2.1 2.2 2.2.9 6.9 2.1 9.8 1.2 2.8 5.5 5.2 5.5 8.4Z'
                ></path>
                <defs>
                    <linearGradient id='SvgjsLinearGradient1025'>
                        <stop
                            stopColor='#f5f7fa'
                            offset='0'
                        ></stop>
                        <stop
                            stopColor='#c3cfe2'
                            offset='1'
                        ></stop>
                    </linearGradient>
                </defs>
            </svg>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='95%'
                height='95%'
                style={{ position: 'absolute', top: '2.5%', left: '2.5%' }}
                fill='none'
                viewBox='0 0 53 53'
            >
                <path
                    fill={slighterColor}
                    d='M52.1 26.5c0 3.2-4.3 5.6-5.5 8.4-1.2 2.9.1 7.6-2.1 9.8-2.2 2.2-6.9.9-9.8 2.1-2.8 1.2-5.2 5.5-8.4 5.5s-5.6-4.3-8.4-5.5c-2.9-1.2-7.6.1-9.8-2.1-2.2-2.2-.9-6.9-2.1-9.8C4.8 32.1.5 29.7.5 26.5s4.3-5.6 5.5-8.4c1.2-2.9-.1-7.6 2.1-9.8 2.2-2.2 6.9-.9 9.8-2.1C20.7 5 23.1.7 26.3.7s5.6 4.3 8.4 5.5c2.9 1.2 7.6-.1 9.8 2.1 2.2 2.2.9 6.9 2.1 9.8 1.2 2.8 5.5 5.2 5.5 8.4Z'
                ></path>
            </svg>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='80%'
                height='80%'
                style={{ position: 'absolute', top: '10%', left: '10%' }}
                fill='none'
                viewBox='0 0 53 53'
            >
                <defs>
                    <linearGradient
                        id='gradient'
                        x1='0%'
                        y1='0%'
                        x2='100%'
                        y2='0%'
                    >
                        <stop
                            offset='0%'
                            style={{ stopColor: lighterColor }}
                        />
                        <stop
                            offset='100%'
                            style={{ stopColor: xlighterColor }}
                        />
                    </linearGradient>
                </defs>
                <path
                    fill={lighterColor}
                    d='M52.1 26.5c0 3.2-4.3 5.6-5.5 8.4-1.2 2.9.1 7.6-2.1 9.8-2.2 2.2-6.9.9-9.8 2.1-2.8 1.2-5.2 5.5-8.4 5.5s-5.6-4.3-8.4-5.5c-2.9-1.2-7.6.1-9.8-2.1-2.2-2.2-.9-6.9-2.1-9.8C4.8 32.1.5 29.7.5 26.5s4.3-5.6 5.5-8.4c1.2-2.9-.1-7.6 2.1-9.8 2.2-2.2 6.9-.9 9.8-2.1C20.7 5 23.1.7 26.3.7s5.6 4.3 8.4 5.5c2.9 1.2 7.6-.1 9.8 2.1 2.2 2.2.9 6.9 2.1 9.8 1.2 2.8 5.5 5.2 5.5 8.4Z'
                ></path>
            </svg>
        </div>
    );
}

