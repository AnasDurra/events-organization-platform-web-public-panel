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
import { useNavigate } from 'react-router-dom';

const images = ['/assets/1.jpeg', '/assets/2.jpeg', '/assets/3.jpeg', '/assets/4.jpeg', '/assets/5.jpeg'];

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center justify-start w-full'>
            <Carousel
                className='w-full'
                infiniteLoop
                autoPlay
                emulateTouch
                showStatus={false}
                showThumbs={false}
                showArrows={false}
                showIndicators={false}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className='relative hover:cursor-pointer'
                        onClick={()=>navigate('event')}
                    >
                        <div className='m-2 rounded-3xl overflow-hidden shadow-md'>
                            <div className='absolute inset-0 mx-2 bg-black opacity-30 rounded-3xl'></div>{' '}
                            {/* Background layer */}
                            <img
                                className='h-[20svh] aspect-square object-cover rounded-3xl'
                                src={image}
                                alt={`Carousel Item ${index + 1}`}
                            />
                            <div className='absolute inset-0 flex items-center justify-center text-center text-white'>
                                <p className='font-bold text-xl'>Event Title {index + 1}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            <div className='flex flex-col w-full p-4'>
                <div className='flex justify-between items-center'>
                    <Title level={3}>Categories</Title>
                    <div
                        type='text'
                        className='text-gray-500 hover:cursor-pointer hover:shadow-2xl hover:animate-pulse px-2'
                        onClick={() => navigate('tags')}
                    >
                        see more
                    </div>
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
                            title={'Pets'}
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
