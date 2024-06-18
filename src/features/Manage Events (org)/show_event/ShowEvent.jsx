import { Card, Col, Row, Skeleton, Tabs } from 'antd';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { useShowQuery } from '../../../api/services/events';
import UpdateEventModal from '../UpdateEventModal';

import EventChat from '../../chat/EventChat';
import RegistrationModal from '../registration/RegistrationModal';

import EventCover from './components/EventCover';
import EventDetailsTab from './components/EventDetailsTab';

const ShowEvent = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const showChat = searchParams.get('showChat');
    const isEditing = searchParams.get('edit');

    const { data: eventData, error, isLoading: eventDataIsLoading, refetch, isFetching } = useShowQuery(id);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(isEditing ?? false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

    const handleCloseRegistrationModal = () => setIsRegistrationModalOpen(false);
    const handleOpenRegistrationModal = () => setIsRegistrationModalOpen(true);
    const handleRegisterClicked = () => {
        handleOpenRegistrationModal();
    };

    useEffect(() => {
        console.log(eventData);
    }, [eventData]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5em' }}>
            <RegistrationModal
                isOpen={isRegistrationModalOpen}
                event={eventData}
                onClose={handleCloseRegistrationModal}
            />

            <Skeleton loading={eventDataIsLoading} active round paragraph={{ rows: 10 }}>
                <Card
                    style={{ backgroundColor: 'transparent', width: '100%' }}
                    bodyStyle={{ padding: '10px 20px' }}
                    cover={
                        <EventCover
                            data={{
                                title: eventData?.result?.title,
                                event_type: eventData?.result?.event_type,
                                registration_start_date: eventData?.result?.registration_start_date,
                                organization: eventData?.result?.organization,
                                event_id: id,
                            }}
                            setIsUpdateModalOpen={setIsUpdateModalOpen}
                        />
                    }
                >
                    <Row gutter={[0, 20]}>
                        <Col span={24}>
                            <Tabs
                                defaultActiveKey={showChat === 'true' ? '2' : '1'}
                                tabBarStyle={{ marginBottom: '2em' }}
                                items={[
                                    {
                                        key: '1',
                                        label: 'Event Details',
                                        children: (
                                            <EventDetailsTab
                                                eventData={eventData}
                                                handleRegisterClicked={handleRegisterClicked}
                                            />
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: 'Event Chat',
                                        disabled: !eventData?.result?.is_chatting_enabled,
                                        children: (
                                            <EventChat
                                                chat_group_id={eventData?.result?.chat_group?.id}
                                                eventID={eventData?.result?.id}
                                                orgID={eventData?.result?.organization?.id}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Card>
                {isUpdateModalOpen && (
                    <UpdateEventModal
                        isUpdateModalOpen={isUpdateModalOpen}
                        setIsUpdateModalOpen={setIsUpdateModalOpen}
                        eventData={eventData}
                        refetch={refetch}
                        eventDataIsLoading={eventDataIsLoading}
                        isFetching={isFetching}
                    />
                )}
            </Skeleton>
        </div>
    );
};

export default ShowEvent;
