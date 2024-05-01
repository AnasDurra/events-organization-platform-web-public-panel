import { SettingOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography, message } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProfilePage.css';
import AddressInfo from './components/AddressInfo';
import ContactInfo from './components/ContactInfo';
import CoverImage from './components/CoverImage';
import EventsTab from './components/EventsTabs';
import ProfileImage from './components/ProfileImage';
import {
    useGetOrgQuery,
    useNewCoverPicMutation,
    useNewProfilePicMutation,
    useRemoveCoverPicMutation,
    useRemoveProfilePicMutation,
} from './orgSlice';
import cover from '/public/TimelineCovers.pro_beautiful-abstract-colors-facebook-cover.jpg';
const { Text } = Typography;

export default function ProfilePage() {
    const navigate = useNavigate();
    let { orgId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const inputCoverFile = useRef(null);
    const inputProfilePicFile = useRef(null);

    const { data: { result: org } = { result: {} }, isLoading } = useGetOrgQuery(orgId);
    const [newCoverPic, { isLoading: isUpdateCoverLoading }] = useNewCoverPicMutation();
    const [newProfilePic, { isLoading: isUpdateProfilePicLoading }] = useNewProfilePicMutation();
    const [removeCoverPic] = useRemoveCoverPicMutation();
    const [removeProfilePic] = useRemoveProfilePicMutation();

    const handleRemoveCoverPic = () => removeCoverPic(orgId);
    const handleNewCoverPic = () => inputCoverFile.current.click();
    const handleRemoveProfilePic = () => removeProfilePic(orgId);
    const handleNewProfilePic = () => inputProfilePicFile.current.click();

    useEffect(() => {
        if (isUpdateCoverLoading || isUpdateProfilePicLoading) {
            messageApi.loading('updating picture...');
        }
    }, [isUpdateCoverLoading, isUpdateProfilePicLoading, messageApi]);

    return (
        <div className='grid grid-cols-10'>
            {contextHolder}
            <div className='sm:col-start-2 sm:col-span-8 col-span-10'>
                <Row
                    className='cover-row'
                    justify={'start'}
                >
                    <Col
                        span={24}
                        style={{ height: '100%' }}
                    >
                        <CoverImage
                            org={org}
                            onNewCoverPic={handleNewCoverPic}
                            onRemoveCoverPic={handleRemoveCoverPic}
                        />
                    </Col>
                </Row>
                <Row justify={'start'}>
                    <Col
                        style={{ height: '100%' }}
                        offset={1}
                        xs={{ span: 8 }}
                        sm={{ span: 6 }}
                        lg={{ span: 4 }}
                    >
                        <ProfileImage
                            org={org}
                            onNewProfilePic={handleNewProfilePic}
                            onRemoveProfilePic={handleRemoveProfilePic}
                        />
                    </Col>
                    <Col
                        offset={1}
                        xs={{ span: 10 }}
                        sm={{ span: 8 }}
                        lg={{ span: 10 }}
                    >
                        <Title
                            level={4}
                            className='mt-4'
                        >
                            {org?.name}
                        </Title>
                    </Col>

                    {/*  TODO only if member */}
                    <Col
                        xs={{ span: 3 }}
                        sm={{ span: 7 }}
                        lg={{ span: 7 }}
                        className='text-right'
                    >
                        <Button
                            type='text'
                            className='mt-2'
                            icon={<SettingOutlined />}
                            onClick={() => {
                                navigate('config');
                            }}
                        />
                    </Col>
                </Row>

                <Row
                    justify={'center'}
                    className='my-4'
                >
                    <Col
                        xs={{ span: 20, offset: 1 }}
                        sm={{ span: 20, offset: 1 }}
                        lg={{ span: 14, offset: 2 }}
                        span={14}
                        className='text-center'
                    >
                        <Text
                            type='secondary'
                            style={{ textWrap: 'wrap' }}
                        >
                            {org?.bio}
                        </Text>
                    </Col>
                </Row>

                <Row justify={'start'}>
                    <Col
                        sm={{ span: 21 }}
                        xs={{ span: 21 }}
                        lg={{ span: 5 }}
                    >
                        <AddressInfo
                            org={org}
                            isLoading={isLoading}
                        />

                        <ContactInfo
                            org={org}
                            isLoading={isLoading}
                        />
                    </Col>
                    <Col
                        sm={{ span: 23 }}
                        xs={{ span: 23 }}
                        lg={{ span: 14, offset: 1 }}
                    >
                        <EventsTab data={fakeData} />
                    </Col>
                </Row>
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
