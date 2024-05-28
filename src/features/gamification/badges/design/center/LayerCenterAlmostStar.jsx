import React from 'react';

export default function LayerCenterAlmostStar({ color, width = 180, height = 180, position = 'absolute' }) {
    const slighterColor = lightenColor(color, 60);
    const lighterColor = lightenColor(color, 20);
    const xlighterColor = lightenColor(color, 40);
    return (
        <div style={{ position: 'relative', width, height }}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='100%'
                height='100%'
                style={{ position }}
                fill='none'
                viewBox='0 0 200 200'
            >
                <g clipPath='url(#clip0_119_272)'>
                    <path
                        fill={color}
                        d='M165.219 191.946c.4 4.435-10.687 10.089-14.175 7.32-30.036-23.837-72.026-23.843-102.069-.019-3.49 2.767-14.59-2.896-14.19-7.331 1.832-20.394-6.307-28.533-26.701-26.701-4.436.399-10.099-10.702-7.332-14.191 23.824-30.041 23.817-72.026-.02-102.06-2.768-3.488 2.886-14.576 7.321-14.177 20.416 1.839 28.565-6.3 26.731-26.703C34.386 3.648 45.486-2.015 48.975.752c30.043 23.825 72.033 23.818 102.069-.02 3.488-2.768 14.575 2.886 14.175 7.321-1.84 20.426 6.306 28.573 26.727 26.734 4.435-.4 10.089 10.688 7.321 14.176-23.831 30.034-23.838 72.021-.019 102.061 2.767 3.49-2.896 14.59-7.332 14.191-20.399-1.832-28.536 6.316-26.697 26.731Z'
                    ></path>
                </g>
                <defs>
                    <linearGradient
                        gradientTransform='rotate(0 0.5 0.5)'
                        id='SvgjsLinearGradient1071'
                    >
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(105, 234, 203)'
                            offset='0'
                        ></stop>
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(234, 204, 248)'
                            offset='0.48'
                        ></stop>
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(102, 84, 241)'
                            offset='1'
                        ></stop>
                    </linearGradient>
                </defs>
            </svg>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='90%'
                height='90%'
                style={{ position, top: '5%', left: '5%' }}
                fill='none'
                viewBox='0 0 200 200'
            >
                <g clipPath='url(#clip0_119_272)'>
                    <path
                        fill={slighterColor}
                        d='M165.219 191.946c.4 4.435-10.687 10.089-14.175 7.32-30.036-23.837-72.026-23.843-102.069-.019-3.49 2.767-14.59-2.896-14.19-7.331 1.832-20.394-6.307-28.533-26.701-26.701-4.436.399-10.099-10.702-7.332-14.191 23.824-30.041 23.817-72.026-.02-102.06-2.768-3.488 2.886-14.576 7.321-14.177 20.416 1.839 28.565-6.3 26.731-26.703C34.386 3.648 45.486-2.015 48.975.752c30.043 23.825 72.033 23.818 102.069-.02 3.488-2.768 14.575 2.886 14.175 7.321-1.84 20.426 6.306 28.573 26.727 26.734 4.435-.4 10.089 10.688 7.321 14.176-23.831 30.034-23.838 72.021-.019 102.061 2.767 3.49-2.896 14.59-7.332 14.191-20.399-1.832-28.536 6.316-26.697 26.731Z'
                    ></path>
                </g>
                <defs>
                    <linearGradient
                        gradientTransform='rotate(0 0.5 0.5)'
                        id='SvgjsLinearGradient1071'
                    >
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(105, 234, 203)'
                            offset='0'
                        ></stop>
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(234, 204, 248)'
                            offset='0.48'
                        ></stop>
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(102, 84, 241)'
                            offset='1'
                        ></stop>
                    </linearGradient>
                </defs>
            </svg>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='80%'
                height='80%'
                style={{ position, top: '10%', left: '10%' }}
                fill='none'
                viewBox='0 0 200 200'
            >
                <g clipPath='url(#clip0_119_272)'>
                    <path
                        fill={xlighterColor}
                        d='M165.219 191.946c.4 4.435-10.687 10.089-14.175 7.32-30.036-23.837-72.026-23.843-102.069-.019-3.49 2.767-14.59-2.896-14.19-7.331 1.832-20.394-6.307-28.533-26.701-26.701-4.436.399-10.099-10.702-7.332-14.191 23.824-30.041 23.817-72.026-.02-102.06-2.768-3.488 2.886-14.576 7.321-14.177 20.416 1.839 28.565-6.3 26.731-26.703C34.386 3.648 45.486-2.015 48.975.752c30.043 23.825 72.033 23.818 102.069-.02 3.488-2.768 14.575 2.886 14.175 7.321-1.84 20.426 6.306 28.573 26.727 26.734 4.435-.4 10.089 10.688 7.321 14.176-23.831 30.034-23.838 72.021-.019 102.061 2.767 3.49-2.896 14.59-7.332 14.191-20.399-1.832-28.536 6.316-26.697 26.731Z'
                    ></path>
                </g>
                <defs>
                    <linearGradient
                        gradientTransform='rotate(0 0.5 0.5)'
                        id='SvgjsLinearGradient1071'
                    >
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(105, 234, 203)'
                            offset='0'
                        ></stop>
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(234, 204, 248)'
                            offset='0.48'
                        ></stop>
                        <stop
                            stopOpacity='1'
                            stopColor='rgba(102, 84, 241)'
                            offset='1'
                        ></stop>
                    </linearGradient>
                </defs>
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
