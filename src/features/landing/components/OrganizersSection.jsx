import { Button, Empty, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import OrganizerCard from './cards/OrganizerCard';
import { useGetOrganizationsSummaryQuery } from '../feedsSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../paper.module.css';

export default function OrganizersSection() {
    const {
        data: { result: { data: orgs } = { data: [] } } = { result: {} },
        isSuccess,
        isLoading,
        isError,
    } = useGetOrganizationsSummaryQuery({ page: 1, pageSize: 4 });

    const navigate = useNavigate();
    return (
        <div className={`flex flex-col w-full p-4 ${styles.paper} w-[100svw]`}>
            <div className='grid grid-cols-8 w-full  mb-4'>
                <div className='col-span-8 sm:col-span-6 sm:col-start-2 '>
                    <div className='flex justify-between items-center my-2'>
                        <div className='text-2xl m-2 font-extrabold font-serif text-pretty'>Discover New Organizations</div>
                        <div
                            className='text-[#4E6C50]  text-xl font-bold  hover:cursor-pointer hover:shadow-2xl hover:animate-pulse px-2'
                            onClick={() => navigate('orgs')}
                        >
                            see more
                        </div>
                    </div>
                    <Skeleton loading={isLoading}>
                        {Array.isArray(orgs) && orgs.length > 0 ? (
                            <div className='grid grid-cols-1  sm:grid-cols-3 gap-4'>
                                {orgs.slice(0, 4).map((org, index) => (
                                    <OrganizerCard
                                        key={'org-' + index}
                                        orgID={org?.org_id}
                                        orgName={org?.org_name}
                                        attendanceCount={org?.attendees_num}
                                        eventsCount={org?.events_num}
                                        
                                    />
                                ))}
                            </div>
                        ) : (
                            <Empty description='No Organizers could be found!' />
                        )}
                    </Skeleton>
                </div>
            </div>
        </div>
    );
}
