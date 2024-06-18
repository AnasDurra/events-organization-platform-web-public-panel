import { Form, Input, Modal, Select, Spin } from 'antd';

import { useAbuseTypeQuery, useReportToOrgMutation } from '../../../api/services/reports.js';
import { useNotification } from '../../../utils/NotificationContext.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
const ComplaintModal = ({ organizer, showComplaintModal, setShowComplaintModal }) => {
    const [reportToOrg, { isLoading: isReportToOrgLoading }] = useReportToOrgMutation();
    const { data: { result: abuseType } = { result: [] }, isLoading: isAbuseTypeLoading } = useAbuseTypeQuery();

    const { openNotification } = useNotification();
    const [form] = Form.useForm();

    const [generalAbuseTypes, setGeneralAbuseTypes] = useState(null);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const data = {
                    type: 'problem',
                    abuse_type_id: values?.abuseType,
                    organization_id: organizer.id,
                    additional_description: values?.description ?? null,
                };
                console.log(data);

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
                        console.log(res);
                        setShowComplaintModal(false);
                        form.resetFields();
                    }
                });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setShowComplaintModal(false);
    };

    useEffect(() => {
        if (abuseType) {
            // console.log(abuseType);
            setGeneralAbuseTypes(abuseType?.filter((type) => type.category === 'general'));
        }
    }, [abuseType]);

    return (
        <>
            <Modal
                title='Report Issue'
                open={showComplaintModal}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Submit'
                cancelText='Cancel'
                okButtonProps={{ size: 'large' }}
                cancelButtonProps={{ size: 'large' }}
            >
                <Spin spinning={isReportToOrgLoading}>
                    <Form style={{ padding: '20px' }} form={form} layout='vertical'>
                        <Form.Item
                            label='Organizer'
                            name='organizer'
                            initialValue={organizer.name}
                            extra={
                                <div style={{ fontSize: '12px', marginLeft: '0.5em', marginTop: '0.5em' }}>
                                    followers: {organizer.organization_followers_count}
                                </div>
                            }
                        >
                            <Input style={{ color: 'black' }} size='large' disabled />
                        </Form.Item>
                        <Form.Item
                            label='Abuse Type'
                            name='abuseType'
                            rules={[{ required: true, message: 'Please select the abuse type!' }]}
                        >
                            <Select loading={isAbuseTypeLoading} size='large' placeholder='Select abuse type'>
                                {generalAbuseTypes?.map((type) => (
                                    <Select.Option key={type.value} value={type.value}>
                                        {type.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Description'
                            name='description'
                            rules={[{ required: true, message: 'Please enter the description!' }]}
                        >
                            <Input.TextArea
                                size='large'
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 6,
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    );
};

export default ComplaintModal;
