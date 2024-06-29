import { Col, Row, theme } from 'antd';

import EventScheduleAndMap from './EventScheduleAndMap';
import EventDetails from './EventDetails';
import EventPhotosAndFiles from './EventPhotosAndFiles';

const EventDetailsTab = ({ eventData }) => {
    return (
        <>
            <Row gutter={[20, 50]} style={{ direction: 'revert' }}>
                <Col xs={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }} lg={{ span: 16, order: 1 }}>
                    <EventDetails
                        description={eventData?.result?.description}
                        tags={eventData?.result?.tags}
                        age_groups={eventData?.result?.age_groups}
                    />
                </Col>
                <Col xs={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} lg={{ span: 8, order: 2 }}>
                    <EventScheduleAndMap
                        days={eventData?.result?.days}
                        address_notes={eventData?.result?.address_notes}
                        location={eventData?.result?.location}
                    />
                </Col>
                {(eventData?.result?.photos?.length > 0 || eventData?.result?.attachments?.length > 0) && (
                    <Col xs={{ span: 24, order: 3 }} sm={{ span: 24, order: 3 }} lg={{ span: 24, order: 3 }}>
                        <EventPhotosAndFiles
                            photos={eventData?.result?.photos}
                            attachments={eventData?.result?.attachments}
                        />
                    </Col>
                )}
            </Row>
        </>
    );
};

export default EventDetailsTab;
