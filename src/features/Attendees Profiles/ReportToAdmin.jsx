import React from 'react';
import { Form, Input, Select, Button, Typography, Alert, Spin } from 'antd';
import 'tailwindcss/tailwind.css';
import { usePlatformProblemsQuery, useReportAdminMutation } from '../../api/services/adminReports';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNotification } from '../../utils/NotificationContext';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const ReportToAdmin = () => {
    const { openNotification } = useNotification();

    const [reportAdmin, { isLoading: isReportAdminLoading }] = useReportAdminMutation();
    const { data: { result: platformProblems } = { result: [] }, isLoading: isPlatformProblemsLoading } =
        usePlatformProblemsQuery();

    const [globalAbuseTypes, setGlobalAbuseTypes] = useState(null);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = {
            type: 'general',
            platform_problem_id: values?.platform_problem_id,
            additional_description: values?.additional_description,
        };

        reportAdmin(data).then((res) => {
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
                form.resetFields();
            }
        });
    };

    useEffect(() => {
        if (platformProblems) {
            setGlobalAbuseTypes(platformProblems?.filter((type) => type.category === 'general'));
        }
    }, [platformProblems]);

    return (
        <div className='container mx-auto px-4 py-6'>
            <Title level={2} className='text-center'>
                Report an Issue to Admin
            </Title>
            <Paragraph className='text-center mb-6'>
                Please fill out the form below to report any system issues or administrative concerns. Your feedback is
                important to us.
            </Paragraph>
            <Alert
                message='Note'
                description='Select the issue type from the dropdown menu and provide additional details in the description field.'
                type='info'
                showIcon
                className='mb-6'
            />
            <Spin spinning={isReportAdminLoading}>
                <Form form={form} layout='vertical' onFinish={onFinish} className='bg-white p-6 rounded-lg shadow-md'>
                    <Form.Item
                        name='platform_problem_id'
                        label='Issue Type'
                        rules={[{ required: true, message: 'Please select an issue type' }]}
                    >
                        <Select size='large' placeholder='Select an issue type' loading={isPlatformProblemsLoading}>
                            {globalAbuseTypes?.map((type) => (
                                <Option key={type.value} value={type.value}>
                                    {type.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='additional_description'
                        label='Additional Description'
                        rules={[{ required: true, message: 'Please provide additional details' }]}
                    >
                        <TextArea
                            size='large'
                            allowClear
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            placeholder='Please describe the issue in detail'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button size='large' type='primary' htmlType='submit' className='w-full'>
                            Submit Report
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
};

export default ReportToAdmin;
