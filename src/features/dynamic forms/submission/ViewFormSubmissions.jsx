import { Button, Col, ConfigProvider, Empty, Form, Image, Row, Select, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFormQuery, useQuerySubmissionsMutation, useUpdateSubmissionStatusMutation } from '../dynamicFormsSlice';
import Filter from './Filter';
import FormGroup from './FormGroup';
import SubmissionsFloatingStatusList from './components/SubmissionsFloatingStatusList';
import SubmissionsNavigator from './components/SubmissionsNavigator';
import styles from './paper.module.css';
import AttendeeBrief from './components/AttendeeBrief';
import { useNotification } from '../../../utils/NotificationContext';

export default function ViewFormSubmissions() {
    let { form_id, event_id } = useParams();
    const navigate = useNavigate();
    const { openNotification } = useNotification();

    const [querySubmissions, { isLoading: isQueryingLoading }] = useQuerySubmissionsMutation();
    const { data: { result: DBform } = { result: {} }, isLoading: isFormLoading } = useGetFormQuery(form_id);
    const [updateSubmissionStatus] = useUpdateSubmissionStatusMutation();

    const [submissions, setSubmissions] = useState(null);
    const [submissionsIdx, setSubmissionIdx] = useState(0);
    const [submissionStatus, setSubmissionStatus] = useState('loading...');
    const [allStatusCount, setAllStatusCount] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);
    const [submissionUser, setSubmissionUser] = useState(null);
    const [form] = Form.useForm();

    const handleFilter = (fields) => {
        console.log('call');
        querySubmissions({ event_id: parseInt(event_id), ...fields }).then((response) => {
            const mappedSubmission = mapSubmissions(response, DBform);

            setActiveFilters(fields);
            setSubmissions(mappedSubmission);
        });
    };

    const handleSubmissionStatusChange = (newStatus) => {
        updateSubmissionStatus({
            event_id: parseInt(event_id),
            attendee_id: parseInt(submissionUser.id),
            status: newStatus,
        }).then((res) => {
            if (res.error) {
                openNotification(
                    'error',
                    `failed to update status (${res?.error?.data?.result?.response?.message})`,
                    undefined,
                    'bottomLeft'
                );
            } else {
                openNotification('success', `status updated successfully`, undefined, 'bottomLeft');
                allStatusCount[submissionStatus]--;
                allStatusCount[res?.data?.result]++;
                setSubmissionStatus(res?.data?.result);
            }
        });
    };

    const countStatusOccurrences = () => {
        let counts = {
            'waiting': 0,
            'accepted': 0,
            'not registered': 0,
            'rejected': 0,
        };
        submissions?.forEach((submission) => {
            counts[submission.status]++;
        });

        setAllStatusCount(counts);
    };

    useEffect(() => {
        if (DBform) {
            console.log('duty');
            querySubmissions({ event_id: parseInt(event_id), groups: [] }).then((response) => {
                const mappedSubmission = mapSubmissions(response, DBform);

                setActiveFilters([]);
                setSubmissions(mappedSubmission);
            });
        }
    }, [isFormLoading]);

    useEffect(() => {
        if (Array.isArray(submissions) && submissionsIdx < submissions.length) {
            console.log('subs', submissions);
            form.setFieldsValue(submissions[submissionsIdx]);
            setSubmissionStatus(submissions[submissionsIdx].status);
            setSubmissionUser(submissions[submissionsIdx].attendee);
            countStatusOccurrences();
        } else {
            setSubmissionUser(null);
            setSubmissionStatus(null);
        }
    }, [form, submissions, submissionsIdx]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#a098ad',
                },
            }}
        >
            <div className={`grid grid-cols-12 min-h-[100vh] ${styles.paper} `}>
                {console.log(allStatusCount)}
                <Spin
                    size='large'
                    spinning={isFormLoading}
                    fullscreen
                    tip={
                        <div className='m-2 flex flex-col justify-between h-full '>
                            <span>loading Submissions...</span>
                            {/* TODO link */}
                            <Button type='primary'>Return</Button>
                        </div>
                    }
                />
                <>
                    <div className='sm:col-span-2 sm:col-start-1  mt-20 ml-8 hidden lg:block '>
                        {submissions && (
                            <SubmissionsFloatingStatusList
                                pendingCount={allStatusCount?.waiting}
                                acceptedCount={allStatusCount?.accepted}
                                rejectedCount={allStatusCount?.rejected}
                                notRegisteredCount={allStatusCount?.['not registered']}
                            />
                        )}
                    </div>
                    <div className='col-span-12 sm:col-span-8 sm:col-start-3  h-full w-full'>
                        <Title
                            level={2}
                            className='text-center my-2'
                        >
                            Submissions
                        </Title>

                        <div className='grid grid-cols-8'>
                            <div className='col-span-8 lg:col-span-6 lg:col-start-2   '>
                                <Row
                                    className='bg-white border-x-2 border-t-4 shadow shadow-lg border-[#a098ad] rounded-lg'
                                    align={'middle'}
                                    justify={'space-between'}
                                >
                                    <Col
                                        xs={{ span: 10 }}
                                        sm={{ span: 10 }}
                                        md={{ span: 10 }}
                                        lg={{ span: 6 }}
                                    >
                                        {!isQueryingLoading && submissions && (
                                            <SubmissionsNavigator
                                                submissionsCount={submissions?.length}
                                                currentIndex={submissions?.length == 0 ? -1 : submissionsIdx}
                                                onNext={() =>
                                                    setSubmissionIdx((submissionsIdx + 1) % submissions?.length)
                                                }
                                                onPrevious={() =>
                                                    setSubmissionIdx(
                                                        (submissionsIdx - 1 + submissions?.length) % submissions?.length
                                                    )
                                                }
                                                onChange={(newVal) => {
                                                    if (newVal <= submissions?.length && newVal >= 1)
                                                        setSubmissionIdx(newVal - 1);
                                                }}
                                            />
                                        )}
                                    </Col>
                                    <Col
                                        xs={{ span: 7 }}
                                        sm={{ span: 7 }}
                                        md={{ span: 7 }}
                                        lg={{ span: 5 }}
                                    >
                                        {!isQueryingLoading && (
                                            <Select
                                                size='middle'
                                                variant='borderless'
                                                // showAction={true}
                                                value={submissionStatus}
                                                //   disabled={submissionStatus == 'not registered'}
                                                onChange={handleSubmissionStatusChange}
                                                options={[
                                                    {
                                                        value: 'waiting',
                                                        label: 'Waiting',
                                                    },
                                                    {
                                                        value: 'accepted',
                                                        label: 'Accepted',
                                                    },
                                                    {
                                                        value: 'rejected',
                                                        label: 'Rejected',
                                                    },
                                                ]}
                                            />
                                        )}
                                    </Col>
                                </Row>

                                <div className='my-2'>
                                    <Filter onFilter={handleFilter} />
                                </div>
                                <Row
                                    className='mt-4'
                                    align={'middle'}
                                    justify={'space-evenly'}
                                    gutter={16}
                                >
                                    <Col
                                        xs={12}
                                        sm={10}
                                        md={10}
                                        lg={8}
                                    >
                                        {console.log(submissionUser)}
                                        {submissionUser && (
                                            <AttendeeBrief
                                                username={submissionUser?.user?.username}
                                                onClick={() => navigate(`/attendee-profile/${submissionUser.id}`)}
                                            />
                                        )}
                                    </Col>
                                    <Col>
                                        <Button
                                            disabled
                                            className='bg-gray-200/50'
                                        >
                                            History
                                        </Button>
                                    </Col>
                                </Row>
                                {submissions?.length == 0 ? (
                                    <Empty description='No Submissions' />
                                ) : (
                                    <Form
                                        name='submissions-form'
                                        form={form}
                                        disabled
                                        requiredMark={'optional'}
                                        layout='vertical'
                                    >
                                        <Spin spinning={isQueryingLoading}>
                                            {DBform?.groups?.map((group, index) => (
                                                <div key={group.id}>
                                                    <FormGroup
                                                        isCustomStyle
                                                        group={group}
                                                        groupsLength={DBform.groups?.length}
                                                        groupIndex={index}
                                                    />
                                                    <div className='text-gray-500 text-center'>
                                                        {`<${index + 1}/${DBform?.groups?.length}>`}
                                                    </div>
                                                </div>
                                            ))}
                                        </Spin>
                                    </Form>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </ConfigProvider>
    );
}

const mapSubmissions = (response, DBform) => {
    if (!DBform || !response || (DBform && !DBform.groups)) return;

    const mappedSubmissions = [];

    response?.data?.result?.forEach((submission) => {
        const mappedSubmission = {
            id: submission.id,
            submission_date: submission.submission_date,
            attendee: submission.attendee,
            status: submission.status,
        };

        const groups = DBform?.groups?.map((group) => ({ fields: new Array(group.fields.length) }));

        mappedSubmission.groups = groups?.map((group) => ({ ...group }));

        submission.fields.forEach((field) => {
            const groupIndex = DBform.groups?.findIndex((group) => group.fields.some((f) => f.id == field.field_id));

            if (groupIndex != -1) {
                const fieldIndex = DBform.groups[groupIndex].fields.findIndex((f) => f.id === field.field_id);

                if (fieldIndex != -1) {
                    if (
                        typeof field.value === 'string' &&
                        isNaN(field.value) &&
                        moment(field.value, moment.ISO_8601, true).isValid()
                    ) {
                        console.log('old', field);
                        const updatedField = { ...field, value: moment(field.value) };
                        console.log('new', updatedField);

                        mappedSubmission.groups[groupIndex].fields[fieldIndex] = updatedField;
                    } else {
                        mappedSubmission.groups[groupIndex].fields[fieldIndex] = field;
                    }
                }
            }
        });
        mappedSubmissions.push(mappedSubmission);
    });
    return mappedSubmissions;
};
