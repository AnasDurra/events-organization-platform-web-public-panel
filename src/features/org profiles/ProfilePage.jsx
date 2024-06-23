import { GithubFilled, InstagramFilled, LinkedinFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useFollowOrgMutation,
    useLazyIsAttendeeFollowingOrgQuery,
    useUnFollowOrgMutation,
} from '../../api/services/following';
import './ProfilePage.css';
import AddressInfo from './components/AddressInfo';
import ContactInfo from './components/ContactInfo';
import EventsTab from './components/EventsTabs';
import { useGetOrgQuery, useNewCoverPicMutation, useNewProfilePicMutation } from './orgSlice';
import cover from '/public/TimelineCovers.pro_beautiful-abstract-colors-facebook-cover.jpg';
const { Text } = Typography;

import { WhatsApp } from '@mui/icons-material';
import { FaFacebook } from 'react-icons/fa';
import { getLoggedInUser } from '../../api/services/auth';
import { useNotification } from '../../utils/NotificationContext';
import { contactTypeIds } from './constants';
import ComplaintModal from './reports/ComplaintModal';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { openNotification } = useNotification();
    const [user, setUser] = useState(null);

    const [showComplaintModal, setShowComplaintModal] = useState(false);

    let { orgId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const inputCoverFile = useRef(null);
    const inputProfilePicFile = useRef(null);

    const { data: { result: org } = { result: {} }, isLoading, refetch } = useGetOrgQuery(orgId);
    const [newCoverPic, { isLoading: isUpdateCoverLoading }] = useNewCoverPicMutation();
    const [newProfilePic, { isLoading: isUpdateProfilePicLoading }] = useNewProfilePicMutation();

    const [followOrg, { isLoading: isFollowingOrgLoading }] = useFollowOrgMutation();
    const [unFollowOrg, { isLoading: isUnFollowingOrgLoading }] = useUnFollowOrgMutation();
    const [
        fetchIsAttendeeFollowing,
        { data: isAttendeeFollowing, isLoading: isAttendeeFollowingLoading, isFetching: isAttendeeFollowingFetching },
    ] = useLazyIsAttendeeFollowingOrgQuery(orgId);

    const renderContactIcon = (typeId, content) => {
        let url = content;

        switch (typeId) {
            case contactTypeIds.facebook:
            case contactTypeIds.instagram:
            case contactTypeIds.linkedin:
            case contactTypeIds.github:
                if (!/^https?:\/\//i.test(url)) {
                    url = `https://${url}`;
                }
                break;
            case contactTypeIds.whatsapp:
                url = `https://wa.me/${content}`;
                break;
            default:
                return null;
        }

        switch (typeId) {
            case contactTypeIds.facebook:
                return (
                    <FaFacebook
                        className='text-2xl text-blue-500'
                        onClick={() => window.open(url, '_blank')}
                    />
                );
            case contactTypeIds.instagram:
                return (
                    <InstagramFilled
                        className='text-2xl text-[#C1358E]'
                        onClick={() => window.open(url, '_blank')}
                    />
                );
            case contactTypeIds.linkedin:
                return (
                    <LinkedinFilled
                        className='text-2xl text-blue-800'
                        onClick={() => window.open(url, '_blank')}
                    />
                );
            case contactTypeIds.github:
                return (
                    <GithubFilled
                        className='text-2xl text-blue-950'
                        onClick={() => window.open(url, '_blank')}
                    />
                );
            case contactTypeIds.whatsapp:
                return (
                    <WhatsApp
                        className='text-2xl text-green-600'
                        onClick={() => window.open(url, '_blank')}
                    />
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        if (isUpdateCoverLoading || isUpdateProfilePicLoading) {
            messageApi.loading('updating picture...');
        }
    }, [isUpdateCoverLoading, isUpdateProfilePicLoading, messageApi]);

    useEffect(() => {
        console.log(org);
    }, [org]);

    useEffect(() => {
        const loggedUser = getLoggedInUser();
        setUser(loggedUser);
        console.log(loggedUser);
        if (loggedUser.role_id == 3) {
            fetchIsAttendeeFollowing(orgId);
        }
    }, []);

    return (
        <div className='grid grid-cols-12'>
            <div className='col-start-1 col-span-12 p-2 sm:p-0  sm:col-start-3 sm:col-span-8'>
                <img
                    className='h-48 w-full object-cover rounded-md border-b-8 border-secondary'
                    src={'/public/assets/fakeCover.jpg'}
                />
                <div className='flex flex-col sm:flex-row justify-start items-center'>
                    <img
                        className='h-48 sm:h-56 w-48 sm:w-56 aspect-square border-8 border-primary rounded-full -mt-24 sm:-mt-28 ml-4 sm:ml-8 object-cover'
                        src={'/public/assets/fakeProfile.png'}
                    />

                    <div className='flex flex-col sm:flex-row justify-between items-center w-full mt-4 sm:mt-0'>
                        <div className='flex flex-col justify-center items-center sm:items-start mx-4'>
                            <div className='text-lg font-bold text-textPrimary'>{org?.name}</div>
                            <div className='text-md font-bold text-gray-600 line-clamp-3'>{org?.bio}</div>
                        </div>

                        <div className='flex flex-col justify-center items-center space-y-4 mt-4 sm:mt-0  sm:mr-10 '>
                            <div className='flex justify-center items-center space-x-2'>
                                <div className='flex justify-center items-center space-x-2'>
                                    {org?.contacts?.map((contact) => (
                                        <React.Fragment key={contact.id}>
                                            {renderContactIcon(
                                                contactTypeIds[contact.contact.name.toLowerCase()],
                                                contact.content
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className='flex justify-center items-center space-x-2'>
                                {user?.role_id == 3 && (
                                    <Button
                                        type='primary'
                                        block
                                        icon={isAttendeeFollowing?.result ? <MinusOutlined /> : <PlusOutlined />}
                                        loading={
                                            isFollowingOrgLoading ||
                                            isUnFollowingOrgLoading ||
                                            isAttendeeFollowingFetching
                                        }
                                        disabled={
                                            isLoading || isAttendeeFollowingLoading || isAttendeeFollowingFetching
                                        }
                                        onClick={() => {
                                            isAttendeeFollowing?.result
                                                ? unFollowOrg({ organization_id: orgId })
                                                      .unwrap()
                                                      .then((res) => {
                                                          if (res.statusCode == 200) {
                                                              openNotification(
                                                                  'success',
                                                                  'You are no longer following this organization.'
                                                              );
                                                              fetchIsAttendeeFollowing(orgId);
                                                              refetch();
                                                          }
                                                      })
                                                : followOrg({ organization_id: orgId })
                                                      .unwrap()
                                                      .then((res) => {
                                                          if (res.statusCode == 200) {
                                                              openNotification(
                                                                  'success',
                                                                  'You are now following this organization.'
                                                              );
                                                              fetchIsAttendeeFollowing(orgId);
                                                              refetch();
                                                          }
                                                      })
                                                      .catch((error) => {
                                                          openNotification('warning', error.data.message);
                                                          console.error('Error:', error);
                                                      });
                                        }}
                                    >
                                        {isAttendeeFollowing?.result
                                            ? isUnFollowingOrgLoading
                                                ? 'Unfollowing..'
                                                : 'Unfollow'
                                            : isFollowingOrgLoading
                                            ? 'Following..'
                                            : 'Follow'}
                                    </Button>
                                )}
                                {/*  <Button
                                    type='default'
                                    className='text-secondary'
                                    icon={<EditOutlined className='text-secondary '></EditOutlined>}
                                    onClick={()=>navigate('config')}
                                >
                                    Edit
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row justify-between space-x-2 mt-4'>
                    <div className='flex flex-col space-y-4 min-w-full sm:min-w-0 sm:w-1/3 ml-8 sm:ml-0'>
                        {org?.addresses?.length != 0 && (
                            <AddressInfo
                                org={org}
                                isLoading={isLoading}
                            />
                        )}
                        <ContactInfo
                            org={org}
                            isLoading={isLoading}
                        />
                    </div>

                    <div className=' mt-4 sm:mt-0 w-full'>
                        <EventsTab data={fakeData} />
                    </div>
                </div>
            </div>

            <input
                type='file'
                id='coverFile'
                ref={inputCoverFile}
                style={{ display: 'none' }}
                onChangeCapture={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    var file = event.target.files[0];
                    console.log('file', file);
                    newCoverPic({ file, orgId });
                }}
            />

            <input
                type='file'
                id='profileFile'
                ref={inputProfilePicFile}
                style={{ display: 'none' }}
                onChangeCapture={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    var file = event.target.files[0];
                    console.log('file', file);
                    newProfilePic({ file, orgId });
                }}
            />

            {showComplaintModal && (
                <ComplaintModal
                    organizer={org}
                    showComplaintModal={showComplaintModal}
                    setShowComplaintModal={setShowComplaintModal}
                />
            )}
            {contextHolder}
        </div>
    );
}

const fakeData = [
    {
        title: 'Programming for kids',
        tags: ['programming', 'social', 'kids'],
        date: '2024-07-01T18:00:00Z', 
        pricing: '150',
        img: cover,
    },
    {
        title: 'Programming for kids',
        tags: ['programming', 'social', 'kids'],
        date: '2024-07-01T18:00:00Z', 
        pricing: '150',
        img: cover,
    },
    {
        title: 'Programming for kids',
        tags: ['programming', 'social', 'kids'],
        date: '2024-07-01T18:00:00Z', 
        pricing: '150',
        img: cover,
    },
    {
        title: 'Programming for kids',
        tags: ['programming', 'social', 'kids'],
        date: '2024-07-01T18:00:00Z', 
        pricing: '150',
        img: cover,
    },
];
