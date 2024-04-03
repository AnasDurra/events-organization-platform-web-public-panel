import { FileAddOutlined, FileImageOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import React from 'react';

const MediaAndAttachmentsForm = ({ eventMediaForm }) => {
    return (
        <>
            <Form form={eventMediaForm} layout="vertical">
                <Form.Item label="Photos" name="photos">
                    <Upload.Dragger listType="picture" name="files" beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                            <FileImageOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag photo to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item label="Attachments" name="attachments">
                    <Upload.Dragger listType="picture" beforeUpload={() => false} name="attachments">
                        <p className="ant-upload-drag-icon">
                            <FileAddOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag attachments to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form>
        </>
    );
};

export default MediaAndAttachmentsForm;
