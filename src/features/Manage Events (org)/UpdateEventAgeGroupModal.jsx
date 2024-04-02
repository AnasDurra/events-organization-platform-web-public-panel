import { EditOutlined, EnvironmentFilled, InfoCircleOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { Divider, Modal, Select, Spin, message } from "antd";
import { Typography, Form } from "antd";
import { useEventCreationListsQuery } from "../../api/services/lists";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
const { Title, Paragraph } = Typography;

import { useUpdateAgeGroupsMutation } from "../../api/services/events";

const UpdateEventAgeGroupModal = ({
    isUpdateEventAgeGroupModalOpen,
    setIsUpdateEventAgeGroupModalOpen,
    eventData,
    refetch,
}) => {
    const [updateAgeGroupsMutation, { isLoading: UpdateAgeGroupsIsLoading }] = useUpdateAgeGroupsMutation();
    const { data: lists, error, isLoading: listsIsLoading } = useEventCreationListsQuery();

    const [form] = useForm();
    const [addedAgeGroups, setAddedAgeGroups] = useState([]);
    const [deletedAgeGroups, setDeletedAgeGroups] = useState([]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.submit();
                values = {
                    deleted_age_groups: deletedAgeGroups,
                    added_age_groups: addedAgeGroups,
                };
                updateAgeGroupsMutation(values)
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                        if (res.statusCode === 201) {
                            console.log(22);
                            message.success("Events AgeGroups Updated Successfully !");
                        }
                        refetch();
                        setIsUpdateEventAgeGroupModalOpen(false);
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
        setIsUpdateEventAgeGroupModalOpen(false);
    };

    const handleAgeGroupChange = (selectedAgeGroups) => {
        console.log(selectedAgeGroups);
        const filteredAgeGroups = selectedAgeGroups.filter(
            (ageGroupData) =>
                !initialFormValues.age_groups.find((initialAgeGroup) => initialAgeGroup.value === ageGroupData)
        );

        setAddedAgeGroups(filteredAgeGroups.map((ageGroupData) => ({ age_group_id: ageGroupData })));

        const removedAgeGroups = initialFormValues.age_groups.filter(
            (age_group) => !selectedAgeGroups.includes(age_group.value)
        );
        if (removedAgeGroups) {
            setDeletedAgeGroups(removedAgeGroups.map((age_group) => ({ age_group_id: age_group.value })));
        }
    };

    const initialFormValues = {
        age_groups:
            eventData?.result?.age_groups.map((ageGroupData) => ({
                value: ageGroupData.age_group_id,
                label: ageGroupData.age_group_name,
            })) || [],
    };

    return (
        <div>
            <Modal
                title={
                    <>
                        <Title style={{ marginTop: "0px" }} level={4}>
                            Update Age Groups
                        </Title>
                        <Divider style={{ marginBottom: "0px" }} />
                    </>
                }
                open={isUpdateEventAgeGroupModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
                okText={"Update Information"}
                okButtonProps={{ loading: UpdateAgeGroupsIsLoading, disabled: UpdateAgeGroupsIsLoading }}
                cancelButtonProps={{ disabled: UpdateAgeGroupsIsLoading }}
                closable={!UpdateAgeGroupsIsLoading}
                maskClosable={!UpdateAgeGroupsIsLoading}
            >
                <Spin spinning={UpdateAgeGroupsIsLoading || listsIsLoading}>
                    <div>
                        <Form form={form} layout="vertical" initialValues={initialFormValues}>
                            <Title level={3}>Event Age Groups</Title>
                            <Form.Item
                                label="Target Age Group"
                                name="age_groups"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select at least one from event Age Groups ",
                                    },
                                ]}
                            >
                                <Select
                                    loading={listsIsLoading}
                                    allowClear
                                    mode="multiple"
                                    options={lists?.result.age_groups}
                                    onChange={handleAgeGroupChange}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </Modal>
        </div>
    );
};

export default UpdateEventAgeGroupModal;
