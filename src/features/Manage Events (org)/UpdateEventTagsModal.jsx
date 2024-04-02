import { EditOutlined, EnvironmentFilled, InfoCircleOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { Divider, Modal, Select, Spin, message } from "antd";
import { Typography, Form } from "antd";
import { useEventCreationListsQuery } from "../../api/services/lists";
const { Title, Paragraph } = Typography;

import { useUpdateTagsMutation } from "../../api/services/events";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateEventTagsModal = ({ isUpdateEventTagsModalOpen, setIsUpdateEventTagsModalOpen, eventData, refetch }) => {
    const { id } = useParams();
    const [updateTagsMutation, { isLoading: UpdateTagsIsLoading }] = useUpdateTagsMutation();
    const { data: lists, error, isLoading: listsIsLoading } = useEventCreationListsQuery();

    const [form] = useForm();
    const [addedTags, setAddedTags] = useState([]);
    const [deletedTags, setDeletedTags] = useState([]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.submit();
                values = {
                    deleted_tags: deletedTags,
                    added_tags: addedTags,
                };
                console.log(values);
                updateTagsMutation({ id: id, body: values })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                        if (res.statusCode === 201) {
                            refetch();
                            message.success("Events Tags Updated Successfully !");
                        }
                        setIsUpdateEventTagsModalOpen(false);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        error.data.result.response.message.forEach((value) => {
                            message.error(value);
                        });
                    });
            })
            .catch((error) => {
                console.error("Validation error:", error);
            });
    };
    const handleCancel = () => {
        setIsUpdateEventTagsModalOpen(false);
    };

    const handleTagChange = (selectedTags) => {
        const filteredTags = selectedTags.filter(
            (tagData) => !initialFormValues.tags.find((initialTag) => initialTag.value === tagData)
        );

        setAddedTags(filteredTags.map((tagData) => ({ tag_id: tagData })));

        const removedTags = initialFormValues.tags.filter((tag) => !selectedTags.includes(tag.value));
        if (removedTags) {
            setDeletedTags(removedTags.map((tag) => ({ tag_id: tag.value })));
        }
    };

    const initialFormValues = {
        tags:
            eventData?.result?.tags.map((tagData) => ({
                value: tagData.tag.value,
                label: tagData.tag.label,
            })) || [],
    };
    return (
        <div>
            <Modal
                title={
                    <>
                        <Title style={{ marginTop: "0px" }} level={4}>
                            Update Event Tags
                        </Title>
                        <Divider style={{ marginBottom: "0px" }} />
                    </>
                }
                open={isUpdateEventTagsModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
                okText={"Update Tags"}
                okButtonProps={{ loading: UpdateTagsIsLoading, disabled: UpdateTagsIsLoading }}
                cancelButtonProps={{ disabled: UpdateTagsIsLoading }}
                closable={!UpdateTagsIsLoading}
                maskClosable={!UpdateTagsIsLoading}
            >
                <Spin spinning={UpdateTagsIsLoading || listsIsLoading}>
                    <div>
                        <Form form={form} layout="vertical" initialValues={initialFormValues}>
                            <Title level={3}>Event Tags</Title>
                            <Form.Item
                                label="Tags"
                                name="tags"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select at least one from event Tags ",
                                    },
                                ]}
                            >
                                <Select
                                    loading={listsIsLoading}
                                    mode="tags"
                                    allowClear
                                    options={lists?.result.tags}
                                    onChange={handleTagChange}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </Modal>
        </div>
    );
};

export default UpdateEventTagsModal;
