import {
    FacebookOutlined,
    GithubOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
    TwitterOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

const ContactInfo = ({ contacts }) => {
    return (
        <div>
            {contacts?.map((contact) => (
                <Tooltip key={contact.id} title={contact.contact_name}>
                    <a
                        href={
                            contact.contact_name === 'Phone Number'
                                ? `tel:${contact.value}`
                                : getContactLink(contact.contact_name)
                        }
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ marginRight: '10px' }}
                    >
                        {contact.contact_name === 'WhatsApp' && (
                            <WhatsAppOutlined style={getIconStyle(contact.contact_name)} />
                        )}
                        {contact.contact_name === 'Instagram' && (
                            <InstagramOutlined style={getIconStyle(contact.contact_name)} />
                        )}
                        {contact.contact_name === 'LinkedIn' && (
                            <LinkedinOutlined
                                style={{
                                    fontSize: '24px',
                                    color: '#0077B5',
                                }}
                            />
                        )}
                        {contact.contact_name === 'Facebook' && (
                            <FacebookOutlined style={getIconStyle(contact.contact_name)} />
                        )}
                        {contact.contact_name === 'Twitter' && (
                            <TwitterOutlined style={getIconStyle(contact.contact_name)} />
                        )}
                        {contact.contact_name === 'Email' && (
                            <MailOutlined style={getIconStyle(contact.contact_name)} />
                        )}
                        {contact.contact_name === 'Phone Number' && (
                            <PhoneOutlined
                                style={getIconStyle(contact.contact_name)}
                                onClick={() => (window.location.href = `tel:${contact.value}`)}
                            />
                        )}
                        {contact.contact_name === 'Github' && (
                            <GithubOutlined
                                style={getIconStyle(contact.contact_name)}
                                onClick={() => (window.location.href = `tel:${contact.value}`)}
                            />
                        )}
                    </a>
                </Tooltip>
            ))}
        </div>
    );
};

export default ContactInfo;

function getContactLink(contactName) {
    switch (contactName) {
        case 'WhatsApp':
            return 'https://wa.me/';
        case 'Linkedin':
            return 'https://linkedin.com/';
        case 'Facebook':
            return 'https://facebook.com/';
        case 'Twitter':
            return 'https://twitter.com/';
        default:
            return '#';
    }
}

const getIconStyle = (contactName) => {
    switch (contactName) {
        case 'WhatsApp':
            return { color: '#25D366', fontSize: '24px' };
        case 'Instagram':
            return { color: '#E4405F', fontSize: '24px' };
        case 'LinkedIn':
            return { color: '#0077B5', fontSize: '24px' };
        case 'Facebook':
            return { color: '#3b5998', fontSize: '24px' };
        case 'Twitter':
            return { color: '#1DA1F2', fontSize: '24px' };
        case 'Email':
            return { color: 'black', fontSize: '24px' };
        case 'Github':
            return { color: 'black', fontSize: '24px' };
        default:
            return { fontSize: '24px' };
    }
};
