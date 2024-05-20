import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CategoryCard from './components/cards/CategoryCard';
import EventCard from './components/cards/EventCard';
import OrganizerCard from './components/cards/OrganizerCard';
import HappeningNowSection from './components/HappeningNowSection';
import OrganizersSection from './components/OrganizersSection';

export default function HomePage() {
    return (
        <div className='flex flex-col items-center justify-start w-full'>
            <Carousel
                className='w-full'
                infiniteLoop
                autoPlay
                emulateTouch
                //centerMode
                showStatus={false}
                showThumbs={false}
                showArrows={false}
                showIndicators={false}
            >
                <div>
                    <div className='m-2 rounded-3xl'>
                        <img
                            className='h-[20svh] aspect-square overflow-hidden rounded-3xl'
                            src={'/assets/1.jpeg'}
                        />
                    </div>
                </div>
                <div>
                    <div className='m-2 rounded-3xl'>
                        <img
                            className='h-[20svh] aspect-square overflow-hidden rounded-3xl'
                            src={'/assets/2.jpeg'}
                        />
                    </div>
                </div>

                <div>
                    <div className='m-2 rounded-3xl'>
                        <img
                            className='h-[20svh] aspect-square overflow-hidden rounded-3xl'
                            src={'/assets/3.jpeg'}
                        />
                    </div>
                </div>

                <div>
                    <div className='m-2 rounded-3xl'>
                        <img
                            className='h-[20svh] aspect-video overflow-hidden rounded-3xl'
                            src={'/assets/4.jpeg'}
                        />
                    </div>
                </div>

                <div>
                    <div className='m-2 rounded-3xl'>
                        <img
                            className='h-[20svh] aspect-square overflow-hidden rounded-3xl'
                            src={'/assets/5.jpeg'}
                        />
                    </div>
                </div>
            </Carousel>

            <div className='flex flex-col w-full p-4'>
                <div className='flex justify-between items-center'>
                    <Title level={3}>Categories</Title>
                    <Button
                        type='text'
                        className='text-gray-500'
                    >
                        view all
                    </Button>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className=' hover:cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300'>
                        <CategoryCard
                            title={'Sport'}
                            emoji={'🤸'}
                        />
                    </div>
                    <div className=' hover:cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300'>
                        <CategoryCard
                            title={'Tech'}
                            emoji={'🤖'}
                        />
                    </div>
                    <div className=' hover:cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300'>
                        <CategoryCard
                            title={'Music'}
                            emoji={'🏟️'}
                        />
                    </div>
                    <div className=' hover:cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300'>
                        <CategoryCard
                            title={'Gaming'}
                            emoji={'🎮'}
                        />
                    </div>
                    <div className=' hover:cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300'>
                        <CategoryCard
                            title={'Educational'}
                            emoji={'🎓'}
                        />
                    </div>
                    <div className=' hover:cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300'>
                        <CategoryCard
                            title={'Entertainment'}
                            emoji={'🌎'}
                        />
                    </div>
                </div>
            </div>

            <HappeningNowSection />

            <OrganizersSection />

            <div className='flex flex-col w-full p-4'>
                <div className='flex justify-between items-center'>
                    <Title level={3}>More events</Title>

                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: (
                                        <a
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href='https://www.antgroup.com'
                                        >
                                            global
                                        </a>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: (
                                        <a
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href='https://www.aliyun.com'
                                        >
                                            damascus
                                        </a>
                                    ),
                                },
                            ],
                        }}
                    >
                        <Space>
                            global
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </div>

                <div className='flex flex-col w-full space-y-4'>
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>
            </div>
            {/* <EventCard /> */}
        </div>
    );
}
