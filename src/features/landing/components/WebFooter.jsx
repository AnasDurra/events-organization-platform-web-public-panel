import { FacebookFilled, LinkedinFilled, XOutlined } from '@ant-design/icons';
import React from 'react';

export default function WebFooter() {
    return (
        <div
            className={`min-h-[40svh] w-full  bg-primary p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center lg:px-40`}
        >
            <div className='flex flex-col space-y-8 min-w-[20svw] sm:min-w-0 '>
                <div className='text-nowrap text-3xl  text-white font-[bangers]'>Eventure</div>
                <div className='flex flex-col '>
                    <div className='text-lg text-white'> Follow Us</div>
                    <div className='flex space-x-4 my-4'>
                        <FacebookFilled className='text-secondary text-[2.5em]' />
                        <XOutlined className='text-secondary text-[2.5em]' />
                        <LinkedinFilled className='text-secondary text-[2.5em]' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:space-x-8'>
                <div className='flex flex-col space-y-4'>
                    <div className='text-2xl text-white font-semibold mb-4'> About Us</div>
                    <div className='text-white text-lg hover:text-secondary hover:cursor-pointer'>Our Blog</div>
                    <div className='text-white text-lg hover:text-secondary hover:cursor-pointer'>Careers </div>
                    <div className='text-white text-lg hover:text-secondary hover:cursor-pointer'>Pricing </div>
                </div>
                <div className='flex flex-col space-y-4'>
                    <div className='text-2xl text-white font-semibold mb-4'> Contact Us</div>
                    <div className='text-white text-lg hover:text-secondary hover:cursor-pointer'> Email </div>
                    <div className='text-white text-lg hover:text-secondary hover:cursor-pointer'>Whatspp </div>
                    <div className='text-white text-lg hover:text-secondary hover:cursor-pointer'>Fax </div>
                </div>
                <div className='flex flex-col space-y-4'>
                    <div className='text-2xl text-white font-semibold mb-4'> Partners</div>
                    <div className='text-white text-lg hover:text-secondary hover:cursor-pointer'> Organizations </div>
                    <div className='text-white text-lg hover:text-secondary hover:cursor-pointer'>Payment </div>
                </div>
            </div>
        </div>
    );
}
