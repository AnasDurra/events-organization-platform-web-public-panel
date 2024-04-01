import { EditOutlined, EnvironmentFilled, InfoCircleOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Divider, Modal, Select } from 'antd';
import { Typography, Form } from 'antd';
import { useEventCreationListsQuery } from '../../api/services/lists';
const { Title, Paragraph } = Typography;

const UpdateEventAgeGroupModal = ({ isUpdateEventAgeGroupModalOpen, setIsUpdateEventAgeGroupModalOpen }) => {
    const { data: lists, error, isLoading: listsIsLoading } = useEventCreationListsQuery();

    const handleOk = () => {
        // refetch();
        setIsUpdateEventAgeGroupModalOpen(false);
    };
    const handleCancel = () => {
        setIsUpdateEventAgeGroupModalOpen(false);
    };
    return (
        <div>
            <Modal
                title={
                    <>
                        <Title
                            style={{ marginTop: '0px' }}
                            level={4}
                        >
                            Update Age Groups
                        </Title>
                        <Divider style={{ marginBottom: '0px' }} />
                    </>
                }
                open={isUpdateEventAgeGroupModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
                okText={'Update Information'}
            >
                <div>
                    <Form
                        layout='vertical'
                        // initialValues={formData}
                        // onValuesChange={handleFormChange}
                        // onFinish={handleFormSubmit}
                    >
                        <Title level={3}>Event Age Groups</Title>
                        <Form.Item
                            label='Target Age Group'
                            name='age_groups'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select at least one from event Age Groups ',
                                },
                            ]}
                        >
                            <Select
                                loading={listsIsLoading}
                                allowClear
                                mode='multiple'
                                options={lists?.result.age_groups}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default UpdateEventAgeGroupModal;
