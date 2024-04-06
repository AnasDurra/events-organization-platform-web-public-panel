import { Upload, message, Form, Image, Select, DatePicker } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { useConfigurationListsQuery } from '../../api/services/lists';
import TextArea from 'antd/es/input/TextArea';

const AdditionalInfoRegistrationForm = ({ form, setImageFile, imageSrc, setImageSrc }) => {
    const { data, error, isLoading } = useConfigurationListsQuery();

    function getFileUrl(file, callback) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const url = event.target.result;
            callback(url);
        };

        setImageFile(file);
        reader.readAsDataURL(file);

        console.log(imageSrc);
    }

    const handleFileChange = (file) => {
        // const file = event.target.files[0];
        getFileUrl(file, (url) => {
            setImageSrc(url);
        });
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <Form form={form} autoComplete="off" layout="vertical" style={{ maxWidth: 550 }} className="my-custom-form">
            <Form.Item label="Profile Picture" name="profile_img">
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    {imageSrc && (
                        // <Avatar
                        //     style={{
                        //         marginRight: "0.5em",
                        //         width: 130,
                        //     }}
                        //     size={100}
                        //     src={imageSrc}
                        // />
                        <Image
                            src={imageSrc}
                            style={{
                                marginRight: '5em',
                                width: 100,
                                borderRadius: '50%',
                                border: '1px solid #000',
                            }}
                        />
                    )}
                    <ImgCrop onModalOk={handleFileChange} rotationSlider>
                        <Upload
                            listType="picture-circle"
                            showUploadList={false}
                            maxCount={1}
                            // beforeUpload={(file) => {
                            //     return new Promise(
                            //         (resolve, reject) => {
                            //             if (
                            //                 file.size >
                            //                 211212121
                            //             ) {
                            //                 reject(
                            //                     "file exceed size limit"
                            //                 );
                            //             } else {
                            //                 resolve("success");
                            //             }
                            //         }
                            //     );
                            // }}
                            onChange={handleFileChange}
                        >
                            {imageSrc ? '+Change Picture' : '+Upload'}
                        </Upload>
                    </ImgCrop>
                </div>
            </Form.Item>

            <Form.Item
                label="Birth Date"
                name="birth_date"
                rules={[
                    {
                        required: true,
                        message: 'Please select your birth date',
                    },
                ]}
            >
                <DatePicker
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item label="Job" name="job">
                <Select loading={isLoading} showSearch placeholder="Select your job" options={data?.result.jobs} />
            </Form.Item>

            <Form.Item label="Address" name="address">
                <Select
                    loading={isLoading}
                    showSearch
                    placeholder="Select your address"
                    options={data?.result.addresses}
                />
            </Form.Item>

            <Form.Item label="Bio" name="bio">
                <TextArea placeholder="Tell us about yourself..." allowClear />
            </Form.Item>
        </Form>
    );
};

export default AdditionalInfoRegistrationForm;
