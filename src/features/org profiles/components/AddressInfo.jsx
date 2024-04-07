import React from 'react';
import { Space, Typography, Skeleton } from 'antd';
import { FaLocationDot } from 'react-icons/fa6';

export default function AddressInfo({ org, isLoading }) {
    return (
        <Skeleton loading={isLoading}>
            <div style={{ width: '100%' }}>
                <Typography.Title
                    level={5}
                    className='my-2'
                >
                    {' '}
                    Address
                </Typography.Title>
                {org?.addresses?.map((addr) => (
                    <Space.Compact
                        key={addr.id}
                        style={{ color: 'darkblue' }}
                        className='my-2'
                    >
                        <FaLocationDot className='icon-location' />
                        <Typography.Text style={{ color: 'darkblue' }}>
                            {addr.address?.city?.cityName}, {addr.address?.state?.stateName}
                        </Typography.Text>
                    </Space.Compact>
                ))}
            </div>
        </Skeleton>
    );
}
