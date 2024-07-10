import React from 'react';
import styles from '../paper.module.css';
import EventCardWithImage from './cards/EventCardWithImage';
import { URL } from '../../../api/constants';
import { useGetSoonEventsQuery } from '../feedsSlice';
export default function SoonToHappenSection() {
    const {
        data: { result: { data: events } = { data: [] } } = { result: {} },
        isSuccess,
        isLoading,
        isError,
    } = useGetSoonEventsQuery({ page: 1, pageSize: 4 });

    return (
        <div className={`min-h-[40svh] ${styles.paper}`}>
            <div className='grid grid-cols-8 w-full my-8'>
                <div className='col-span-8 sm:col-span-6 sm:col-start-2'>
                    <div className='flex  items-center my-4 justify-between'>
                        <div className='text-2xl m-2 font-extrabold font-serif text-textPrimary '>
                            Soon To Happen Events
                        </div>
                    </div>
                    <div className='grid grid-cols-12 gap-4 w-full'>
                        {events?.map((event) => (
                            <div key={event.id} className='col-start-2 col-span-10 lg:col-span-4 xl:col-span-3'>
                                {console.log(event)}
                                <EventCardWithImage
                                    id={event.id}
                                    title={event.title}
                                    // description={event.description}
                                    tags={event.tags.map((tag) => tag.tag?.tagName)}
                                    organizationProfilePictureURL={
                                        URL + '/organization/mainPicture/' + event.organization?.main_picture
                                    }
                                    eventImageURL={`${URL.slice(0, -4)}${event.coverPictureUrl}`}
                                    regStartDate={event.registrationEndDate}
                                    event_type={event.eventType}
                                />
                                {console.log(`${URL.slice(0, -4)}${event.coverPictureUrl}`)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
const fakeEvents = [
    {
        id: '39',
        organization: {
            id: '1',
            name: 'ORG1',
            bio: 'Hil, here is Road Ride Organization',
            description: 'an offside event organizer',
            cover_picture: null,
            main_picture: null,
        },
        location: {
            latitude: '38.8951',
            longitude: '-77.0364',
        },
        address: null,
        address_notes: null,
        title: 'GPT: The New Generation of AI',
        cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1714546526893-556352708.png',
        description: 'Here is the description of the event',
        capacity: 50,
        event_type: 'onsite',
        registration_start_date: '2023-12-31 21:00:00',
        registration_end_date: '2024-01-03 21:00:00',
        age_groups: [
            {
                event_age_group_id: '60',
                age_group_id: '1',
                age_group_name: '5 - 12',
            },
            {
                event_age_group_id: '59',
                age_group_id: '3',
                age_group_name: '18 - 25',
            },
        ],
        tags: [
            {
                event_tag_id: '104',
                tag: {
                    value: '3',
                    label: 'Programming',
                },
            },
            {
                event_tag_id: '103',
                tag: {
                    value: '2',
                    label: 'Design',
                },
            },
            {
                event_tag_id: '102',
                tag: {
                    value: '1',
                    label: 'IT',
                },
            },
        ],
        days: [
            {
                id: '44',
                day_date: '2015-04-30',
                slots: [
                    {
                        id: '32',
                        label: 'Introduction',
                        start_time: '2024-02-01 09:23:00',
                        end_time: '2024-02-01 12:23:00',
                        slot_status: {
                            value: '1',
                            label: 'Pending',
                        },
                    },
                ],
            },
        ],
        photos: [
            {
                id: '59',
                photo_name: 'EV_39_IMG_photos-1714546526896-598044229.png',
                photo_url: 'http://localhost:3000/event_files/photos-1714546526896-598044229.png',
            },
        ],
        attachments: [
            {
                id: '84',
                file_name: 'EV_39_ATT_attachments-1714546526900-404393368.png',
                file_url: 'http://localhost:3000/event_files/attachments-1714546526900-404393368.png',
            },
        ],
        approval_statuses: [
            {
                set_by: 'alaazamel14',
                approval_status: {
                    value: '1',
                    label: 'In Review',
                },
                from_date: '2024-05-01 06:55:27',
                to_date: null,
                note: null,
            },
        ],
        is_chatting_enabled: true,
        chat_group: null,
        fees: null,
    },
    {
        id: '390',
        organization: {
            id: '1',
            name: 'ORG1',
            bio: 'Hil, here is Road Ride Organization',
            description: 'an offside event organizer',
            cover_picture: null,
            main_picture: null,
        },
        location: {
            latitude: '38.8951',
            longitude: '-77.0364',
        },
        address: null,
        address_notes: null,
        title: 'GPT: The New Generation of AI',
        cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1714546526893-556352708.png',
        description: 'Here is the description of the event',
        capacity: 50,
        event_type: 'onsite',
        registration_start_date: '2023-12-31 21:00:00',
        registration_end_date: '2024-01-03 21:00:00',
        age_groups: [
            {
                event_age_group_id: '60',
                age_group_id: '1',
                age_group_name: '5 - 12',
            },
            {
                event_age_group_id: '59',
                age_group_id: '3',
                age_group_name: '18 - 25',
            },
        ],
        tags: [
            {
                event_tag_id: '104',
                tag: {
                    value: '3',
                    label: 'Programming',
                },
            },
            {
                event_tag_id: '103',
                tag: {
                    value: '2',
                    label: 'Design',
                },
            },
            {
                event_tag_id: '102',
                tag: {
                    value: '1',
                    label: 'IT',
                },
            },
        ],
        days: [
            {
                id: '44',
                day_date: '2015-04-30',
                slots: [
                    {
                        id: '32',
                        label: 'Introduction',
                        start_time: '2024-02-01 09:23:00',
                        end_time: '2024-02-01 12:23:00',
                        slot_status: {
                            value: '1',
                            label: 'Pending',
                        },
                    },
                ],
            },
        ],
        photos: [
            {
                id: '59',
                photo_name: 'EV_39_IMG_photos-1714546526896-598044229.png',
                photo_url: 'http://localhost:3000/event_files/photos-1714546526896-598044229.png',
            },
        ],
        attachments: [
            {
                id: '84',
                file_name: 'EV_39_ATT_attachments-1714546526900-404393368.png',
                file_url: 'http://localhost:3000/event_files/attachments-1714546526900-404393368.png',
            },
        ],
        approval_statuses: [
            {
                set_by: 'alaazamel14',
                approval_status: {
                    value: '1',
                    label: 'In Review',
                },
                from_date: '2024-05-01 06:55:27',
                to_date: null,
                note: null,
            },
        ],
        is_chatting_enabled: true,
        chat_group: null,
        fees: null,
    },
    {
        id: '38',
        organization: {
            id: '1',
            name: 'ORG1',
            bio: 'Hil, here is Road Ride Organization',
            description: 'an offside event organizer',
            cover_picture: null,
            main_picture: null,
        },
        location: {
            latitude: '38.8951',
            longitude: '-77.0364',
        },
        address: null,
        address_notes: null,
        title: 'GPT: The New Generation of AI',
        cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1714545386744-711856152.png',
        description: 'Here is the description of the event',
        capacity: 50,
        event_type: 'onsite',
        registration_start_date: '2023-12-31 21:00:00',
        registration_end_date: '2024-01-03 21:00:00',
        age_groups: [
            {
                event_age_group_id: '58',
                age_group_id: '1',
                age_group_name: '5 - 12',
            },
            {
                event_age_group_id: '57',
                age_group_id: '3',
                age_group_name: '18 - 25',
            },
        ],
        tags: [
            {
                event_tag_id: '100',
                tag: {
                    value: '2',
                    label: 'Design',
                },
            },
            {
                event_tag_id: '99',
                tag: {
                    value: '1',
                    label: 'IT',
                },
            },
            {
                event_tag_id: '101',
                tag: {
                    value: '3',
                    label: 'Programming',
                },
            },
        ],
        days: [
            {
                id: '43',
                day_date: '2015-04-29',
                slots: [
                    {
                        id: '31',
                        label: 'Introduction',
                        start_time: '2024-02-01 09:23:00',
                        end_time: '2024-02-01 12:23:00',
                        slot_status: {
                            value: '1',
                            label: 'Pending',
                        },
                    },
                ],
            },
        ],
        photos: [
            {
                id: '58',
                photo_name: 'EV_38_IMG_photos-1714545386751-643699538.png',
                photo_url: 'http://localhost:3000/event_files/photos-1714545386751-643699538.png',
            },
        ],
        attachments: [
            {
                id: '83',
                file_name: 'EV_38_ATT_attachments-1714545386756-789461118.png',
                file_url: 'http://localhost:3000/event_files/attachments-1714545386756-789461118.png',
            },
        ],
        approval_statuses: [
            {
                set_by: 'alaazamel14',
                approval_status: {
                    value: '1',
                    label: 'In Review',
                },
                from_date: '2024-05-01 06:36:27',
                to_date: null,
                note: null,
            },
        ],
        is_chatting_enabled: true,
        chat_group: null,
        fees: null,
    },
    {
        id: '37',
        organization: {
            id: '1',
            name: 'ORG1',
            bio: 'Hil, here is Road Ride Organization',
            description: 'an offside event organizer',
            cover_picture: null,
            main_picture: null,
        },
        location: {
            latitude: '38.8951',
            longitude: '-77.0364',
        },
        address: null,
        address_notes: null,
        title: 'GPT: The New Generation of AI',
        cover_picture_url: 'http://localhost:3000/event_files/cover_picture-1714483790699-757360525.png',
        description: 'Here is the description of the event',
        capacity: 50,
        event_type: 'onsite',
        registration_start_date: '2023-12-31 21:00:00',
        registration_end_date: '2024-01-03 21:00:00',
        age_groups: [
            {
                event_age_group_id: '55',
                age_group_id: '3',
                age_group_name: '18 - 25',
            },
            {
                event_age_group_id: '56',
                age_group_id: '1',
                age_group_name: '5 - 12',
            },
        ],
        tags: [
            {
                event_tag_id: '96',
                tag: {
                    value: '1',
                    label: 'IT',
                },
            },
            {
                event_tag_id: '98',
                tag: {
                    value: '3',
                    label: 'Programming',
                },
            },
            {
                event_tag_id: '97',
                tag: {
                    value: '2',
                    label: 'Design',
                },
            },
        ],
        days: [
            {
                id: '42',
                day_date: '2015-04-28',
                slots: [
                    {
                        id: '30',
                        label: 'Introduction',
                        start_time: '2024-02-01 09:23:00',
                        end_time: '2024-02-01 12:23:00',
                        slot_status: {
                            value: '1',
                            label: 'Pending',
                        },
                    },
                ],
            },
        ],
        photos: [
            {
                id: '57',
                photo_name: 'EV_37_IMG_photos-1714483790701-691264837.cer',
                photo_url: 'http://localhost:3000/event_files/photos-1714483790701-691264837.cer',
            },
        ],
        attachments: [
            {
                id: '82',
                file_name: 'EV_37_ATT_attachments-1714483790701-487802035.png',
                file_url: 'http://localhost:3000/event_files/attachments-1714483790701-487802035.png',
            },
        ],
        approval_statuses: [
            {
                set_by: 'alaazamel14',
                approval_status: {
                    value: '1',
                    label: 'In Review',
                },
                from_date: '2024-04-30 13:29:51',
                to_date: null,
                note: null,
            },
        ],
        is_chatting_enabled: true,
        chat_group: null,
        fees: null,
    },
];
