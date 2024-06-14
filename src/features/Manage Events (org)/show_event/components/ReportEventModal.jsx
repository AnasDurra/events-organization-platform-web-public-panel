import { Modal, Form, Input, Select, Typography, Space, Spin, Divider, Alert } from 'antd';

import { useState } from 'react';
import { useNotification } from '../../../../utils/NotificationContext';
import { usePlatformProblemsQuery, useReportAdminMutation } from '../../../../api/services/adminReports';
import { useEffect } from 'react';
const { Option } = Select;
const { Text } = Typography;

const ReportEventModal = ({ data, showReportEventModal, setShowReportEventModal }) => {
    const event_id = data?.event_id;

    const [reportAdmin, { isLoading: isReportAdminLoading }] = useReportAdminMutation();
    const { data: { result: platformProblems } = { result: [] }, isLoading: isPlatformProblemsLoading } =
        usePlatformProblemsQuery();

    const [form] = Form.useForm();
    const { openNotification } = useNotification();

    const [showInputReason, setInputReasoon] = useState(false);
    const [eventAbuseTypes, setEventAbuseTypes] = useState(null);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const data = {
                    type: 'event',
                    platform_problem_id: values?.reason,
                    event_id: event_id,
                    additional_description: values?.customReason ?? null,
                };

                reportAdmin(data).then((res) => {
                    if (res.error) {
                        console.log(res.error);
                        openNotification('warning', 'Something went wrong', 'try again later', 'bottomRight');
                    } else {
                        openNotification(
                            'success',
                            'Report Submitted',
                            'Your report has been successfully submitted and platform admins will reviewe it shortly.',
                            'topLeft'
                        );
                        setShowReportEventModal(false);
                        form.resetFields();
                    }
                });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setShowReportEventModal(false);
    };

    useEffect(() => {
        if (platformProblems) {
            setEventAbuseTypes(platformProblems?.filter((type) => type.category === 'event'));
        }
    }, [platformProblems]);

    return (
        <Modal
            title='Report Event'
            open={showReportEventModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Submit Report'
            cancelText='Cancel'
        >
            <Spin spinning={isReportAdminLoading}>
                <Divider style={{ marginTop: '0px' }} />
                <Form form={form} layout='vertical'>
                    <Space direction='vertical' style={{ width: '100%', marginBottom: '2em' }}>
                        <Space direction='vertical'>
                            <Space size={10} wrap>
                                <Typography.Title level={5}>{data?.title}</Typography.Title>
                                <Typography.Title level={5} disabled>
                                    ({data?.event_type})
                                </Typography.Title>
                            </Space>
                            <Space style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-1em' }}>
                                <Typography.Text disabled>
                                    {(() => {
                                        const registrationStartDate = new Date(data?.registration_start_date);
                                        const currentDate = new Date();
                                        const differenceInMilliseconds = currentDate - registrationStartDate;
                                        const differenceInDays = Math.floor(
                                            differenceInMilliseconds / (1000 * 60 * 60 * 24)
                                        );
                                        return `${differenceInDays} days ago`;
                                    })()}
                                </Typography.Text>
                            </Space>
                            <Typography.Text>
                                Hosted by <span style={{ fontWeight: 'bold' }}>@{data?.organization?.name}</span>
                            </Typography.Text>
                        </Space>
                    </Space>

                    <Form.Item
                        name='reason'
                        label='Reason for Reporting:'
                        rules={[{ required: true, message: 'Please select a reason!' }]}
                    >
                        <Select
                            placeholder='Select a reason'
                            onChange={(id) => {
                                if (id === '9') {
                                    setInputReasoon(true);
                                } else {
                                    setInputReasoon(false);
                                }
                            }}
                            loading={isPlatformProblemsLoading}
                        >
                            {eventAbuseTypes?.map((type) => (
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
                <Alert
                    // message='Important'
                    description='Please note that this report will be sent to the platform admin for review.'
                    type='info'
                    showIcon
                    // className='mb-4'
                />
            </Spin>
        </Modal>
    );
};

export default ReportEventModal;
