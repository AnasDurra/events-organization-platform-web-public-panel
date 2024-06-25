import { CloseOutlined } from '@ant-design/icons';
import { setRef } from '@mui/material';
import { Input, Modal, Space, Button, Divider } from 'antd';
import React, { useRef, useEffect, useState } from 'react';
import { AiFillGift } from 'react-icons/ai';
import { useGetGiftCardInfoMutation, useRedeemGiftCardMutation } from './giftCardsSlice';

const fakeGiftCardData = {
    'AAAAA-AAAAA-AAAAA-AAAAA-AAAAA': { tickets: 10 },
    'FGHIJ-FGHIJ-FGHIJ-FGHIJ-FGHIJ': { tickets: 5 },
};

export default function RedeemCodeModal({ isOpen, onClose }) {
    const inputRefs = useRef([]);
    const [giftCode, setGiftCode] = useState(['', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [getGiftCardInfo, { data: { result: giftCardInfo } = { result: {} } }] = useGetGiftCardInfoMutation();
    const [redeemGiftCard] = useRedeemGiftCardMutation();

    const handleInputChange = (e, index) => {
        const newCode = [...giftCode];
        newCode[index] = e.target.value;
        setGiftCode(newCode);

        if (e.target.value.length === 5 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleVerifyCode = () => {
        const code = giftCode.join('');
        setIsVerifying(true);
        setError(null);

        getGiftCardInfo({ code })
            .unwrap()
            .then((res) => {
                console.log(res);

                if (!res?.result?.active) {
                    setError('Expired Code');
                } else if (res?.result?.redeemed) {
                    setError('Code has been redeemed already');
                } else {
                    setIsConfirming(true);
                }

                setIsVerifying(false);
            })
            .catch((e) => {
                console.log(e);
                setError(e?.data?.result?.message);
                setIsVerifying(false);
            });

        /*   setTimeout(() => {
            setIsVerifying(false);
            if (fakeGiftCardData[code]) {
                setVerificationResult(fakeGiftCardData[code]);
                setIsConfirming(true);
            } else {
                setError('Invalid gift card code');
            }
        }, 1000); */
    };

    const handleConfirm = () => {
        const code = giftCode.join('');

        setIsVerifying(true);
        setError(null);

        redeemGiftCard({code})
            .unwrap()
            .then((res) => {
                setIsVerifying(false);
                setIsConfirming(false);
                setIsSuccess(true);
            })
            .catch((e) => {
                setIsVerifying(false);
                setError(' Error Redeeming your code, try again');
            });
        /*  setTimeout(() => {
            setIsVerifying(false);
            if (true) {
                setIsConfirming(false);
                setIsSuccess(true);
                setIsVerifying(false);
            } else {
                setError(' Error confirming');
            }
        }, 1000); */
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && giftCode.every((code) => code.length === 5)) {
            if (isConfirming) {
                handleConfirm();
            } else {
                handleVerifyCode();
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            inputRefs?.current[0]?.focus();
        }
    }, [isOpen]);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            title={null}
            centered
            destroyOnClose={true}
            className='rounded-3xl'
            styles={{ content: { padding: 0, borderRadius: '1.5rem', minWidth: '40svw' } }}
            closable={false}
            afterClose={() => {
                setIsConfirming(false);
                setIsSuccess(false);
                setGiftCode(['', '', '', '', '']);
                setError(null);
                setIsVerifying(false);
            }}
        >
            <div
                onKeyDown={handleKeyPress}
                className='w-full h-full min-h-[50svh] min-w-[40svw] rounded-3xl p-2 px-4 pb-8 border-x-8 border-b-8 border-primary relative'
            >
                <div
                    className='absolute top-4 right-4 hover:cursor-pointer hover:text-secondary'
                    onClick={onClose}
                >
                    <CloseOutlined />
                </div>
                <div className='flex justify-center'>
                    <AiFillGift className='text-[6rem] text-primary mt-[-3rem]' />
                </div>

                <div className='text-2xl text-textPrimary text-center'>
                    Redeem your <div className='text-secondary'>Gift card</div>
                </div>
                <Divider></Divider>

                {isSuccess ? (
                    <div className='mt-8 text-center'>
                        <div className='text-lg'>
                            <span className='text-green-700'>Success!</span> Your gift card has been redeemed.
                        </div>
                        <Button
                            type='primary'
                            className='mt-4'
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </div>
                ) : isConfirming ? (
                    <div className='mt-8 text-center'>
                        <div className='text-lg'>
                            You Are About To Receive
                            <div className='text-secondary'>{giftCardInfo?.variant?.tickets} tickets</div>
                        </div>

                        {error && <div className='mt-4 text-center text-red-500'>{error}</div>}

                        <div className='mt-4'>
                            <Button
                                type='dashed'
                                className='mt-4 mx-2'
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='primary'
                                className='mt-4'
                                onClick={handleConfirm}
                                loading={isVerifying}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <ul className='list-disc  list-outside text-left mx-8 text-pretty marker:text-primary text-[1rem]'>
                            <li>Your code can be found on the back of your gift card.</li>
                            <li>Scratch off the protective covering to reveal your code when ready to use it.</li>
                            <li>Enter the full code below to redeem your gift card.</li>
                            <li>
                                If you encounter any issues, please contact us at{' '}
                                <span className='text-secondary'>support@WEEVENTS.com</span>.
                            </li>
                        </ul>
                        <div className='mt-8'>
                            <Space.Compact block>
                                {[...Array(5)].map((_, index) => (
                                    <React.Fragment key={index}>
                                        <Input
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            maxLength={5}
                                            style={{
                                                width: 100,
                                                textAlign: 'center',
                                            }}
                                            onChange={(e) => handleInputChange(e, index)}
                                            placeholder='XXXXX'
                                        />
                                        {index < 4 && (
                                            <Input
                                                className='site-input-split'
                                                style={{
                                                    width: 30,
                                                    borderLeft: 0,
                                                    borderRight: 0,
                                                    pointerEvents: 'none',
                                                }}
                                                placeholder='-'
                                                disabled
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </Space.Compact>
                            {error && <div className='mt-4 text-center text-red-500'>{error}</div>}
                            <Button
                                type='primary'
                                className='mt-4'
                                block
                                onClick={handleVerifyCode}
                                loading={isVerifying}
                                disabled={!giftCode.every((code) => code.length === 5)}
                            >
                                Verify Code
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}
