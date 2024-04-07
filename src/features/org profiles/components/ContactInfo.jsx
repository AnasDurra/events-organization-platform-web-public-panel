import React from 'react';
import { Button, Col, Typography, Skeleton } from 'antd';
import { PhoneOutlined, FacebookFilled, WhatsAppOutlined, LinkedinFilled } from '@ant-design/icons';

const ContactInfo = ({ org, isLoading }) => {
    return (
        <Skeleton loading={isLoading}>
            <Typography.Title level={5}>Contact us</Typography.Title>
            {org?.contacts?.map((contact) => (
                <Button
                    key={contact.id}
                    icon={getContactIcon(contact.contact.name)}
                    type='link'
                    style={getContactStyle(contact.contact.name)}
                    href={contact.content}
                    target='_blank'
                >
                    {org.name}
                </Button>
            ))}
        </Skeleton>
    );
};

const getContactIcon = (name) => {
    switch (name) {
        case 'Phone Number':
            return (
                <PhoneOutlined
                    rotate='90'
                    style={{ fontSize: '1.5em', marginRight: '0.5em' }}
                />
            );
        case 'Facebook':
            return <FacebookFilled style={{ fontSize: '1.5em', marginRight: '0.5em' }} />;
        case 'WhatsApp':
            return <WhatsAppOutlined style={{ fontSize: '1.5em', marginRight: '0.5em' }} />;
        case 'LinkedIn':
            return <LinkedinFilled style={{ fontSize: '1.5em', marginRight: '0.5em' }} />;
        default:
            return null;
    }
};

const getContactStyle = (name) => {
    switch (name) {
        case 'Phone Number':
            return { color: 'GrayText' };
        case 'Facebook':
            return { color: 'blue' };
        case 'WhatsApp':
            return { color: 'green' };
        default:
            return {};
    }
};

export default ContactInfo;
