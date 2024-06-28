import { Button, Card, Col, Empty, Image, Modal, Row, Skeleton, Space, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import LastThreeEvents from './components/LastThreeEvents';
import { Link, useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

import './styles//Profile.css';
import { useLazyViewMyProfileQuery } from '../../api/services/attendeeProfile';
import UpdateProfileModal from './UpdateProfileModal';
import MainProfileCard from './components/MainProfileCard';
import { useNotification } from '../../utils/NotificationContext';
import ProfileDescreption from './components/ProfileDescreption';
import Meta from 'antd/es/card/Meta';

const AttendeeProfile = () => {
    const [fetchMyProfile, { data: myProfile, isLoading, isFetching: myProfileIsFetching }] =
        useLazyViewMyProfileQuery();

    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateModalKey, setUpdateModalKey] = useState(0);

    const handleOk = () => {
        fetchMyProfile();
        setIsUpdateModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateModalOpen(false);
        setUpdateModalKey(updateModalKey + 1);
    };

    useEffect(() => {
        fetchMyProfile();
        setData(myProfile);
        console.log(myProfile);
    }, [myProfile]);

    return (
        <div>
            <Card
                style={{ backgroundColor: 'transparent', width: '100%' }}
                cover={
                    <div style={coverImageStyle.container}>
                        {data?.result?.cover_img ? (
                            <div className='relative -m-2 sm:-m-6 md:-m-8 lg:-m-12 xl:-m-14'>
                                <Image
                                    // height={'40vh'}
                                    width={'100%'}
                                    // style={{ minHeight: '30vh', maxHeight: '50vh' }}
                                    src={data?.result?.cover_img ?? 'https://picsum.photos/1000/300'}
                                    preview={{
                                        mask: (
                                            <>
                                                <Space>
                                                    <Button icon={<EyeOutlined />} type='primary'>
                                                        Show
                                                    </Button>
                                                </Space>
                                            </>
                                        ),
                                    }}
                                    fallback={
                                        <Empty
                                            style={{ minHeight: '40vh' }}
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            description='No cover picture available'
                                        />
                                    }
                                />
                                <div style={coverImageStyle.overlay}></div>
                            </div>
                        ) : (
                            <Empty
                                style={{
                                    minHeight: '40vh',
                                    maxHeight: '50vh',
                                    paddingTop: '10px',
                                    border: '1px solid #e8e8e8',
                                    color: '#595959',
                                    margin: '0px',
                                    backgroundColor: '#c0c0c0',
                                }}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <span style={{ fontSize: '16px', fontWeight: '500', color: '#8c8c8c' }}>
                                        No cover picture available
                                    </span>
                                }
                            />
                        )}
                    </div>
                }
            >
                <Spin size='large' spinning={isLoading || myProfileIsFetching}>
                    <Skeleton
                        loading={isLoading}
                        active
                        avatar
                        paragraph={{
                            rows: 30,
                            width: '90%',
                        }}
                    >
                        <Row gutter={[30, 20]}>
                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 10 }}
                                md={{ span: 8 }}
                                lg={{ span: 6 }}
                                xxl={{ span: 4 }}
                            >
                                <div
                                    style={{
                                        position: 'sticky',
                                        top: 0,
                                        marginTop: -200,
                                        zIndex: 1,
                                        color: 'white',

                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                    className='custom-div'
                                >
                                    <MainProfileCard
                                        id={data?.result?.user_id}
                                        full_name={data?.result?.full_name}
                                        bio={data?.result?.bio}
                                        profile_img={data?.result?.profile_img}
                                        contacts={data?.result?.contacts}
                                        join_date={data?.result?.join_date}
                                        setIsUpdateModalOpen={setIsUpdateModalOpen}
                                    />
                                </div>
                            </Col>

                            <Col
                                xs={{ span: 24 }}
                                sm={{ span: 14 }}
                                md={{ span: 16 }}
                                lg={{ span: 18 }}
                                xxl={{ span: 20 }}
                            >
                                <Row gutter={[10, 20]}>
                                    <Col span={24}>
                                        <div
                                            className='
                                   hidden
                                   md:flex
                                   absolute
                                   top-[-80px]
                                   left-0
                                   z-10
                                   w-full
                                   h-full
                                   text-white
                                   items-center'
                                        >
                                            <div>
                                                <Space size={10} direction='vertical'>
                                                    <Typography.Title
                                                        style={{ ...coverImageStyle.text, ...coverImageStyle.title }}
                                                        level={5}
                                                    >
                                                        {data?.result?.full_name ? data.result?.full_name : ''}
                                                    </Typography.Title>
                                                    <Typography.Title
                                                        style={{
                                                            ...coverImageStyle.text,
                                                            ...coverImageStyle.description,
                                                        }}
                                                        level={5}
                                                    >
                                                        {'Syria, Damascus'}
                                                    </Typography.Title>
                                                </Space>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col span={24}>
                                        <Card
                                            style={{
                                                maxWidth: ' 800px',
                                                height: '100%',
                                                borderRadius: '8px',
                                                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                                                // backgroundColor: 'transparent', //card
                                                marginTop: '-20px',
                                            }}
                                        >
                                            <Meta description={<ProfileDescreption />} />
                                        </Card>
                                    </Col>

                                    <Col span={24}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'end',
                                                maxWidth: '800px',
                                            }}
                                        >
                                            <Typography.Title level={3} strong>
                                                <span
                                                    style={{
                                                        borderBottom: '5px solid #000',
                                                        paddingBottom: '4px',
                                                    }}
                                                >
                                                    Last 3
                                                </span>{' '}
                                                Events
                                            </Typography.Title>
                                            <Link to={'events'}>show all</Link>
                                        </div>
                                    </Col>

                                    <Col span={24}>
                                        {/* TODO: uncomment this: */}
                                        <LastThreeEvents events={data?.result?.events ?? []} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Skeleton>
                </Spin>
            </Card>
            <Modal
                title='Edit Profile'
                open={isUpdateModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
                footer={null}
            >
                <UpdateProfileModal
                    destroyOnClose
                    key={updateModalKey}
                    data={data}
                    modalOk={handleOk}
                    modalCancel={handleCancel}
                />
            </Modal>
        </div>
    );
};

export default AttendeeProfile;

const coverImageStyle = {
    container: {
        position: 'relative',
        display: 'inline-block',
    },
    overlay: {
        position: 'absolute',
        top: -4,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1em',
        zIndex: 1,
    },

    text: {
        fontSize: '30px',
        color: 'white',

        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontFamily: "'Roboto Mono', monospace",
    },
    title: {
        marginTop: '10px',
        marginBottom: '0px',
    },
    subtitle: {
        fontSize: '14px',
        marginBottom: '0px',
        marginTop: '10px',
    },
    description: {
        fontSize: '14px',
        marginTop: '0px',
    },
    link: {
        color: 'white',
        fontFamily: "'Roboto', sans-serif",
    },
};

// Sample data for events
const events = [
    {
        id: '25',
        title: 'The Future of AI',
        cover_picture_url: 'https://picsum.photos/300/200?random=2',
        registration_end_date: '2024-04-10 09:30:00',
        organization: { name: 'ORG1' },
        description: 'This is an event about artificial intelligence',
    },
    {
        id: '25',
        title: 'The Future of AI',
        cover_picture_url: 'https://picsum.photos/300/200?random=3',
        registration_end_date: '2024-04-10 09:30:00',
        organization: { name: 'ORG1' },
        description: 'This is an event about artificial intelligence',
    },
    {
        id: '25',
        title: 'The Future of AI',
        cover_picture_url: 'https://picsum.photos/300/200?random=1',
        registration_end_date: '2024-04-10 09:30:00',
        organization: { name: 'ORG1' },
        description: 'This is an event about artificial intelligence',
    },
];
