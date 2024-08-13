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
