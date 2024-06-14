import { Modal, Form, Input, Select, Typography, Space, Avatar, Spin } from 'antd';
import moment from 'moment';

import { useAbuseTypeQuery, useReportToOrgMutation } from '../../api/services/reports';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNotification } from '../../utils/NotificationContext';
const { Option } = Select;
const { Text } = Typography;

const ReportMessageModal = ({ message, eventID, orgID, showReportMessageModal, setShowReportMessageModal }) => {
    const [reportToOrg, { isLoading: isReportToOrgLoading }] = useReportToOrgMutation();
    const { data: { result: abuseType } = { result: [] }, isLoading: isAbuseTypeLoading } = useAbuseTypeQuery();
    const [form] = Form.useForm();

    const { openNotification } = useNotification();

    const [showInputReason, setInputReasoon] = useState(false);
    const [messageAbuseTypes, setMessageAbuseTypes] = useState(null);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const data = {
                    type: 'message',
                    organization_id: orgID,
                    message_id: message?.message_id,
                    abuse_type_id: values?.reason,
                    event_id: eventID,
                    additional_description: values?.customReason ?? null,
                };

                reportToOrg(data).then((res) => {
                    if (res.error) {
                        console.log(res.error);
                        openNotification('warning', 'Something went wrong', 'try again later', 'bottomRight');
                    } else {
                        openNotification(
                            'success',
                            'Report Submitted',
                            'Your report has been successfully submitted and will be reviewed shortly.',
                            'topLeft'
                        );
                        setShowReportMessageModal(false);
                        form.resetFields();
                    }
                });
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

    useEffect(() => {
        // console.log(abuseType);
        if (abuseType) {
            setMessageAbuseTypes(abuseType?.filter((type) => type.category === 'message'));
        }
    }, [abuseType]);

    return (
        <Modal
            title='Report Message'
            open={showReportMessageModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Submit Report'
            cancelText='Cancel'
        >
            <Spin spinning={isReportToOrgLoading}>
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
                        <Select
                            placeholder='Select a reason'
                            onChange={(id) => {
                                if (id === '8') {
                                    setInputReasoon(true);
                                } else {
                                    setInputReasoon(false);
                                }
                            }}
                            loading={isAbuseTypeLoading}
                        >
                            {messageAbuseTypes?.map((type) => (
                                <Option key={type.value} value={type.value}>
                                    {type.label} {type.label === 'Other' ? '(Specify Below)' : ''}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.reason !== currentValues.reason}
                    >
                        {showInputReason ? (
                            <Form.Item
                                name='customReason'
                                rules={[{ required: true, message: 'Please input your reason!' }]}
                            >
                                <Input placeholder='Please specify your reason' />
                            </Form.Item>
                        ) : null}
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default ReportMessageModal;
