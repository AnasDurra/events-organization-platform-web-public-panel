import { Card, Image } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';

const categories = [
    { title: 'Sport', icon: 'flat-color-icons:sports-mode' },
    { title: 'Tech', icon: 'streamline-emojis:woman-technologist-2' },
    { title: 'Music', icon: 'emojione:musical-keyboard' },
    { title: 'Gaming', icon: 'emojione-v1:video-game' },
    { title: 'Education', icon: 'streamline-emojis:graduation-cap' },
    // Add more categories here
];

export default function ViewAllCategoriesPage() {
    return (
        <div className='flex flex-col mt-2 space-y-4 px-4'>
            <div className='flex w-full justify-center'>
                <Title level={2}>Tags</Title>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {' '}
                {/* Responsive grid */}
                {categories.map((category) => (
                    <Card
                        key={category.title}
                        className='bg-gradient-to-b from-green-300 to-transparent hover:shadow-lg rounded-3xl hover:cursor-pointer'
                    >
                        <div className='flex justify-center items-center h-full p-4'>
                            <Icon
                                icon={category.icon}
                                style={{ fontSize: '4em' }}
                            />{' '}
                            {/* Adjust font size as needed */}
                        </div>
                        <Meta
                            title={category.title}
                            className='text-center text-white font-bold'
                        />{' '}
                        {/* White text on gradient */}
                    </Card>
                ))}
            </div>
        </div>
    );
}
