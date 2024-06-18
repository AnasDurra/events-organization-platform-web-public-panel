import { Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

export default function CategoryCard({ title, emoji, onClick }) {
    return (
        <div
            onClick={onClick}
            className='w-full flex justify-start space-x-2 items-baseline bg-primary rounded-xl px-4 py-2  bg-gradient-to-r from-primary from-10% via-primary via-80% to-primary to-100%'
        >
            <div className='text-xl'>{emoji}</div>
            <Title
                level={5}
                style={{ color: 'white' }}
            >
                {title}
            </Title>
        </div>
    );
}
