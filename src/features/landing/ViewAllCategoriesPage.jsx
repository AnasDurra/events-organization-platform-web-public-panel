import { Card, Image } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from './feedsSlice';

export default function ViewAllCategoriesPage() {
    const navigate = useNavigate();

    const { data: { result: categories } = { result: [] } } = useGetCategoriesQuery();

    const displayedCategories = categories.map((category) => ({
        id: category.id,
        tagName: category.tagName,
        emoji: getCategoryEmoji(category.tagName.toLowerCase()),
    }));

    function getCategoryEmoji(tagName) {
        switch (tagName) {
            case 'sport':
                return 'flat-color-icons:sports-mode';
            case 'tech':
                return 'streamline-emojis:woman-technologist-2';
            case 'music':
                return 'emojione:musical-keyboard';
            case 'gaming':
                return 'emojione-v1:video-game';
            case 'education':
                return 'streamline-emojis:graduation-cap';
            default:
                return null;
        }
    }

    return (
        <div className='grid grid-cols-8 w-full  mb-4'>
            <div className='col-span-8 sm:col-span-6 sm:col-start-2 '>
                <div className='flex flex-col mt-2 space-y-4 px-4'>
                    <div className='flex w-full justify-center'>
                        <Title level={2}>Categories</Title>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {displayedCategories.map((category) => (
                            <Card
                                key={category.tagName}
                                className='bg-gradient-to-b min-h-[20svh] from-primary/80 to-secondary/80 hover:shadow-lg rounded-3xl hover:cursor-pointer flex justify-center items-center'
                                onClick={() => navigate(`/home/categories/${category.tagName}/${category.id}`)}
                            >
                                {category.emoji && (
                                    <div className='flex justify-center items-center h-full p-4'>
                                        <Icon
                                            icon={category.emoji}
                                            style={{ fontSize: '4em' }}
                                        />
                                    </div>
                                )}
                                <Meta
                                    title={<div className='text-lg text-white'>{category.tagName}</div>}
                                    className='text-center text-white font-bold'
                                />
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
