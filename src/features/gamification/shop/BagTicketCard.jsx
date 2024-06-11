import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { PlusOneOutlined } from '@mui/icons-material';
import { Button } from 'antd';
import React from 'react';
import { TiTicket } from 'react-icons/ti';

export default function BagTicketCard({ title, rp_value, quantity, onAddOne, onRemoveOne, onRemove }) {
    return (
        <div className=' flex items-center space-x-4 bg-white border-2 border-primary w-full p-1 rounded-2xl'>
            <div className='flex justify-start space-x-2 items-center w-[50%]'>
                <TiTicket className='text-[3em] text-yellow-600'></TiTicket>
                <div className='flex flex-col items-start justify-center text-gray-500'>
                    <div>{title}</div>
                    <div className='flex items-center space-x-1'>
                        {' '}
                        {rp_value}
                        <img
                            className='w-[1.5em]'
                            src='../assets/points-rp.svg'
                        ></img>
                    </div>
                </div>
            </div>

            <div className='flex flex-col space-y-1 w-[50%] justify-center items-center'>
                <div className='flex justify-center items-center space-x-2 text-sm'>
                    <Button
                        type='primary'
                        size='small'
                        icon={<MinusOutlined></MinusOutlined>}
                        className='w-full'
                        onClick={onRemoveOne}
                    ></Button>
                    <div className='text-center w-[40%]'>{quantity} pcs</div>

                    <Button
                        type='primary'
                        size='small'
                        icon={<PlusOutlined></PlusOutlined>}
                        className='w-full'
                        onClick={onAddOne}
                    ></Button>
                </div>

                <Button
                    type='primary'
                    className='w-[80%] text-sm'
                    size='small'
                    onClick={onRemove}
                >
                    Remove
                </Button>
            </div>
        </div>
    );
}
