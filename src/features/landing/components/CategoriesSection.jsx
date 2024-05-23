import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './cards/CategoryCard';
import { useGetCategoriesQuery } from '../feedsSlice';

export default function CategoriesSection() {
    const navigate = useNavigate();

    const { data: { result: categories } = { result: [] } } = useGetCategoriesQuery();

    const fakeCategories = [
        { id: 'fake-1', tagName: 'Sport', emoji: '🤸' },
        { id: 'fake-2', tagName: 'Tech', emoji: '🤖' },
        { id: 'fake-3', tagName: 'Music', emoji: '🏟️' },
        { id: 'fake-4', tagName: 'Gaming', emoji: '🎮' },
        { id: 'fake-5', tagName: 'Educational', emoji: '🎓' },
        { id: 'fake-6', tagName: 'Pets', emoji: '🌎' },
    ];

    const displayedCategories = [...fakeCategories, ...categories].slice(0, 6);

    return (
        <div className='grid grid-cols-8 w-full my-2 mt-8'>
            <div className='col-span-8 sm:col-span-6 sm:col-start-2'>
                <div className='flex flex-col w-full p-4 min-h-[40svh]'>
                    <div className='flex justify-between items-center my-4'>
                        <div className='text-2xl m-2 font-extrabold font-serif text-pretty'>Categories</div>
                        <div
                            className='text-[#4E6C50] text-xl font-bold hover:cursor-pointer hover:shadow-2xl hover:animate-pulse px-2'
                            onClick={() => navigate('categories')}
                        >
                            see more
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        {displayedCategories.map((category) => (
                            <div
                                key={category.tagName}
                                className='hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'
                            >
                                <CategoryCard
                                    onClick={() => {
                                        console.log('hii');
                                        navigate(`categories/${category.tagName}/${category.id}`);
                                    }}
                                    title={category.tagName}
                                    emoji={category.emoji}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
