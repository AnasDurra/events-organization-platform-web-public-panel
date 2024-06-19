import React from 'react';
import { Button, Typography, Skeleton } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

const ContactInfo = ({ org, isLoading }) => {
    return (
        <Skeleton loading={isLoading}>
            <div className='text-lg text-textPrimary font-sans'> Contact us</div>{' '}
            {org?.contacts
                ?.filter((contact) => contact.contact.name === 'Phone Number' || contact.contact.name === 'Email')
                .map((contact) => (
                    <div
                        key={contact.id}
                        className='flex justify-start space-x-0 items-center'
                    >
                        {getContactIcon(contact.contact.name)}
                        <Button
                            type='link'
                            style={getContactStyle(contact.contact.name)}
                            href={
                                contact.content.includes('@') ? `mailto:${contact.content}` : `tel:${contact.content}`
                            }
                            target='_blank'
                        >
                            <div className='text-textPrimary'>{contact.content}</div>
                        </Button>
                    </div>
                ))}
        </Skeleton>
    );
};

const getContactIcon = (name) => {
    switch (name) {
        case 'Phone Number':
            return (
                <PhoneOutlined
                    className='text-secondary'
                    style={{ fontSize: '1.5em', marginRight: '0.5em' }}
                />
            );
        case 'Email':
            return (
                <MailOutlined
                    className='text-secondary'
                    style={{ fontSize: '1.5em', marginRight: '0.5em' }}
                />
            );
        default:
            return null;
    }
};

const getContactStyle = (name) => {
    switch (name) {
        case 'Phone Number':
            return { color: 'GrayText' };
        case 'Email':
            return { color: 'GrayText' };
        default:
            return {};
    }
};

export default ContactInfo;
