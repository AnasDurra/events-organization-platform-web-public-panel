import React from 'react';
import { Space, Typography, Skeleton } from 'antd';
import { FaLocationDot } from 'react-icons/fa6';

export default function AddressInfo({ org, isLoading }) {
    return (
        <Skeleton loading={isLoading}>
            <div style={{ width: '100%' }}>
                <div
                    className='text-lg text-textPrimary font-sans'
                >
                    {' '}
                    Address
                </div>
                {org?.addresses?.map((addr) => (
                    <Space.Compact
                        key={addr.id}
                        style={{ color: 'darkblue' }}
                        className='my-2'
                    >
                        <FaLocationDot className=' mr-2 text-[1.5em] text-secondary' />
                        <div className='text-textPrimary'>
                            {addr.address?.city?.cityName}, {addr.address?.state?.stateName}
                        </div>
                    </Space.Compact>
                ))}
            </div>
        </Skeleton>
    );
}
