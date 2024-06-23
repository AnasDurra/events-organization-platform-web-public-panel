import { Button } from 'antd';
import React from 'react';
import { URL } from '../constants';

export default function SeedPage() {
    const handleSeedClick = () => {
        fetch(URL + '/seed/admin')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='h-full w-full flex items-center justify-center'>
            <Button
                type='primary'
                onClick={handleSeedClick}
            >
                SEED
            </Button>
        </div>
    );
}
