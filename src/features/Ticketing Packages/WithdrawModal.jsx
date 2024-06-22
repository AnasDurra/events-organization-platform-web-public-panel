import { Form, InputNumber, Modal, Space } from 'antd';
import React, { useState } from 'react';
import { FcMoneyTransfer } from 'react-icons/fc';
import { TiTicket } from 'react-icons/ti';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function WithdrawModal({ isOpen, onFinish, balance, loading, onCancel }) {
    const [form] = Form.useForm();
    return (
        <Modal
            open={isOpen}
            title='Withdraw Request'
            classNames={{ body: 'm-8 mt-10' }}
            onOk={() => form.submit()}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            okButtonProps={{ loading: loading }}
        >
            <Form
                form={form}
                onFinish={(fields) => {
                    onFinish(fields);
                }}
            >
                <div className='flex justify-center items-center space-y-8 flex-col'>
                    <div className='flex justify-center items-center space-x-8'>
                        <TiTicket className='text-[8em] text-primary'></TiTicket>
                        <FaArrowRightLong className='text-[4em] text-gray-500'></FaArrowRightLong>
                        <FcMoneyTransfer className='text-[8em]'></FcMoneyTransfer>
                    </div>

                    <Form.Item
                        name={'amount'}
                        required={true}
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            className='min-w-[60%] border-4 border-x-primary border-y-primary/50 rounded-lg '
                            addonBefore={'Amount'}
                            addonAfter={`/${balance || 0}`}
                            max={balance}
                            min={1}
                        />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
}
