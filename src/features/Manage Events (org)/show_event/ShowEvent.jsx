import { Card, Col, Popover, Row, Skeleton, Tabs, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useLazyAttendeeStatusInEventQuery, useShowQuery } from '../../../api/services/events';
import UpdateEventModal from '../UpdateEventModal';
import EventChat from '../../chat/EventChat';
import RegistrationModal from '../registration/RegistrationModal';
import EventCover from './components/EventCover';
import EventDetailsTab from './components/EventDetailsTab';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import Roles from '../../../api/Roles';
import EventRegisterButton from './components/EventRegisterButton';
import EventCountdown from './components/EventCountdown';

const ShowEvent = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [showChat, setShowChat] = useState(searchParams.get('showChat'));
    const isEditing = searchParams.get('edit');

    const [user] = useState(getLoggedInUserV2());

    const { data: eventData, isLoading: eventDataIsLoading, refetch, isFetching } = useShowQuery(id);

    const [fetchAttendeeStatusInEvent, { data: attendeeStatusInEvent, isLoading: isAttendeeStatusInEventLoading }] =
        useLazyAttendeeStatusInEventQuery();

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(isEditing ?? false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

    const handleCloseRegistrationModal = () => setIsRegistrationModalOpen(false);
    const handleOpenRegistrationModal = () => setIsRegistrationModalOpen(true);
    const handleRegisterClicked = () => {
        handleOpenRegistrationModal();
    };

    const [tooltipOpen, setTooltipOpen] = useState(true);

    useEffect(() => {
        console.log(eventData);
    }, [eventData]);

    useEffect(() => {
        if (user.user_role === Roles.ATTENDEE && eventData) {
            fetchAttendeeStatusInEvent({
                event_id: eventData?.result?.id,
                attendee_id: user?.attendee_id,
            });
        }
    }, [user, eventData, fetchAttendeeStatusInEvent]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTooltipOpen(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        console.log(showChat);
    }, [showChat]);
    return (
        <div>
            <div className='w-full' style={{ marginBottom: '5em' }}>
                <RegistrationModal
                    isOpen={isRegistrationModalOpen}
                    event={eventData}
                    onClose={handleCloseRegistrationModal}
                />

                <EventCountdown eventData={eventData} />
                <Skeleton loading={eventDataIsLoading} active round paragraph={{ rows: 10 }}>
                    <Card
                        className='w-full'
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
                                    cover_image: eventData?.result?.cover_picture_url,
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
                                    onChange={(tab) => (tab == 2 ? setShowChat(true) : setShowChat(false))}
                                    items={[
                                        {
                                            key: '1',
                                            label: 'Event Details',
                                            children: <EventDetailsTab eventData={eventData} />,
                                        },
                                        {
                                            key: '2',
                                            disabled:
                                                !eventData?.result?.is_chatting_enabled ||
                                                !attendeeStatusInEvent?.result?.registered,
                                            label: (
                                                <Popover
                                                    placement='top'
                                                    content={
                                                        user?.user_role == 2 ? (
                                                            ''
                                                        ) : !eventData?.result?.is_chatting_enabled ? (
                                                            <div style={{ maxWidth: '220px' }}>
                                                                <p style={{ margin: 0 }}>
                                                                    🚫 <strong>Sorry! </strong> This event doesn't have
                                                                    an active group chat.
                                                                </p>
                                                                <p style={{ margin: 0 }}>
                                                                    Please contact the event organizer for more
                                                                    information or check back later. 🕒
                                                                </p>
                                                            </div>
                                                        ) : !attendeeStatusInEvent?.result?.registered ? (
                                                            <div style={{ maxWidth: '220px' }}>
                                                                <p style={{ margin: 0 }}>
                                                                    🚫 <strong>Oops! </strong> You need to be registered
                                                                    for this event to join the group chat.
                                                                </p>
                                                                <p style={{ margin: 0 }}>
                                                                    Please complete your registration to gain access to
                                                                    the event's group chat. 📅
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            'Click to join the Chat Group'
                                                        )
                                                    }
                                                    trigger='hover'
                                                >
                                                    {user?.user_role === 3 &&
                                                    eventData?.result?.is_chatting_enabled &&
                                                    attendeeStatusInEvent?.result?.registered == null ? (
                                                        <Tooltip
                                                            title='Join this event to access the exclusive group chat and engage with other attendees! 🎉'
                                                            placement='right'
                                                            open={tooltipOpen}
                                                        >
                                                            <span>Event Chat</span>
                                                        </Tooltip>
                                                    ) : (
                                                        <span>Event Chat</span>
                                                    )}
                                                </Popover>
                                            ),
                                            children: (
                                                <>
                                                    {(attendeeStatusInEvent?.result?.registered === 'accepted' ||
                                                        user.organization_id ===
                                                            eventData?.result?.organization?.id) && (
                                                        <EventChat
                                                            chat_group_id={eventData?.result?.chat_group?.id}
                                                            eventID={eventData?.result?.id}
                                                            orgID={eventData?.result?.organization?.id}
                                                            group_id={eventData?.result?.chat_group?.id}
                                                        />
                                                    )}
                                                </>
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
                    {!showChat && (
                        <div className='sticky bottom-0 bg-white border-t border-gray-300 mt-8 w-full'>
                            <EventRegisterButton
                                eventData={eventData}
                                handleRegisterClicked={handleRegisterClicked}
                                attendeeStatusInEvent={attendeeStatusInEvent}
                                isAttendeeStatusInEventLoading={isAttendeeStatusInEventLoading}
                                user_role={user?.user_role}
                            />
                        </div>
                    )}
                </Skeleton>
            </div>
        </div>
    );
};

export default ShowEvent;
