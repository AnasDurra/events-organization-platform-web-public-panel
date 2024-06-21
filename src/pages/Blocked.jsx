import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Blocked() {
    const navigate = useNavigate();
    return (
        <Result
            status='error'
            title='Blocked'
            subTitle='Your Account Has Been Blocked'
        >
            <div className='desc'>
                <Paragraph>
                    <Typography.Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        What can i do now?
                    </Typography.Text>
                </Paragraph>
                <Paragraph className='flex space-x-2 mx-2'>
                    <CloseCircleOutlined className='site-result-demo-error-icon' />{' '}
                    <div>You think this is a mistake?</div>
                    <a
                        onClick={() => {
                            navigate('/home/report-to-admin');
                        }}
                    >
                        Report
                    </a>
                </Paragraph>
            </div>
        </Result>
    );
}
