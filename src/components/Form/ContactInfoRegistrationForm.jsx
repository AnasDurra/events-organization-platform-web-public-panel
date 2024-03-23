import { Upload, message, Form, Image, Select, DatePicker, Input } from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { useListsQuery } from "../../api/services/lists";
import TextArea from "antd/es/input/TextArea";

const ContactInfoRegistrationForm = ({ form }) => {
    const { data, error, isLoading } = useListsQuery();

    return (
        <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            style={{ maxWidth: 550 }}
            className="my-custom-form"
        >
            <Form.Item name="facebook" label="Facebook Profile">
                <Input placeholder="Facebook Profile URL" />
            </Form.Item>

            <Form.Item name="twitter" label="Twitter Profile">
                <Input placeholder="Twitter Profile URL" />
            </Form.Item>

            <Form.Item name="instagram" label="Instagram Profile">
                <Input placeholder="Instagram Profile URL" />
            </Form.Item>

            <Form.Item name="linkedin" label="LinkedIn Profile">
                <Input placeholder="LinkedIn Profile URL" />
            </Form.Item>
        </Form>
    );
};

export default ContactInfoRegistrationForm;
