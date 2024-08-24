import { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';

import moment from 'moment';

const { Text, Title } = Typography;

const EventCountdown = ({ eventData }) => {
    const daysArray = eventData?.result?.days || [];

    const getFirstEventDate = () => {
        if (daysArray.length === 0) return new Date();
        return new Date(daysArray[daysArray.length - 1]?.slots[0]?.start_time);
    };

    const calculateTimeLeft = () => {
        const now = new Date();
        const eventDate = getFirstEventDate();
        const timeDifference = eventDate - now;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [eventData]);

    const now = new Date();
    const firstSlotStartTime = daysArray[0]?.slots[0]?.start_time;

    const isBeforeEvent = moment().isBefore(moment(firstSlotStartTime));
    const isEventStarted = daysArray.some((day) => new Date(day.day_date).toDateString() === now.toDateString());

    const textStyle = {
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
    };

    return (
        <div className='sticky top-0 left-0 right-0 w-full bg-black p-2 shadow-md text-center z-50'>
            <div className='inline-block bg-black rounded-lg'>
                {isBeforeEvent ? (
                    <Row justify='center' align='middle' className='flex-nowrap overflow-hidden'>
                        {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
                            <Col
                                key={index}
                                className='flex flex-col items-center mx-0.5 flex-shrink-0 min-w-[8px] sm:min-w-[10px] md:min-w-[12px]'
                            >
                                <div className='bg-gray-800 p-0.5 sm:p-0.5 md:p-1 rounded-lg text-center'>
                                    <Title
                                        level={4}
                                        className='text-white m-0 text-xxs sm:text-xxxs md:text-xs'
                                        style={{ color: 'white', marginBottom: '5px' }}
                                    >
                                        {timeLeft[unit]}
                                    </Title>
                                    <Text className='text-gray-300 text-xxxs sm:text-xxxxs md:text-xxs capitalize'>
                                        {unit}
                                    </Text>
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : isEventStarted ? (
                    <div>
                        <Title level={4} style={textStyle}>
                            The event has started!
                        </Title>
                    </div>
                ) : (
                    <div>
                        <Title level={4} style={textStyle}>
                            The event has ended
                        </Title>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCountdown;
