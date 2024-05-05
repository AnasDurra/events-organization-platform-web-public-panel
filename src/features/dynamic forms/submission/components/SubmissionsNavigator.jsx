import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import React from 'react';

export default function SubmissionsNavigator({ submissionsCount, currentIndex, onNext, onPrevious, onChange }) {
    return (
        <Space.Compact className='w-full space-x-1'>
            <Space className='w-[20%]'>
                <Button
                    type='text'
                    icon={<LeftOutlined />}
                    onClick={onPrevious}
                />
            </Space>
            <Space className='w-[30%]'>
                <InputNumber
                    style={{ width: '100%', textAlign: 'center' }}
                    size='small'
                    value={currentIndex + 1}
                    controls={false}
                    variant='filled'
                    onChange={onchange}
                />
            </Space>{' '}
            <Space className='w-[30%] text-center'>
                <div className='text-center'> {`/${submissionsCount}`}</div>
            </Space>{' '}
            <Space className='w-[20%]'>
                <Button
                    type='text'
                    icon={<RightOutlined />}
                    onClick={onNext}
                />
            </Space>
        </Space.Compact>
    );
}
