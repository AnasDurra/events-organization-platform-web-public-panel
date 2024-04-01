import {
    CameraOutlined,
    EllipsisOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    MailOutlined,
    MobileOutlined,
    PhoneOutlined,
    TwitterOutlined,
    UploadOutlined,
    UserOutlined,
    WarningOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Dropdown,
    Form,
    Image,
    Menu,
    Popover,
    Row,
    Select,
    Space,
    Spin,
    Tooltip,
    Typography,
    Upload,
    message,
} from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import ImgCrop from 'antd-img-crop';

import { useEffect, useState } from 'react';
import { useConfigurationListsQuery } from '../../api/services/lists';

import { useUpdateMyProfileMutation } from '../../api/services/attendeeProfile';

import moment from 'moment';
// import dayjs from "dayjs";

import { useForm } from 'antd/es/form/Form';
const UpdateProfileModal = ({ data, modalOk, modalCancel }) => {
    const [updateMyProfileMutation, { isLoading }] = useUpdateMyProfileMutation();
    const { data: listsData, isLoading: listsIsLoading } = useConfigurationListsQuery();

    const [form] = useForm();
    const [contactForm] = useForm();

    const [avatarImageFile, setAvatarImageFile] = useState(null);
    const [avatarImageSrc, setAvatarImageSrc] = useState('');
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [coverImageSrc, setCoverImageSrc] = useState('');

    function getFileUrl(file, type, callback) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const url = event.target.result;
            callback(url);
        };

        if (type === 'avatar') {
            setAvatarImageFile(file);
        } else if (type === 'cover') {
            setCoverImageFile(file);
        }
        reader.readAsDataURL(file);
    }

    const handleFileChange = (file, type) => {
        getFileUrl(file, type, (url) => {
            if (type === 'avatar') {
                setAvatarImageSrc(url);
            } else if (type === 'cover') {
                setCoverImageSrc(url);
            }
        });
    };

    const onFinish = (values) => {
        const contactsFormValues = { ...contactForm.getFieldValue() };
        for (const key in contactsFormValues) {
            console.log(contactsFormValues[key]);
            if (contactsFormValues[key] == null) {
                delete contactsFormValues[key];
            }
        }
        let contacts = [];
        Object.keys(contactsFormValues).forEach((key) => {
            contacts.push({
                contact_id: key,
                contact_link: contactsFormValues[key],
            });
        });
        values['contacts'] = contacts;

        const dataToSend = {
            job_id: values.job_id,
            address_id: values.address_id,
            bio: values.bio ?? null,
            birth_date: values.birth_date?.format('DD-MM-YYYY') ?? null,

            contacts: values.contacts ?? null,
        };

        console.log(dataToSend);

        updateMyProfileMutation(dataToSend)
            .unwrap()
            .then((res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    message.success('Updated Successfully !');
                    modalOk();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                error.data.result.response.message.forEach((value) => {
                    message.error(value);
                });
            });
    };
    useEffect(() => {
        console.log(listsData);
    }, [listsData]);
    return (
        <Spin spinning={isLoading || listsIsLoading}>
            <Card style={{ width: '100%' }}>
                <div>
                    <Row
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            maxHeight: '40em',
                            overflow: 'auto',
                        }}
                        gutter={10}
                    >
                        <Col
                            xs={24}
                            sm={24}
                        >
                            <Popover
                                content={
                                    <ImgCrop
                                        aspect={3 / 1}
                                        onModalOk={(file) => {
                                            handleFileChange(file, 'cover');
                                        }}
                                        rotationSlider
                                    >
                                        <Upload
                                            name='cover'
                                            maxCount={1}
                                            showUploadList={false}
                                            onChange={(file) => {
                                                handleFileChange(file, 'cover');
                                            }}
                                        >
                                            <Button type='text'>
                                                <UploadOutlined /> Change Cover
                                            </Button>
                                        </Upload>
                                    </ImgCrop>
                                }
                                trigger='click'
                                placement='bottomRight'
                            >
                                <Image
                                    style={{
                                        minHeight: '150px',
                                        // maxHeight: "150px",
                                        borderRadius: '15px',
                                    }}
                                    src={data?.cover_img ?? coverImageSrc}
                                    // alt="Cover Image"
                                    preview={false}
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <CameraOutlined
                                        style={{
                                            fontSize: '18px',
                                            color: '#00000',
                                            backgroundColor: '#E6E6E6',
                                            borderRadius: '50%',
                                            padding: '3px',
                                        }}
                                    />
                                </div>
                            </Popover>
                        </Col>

                        <Col
                            xs={24}
                            sm={6}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginTop: '-70px',
                                }}
                            >
                                <Popover
                                    content={
                                        <ImgCrop
                                            onModalOk={(file) => {
                                                handleFileChange(file, 'avatar');
                                            }}
                                            rotationSlider
                                        >
                                            <Upload
                                                name='avatar'
                                                maxCount={1}
                                                showUploadList={false}
                                                onChange={(file) => {
                                                    handleFileChange(file, 'avatar');
                                                }}
                                            >
                                                <Button type='text'>
                                                    <UploadOutlined /> Change Avatar
                                                </Button>
                                            </Upload>
                                        </ImgCrop>
                                    }
                                    trigger='click'
                                    placement='bottom'
                                >
                                    <Space>
                                        <Avatar
                                            size={100}
                                            icon={<UserOutlined />}
                                            src={
                                                avatarImageSrc
                                                    ? avatarImageSrc
                                                    : data?.result.profile_img
                                                    ? data?.result.profile_img
                                                    : 'https://api.dicebear.com/7.x/miniavs/svg?seed=8'
                                            }
                                            style={{
                                                textAlign: 'center',
                                                marginBottom: '10px',
                                                border: '3px solid white',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <div
                                            style={{
                                                marginBottom: '-40px',
                                                paddingTop: '35px',
                                            }}
                                        >
                                            <CameraOutlined
                                                style={{
                                                    fontSize: '18px',
                                                    color: '#00000',
                                                    marginLeft: '-27px',
                                                    backgroundColor: '#E6E6E6',
                                                    borderRadius: '50%',
                                                    padding: '3px',
                                                }}
                                            />
                                        </div>
                                    </Space>
                                </Popover>
                            </div>
                        </Col>
                        <Col
                            xs={24}
                            sm={18}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                            >
                                <Typography.Title
                                    style={{ marginTop: '0px' }}
                                    level={3}
                                >
                                    {data?.result.full_name ?? ''}
                                </Typography.Title>

                                <Space size={10}>
                                    {data?.result.contacts?.map((contact) => (
                                        <Tooltip
                                            title={contact.contact_name}
                                            key={contact.id}
                                        >
                                            <a
                                                href={getContactLink(contact.contact_name)}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                {contact.contact_name === 'WhatsApp' && (
                                                    <WhatsAppOutlined
                                                        style={{
                                                            fontSize: '24px',
                                                            color: '#25D366',
                                                        }}
                                                    />
                                                )}
                                                {contact.contact_name === 'Linkedin' && (
                                                    <LinkedinOutlined
                                                        style={{
                                                            fontSize: '24px',
                                                            color: '#0077B5',
                                                        }}
                                                    />
                                                )}
                                                {contact.contact_name === 'Facebook' && (
                                                    <FacebookOutlined
                                                        style={{
                                                            fontSize: '24px',
                                                            color: '#3b5998',
                                                        }}
                                                    />
                                                )}
                                                {contact.contact_name === 'Twitter' && (
                                                    <TwitterOutlined
                                                        style={{
                                                            fontSize: '24px',
                                                            color: '#1DA1F2',
                                                        }}
                                                    />
                                                )}
                                            </a>
                                        </Tooltip>
                                    ))}
                                </Space>
                                <Form
                                    onFinish={onFinish}
                                    form={form}
                                    autoComplete='off'
                                    layout='vertical'
                                    style={{
                                        marginTop: '1em',
                                    }}
                                    className='my-custom-form'
                                >
                                    <Form.Item
                                        initialValue={data?.result.bio ?? ''}
                                        label='Bio'
                                        name='bio'
                                    >
                                        <TextArea
                                            placeholder='Tell us about yourself...'
                                            allowClear
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label='Birth Date'
                                        name='birth_date'
                                        initialValue={
                                            data?.result.birth_date
                                                ? moment(data?.result.birth_date, 'DD-MM-YYYY')
                                                : null
                                        }
                                    >
                                        <DatePicker
                                            format={'DD-MM-YYYY'}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Job'
                                        name='job_id'
                                        initialValue={data?.result.job?.value ?? null}
                                    >
                                        <Select
                                            loading={listsIsLoading}
                                            showSearch
                                            placeholder='Select your job'
                                            options={listsData?.result.jobs}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Address'
                                        name='address_id'
                                        initialValue={data?.result.job?.value ?? null}
                                    >
                                        <Select
                                            loading={listsIsLoading}
                                            showSearch
                                            placeholder='Select your address'
                                            options={listsData?.result.addresses}
                                        />
                                    </Form.Item>

                                    <Form
                                        form={contactForm}
                                        autoComplete='off'
                                        layout='vertical'
                                        style={{
                                            marginTop: '1em',
                                        }}
                                        className='my-custom-form'
                                    >
                                        <Form.Item>
                                            {listsData?.result.contacts?.map((contact) => (
                                                <Form.Item
                                                    key={contact.label}
                                                    name={contact.value}
                                                    label={contact.label}
                                                    initialValue={
                                                        data?.result.contacts?.find(
                                                            (userContact) => userContact.contact_name === contact.label
                                                        )?.contact_link || null
                                                    }
                                                    normalize={(value) => {
                                                        return value === '' ? null : value;
                                                    }}
                                                >
                                                    <Input
                                                        placeholder={
                                                            contact.label === 'Email' ||
                                                            contact.label === 'Phone Number'
                                                                ? contact.label
                                                                : `${contact.label} Profile URL`
                                                        }
                                                    />
                                                </Form.Item>
                                            ))}
                                        </Form.Item>
                                    </Form>

                                    <Form.Item>
                                        <Space
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    form.resetFields();
                                                    contactForm.resetFields();
                                                    modalCancel();
                                                }}
                                                type='default'
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                loading={isLoading}
                                                type='primary'
                                                htmlType='submit'
                                            >
                                                Submit
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Spin>
    );
};

export default UpdateProfileModal;

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
