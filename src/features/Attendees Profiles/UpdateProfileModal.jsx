import {
    CameraOutlined,
    EyeOutlined,
    FacebookOutlined,
    GithubOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
    TwitterOutlined,
    UserOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Empty,
    Form,
    Image,
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
import { useForm } from 'antd/es/form/Form';

import { useState } from 'react';
import { useConfigurationListsQuery } from '../../api/services/lists';

import {
    useUpdateMyProfileMutation,
    useUpdateProfilePicMutation,
    useUpdateCoverPicMutation,
} from '../../api/services/attendeeProfile';

import moment from 'moment';

const UpdateProfileModal = ({ data, modalOk, modalCancel }) => {
    const [updateMyProfileMutation, { isLoading: isUpdateMyProfileLoading }] = useUpdateMyProfileMutation();
    const [updateProfilePicMutation, { isLoading: isUpdateProfilePicLoading }] = useUpdateProfilePicMutation();
    const [updateCoverPicMutation, { isLoading: isUpdateCoverPicLoading }] = useUpdateCoverPicMutation();

    const { data: listsData, isLoading: listsIsLoading } = useConfigurationListsQuery();

    const [form] = useForm();
    const [contactForm] = useForm();

    const [avatarImageFile, setAvatarImageFile] = useState([]);
    const [coverImageFile, setCoverImageFile] = useState([]);

    const handleImageChange = ({ fileList: newFileList }, type) => {
        if (type === 'avatar') {
            setAvatarImageFile(newFileList);
        } else if (type === 'cover') {
            setCoverImageFile(newFileList);
        }
    };

    const onFinish = (values) => {
        const contactsFormValues = { ...contactForm.getFieldValue() };
        for (const key in contactsFormValues) {
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
                if (res.statusCode === 200) {
                    let formdata = new FormData();
                    if (avatarImageFile[0]) {
                        formdata.append('profile_img', avatarImageFile[0]?.originFileObj);
                        updateProfilePicMutation(formdata)
                            .unwrap()
                            .then(() => {
                                if (coverImageFile[0]) {
                                    formdata = new FormData();
                                    formdata.append('cover_img', coverImageFile[0]?.originFileObj);
                                    updateCoverPicMutation(formdata)
                                        .unwrap()
                                        .then(() => {
                                            message.success('Updated Successfully !');
                                            modalOk();
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                            error.data.result.response.message.forEach((value) => {
                                                message.error(value);
                                            });
                                        });
                                } else {
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
                    } else {
                        if (coverImageFile[0]) {
                            formdata.append('cover_img', coverImageFile[0]?.originFileObj);
                            updateCoverPicMutation(formdata)
                                .unwrap()
                                .then(() => {
                                    message.success('Updated Successfully !');
                                    modalOk();
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                    error.data.result.response.message.forEach((value) => {
                                        message.error(value);
                                    });
                                });
                        } else {
                            message.success('Updated Successfullyww !');
                            modalOk();
                        }
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                error.data.result.response.message.forEach((value) => {
                    message.error(value);
                });
            });
    };

    return (
        <Spin
            spinning={
                isUpdateMyProfileLoading || isUpdateCoverPicLoading || isUpdateProfilePicLoading || listsIsLoading
            }
        >
            <div>
                <Row
                    style={{
                        display: 'flex',
                    }}
                    gutter={20}
                >
                    <Col span={24}>
                        {data?.result?.cover_img || coverImageFile?.length != 0 ? (
                            <div className='relative -mx-6  '>
                                <Image
                                    width={'100%'}
                                    style={{ minHeight: '25vh' }}
                                    src={
                                        coverImageFile?.length != 0
                                            ? URL.createObjectURL(coverImageFile[0].originFileObj)
                                            : data?.result?.cover_img
                                            ? data?.result?.cover_img
                                            : null
                                    }
                                    preview={{
                                        mask: (
                                            <Button
                                                type='primary'
                                                shape='round'
                                                size='middle'
                                                icon={<EyeOutlined />}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                            >
                                                Preview
                                            </Button>
                                        ),
                                    }}
                                />
                            </div>
                        ) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No cover picture available' />
                        )}

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                padding: '0px',
                                transform: 'translate(0%, -60%)',
                            }}
                        >
                            <ImgCrop
                                showReset
                                rotationSlider
                                aspect={3 / 1}
                                onModalOk={(file) => {
                                    handleImageChange(file, 'cover');
                                }}
                            >
                                <Upload
                                    name='cover'
                                    fileList={coverImageFile}
                                    maxCount={1}
                                    showUploadList={false}
                                    onChange={(file) => {
                                        handleImageChange(file, 'cover');
                                    }}
                                    customRequest={({ onSuccess }) => onSuccess('ok')}
                                >
                                    <Button style={{ padding: '0px' }} type='text'>
                                        <CameraOutlined
                                            style={{
                                                fontSize: '24px',
                                                color: '#00000',
                                                backgroundColor: '#E6E6E6',
                                                borderRadius: '50%',
                                                padding: '3px',
                                            }}
                                        />
                                    </Button>
                                </Upload>
                            </ImgCrop>
                        </div>
                    </Col>

                    <Col span={24}>
                        <Row gutter={20}>
                            <Col xs={8} sm={6} md={5}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: '-80px',
                                    }}
                                >
                                    <Space>
                                        <Image
                                            width={120}
                                            height={120}
                                            style={{
                                                textAlign: 'center',
                                                marginBottom: '10px',
                                                border: '3px solid white',
                                                borderRadius: '50%',
                                            }}
                                            src={
                                                avatarImageFile?.length != 0
                                                    ? URL.createObjectURL(avatarImageFile[0].originFileObj)
                                                    : data?.result?.profile_img
                                                    ? data?.result?.profile_img
                                                    : null
                                            }
                                            fallback={<UserOutlined style={{ fontSize: '100px', color: '#ccc' }} />}
                                            preview={{
                                                mask: (
                                                    <Button
                                                        type='primary'
                                                        shape='round'
                                                        size='middle'
                                                        icon={<EyeOutlined />}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                        }}
                                                    >
                                                        Preview
                                                    </Button>
                                                ),
                                            }}
                                        />
                                        <div
                                            style={{
                                                marginBottom: '-40px',
                                                paddingTop: '35px',
                                                marginTop: '-15px',
                                                marginLeft: '-2.5em',
                                            }}
                                        >
                                            <ImgCrop showReset rotationSlider aspect={4 / 3}>
                                                <Upload
                                                    fileList={avatarImageFile}
                                                    maxCount={1}
                                                    showUploadList={false}
                                                    onChange={(file) => {
                                                        handleImageChange(file, 'avatar');
                                                    }}
                                                    customRequest={({ onSuccess }) => onSuccess('ok')}
                                                >
                                                    <Button style={{ padding: '0px' }} type='text'>
                                                        <CameraOutlined
                                                            style={{
                                                                fontSize: '20px',
                                                                color: '#00000',
                                                                backgroundColor: '#E6E6E6',
                                                                borderRadius: '50%',
                                                                padding: '3px',
                                                            }}
                                                        />
                                                    </Button>
                                                </Upload>
                                            </ImgCrop>
                                        </div>
                                    </Space>
                                </div>
                            </Col>
                            <Col xs={16} sm={18} md={19}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                    }}
                                >
                                    <Typography.Title style={{ marginTop: '0px' }} level={3}>
                                        {data?.result?.full_name ?? ''}
                                    </Typography.Title>

                                    <Space size={10}>
                                        {data?.result.contacts?.map((contact) => (
                                            <Tooltip title={contact.contact_name} key={contact.id}>
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
                                                    {contact.contact_name === 'LinkedIn' && (
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
                                                    {contact.contact_name === 'Email' && (
                                                        <MailOutlined
                                                            style={{
                                                                fontSize: '24px',
                                                                color: 'black',
                                                            }}
                                                        />
                                                    )}
                                                    {contact.contact_name === 'Instagram' && (
                                                        <InstagramOutlined
                                                            style={{
                                                                fontSize: '24px',
                                                                color: '#d62976',
                                                            }}
                                                        />
                                                    )}
                                                    {contact.contact_name === 'Phone Number' && (
                                                        <PhoneOutlined
                                                            style={{ fontSize: '24px' }}
                                                            onClick={() =>
                                                                (window.location.href = `tel:${contact.value}`)
                                                            }
                                                        />
                                                    )}
                                                    {contact.contact_name === 'Github' && (
                                                        <GithubOutlined
                                                            style={{ fontSize: '24px', color: 'black' }}
                                                            onClick={() =>
                                                                (window.location.href = `tel:${contact.value}`)
                                                            }
                                                        />
                                                    )}
                                                </a>
                                            </Tooltip>
                                        ))}
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Card className='bg-gray-50' bordered={false} style={{ width: '100%' }}>
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
                                <Form.Item initialValue={data?.result.bio ?? ''} label='Bio' name='bio'>
                                    <TextArea
                                        size='large'
                                        placeholder='Tell us about yourself...'
                                        allowClear
                                        autoSize={{
                                            minRows: 1,
                                            maxRows: 6,
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Birth Date'
                                    name='birth_date'
                                    initialValue={
                                        data?.result.birth_date ? moment(data?.result.birth_date, 'DD-MM-YYYY') : null
                                    }
                                >
                                    <DatePicker size='large' format={'DD-MM-YYYY'} style={{ width: '100%' }} />
                                </Form.Item>

                                <Form.Item label='Job' name='job_id' initialValue={data?.result.job?.value ?? null}>
                                    <Select
                                        size='large'
                                        loading={listsIsLoading}
                                        showSearch
                                        placeholder='Select your job'
                                        options={listsData?.result.jobs}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label='Address'
                                    name='address_id'
                                    initialValue={data?.result.address?.value ?? null}
                                >
                                    <Select
                                        size='large'
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
                                                    size='large'
                                                    placeholder={
                                                        contact.label === 'Email' || contact.label === 'Phone Number'
                                                            ? contact.label
                                                            : `${contact.label} Profile URL`
                                                    }
                                                />
                                            </Form.Item>
                                        ))}
                                    </Form.Item>
                                </Form>

                                <Form.Item>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Button
                                            size='large'
                                            type='default'
                                            className='w-full'
                                            style={{
                                                margin: '0 8px',
                                            }}
                                            onClick={() => {
                                                form.resetFields();
                                                contactForm.resetFields();
                                                modalCancel();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className='w-full'
                                            size='large'
                                            loading={
                                                isUpdateMyProfileLoading ||
                                                isUpdateCoverPicLoading ||
                                                isUpdateProfilePicLoading ||
                                                listsIsLoading
                                            }
                                            type='primary'
                                            htmlType='submit'
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
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
