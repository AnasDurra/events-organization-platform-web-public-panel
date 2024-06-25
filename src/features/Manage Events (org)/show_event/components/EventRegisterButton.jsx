import { CloseOutlined, InfoCircleOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Icon } from '@mui/material';
import { Button, Modal, Space, Spin, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import EventRegistratinInfoModal from './EventRegistratinInfoModal';
import ShowAttendeeQrCode from './ShowAttendeeQrCode';
import Roles from '../../../../api/Roles';
import useToken from 'antd/es/theme/useToken';

const EventRegisterButton = ({
    eventData,
    handleRegisterClicked,
    attendeeStatusInEvent,
    isAttendeeStatusInEventLoading,
    user_role,
}) => {
    const { token } = useToken();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isQrModalVisible, setQrModalVisible] = useState(false);

    const [tooltipVisible, setTooltipVisible] = useState(true);

    const openRegisterationInfoModal = () => {
        setIsModalVisible(true);
    };
    const openQrModal = () => {
        setQrModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleQrModalCancel = () => {
        setQrModalVisible(false);
    };

    return (
        <div>
            {user_role == 3 && (
                <>
                    <div className='bg-white p-3 border border-gray-200 flex flex-col sm:flex-row justify-between w-full'>
                        <div className='hidden sm:flex flex-col sm:flex-row sm:items-center sm:justify-between flex-grow'>
                            <Space direction='vertical'>
                                <Typography.Text className='font-bold text-lg text-gray-800'>
                                    {moment(eventData?.result?.days[0]?.slots[0]?.start_time)
                                        .format('ddd , MMM D - h:mm A')
                                        .toUpperCase()}
                                </Typography.Text>
                                <Typography.Text className='text-xl text-blue-500'>
                                    {eventData?.result?.title}
                                </Typography.Text>
                            </Space>
                        </div>

                        <div className='flex flex-col sm:flex-row items-center justify-between sm:justify-end flex-grow text-center'>
                            <Space direction='vertical' className='text-center sm:text-right mt-2 sm:mt-0 sm:mr-4'>
                                <Typography.Text className='font-bold text-2xl text-red-500'>£12.50</Typography.Text>
                                <Typography.Text className='text-base text-gray-600'>8 tickets left</Typography.Text>
                            </Space>

                            <Space size={10} className='flex justify-end mt-2 sm:mt-0'>
                                {/* <Tooltip title='Share this event'>
                                    <Button
                                        icon={<ShareAltOutlined />}
                                        size='large'
                                        type='default'
                                        className='mt-2 mr-2 sm:mt-0'
                                    >
                                        Share
                                    </Button>
                                </Tooltip> */}
                                <Tooltip title='More information'>
                                    <Button
                                        onClick={openRegisterationInfoModal}
                                        type='text'
                                        size='large'
                                        icon={<InfoCircleOutlined style={{ fontSize: '24px' }} />}
                                        className='mt-2 sm:mt-0'
                                    />
                                </Tooltip>
                                <Spin spinning={isAttendeeStatusInEventLoading}>
                                    {attendeeStatusInEvent?.result?.registered === null && (
                                        <Tooltip title='Click to attend this event'>
                                            <Button type='primary' size='large' onClick={handleRegisterClicked}>
                                                <Space size={10}>
                                                    <Icon icon='mdi:register-outline' style={{ fontSize: '24px' }} />
                                                    Attend
                                                </Space>
                                            </Button>
                                        </Tooltip>
                                    )}
                                    {attendeeStatusInEvent?.result?.registered === 'rejected' && (
                                        <Tooltip
                                            open={tooltipVisible}
                                            color='#700000'
                                            title={
                                                <div style={{ padding: '5px' }}>
                                                    You have been rejected from this event
                                                    <Button
                                                        type='link'
                                                        onClick={() => {
                                                            setTooltipVisible(false);
                                                        }}
                                                        style={{ top: -35, right: -170, color: '#fff' }}
                                                        icon={<CloseOutlined />}
                                                    />
                                                </div>
                                            }
                                        >
                                            <Button
                                                type='default'
                                                size='large'
                                                style={{
                                                    backgroundColor: '#f8d7da',
                                                    color: '#721c24',
                                                    borderColor: '#f5c6cb',
                                                    cursor: 'not-allowed',
                                                }}
                                                disabled
                                            >
                                                <Space size={10}>
                                                    <Icon
                                                        icon='mdi:event-busy'
                                                        style={{ fontSize: '20px', color: 'black' }}
                                                    />
                                                    Rejected
                                                </Space>
                                            </Button>
                                        </Tooltip>
                                    )}
                                    {attendeeStatusInEvent?.result?.registered === 'waiting' && (
                                        <Tooltip
                                            open={tooltipVisible}
                                            color='#948800'
                                            title={
                                                <div style={{ padding: '5px' }}>
                                                    You are currently waiting for approval
                                                    <Button
                                                        type='link'
                                                        onClick={() => {
                                                            setTooltipVisible(false);
                                                        }}
                                                        style={{ top: -35, right: -150, color: '#fff' }}
                                                        icon={<CloseOutlined />}
                                                    />
                                                </div>
                                            }
                                        >
                                            <Button
                                                type='default'
                                                size='large'
                                                style={{
                                                    backgroundColor: '#fff3cd',
                                                    color: '#856404',
                                                    borderColor: '#ffeeba',
                                                    cursor: 'not-allowed',
                                                }}
                                                disabled
                                            >
                                                <Space size={10}>
                                                    <Icon
                                                        icon='guidance:waiting-room'
                                                        style={{ fontSize: '20px', color: 'black' }}
                                                    />
                                                    Waiting
                                                </Space>
                                            </Button>
                                        </Tooltip>
                                    )}
                                    {attendeeStatusInEvent?.result?.registered === 'accepted' && (
                                        <Tooltip
                                            open={tooltipVisible}
                                            color={token?.colorPrimary}
                                            title={
                                                <div style={{ padding: '5px' }}>
                                                    You have been accepted to this event
                                                    <Button
                                                        type='link'
                                                        onClick={() => {
                                                            setTooltipVisible(false);
                                                        }}
                                                        style={{ top: -35, right: -170, color: '#fff' }}
                                                        icon={<CloseOutlined />}
                                                    />
                                                </div>
                                            }
                                        >
                                            <Button
                                                type='default'
                                                size='large'
                                                style={{
                                                    backgroundColor: '#d4edda',
                                                    // color: '#155724',
                                                    borderColor: '#c3e6cb',
                                                }}
                                                icon={<QrcodeOutlined />}
                                                onClick={openQrModal}
                                            >
                                                Show QR Code
                                            </Button>
                                        </Tooltip>
                                    )}
                                </Spin>
                            </Space>
                        </div>
                    </div>
                    <Modal title='Registration Information' open={isModalVisible} onCancel={handleCancel} footer={null}>
                        <EventRegistratinInfoModal
                            registration_start_date={eventData?.result?.registration_start_date}
                            registration_end_date={eventData?.result?.registration_end_date}
                        />
                    </Modal>

                    {user_role === Roles.ATTENDEE && attendeeStatusInEvent?.result?.registered && (
                        <ShowAttendeeQrCode
                            isVisible={isQrModalVisible}
                            onClose={handleQrModalCancel}
                            eventInfo={eventData?.result}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default EventRegisterButton;
