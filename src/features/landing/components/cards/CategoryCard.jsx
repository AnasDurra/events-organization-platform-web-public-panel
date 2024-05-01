import { Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

export default function CategoryCard({ title, emoji, color }) {
    return (
        
            <div className='w-full flex justify-start space-x-2 items-baseline bg-green-900/85 rounded-xl px-4 py-2  bg-gradient-to-r from-emerald-500/85 from-10% via-green-900/85 via-80% to-green-950 to-100%'>
                <div className='text-xl'>{emoji}</div>
                <Title level={5} style={{color:'white'}}>{title}</Title>
            </div>
        
    );
}
