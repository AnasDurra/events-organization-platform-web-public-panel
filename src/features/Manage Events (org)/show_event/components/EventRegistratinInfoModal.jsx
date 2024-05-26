import { Descriptions } from 'antd';
import React from 'react';

const EventRegistratinInfoModal = ({ registration_start_date, registration_end_date }) => {
    return (
        <Descriptions
            bordered
            column={1}
            style={{
                width: '100%',
            }}
        >
            <Descriptions.Item label='Registration Start Date' labelStyle={{ backgroundColor: '#FBF9F1' }}>
                {registration_start_date
                    ? new Date(registration_start_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                      })
                    : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label='Registration End Date' labelStyle={{ backgroundColor: '#FBF9F1' }}>
                {registration_end_date
                    ? new Date(registration_end_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                      })
                    : 'N/A'}
            </Descriptions.Item>
        </Descriptions>
    );
};

export default EventRegistratinInfoModal;
