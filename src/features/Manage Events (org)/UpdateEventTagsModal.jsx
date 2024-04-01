import {
    EditOutlined,
    EnvironmentFilled,
    InfoCircleOutlined,
    SettingOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Divider, Modal, Select } from "antd";
import { Typography, Form } from "antd";
import { useEventCreationListsQuery } from "../../api/services/lists";
const { Title, Paragraph } = Typography;

const UpdateEventTagsModal = ({
    isUpdateEventTagsModalOpen,
    setIsUpdateEventTagsModalOpen,
    eventData,
}) => {
    const {
        data: lists,
        error,
        isLoading: listsIsLoading,
    } = useEventCreationListsQuery();
    const handleOk = () => {
        // refetch();
        setIsUpdateEventTagsModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateEventTagsModalOpen(false);
    };
    const initialFormValues = {
        tags: eventData?.result?.tags.map((tagData) => ({
            value: tagData.tag.value,
            label: tagData.tag.label,
        })),
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
            >
                <div>
                    <Form layout="vertical" initialValues={initialFormValues}>
                        <Title level={3}>Event Tags</Title>
                        <Form.Item
                            label="Tags"
                            name="tags"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select at least one from event Tags ",
                                },
                            ]}
                        >
                            <Select
                                loading={listsIsLoading}
                                mode="tags"
                                allowClear
                                options={lists?.result.tags}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default UpdateEventTagsModal;
