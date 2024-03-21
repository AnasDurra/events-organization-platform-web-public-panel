import { Upload, message, Form, Image, Select, DatePicker, Input } from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { useListsQuery } from "../../api/services/lists";
import TextArea from "antd/es/input/TextArea";

const ContactInfoRegistrationForm = ({ queryMutation, form }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imageSrc, setImageSrc] = useState("");

    const [addresses, setAddresses] = useState(null);

    const { data, error, isLoading } = useListsQuery();

    useEffect(() => {
        // data.result.addresses.map((address)=>{
        // })
    }, [data]);

    function getFileUrl(file, callback) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const url = event.target.result;
            callback(url);
        };

        setImageFile(file);
        reader.readAsDataURL(file);
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

    const onFinish = async (values) => {
        const data = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            username: values.username,
            password: values.password,
            birth_date: `${(values.birth_date.$M + 1)
                .toString()
                .padStart(2, "0")}-${values.birth_date.$D
                .toString()
                .padStart(2, "0")}-${values.birth_date.$y}`,
            profile_img: imageFile?.file.originFileObj ?? null,
        };
        console.log(data);

        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        queryMutation(formData)
            .unwrap()
            .then((res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    message.success("Registered Successfully !");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                message.error(error.data.result.message);
            });
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
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
