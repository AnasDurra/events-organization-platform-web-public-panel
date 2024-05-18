import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResultSuccessPage() {
    const navigate = useNavigate();
    return (
        <Result
            status='success'
            title='Successfully Purchased Ticketing Package for Eventure'
            subTitle='Your request to buy tickets in eventure platform went through successfully. visit Eventure to check your balance.'
            extra={[
                <Button
                    type='primary'
                    key='back'
                    onClick={() => navigate('/home', { replace: true })}
                >
                    Go Back To Eventure
                </Button>,
            ]}
        />
    );
}
