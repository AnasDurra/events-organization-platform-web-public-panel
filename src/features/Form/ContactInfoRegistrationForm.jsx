import { Upload, message, Form, Image, Select, DatePicker, Input } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { useConfigurationListsQuery } from '../../api/services/lists';
import TextArea from 'antd/es/input/TextArea';

const ContactInfoRegistrationForm = ({ form }) => {
    const { data, error, isLoading } = useConfigurationListsQuery();

    return (
        <Form
            form={form}
            autoComplete='off'
            layout='vertical'
            style={{ maxWidth: 550 }}
            className='my-custom-form'
        >
            {data?.result.contacts?.map((contact) => (
                <Form.Item
                    key={contact.value}
                    name={contact.value}
                    label={contact.label}
                >
                    <Input
                        placeholder={
                            contact.label === 'Email' || contact.label === 'Phone Number'
                                ? contact.label
                                : `${contact.label} Profile URL`
                        }
                    />
                </Form.Item>
            ))}
        </Form>
    );
};

export default ContactInfoRegistrationForm;
