import { Upload, message, Form, Select, DatePicker, Modal, Image } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { useConfigurationListsQuery } from '../../api/services/lists';
import TextArea from 'antd/es/input/TextArea';

const AdditionalInfoRegistrationForm = ({ form, imageFile, setImageFile }) => {
    const { data, error, isLoading } = useConfigurationListsQuery();

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file) => {
        const src = file.url || (await getSrcFromFile(file));
        setPreviewImage(src);
        setPreviewVisible(true);
    };

    const handleClosePreview = () => {
        setPreviewVisible(false);
    };

    const getSrcFromFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file?.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
    };

    const onChange = ({ fileList: newFileList }) => {
        console.log(newFileList);
        setImageFile(newFileList);
    };

    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <>
            <Form form={form} autoComplete='off' layout='vertical' style={{ maxWidth: 550 }}>
                <Form.Item label='Profile Picture' name='profile_img'>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <ImgCrop showReset showGrid rotationSlider>
                            <Upload
                                listType='picture-card'
                                fileList={imageFile}
                                onChange={onChange}
                                onPreview={handlePreview}
                                maxCount={1}
                                customRequest={({ onSuccess }) => onSuccess('ok')}
                            >
                                {imageFile?.length != 0 ? '+Change Picture' : '+Upload'}
                            </Upload>
                        </ImgCrop>
                    </div>
                </Form.Item>

                <Form.Item
                    name='birth_date'
                    rules={[
                        {
                            required: true,
                            message: 'Please select your birth date',
                        },
                    ]}
                >
                    <DatePicker
                        size='large'
                        placeholder='Select you birth date'
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item name='job'>
                    <Select
                        loading={isLoading}
                        showSearch
                        placeholder='Select your job'
                        size='large'
                        options={data?.result.jobs}
                    />
                </Form.Item>

                <Form.Item name='address'>
                    <Select
                        loading={isLoading}
                        showSearch
                        placeholder='Select your address'
                        size='large'
                        options={data?.result.addresses}
                    />
                </Form.Item>

                <Form.Item name='bio'>
                    <TextArea
                        placeholder='Write Bio, Tell us about yourself...'
                        size='large'
                        allowClear
                        autoSize={{ minRows: 3, maxRows: 10 }}
                    />
                </Form.Item>
            </Form>
            <Modal open={previewVisible} onCancel={handleClosePreview} footer={null}>
                <img alt='Preview' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default AdditionalInfoRegistrationForm;
