import { Modal, Form, Input, Select, Typography, Space, Avatar } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { Text } = Typography;

const ReportMessageModal = ({ message, showReportMessageModal, setShowReportMessageModal }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                console.log('Received values of form: ', values);
                setShowReportMessageModal(false);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setShowReportMessageModal(false);
    };

    const formattedDate = message.timestamp
        ? moment(message.timestamp).format('MMMM Do YYYY, h:mm:ss a')
        : 'Unknown date';

    return (
        <Modal
            title='Report Message'
            visible={showReportMessageModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Submit Report'
            cancelText='Cancel'
        >
            <Form
                form={form}
                layout='vertical'
                initialValues={{
                    messageId: message.message_id,
                    reason: '',
                }}
            >
                <Space direction='vertical' style={{ width: '100%', marginBottom: '2em' }}>
                    <div
                        style={{
                            width: '100%',
                            boxShadow: '0 4px 4px rgba(0,0,0,0.1)',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                            padding: '10px',
                        }}
                    >
                        <Space direction='vertical' size={20}>
                            <Text strong>Message:</Text>
                            <Space
                                size={20}
                                direction='vertical'
                                style={{
                                    backgroundColor: 'white',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #e8e8e8',
                                }}
                            >
                                <Space>
                                    <Avatar
                                        style={{ backgroundColor: '#f56a00' }}
                                        src={message?.user?.avatar || 'https://joeschmoe.io/api/v1/random'}
                                    />
                                    <Text>{message.text}</Text>
                                </Space>
                                <Text type='secondary' style={{ fontSize: '12px' }}>
                                    Sent by {message?.user?.username || 'Unknown User'} on {formattedDate}
                                </Text>
                            </Space>
                        </Space>
                    </div>
                </Space>

                <Form.Item
                    name='reason'
                    label='Reason for Reporting:'
                    rules={[{ required: true, message: 'Please select a reason!' }]}
                >
                    <Select placeholder='Select a reason'>
                        <Option value='spam'>Spam</Option>
                        <Option value='abuse'>Abuse</Option>
                        <Option value='inappropriate'>Inappropriate Content</Option>
                        <Option value='other'>Other (Specify Below)</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.reason !== currentValues.reason}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('reason') === 'other' ? (
                            <Form.Item
                                name='customReason'
                                rules={[{ required: true, message: 'Please input your reason!' }]}
                            >
                                <Input placeholder='Please specify your reason' />
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReportMessageModal;
