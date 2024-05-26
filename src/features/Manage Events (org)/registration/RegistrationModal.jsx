import { FormOutlined, ReloadOutlined, SmileOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Modal, Result, Space, Spin, Steps, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { TiTicket } from 'react-icons/ti';
import SubmitForm from '../../dynamic forms/submission/SubmitForm';
import { useNavigate } from 'react-router-dom';
import { GiConfirmed } from 'react-icons/gi';
import { useAttendEventMutation, useGetDidAttendeeFillFormQuery } from './registrationSlice';
import { useNotification } from '../../../utils/NotificationContext';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import { useGetAttendeeBalanceQuery } from '../../Ticketing Packages/TicketingPackagesSlice';

export default function RegistrationModal({ event, isOpen, onClose }) {
    const navigate = useNavigate();
    const { openNotification } = useNotification();

    const [pullForm, setPullForm] = useState(false);
    const [pullBalance, setPullBalance] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const [attendEvent, { isLoading: isAttendEventLoading, isSuccess: isAttendEventSuccess }] =
        useAttendEventMutation();
    const {
        data: { result: didFillForm } = { result: false },
        isLoading: isDidFillFormLoading,
        isFetching: isDidFillFormFetching,
    } = useGetDidAttendeeFillFormQuery(
        { event_id: event?.result?.id, attendee_id: getLoggedInUserV2()?.attendee_id },
        { pollingInterval: pullForm ? 3000 : undefined }
    );
    const { data: { result: balanceObj } = { result: {} }, isLoading: isBalanceObjLoading } =
        useGetAttendeeBalanceQuery(getLoggedInUserV2()?.attendee_id, {
            pollingInterval: pullBalance ? 3000 : undefined,
        });

    useEffect(() => {
        if (!didFillForm && event?.result?.form) setPullForm(true);
        else setPullForm(false);
    }, [didFillForm, event]);

    useEffect(() => {
        if (parseInt(balanceObj.balance) < parseInt(event?.result?.fees)) setPullBalance(true);
        else setPullBalance(false);
    }, [balanceObj, event]);

    /*   useEffect(() => {
        let newStep = currentStep;

        if (isOpen) {
            if (!event?.result?.form && newStep != 1) newStep++;
            if (!event?.result?.fees && newStep != 2) newStep++;
        }

        if (newStep != currentStep) setCurrentStep(newStep);
    }, [currentStep, event, isOpen]); */

    /*  const handleConfirmRegistration = () => {
        attendEvent({ event_id: event?.result?.id }).then((res) => {
            if (res.error) {
                openNotification('error', 'failed to confirm registration', 'try again later', 'bottomRight');
            }
        });
    };

    useEffect(() => {
        setCurrentStep((step) => {
            if (step == 0) return step + 1;
            else return step;
        });
    }, [isAttendEventSuccess]); */

    const handleStepChange = (step) => {
        if (step == steps.length - 1) {
            attendEvent({ event_id: event?.result?.id })
                .unwrap()
                .then((res) => {
                    setCurrentStep(step + 1);
                })
                .catch((e) => {
                    openNotification('error', 'Failed to confirm registration', e?.data?.message, 'bottomRight');
                });
        } else {
            setCurrentStep(step);
        }
    };
    const steps = [
        !event?.result?.form &&
            !event?.result?.fees && {
                title: 'Confirm Registration',
                icon: <WarningOutlined />,
                content: (
                    <div className=' flex flex-col justify-center items-center'>
                        <WarningOutlined className='text-[10em] my-6 text-primary' />
                        <div className='text-pretty text-lg text-gray-500 my-4'>
                            You are registering for {event?.result?.title} event
                        </div>
                        <Button
                            type='primary'
                            onClick={() => {
                                handleStepChange(currentStep + 1);
                            }}
                        >
                            Confirm Registration
                        </Button>
                    </div>
                ),
            },
        event?.result?.form && {
            title: 'Form',
            icon: <FormOutlined />,
            content: (
                <Spin spinning={isDidFillFormLoading}>
                    <div className='flex flex-col  items-center justify-center w-full space-y-8 p-8'>
                        {didFillForm ? (
                            <div className='flex flex-col justify-center items-center'>
                                <div className='text-lg text-pretty text-primary'>You Have Submitted Event Form</div>
                                <Button
                                    type='primary'
                                    onClick={handleStepChange(currentStep + 1)}
                                >
                                    {' '}
                                    Next
                                </Button>
                            </div>
                        ) : (
                            <div className=' w-[80%] lg:w-[40%] p-4 rounded-xl text-center flex justify-center flex-col bg-gray-200  space-y-6'>
                                <div className='flex flex-col w-full'>
                                    <Typography.Title level={4}>{event?.result?.form?.name}</Typography.Title>
                                    <Typography.Text type='secondary'>
                                        {event?.result?.form?.description || 'no description'}
                                    </Typography.Text>
                                </div>
                                <Button
                                    type='primary'
                                    onClick={() =>
                                        // navigate(`/form/${event?.result?.form?.id}/event/${event?.result?.id}/submit`)
                                        window.open(
                                            `${window.location.origin}/form/${event?.result?.form?.id}/event/${event?.result?.id}/submit`
                                        )
                                    }
                                >
                                    Fill Form
                                </Button>
                            </div>
                        )}
                    </div>
                </Spin>
            ),
        },
        event?.result?.fees && {
            title: 'Pay',
            icon: <TiTicket />,
            content:
                parseInt(balanceObj.balance) >= parseInt(event?.result?.fees) ? (
                    <div className='flex flex-col  h-full space-y-8'>
                        <div className='flex flex-col space-y-4 md:flex-row md:space-y-0  space-x-4 justify-center items-center mt-4'>
                            <div className='w-full h-full text-center'>
                                <Typography.Text className='text-[1.2em] font-semibold font-mono text-center'>
                                    {' '}
                                    Your Tickets Balance
                                </Typography.Text>
                                <div className='flex w-full justify-center items-center'>
                                    <TiTicket className='text-[2em] text-yellow-500' />
                                    <Spin
                                        wrapperClassName='w-fit'
                                        style={{ width: '100%' }}
                                        spinning={isBalanceObjLoading}
                                    >
                                        <Typography.Text
                                            code
                                            className='text-[1.2em]'
                                        >
                                            {balanceObj?.balance}
                                        </Typography.Text>
                                    </Spin>
                                </div>
                            </div>
                            <div className='w-full h-full text-center'>
                                <Typography.Text className='text-[1.2em] font-semibold font-mono text-center'>
                                    {' '}
                                    Cost
                                </Typography.Text>
                                <div className='flex w-full justify-center items-center'>
                                    <TiTicket className='text-[2em] text-yellow-500' />
                                    <Typography.Text
                                        code
                                        className='text-[1.2em]'
                                    >
                                        {event?.result?.fees}
                                    </Typography.Text>
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full space-x-2 justify-center'>
                            <Button
                                type='primary'
                                onClick={() => {
                                    handleStepChange(currentStep + 1);
                                }}
                            >
                                Confirm Payment
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center space-y-4 mt-4'>
                        <Typography.Text className='text-[1.2em] font-semibold font-mono text-center'>
                            {' '}
                            Your Tickets Balance <Typography.Text type='danger'>NOT SUFFICIENT</Typography.Text>
                        </Typography.Text>
                        <TiTicket className='text-[5em] text-yellow-500' />
                        <Spin
                            wrapperClassName='w-fit'
                            style={{ width: '100%' }}
                            spinning={isBalanceObjLoading}
                        >
                            <Typography.Text
                                code
                                className='text-[1.2em]'
                            >
                                {balanceObj?.balance}
                            </Typography.Text>
                        </Spin>
                        <Typography.Text className='font-semibold'>
                            {' '}
                            you need <Typography.Text type='danger'>150</Typography.Text> more tickets
                        </Typography.Text>
                        <div className='flex w-full space-x-2 justify-center'>
                            {/* <Button
                                icon={<ReloadOutlined />}
                                type='text'
                            >
                                {' '}
                                Retry
                            </Button> */}

                            <Button
                                type='primary'
                                onClick={() => {
                                    window.open(`${window.location.origin}/home/tickets`);
                                }}
                            >
                                {' '}
                                BUY TICKETS
                            </Button>
                        </div>
                    </div>
                ),
        },
        {
            title: 'Done',
            icon: <SmileOutlined />,
            content: (
                <Result
                    status={'success'}
                    title={'Registration Completed'}
                    subTitle={'You have completed the registration process'}
                ></Result>
            ),
        },
    ].filter((entry) => entry != null && entry != false);

    console.log(steps);

    return (
        <Modal
            title={'registering for event x'}
            centered={true}
            open={isOpen}
            width={'80svw'}
            footer={null}
            onCancel={() => {
                onClose();
                setCurrentStep(0);
            }}
            classNames={{ body: 'm-4 mt-8' }}
            destroyOnClose
        >
            <Steps
                current={currentStep}
                items={steps}
                responsive
                size='small'
            />

            <div className='mt-4 p-2 overflow-y-auto max-h-[70svh]'>{steps[currentStep]?.content}</div>
        </Modal>
    );
}
