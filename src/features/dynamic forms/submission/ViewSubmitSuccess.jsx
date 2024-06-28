import { FormOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Result } from 'antd';
import React from 'react';
import { lightenColor } from '../../../utils/colors';
import { useNavigate, useParams } from 'react-router-dom';

export default function ViewSubmitSuccess() {
    const navigate = useNavigate();
    let { form_id = prop_form_id, event_id = prop_event_id } = useParams();

    const theme = {
        token: { colorPrimary: '#2A9D8F', fontFamily: 'Playfair Display' },
        components: {
            Layout: { headerBg: lightenColor('#2A9D8F', 100), bodyBg: '#F9F9F9' },
        },
        cssVar: true,
    };
    return (
        <ConfigProvider theme={theme}>
            <Result
                icon={<FormOutlined />}
                status={'success'}
                title='Your submission has been recorded successfully!'
                extra={
                    <div className='flex flex-col items-center space-y-8'>
                        <div>You can can close this page.</div>
                        <div className=''>
                            <Button
                                type='primary'
                                onClick={() => navigate(`/event/show/${event_id}`)}
                            >
                                Go back to event
                            </Button>
                        </div>
                    </div>
                }
            />
        </ConfigProvider>
    );
}
