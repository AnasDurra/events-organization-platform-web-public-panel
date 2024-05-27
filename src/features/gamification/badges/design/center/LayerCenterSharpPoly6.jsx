import React from 'react';

export default function LayerCenterSharpPoly6({ color }) {
    const lighterColor = lightenColor(color, 20); 
    const xlighterColor = lightenColor(color, 40); 


    return (
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                id='Layer_1'
                viewBox='0 0 512 512'
                width='100%'
                height='100%'
                style={{ position: 'absolute' }}
            >
                <path
                    d='m485.291 129.408-224-128a10.645 10.645 0 0 0-10.581 0l-224 128a10.665 10.665 0 0 0-5.376 9.259v234.667c0 3.819 2.048 7.36 5.376 9.259l224 128c1.643.939 3.456 1.408 5.291 1.408s3.648-.469 5.291-1.408l224-128a10.665 10.665 0 0 0 5.376-9.259V138.667a10.668 10.668 0 0 0-5.377-9.259z'
                    fill={color}
                ></path>
            </svg>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                id='Layer_2'
                viewBox='0 0 512 512'
                width='80%'
                height='80%'
                style={{ position: 'absolute', top: '10%', left: '10%' }}
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
                    d='m485.291 129.408-224-128a10.645 10.645 0 0 0-10.581 0l-224 128a10.665 10.665 0 0 0-5.376 9.259v234.667c0 3.819 2.048 7.36 5.376 9.259l224 128c1.643.939 3.456 1.408 5.291 1.408s3.648-.469 5.291-1.408l224-128a10.665 10.665 0 0 0 5.376-9.259V138.667a10.668 10.668 0 0 0-5.377-9.259z'
                    fill='url(#gradient)'
                ></path>
            </svg>
        </div>
    );
}

function lightenColor(color, amount) {
    const colorValue = color.replace('#', '');
    const num = parseInt(colorValue, 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;
    const newColor = (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
        .toString(16)
        .slice(1);

    return `#${newColor}`;
}
