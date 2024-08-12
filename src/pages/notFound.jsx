import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goToDashboard = () => {
        navigate('/');
    };

    return (
        <Result
            status='404'
            title='404'
            subTitle="Sorry, we couldn't find the page."
            extra={[
                <Button key={'goBackButton'} type='primary' onClick={goBack}>
                    Go Back
                </Button>,
                <Button key={'goHomeButton'} onClick={goToDashboard}>
                    Go to Dashboard
                </Button>,
            ]}
        />
    );
};

export default NotFoundPage;
