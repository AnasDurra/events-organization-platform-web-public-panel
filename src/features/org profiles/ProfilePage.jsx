import {
    EditOutlined,
    GithubFilled,
    InstagramFilled,
    LinkedinFilled,
    DownOutlined, FileTextOutlined, MinusOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row, Space, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
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
import {
    useGetOrgQuery,
    useNewCoverPicMutation,
    useNewProfilePicMutation,
    useRemoveCoverPicMutation,
    useRemoveProfilePicMutation,
} from './orgSlice';
import cover from '/public/TimelineCovers.pro_beautiful-abstract-colors-facebook-cover.jpg';
const { Text } = Typography;

import { getLoggedInUser } from '../../api/services/auth';
import { useNotification } from '../../utils/NotificationContext';
import { FaFacebook } from 'react-icons/fa';
import { WhatsApp } from '@mui/icons-material';
import { IoIosSettings } from 'react-icons/io';
import { Icon } from '@iconify/react';
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
    const [removeCoverPic] = useRemoveCoverPicMutation();
    const [removeProfilePic] = useRemoveProfilePicMutation();

    const [followOrg, { isLoading: isFollowingOrgLoading }] = useFollowOrgMutation();
    const [unFollowOrg, { isLoading: isUnFollowingOrgLoading }] = useUnFollowOrgMutation();
    const [
        fetchIsAttendeeFollowing,
        { data: isAttendeeFollowing, isLoading: isAttendeeFollowingLoading, isFetching: isAttendeeFollowingFetching },
    ] = useLazyIsAttendeeFollowingOrgQuery(orgId);

    const handleRemoveCoverPic = () => removeCoverPic(orgId);
    const handleNewCoverPic = () => inputCoverFile.current.click();
    const handleRemoveProfilePic = () => removeProfilePic(orgId);
    const handleNewProfilePic = () => inputProfilePicFile.current.click();

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
            <div className='sm:col-start-3 sm:col-span-8 col-span-10'>
                <img
                    className='h-[32svh] w-full object-fill rounded-md border-b-8 border-b-secondary border-separate' 
                    src={'/public/assets/fakeCover.jpg'}
                />
                <div className='flex justify-start items-center'>
                    <img
                        className='h-[28svh] ml-8 aspect-square border-8 border-x-primary  border-t-primary border-b-secondary rounded-full mt-[-16svh] object-fill'
                        src={'/public/assets/fakeProfile.png'}
                    />

                    <div className='flex justify-between items-center w-full'>
                        <div className='flex flex-col justify-center items-start mx-4 '>
                            <div className='text-lg font-bold text-textPrimary'>{org?.name}</div>
                            <div className='text-md font-bold text-gray-600 line-clamp-3'>{org?.bio}</div>
                        </div>

                        <div className='flex flex-col  justify-center   space-y-4 mt-4 mr-10'>
                            <div className='flex justify-center items-center space-x-2  '>
                                <FaFacebook className='text-[1.5em] text-blue-500'></FaFacebook>
                                <InstagramFilled className='text-[1.5em] text-[#C1358E]'></InstagramFilled>
                                <LinkedinFilled className='text-[1.5em] text-blue-800'></LinkedinFilled>
                                <GithubFilled className='text-[1.5em] text-blue-950'></GithubFilled>
                                <WhatsApp className='text-[1.5em] text-green-600'></WhatsApp>
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

                <div className='flex justify-between space-x-2'>
                    <div className='flex flex-col space-y-4 min-w-[28svh] ml-8 mt-4'>
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

                    <div className='w-full'>
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
                id='coverFile'
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
        date: 'jan 7 | 2024',
        pricing: '150',
        img: cover,
    },
    {
        title: 'Programming for kids',
        tags: ['programming', 'social', 'kids'],
        date: 'jan 7 | 2024',
        pricing: '150',
        img: cover,
    },
    {
        title: 'Programming for kids',
        tags: ['programming', 'social', 'kids'],
        date: 'jan 7 | 2024',
        pricing: '150',
        img: cover,
    },
    {
        title: 'Programming for kids',
        tags: ['programming', 'social', 'kids'],
        date: 'jan 7 | 2024',
        pricing: '150',
        img: cover,
    },
];
