import { Card, Col, Image, Typography } from 'antd';
import { useState } from 'react';
import useEventHandlers from '../../Manage Events (org)/utils/eventHandlers';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import ScanQRCode from '../../qrCodes/ScanQRCode';

const EventsList = ({ event }) => {
    const navigate = useNavigate();
    const { handleDeleteEvent } = useEventHandlers();

    const [isScanQrModalVisible, setIsScanQrModalVisible] = useState(false);
    const [scanningEvent, setScanningEvent] = useState(null);

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    const handleClick = (e, action, eventId) => {
        e.stopPropagation();
        if (action === 'edit') {
            navigate(`/event/show/${event.event_id}/?edit=true`);
        } else if (action === 'remove') {
            handleDeleteEvent(eventId);
        } else if (action === 'scan-qr') {
            setIsScanQrModalVisible(true);
        }
    };

    const handleScanQrModalClose = () => {
        setIsScanQrModalVisible(false);
    };

    return (
        <>
            <Card
                onClick={() => {
                    navigate(`/event/show/${event.event_id}`);
                }}
                size='small'
                style={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'box-shadow 0.3s',
                    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
                }}
                hoverable
                cover={<Image preview={false} src={event.event_cover_picture_url} />}
                actions={[
                    <EditOutlined
                        style={iconStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => handleClick(e, 'edit')}
                        key='edit'
                    />,
                    <DeleteOutlined
                        style={{ ...iconStyle, color: 'red', fontSize: '16px' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => handleClick(e, 'remove', event.event_id)}
                        key='remove'
                    />,
                    <Icon
                        icon='bi:qr-code-scan'
                        style={{
                            ...iconStyle,
                            fontSize: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '6.5px',
                            width: '100%',
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => {
                            handleClick(e, 'scan-qr', event.event_id);
                            setScanningEvent(event);
                        }}
                        key='remove'
                    />,
                ]}
                onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow =
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 15px 20px rgba(0, 71, 79, 0.2)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 2px rgba(0, 0, 0, 0.1)';
                }}
            >
                <Card.Meta title={event.event_title} description={`Tickets: ${event.tickets}`} />
                <div
                    style={{
                        position: 'absolute',
                        top: -1,
                        left: 0,
                        zIndex: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: '5px',
                        borderRadius: '5px',
                        width: '100%',
                    }}
                >
                    <Typography.Text style={{ color: 'white', fontWeight: 'bold', fontSize: '10px' }}>
                        {event.start_day ? moment(event.start_day).format('MMM DD, YYYY, hh:mm A') : 'Date not set'}
                    </Typography.Text>
                </div>
            </Card>
            <ScanQRCode
                visible={isScanQrModalVisible}
                setIsScanQrModalVisible={setIsScanQrModalVisible}
                onClose={handleScanQrModalClose}
                event={scanningEvent}
            />
        </>
    );
};

export default EventsList;

const iconStyle = { transition: 'transform 0.3s', cursor: 'pointer' };
