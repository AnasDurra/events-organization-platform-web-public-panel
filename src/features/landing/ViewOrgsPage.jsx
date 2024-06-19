import { LeftOutlined } from '@ant-design/icons';
import { Avatar, Divider, List, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { useGetOrganizationsSummaryQuery, useLazyGetOrganizationsSummaryQuery } from './feedsSlice';
import OrganizerCard from './components/cards/OrganizerCard';
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ViewOrgsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loadedOrgs, setLoadedOrgs] = useState([]);
    const [orgsCount, setOrgsCount] = useState(0);
    const [orgIds] = useState(new Set());

    const [getOrgs] = useLazyGetOrganizationsSummaryQuery();

    const loadMoreData = async () => {
        getOrgs({ page: currentPage, pageSize: 9 }).then((response) => {
            setOrgsCount(response?.data?.result?.count);

            const newOrgs = response?.data?.result?.data.filter((org) => !orgIds.has(org.org_id));
            setLoadedOrgs((prevOrgs) => [...prevOrgs, ...newOrgs]);

            setCurrentPage(currentPage + 1);

            newOrgs.forEach((org) => orgIds.add(org.org_id));
        });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div className='h-[100svh] w-full flex flex-col justify-start items-center'>
            <div className='grid grid-cols-8 w-full  mb-4'>
                <div className='col-span-8 sm:col-span-6 sm:col-start-2  '>
                    <div className='text-3xl font-semibold m-2 text-center'>Organizations</div>
                    <div className='w-full'>
                        {/*  <InfiniteScroll
                            dataLength={loadedOrgs.length}
                            next={loadMoreData}
                            hasMore={loadedOrgs.length < orgsCount}
                            loader={<h4>Loading...</h4>}
                            className=' w-full '
                            height={'100svh'}
                            style={{ scrollbarWidth: 'none' }}
                        > */}
                        {loadedOrgs.map((org) => (
                            <div
                                key={org.id}
                                className='mx-4 my-12'
                            >
                                <OrganizerCard
                                    className={'rounded-tl-xl'}
                                    orgID={org.org_id}
                                    orgName={org.org_name}
                                    attendanceCount={org.attendees_num}
                                    eventsCount={org.events_num}
                                />
                            </div>
                        ))}
                        {/*                         </InfiniteScroll>
                         */}{' '}
                    </div>
                </div>
            </div>
        </div>
    );
}
