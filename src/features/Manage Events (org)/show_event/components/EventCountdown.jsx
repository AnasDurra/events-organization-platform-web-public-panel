import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';

const { Text, Title } = Typography;

const EventCountdown = ({ eventData, attendeeStatusInEvent }) => {
    // Uncomment these lines if you need to check registration or event date availability
    // if (!attendeeStatusInEvent?.result?.registered || !eventData?.result?.days[0]?.start_day) {
    //     return null;
    // }
    console.log(eventData);
    const eventDate = new Date(eventData?.result?.days[0]?.day_date);
    const calculateTimeLeft = () => {
        const now = new Date();
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
    }, []);

    return (
        <div style={fixedTopStyle}>
            <Row justify='center' align='middle' style={countdownStyle}>
                <Col>
                    <Title level={2} style={timeStyle}>
                        {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
                    </Title>
                </Col>
            </Row>
            <Row justify='center' align='middle'>
                <Col>
                    <Text style={labelStyle}>Days</Text>
                </Col>
                <Col>
                    <Text style={labelStyle}>Hours</Text>
                </Col>
                <Col>
                    <Text style={labelStyle}>Minutes</Text>
                </Col>
                <Col>
                    <Text style={labelStyle}>Seconds</Text>
                </Col>
            </Row>
        </div>
    );
};

const fixedTopStyle = {
    position: 'fixed',
    // top: '10',
    right: '0',
    // width: '100%',
    backgroundColor: 'transparent', // Ant Design background color
    padding: '10px 0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    zIndex: 1000,
};

const countdownStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
};

const labelStyle = {
    fontSize: '16px',
    color: '#595959',
    margin: '0 10px',
    textAlign: 'center',
};

const timeStyle = {
    color: '#1890ff', // Ant Design primary color
};

export default EventCountdown;
