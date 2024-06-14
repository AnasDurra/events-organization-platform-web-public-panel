import { useState } from 'react';
import { Table, Tag, Dropdown, Menu, Modal, Button, Avatar, Typography, Space, Divider } from 'antd';
import moment from 'moment';
import {
    useIgnoreReportMutation,
    useOrgReportsQuery,
    useResolveMessageReportMutation,
    useResolveProblemMutation,
} from '../../../api/services/reports';
import './OrgReports.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useNotification } from '../../../utils/NotificationContext';

const OrgReports = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const { openNotification } = useNotification();

    const { data, isLoading, refetch, isFetching } = useOrgReportsQuery({ page: currentPage, pageSize: pageSize });
    const total = data?.result?.metadata?.total || 0;

    const [resolveMessageReport, { isLoading: isResolveMessageReportLoading }] = useResolveMessageReportMutation();
    const [ignoreReport, { isLoading: isIgnoreReportLoading }] = useIgnoreReportMutation();
    const [resolveProblem, { isLoading: isResolveProblemLoading }] = useResolveProblemMutation();

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
        refetch(currentPage, pageSize);
    };

    const showModal = (id, type, message, description, event, status, date, isDisabled) => {
        setModalContent({ id, type, message, description, event, status, date, isDisabled });
        setIsModalVisible(true);
    };

    const handleResolveMessage = (id) => {
        resolveMessageReport(id).then((res) => {
            console.log(res);
            if (res.error) {
                openNotification({
                    type: 'warning',
                    message: 'Failed to logout',
                    description: 'try again later',
                    placement: 'bottomRight',
                });
            } else {
                openNotification(
                    'success',
                    'Report Resolved',

                    'The reported message has been successfully deleted and the report status has been updated to resolved.',
                    'topRight'
                );
            }
        });
        // setIsModalVisible(false);
    };
    const handleIgnore = (id) => {
        ignoreReport(id).then((res) => {
            console.log(res);
            if (res.error) {
                openNotification('warning', 'Failed to logout', 'try again later', 'bottomRight');
            } else {
                openNotification(
                    'info',
                    'Report Ignored',
                    'The report has been ignored and no actions have been taken.',
                    'topLeft'
                );
                setIsModalVisible(false);
            }
        });
    };
    const handleResolveProblem = (id) => {
        resolveProblem(id).then((res) => {
            console.log(res);
            if (res.error) {
                openNotification('warning', 'Failed to logout', 'try again later', 'bottomRight');
            } else {
                openNotification(
                    'success',
                    'Problem Resolved',
                    'The reported global problem has been successfully resolved and necessary actions have been taken.',
                    'topRight'
                );
                setIsModalVisible(false);
            }
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const openConfirmationModal = (report_id, action) => {
        let title = '';
        let content = '';
        let okText = '';
        let cancelText = 'Cancel';
        let onOk = null;

        switch (action) {
            case 'resolve_message':
                title = 'Resolve Message';
                content = 'Are you sure you want to resolve this message?';
                okText = 'Resolve Message';
                onOk = () => {
                    handleResolveMessage(report_id);
                };
                break;
            case 'ignore_message':
                title = 'Ignore Message';
                content = 'Are you sure you want to ignore this message?';
                okText = 'Ignore Message';
                onOk = () => {
                    handleIgnore(report_id);
                };
                break;
            case 'resolve_problem':
                title = 'Resolve Problem';
                content = 'Are you sure you want to resolve this problem?';
                okText = 'Resolve Problem';
                onOk = () => {
                    handleResolveProblem(report_id);
                };
                break;
            case 'ignore_problem':
                title = 'Ignore Problem';
                content = 'Are you sure you want to ignore this problem?';
                okText = 'Ignore Problem';
                onOk = () => {
                    handleIgnore(report_id);
                };
                break;
            default:
                title = 'Confirm';
                content = 'Are you sure you want to proceed?';
                okText = 'Yes';
        }

        Modal.confirm({
            title: title,
            content: content,
            okText: okText,
            cancelText: cancelText,
            onOk: onOk,
            okButtonProps: {},
        });
    };

    const menu = (record, isDisabled) => (
        <Menu>
            <Menu.Item
                key='1'
                onClick={() =>
                    showModal(
                        record?.id,
                        record?.type,
                        record?.message,
                        record?.description,
                        record?.event,
                        record?.status,
                        record?.date,
                        isDisabled
                    )
                }
            >
                View Details
            </Menu.Item>
            <Menu.Item
                key='2'
                disabled={isDisabled}
                onClick={() =>
                    record?.type == 'message'
                        ? openConfirmationModal(record?.id, 'resolve_message')
                        : openConfirmationModal(record?.id, 'resolve_problem')
                }
            >
                Resolve
            </Menu.Item>
            <Menu.Item
                key='3'
                disabled={isDisabled}
                onClick={() =>
                    record?.type == 'message'
                        ? openConfirmationModal(record?.id, 'ignore_message')
                        : openConfirmationModal(record?.id, 'ignore_problem')
                }
            >
                Ignore
            </Menu.Item>
        </Menu>
    );

    const getTypeTagColor = (type) => {
        return type === 'problem' ? 'darkslategray' : 'darkblue';
    };

    const getStatusTagColor = (status) => {
        switch (status) {
            case 'pending':
                return 'gold';
            case 'ignored':
                return 'volcano';
            case 'resolved':
                return 'green';
            default:
                return 'blue';
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={getTypeTagColor(type)} style={{ textTransform: 'capitalize' }}>
                    {type}
                </Tag>
            ),
        },
        { title: 'Abuse Type', dataIndex: ['abuse_type', 'label'], key: 'abuseType' },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (descreption) => descreption ?? '-',
        },
        { title: 'Reporter', dataIndex: ['reporter', 'username'], key: 'reporter' },
        {
            title: 'Reported By Role',
            dataIndex: ['reporter', 'user_role', 'role_name'],
            key: 'roleName',
            render: (role) => <Tag color='darkgrey'>{role}</Tag>,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('YYYY-MM-DD h:mm:ss A'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusTagColor(status)} style={{ textTransform: 'capitalize' }}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Dropdown
                    overlay={menu(record, record.status === 'ignored' || record.status === 'resolved')}
                    trigger={['click']}
                >
                    <Button type='primary'>
                        <Icon icon='bxs:down-arrow' />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data?.result?.data}
                rowKey='id'
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: total,
                    onChange: handleTableChange,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30'],
                    onShowSizeChange: handleTableChange,
                }}
                loading={isLoading || isFetching}
                bordered
                onChange={handleTableChange}
                scroll={{ x: 'max-content' }}
            />

            <Modal
                title={<span style={{ textTransform: 'capitalize' }}>{modalContent?.type} Details</span>}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key='cancel' size='large' onClick={handleCancel}>
                        Go Back
                    </Button>,
                    <Button
                        danger
                        type='primary'
                        key='ignore'
                        size='large'
                        disabled={modalContent?.isDisabled}
                        onClick={() =>
                            modalContent?.type == 'message'
                                ? openConfirmationModal(modalContent?.id, 'ignore_message')
                                : openConfirmationModal(modalContent?.id, 'ignore_problem')
                        }
                    >
                        <span style={{ textTransform: 'capitalize' }}>Ignore {modalContent?.type}</span>
                    </Button>,
                    <Button
                        key='resolve'
                        type='primary'
                        size='large'
                        disabled={modalContent?.isDisabled}
                        onClick={() =>
                            modalContent?.type == 'message'
                                ? openConfirmationModal(modalContent?.id, 'resolve_message')
                                : openConfirmationModal(modalContent?.id, 'resolve_problem')
                        }
                    >
                        <span style={{ textTransform: 'capitalize' }}>Resolve {modalContent?.type}</span>
                    </Button>,
                ]}
            >
                <Divider style={{ margin: '0em 0em 2.5em 0em' }} />
                {/* {console.log(data)} */}
                <Space direction='vertical' style={{ width: '100%' }} size={20}>
                    {modalContent?.message && (
                        <>
                            <Space align='center'>
                                <Avatar src={modalContent?.message?.user?.avatar} size={64} />
                                <div>
                                    <Typography.Title level={4} style={{ margin: 0 }}>
                                        {modalContent?.message?.user?.username}
                                    </Typography.Title>
                                    <Typography.Text type='secondary'>
                                        {moment(modalContent?.message?.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                                    </Typography.Text>
                                </div>
                            </Space>
                            <div>
                                <Typography.Title level={5} style={{ marginBottom: '8px' }}>
                                    Message
                                </Typography.Title>
                                <Typography.Paragraph
                                    style={{ padding: '10px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}
                                >
                                    {modalContent?.message?.text}
                                </Typography.Paragraph>
                            </div>
                            <Space direction='vertical' style={{ width: '100%' }}>
                                <div>
                                    <Typography.Title level={5} style={{ marginBottom: '8px' }}>
                                        Event
                                    </Typography.Title>
                                    <Typography.Paragraph
                                        style={{ padding: '10px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}
                                    >
                                        {modalContent?.event?.title}
                                    </Typography.Paragraph>
                                    <Button size='small' type='primary'>
                                        <Link to={`/events/${modalContent?.event?.id}`} style={{ color: 'white' }}>
                                            Go to Event
                                        </Link>
                                    </Button>
                                </div>
                            </Space>
                            <Divider />
                        </>
                    )}

                    {modalContent?.description && (
                        <div>
                            <Typography.Title level={5} style={{ marginBottom: '8px' }}>
                                Report Descreption
                            </Typography.Title>
                            <Typography.Paragraph
                                style={{ padding: '10px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}
                            >
                                {modalContent?.description}
                            </Typography.Paragraph>
                        </div>
                    )}

                    {modalContent?.date && (
                        <div>
                            <Typography.Title level={5} style={{ marginBottom: '8px' }}>
                                Report Date
                            </Typography.Title>
                            <Typography.Paragraph
                                style={{ padding: '10px', backgroundColor: '#f0f2f5', borderRadius: '4px' }}
                            >
                                {moment(modalContent?.date).format('MMMM Do YYYY, h:mm:ss A')}
                            </Typography.Paragraph>
                        </div>
                    )}

                    {modalContent?.status && (
                        <div style={{ marginBottom: '2.5em' }}>
                            <Typography.Title level={5} style={{ marginBottom: '8px' }}>
                                Report Status
                            </Typography.Title>
                            <Tag
                                color={getStatusTagColor(modalContent?.status)}
                                style={{
                                    padding: '10px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {modalContent?.status}
                            </Tag>
                        </div>
                    )}
                </Space>
            </Modal>
        </>
    );
};

export default OrgReports;
