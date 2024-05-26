import React from 'react';

export default function LayerBottomWaterfall({ color }) {
    return (
        <div
            style={{ position: 'absolute', zIndex: -3 }}
            className='mt-[15%] transform rotate-180'
        >
            <svg
                width='150'
                height='150'
                viewBox='0 0 200 200'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g clipPath='url(#clip0_231_730)'>
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M120 0H80V110C80 121.046 71.0457 130 60 130C48.9543 130 40 121.046 40 110V0H0V100C0 155.228 44.7715 200 100 200C155.228 200 200 155.228 200 100V0H160V110C160 121.046 151.046 130 140 130C128.954 130 120 121.046 120 110V0Z'
                        fill={color}
                    />
                </g>
                <defs>
                    <linearGradient
                        id='paint0_linear_231_730'
                        x1='100'
                        y1='0'
                        x2='100'
                        y2='200'
                        gradientUnits='userSpaceOnUse'
                    >
                        <stop stopColor='#A7B5FF' />
                        <stop
                            offset='1'
                            stopColor='#F3ACFF'
                        />
                    </linearGradient>
                    <clipPath id='clip0_231_730'>
                        <rect
                            width='200'
                            height='200'
                            fill='white'
                        />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}
