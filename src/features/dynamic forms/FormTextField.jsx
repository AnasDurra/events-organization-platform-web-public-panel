import { Form, Input, Space } from 'antd';
import React from 'react';

export default function FormTextField({ isDragging }) {
    return (
        <div
            className='bg-white  p-2 w-full h-full'
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Input
                className='box-border w-full max-w-full '
                placeholder='Your text field title'
            />
        </div>
    );
}
