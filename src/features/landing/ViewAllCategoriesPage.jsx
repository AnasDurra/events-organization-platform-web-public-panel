import { Card, Image } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from './feedsSlice';

const categories = [
    { title: 'Sport', icon: 'flat-color-icons:sports-mode' },
    { title: 'Tech', icon: 'streamline-emojis:woman-technologist-2' },
    { title: 'Music', icon: 'emojione:musical-keyboard' },
    { title: 'Gaming', icon: 'emojione-v1:video-game' },
    { title: 'Education', icon: 'streamline-emojis:graduation-cap' },
];

export default function ViewAllCategoriesPage() {
    const navigate = useNavigate();

    const { data: { result: categories } = { result: [] } } = useGetCategoriesQuery();

    const fakeCategories = [
        { id: 'fake-1', tagName: 'Sport', emoji: 'flat-color-icons:sports-mode' },
        { id: 'fake-2', tagName: 'Tech', emoji: 'streamline-emojis:woman-technologist-2' },
        { id: 'fake-3', tagName: 'Music', emoji: 'emojione:musical-keyboard' },
        { id: 'fake-4', tagName: 'Gaming', emoji: 'emojione-v1:video-game' },
        { id: 'fake-5', tagName: 'Education', emoji: 'streamline-emojis:graduation-cap' },
    ];

    const displayedCategories = [...fakeCategories, ...categories];

    return (
        <div className='grid grid-cols-8 w-full  mb-4'>
            <div className='col-span-8 sm:col-span-6 sm:col-start-2 '>
                <div className='flex flex-col mt-2 space-y-4 px-4'>
                    <div className='flex w-full justify-center'>
                        <Title level={2}>Tags</Title>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {' '}
                        {displayedCategories.map((category) => (
                            <Card
                                key={category.title}
                                className='bg-gradient-to-b from-primary/80 to-secondary/80 hover:shadow-lg rounded-3xl hover:cursor-pointer'
                                onClick={() => navigate(`${category.tagName}/${category.id}`)}
                            >
                                <div className='flex justify-center items-center h-full p-4'>
                                    <Icon
                                        icon={category.emoji}
                                        style={{ fontSize: '4em' }}
                                    />{' '}
                                </div>
                                <Meta
                                    title={<div className='text-lg text-white'>{category.tagName}</div>}
                                    className='text-center text-white font-bold'
                                />{' '}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
