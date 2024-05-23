import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Title from 'antd/es/typography/Title';
import { useGetFeaturedEventsQuery } from '../../feedsSlice';

export default function MainCarousel() {
    const navigate = useNavigate();

    const { data: { result: featuredEvents } = { result: [] } } = useGetFeaturedEventsQuery();

    return (
        <Carousel
            className='w-full h-[40svh]   '
            infiniteLoop
            autoPlay
            //  emulateTouch
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
        >
            {fakeFeaturedEvents.map((item, index) => (
                <div
                    key={index}
                    className='relative hover:cursor-pointer'
                    onClick={() => navigate('event')}
                >
                    {console.log(item.event.coverPictureUrl)}
                    <div className=' overflow-hidden shadow-md'>
                        <div className='absolute inset-0 bg-black opacity-30' />
                        <img
                            className='h-[40svh] aspect-square object-cover   '
                            src={item.event.coverPictureUrl}
                            alt={`Carousel Item ${index + 1}`}
                        />
                        <div className='absolute inset-0'>
                            <div className='grid grid-cols-8 w-full h-full'>
                                <div className='col-span-4 col-start-3 '>
                                    <div className='flex flex-col w-full h-full space-y-4 justify-center items-start'>
                                        <div className='flex flex-col space-y-0'>
                                            <Title
                                                level={4}
                                                className=' text-left m-0'
                                                style={{ color: 'white' }}
                                            >
                                                {item.event.organization?.name}
                                            </Title>
                                            <Title
                                                level={5}
                                                className=' text-left m-0'
                                                style={{ color: 'white' }}
                                            >
                                                {item.event.title}
                                            </Title>
                                        </div>

                                        <Button
                                            type='primary'
                                            className='w-40'
                                        >
                                            REGISTER
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}

const images = ['/assets/1.jpeg', '/assets/2.jpeg', '/assets/3.jpeg', '/assets/4.jpeg', '/assets/5.jpeg'];

const fakeFeaturedEvents = [
    {
        id: '3',
        createdAt: '2024-05-14T07:26:12.839Z',
        updatedAt: '2024-05-14T07:26:12.839Z',
        deletedAt: null,
        startDate: '2024-05-14T21:00:00.000Z',
        endDate: '2024-06-14T21:00:00.000Z',
        event: {
            id: '2',
            createdAt: '2024-03-29T22:26:00.556Z',
            updatedAt: '2024-03-29T22:26:00.556Z',
            deletedAt: null,
            addressNotes: null,
            location: null,
            title: 'dasd',
            coverPictureUrl: '/assets/1.jpeg',
            description: 'dsadas',
            capacity: 10,
            eventType: 'online',
            directRegister: false,
            registrationStartDate: '2024-03-14T21:00:00.000Z',
            registrationEndDate: '2024-06-14T21:00:00.000Z',
            isChattingEnabled: false,
            fees: '50',
            organization: {
                id: '1',
                createdAt: '2024-03-29T22:24:56.422Z',
                updatedAt: '2024-04-26T11:02:51.012Z',
                deletedAt: null,
                name: 'fds',
                bio: 'this is the bio',
                description: '',
                main_picture: 'divisorse76f9c3e-e69d-4df5-9e75-787203db4293.png',
                cover_picture: '',
            },
            address: null,
            tags: [],
            targetedAgrGroups: [],
            days: [],
            photos: [],
            attachments: [],
            approvalStatuses: [],
        },
        type: {
            id: '1',
            createdAt: '2024-05-14T07:23:09.059Z',
            updatedAt: '2024-05-14T07:23:09.059Z',
            deletedAt: null,
            name: 'Home page carousel',
        },
    },
    {
        id: '4',
        createdAt: '2024-05-14T07:26:45.167Z',
        updatedAt: '2024-05-14T07:26:45.167Z',
        deletedAt: null,
        startDate: '2024-05-14T21:00:00.000Z',
        endDate: '2024-06-14T21:00:00.000Z',
        event: {
            id: '2',
            createdAt: '2024-03-29T22:26:00.556Z',
            updatedAt: '2024-03-29T22:26:00.556Z',
            deletedAt: null,
            addressNotes: null,
            location: null,
            title: 'dasd',
            coverPictureUrl: '/assets/2.jpeg',
            description: 'dsadas',
            capacity: 10,
            eventType: 'online',
            directRegister: false,
            registrationStartDate: '2024-03-14T21:00:00.000Z',
            registrationEndDate: '2024-06-14T21:00:00.000Z',
            isChattingEnabled: false,
            fees: '50',
            organization: {
                id: '1',
                createdAt: '2024-03-29T22:24:56.422Z',
                updatedAt: '2024-04-26T11:02:51.012Z',
                deletedAt: null,
                name: 'fds',
                bio: 'this is the bio',
                description: '',
                main_picture: 'divisorse76f9c3e-e69d-4df5-9e75-787203db4293.png',
                cover_picture: '',
            },
            address: null,
            tags: [],
            targetedAgrGroups: [],
            days: [],
            photos: [],
            attachments: [],
            approvalStatuses: [],
        },
        type: {
            id: '1',
            createdAt: '2024-05-14T07:23:09.059Z',
            updatedAt: '2024-05-14T07:23:09.059Z',
            deletedAt: null,
            name: 'Home page carousel',
        },
    },
    {
        id: '5',
        createdAt: '2024-05-14T07:30:09.964Z',
        updatedAt: '2024-05-14T07:30:09.964Z',
        deletedAt: null,
        startDate: '2024-08-14T21:00:00.000Z',
        endDate: '2024-06-14T21:00:00.000Z',
        event: {
            id: '2',
            createdAt: '2024-03-29T22:26:00.556Z',
            updatedAt: '2024-03-29T22:26:00.556Z',
            deletedAt: null,
            addressNotes: null,
            location: null,
            title: 'dasd',
            coverPictureUrl: '/assets/3.jpeg',
            description: 'dsadas',
            capacity: 10,
            eventType: 'online',
            directRegister: false,
            registrationStartDate: '2024-03-14T21:00:00.000Z',
            registrationEndDate: '2024-06-14T21:00:00.000Z',
            isChattingEnabled: false,
            fees: '50',
            organization: {
                id: '1',
                createdAt: '2024-03-29T22:24:56.422Z',
                updatedAt: '2024-04-26T11:02:51.012Z',
                deletedAt: null,
                name: 'fds',
                bio: 'this is the bio',
                description: '',
                main_picture: 'divisorse76f9c3e-e69d-4df5-9e75-787203db4293.png',
                cover_picture: '',
            },
            address: null,
            tags: [],
            targetedAgrGroups: [],
            days: [],
            photos: [],
            attachments: [],
            approvalStatuses: [],
        },
        type: {
            id: '1',
            createdAt: '2024-05-14T07:23:09.059Z',
            updatedAt: '2024-05-14T07:23:09.059Z',
            deletedAt: null,
            name: 'Home page carousel',
        },
    },
    {
        id: '1',
        createdAt: '2024-05-14T07:25:02.264Z',
        updatedAt: '2024-05-14T07:31:07.592Z',
        deletedAt: null,
        startDate: '2024-04-11T21:00:00.000Z',
        endDate: '2024-06-14T21:00:00.000Z',
        event: {
            id: '2',
            createdAt: '2024-03-29T22:26:00.556Z',
            updatedAt: '2024-03-29T22:26:00.556Z',
            deletedAt: null,
            addressNotes: null,
            location: null,
            title: 'dasd',
            coverPictureUrl: '/assets/4.jpeg',
            description: 'dsadas',
            capacity: 10,
            eventType: 'online',
            directRegister: false,
            registrationStartDate: '2024-03-14T21:00:00.000Z',
            registrationEndDate: '2024-06-14T21:00:00.000Z',
            isChattingEnabled: false,
            fees: '50',
            organization: {
                id: '1',
                createdAt: '2024-03-29T22:24:56.422Z',
                updatedAt: '2024-04-26T11:02:51.012Z',
                deletedAt: null,
                name: 'fds',
                bio: 'this is the bio',
                description: '',
                main_picture: 'divisorse76f9c3e-e69d-4df5-9e75-787203db4293.png',
                cover_picture: '',
            },
            address: null,
            tags: [],
            targetedAgrGroups: [],
            days: [],
            photos: [],
            attachments: [],
            approvalStatuses: [],
        },
        type: {
            id: '1',
            createdAt: '2024-05-14T07:23:09.059Z',
            updatedAt: '2024-05-14T07:23:09.059Z',
            deletedAt: null,
            name: 'Home page carousel',
        },
    },
    {
        id: '2',
        createdAt: '2024-05-14T07:25:32.939Z',
        updatedAt: '2024-05-14T07:31:10.726Z',
        deletedAt: null,
        startDate: '2024-05-14T21:00:00.000Z',
        endDate: '2024-06-14T21:00:00.000Z',
        event: {
            id: '2',
            createdAt: '2024-03-29T22:26:00.556Z',
            updatedAt: '2024-03-29T22:26:00.556Z',
            deletedAt: null,
            addressNotes: null,
            location: null,
            title: 'dasd',
            coverPictureUrl: '/assets/5.jpeg',
            description: 'dsadas',
            capacity: 10,
            eventType: 'online',
            directRegister: false,
            registrationStartDate: '2024-03-14T21:00:00.000Z',
            registrationEndDate: '2024-06-14T21:00:00.000Z',
            isChattingEnabled: false,
            fees: '50',
            organization: {
                id: '1',
                createdAt: '2024-03-29T22:24:56.422Z',
                updatedAt: '2024-04-26T11:02:51.012Z',
                deletedAt: null,
                name: 'fds',
                bio: 'this is the bio',
                description: '',
                main_picture: 'divisorse76f9c3e-e69d-4df5-9e75-787203db4293.png',
                cover_picture: '',
            },
            address: null,
            tags: [],
            targetedAgrGroups: [],
            days: [],
            photos: [],
            attachments: [],
            approvalStatuses: [],
        },
        type: {
            id: '1',
            createdAt: '2024-05-14T07:23:09.059Z',
            updatedAt: '2024-05-14T07:23:09.059Z',
            deletedAt: null,
            name: 'Home page carousel',
        },
    },
    {
        id: '6',
        createdAt: '2024-05-14T08:56:57.111Z',
        updatedAt: '2024-05-14T08:56:57.111Z',
        deletedAt: null,
        startDate: '2024-05-14T21:00:00.000Z',
        endDate: '2024-06-14T21:00:00.000Z',
        event: {
            id: '8',
            createdAt: '2024-04-25T05:50:43.985Z',
            updatedAt: '2024-04-25T06:10:01.819Z',
            deletedAt: null,
            addressNotes: null,
            location: {
                latitude: '38.8951',
                longitude: '-77.0364',
            },
            title: 'GPT: The New Generation of AI',
            coverPictureUrl: '/assets/1.jpeg',
            description: 'Here is the description of the event',
            capacity: 50,
            eventType: 'onsite',
            directRegister: true,
            registrationStartDate: '2023-12-31T21:00:00.000Z',
            registrationEndDate: '2024-01-03T21:00:00.000Z',
            isChattingEnabled: false,
            fees: null,
            organization: {
                id: '1',
                createdAt: '2024-03-29T22:24:56.422Z',
                updatedAt: '2024-04-26T11:02:51.012Z',
                deletedAt: null,
                name: 'fds',
                bio: 'this is the bio',
                description: '',
                main_picture: 'divisorse76f9c3e-e69d-4df5-9e75-787203db4293.png',
                cover_picture: '',
            },
            address: null,
            tags: [
                {
                    id: '16',
                    createdAt: '2024-04-25T05:50:43.985Z',
                    updatedAt: '2024-04-25T05:50:43.985Z',
                    deletedAt: null,
                },
                {
                    id: '17',
                    createdAt: '2024-04-25T05:50:43.985Z',
                    updatedAt: '2024-04-25T05:50:43.985Z',
                    deletedAt: null,
                },
                {
                    id: '18',
                    createdAt: '2024-04-25T05:50:43.985Z',
                    updatedAt: '2024-04-25T05:50:43.985Z',
                    deletedAt: null,
                },
            ],
            targetedAgrGroups: [
                {
                    id: '6',
                    createdAt: '2024-04-25T05:50:43.985Z',
                    updatedAt: '2024-04-25T05:50:43.985Z',
                    deletedAt: null,
                },
            ],
            days: [],
            photos: [
                {
                    id: '6',
                    createdAt: '2024-04-25T05:50:43.985Z',
                    updatedAt: '2024-04-25T05:50:43.985Z',
                    deletedAt: null,
                    photoName: 'EV_8_IMG_photos-1714024243942-283568467.png',
                    photoUrl: '/event_files/photos-1714024243942-283568467.png',
                },
            ],
            attachments: [
                {
                    id: '6',
                    createdAt: '2024-04-25T05:50:43.985Z',
                    updatedAt: '2024-04-25T05:50:43.985Z',
                    deletedAt: null,
                    fileName: 'EV_8_ATT_attachments-1714024243942-142813415.png',
                    fileUrl: '/event_files/attachments-1714024243942-142813415.png',
                },
            ],
            approvalStatuses: [],
        },
        type: {
            id: '1',
            createdAt: '2024-05-14T07:23:09.059Z',
            updatedAt: '2024-05-14T07:23:09.059Z',
            deletedAt: null,
            name: 'Home page carousel',
        },
    },
];
