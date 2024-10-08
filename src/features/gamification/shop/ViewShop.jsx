import { ConfigProvider, FloatButton, Modal, Popover, message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import CategoriesMenu from './CategoriesMenu';
import ShopBag from './ShopBag';
import ShopHeader from './ShopHeader';
import {
    useGetAttendeePrizeHistoryQuery,
    useGetAttendeeRPsQuery,
    useGetPrizesQuery,
    useRedeemRPsMutation,
} from '../gamificationSlice';
import { getLoggedInUserV2 } from '../../../api/services/auth';
import { useGetAttendeeBalanceQuery } from '../../Ticketing Packages/TicketingPackagesSlice';
import { ShoppingBag } from '@mui/icons-material';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { lightenColor } from '../../../utils/colors';

const { confirm } = Modal;

export default function ViewShop() {
    const [bagPrizeIDs, setBagPrizeIDs] = useState([]);
    const [modal, contextHolder] = Modal.useModal();

    const { data: { result: prizes } = { result: [] },isLoading:isPrizesLoading } = useGetPrizesQuery();
    const { data: { result: hist } = { result: [] } } = useGetAttendeePrizeHistoryQuery(getLoggedInUserV2()?.attendee_id);

    const { data: { result: balanceRP } = { result: null } } = useGetAttendeeRPsQuery(getLoggedInUserV2()?.attendee_id);
    const [redeem, { isLoading: isRedeemLoading, isSuccess: isRedeemSuccess }] = useRedeemRPsMutation();
    const totalCost = prizes.reduce(
        (acc, item) =>
            acc + item.rp_value * bagPrizeIDs.filter((prizeID) => prizeID == item.prize_details?.prize_id).length,
        0
    );
    const totalQuantity = prizes.reduce(
        (acc, item) => acc + bagPrizeIDs.filter((prizeID) => prizeID == item.prize_details?.prize_id).length,
        0
    );

    const handleAddToBag = ({ prize_id }) => {
        const prize = prizes.find((prize) => prize.prize_details?.prize_id == prize_id);

        if (
            totalCost + prizes.find((prize) => prize.prize_details?.prize_id == prize_id).rp_value >
            balanceRP?.points
        ) {
            message.destroy();
            message.warning({
                content: (
                    <div className='flex flex-col justify-center items-center text-pretty'>
                        <div>insufficient balance</div>
                        <div>failed to add {prize?.name} to your shopping bag</div>
                    </div>
                ),
            });
        } else {
            setBagPrizeIDs((prev) => [...prev, prize_id]);
            message.destroy();
            message.success({ content: `${prize?.name} is now in your shopping bag` });
        }
    };

    const handleRemoveAllFromBag = ({ prize_id }) => {
        console.log('pz2: ', prize_id);

        setBagPrizeIDs((prev) => prev.filter((id) => id != prize_id));
    };

    const handleRemoveOneFromBag = ({ prize_id }) => {
        console.log('pz1: ', prize_id);
        const index = bagPrizeIDs.indexOf(prize_id);
        if (index !== -1) {
            setBagPrizeIDs((prev) => {
                const newBagPrizeIDs = [...prev];
                newBagPrizeIDs.splice(index, 1);
                return newBagPrizeIDs;
            });
        }
    };

    const handleCheckout = () => {
        showConfirm({
            onOkClick: () => {
                message.loading();
                redeem({
                    prizes: bagPrizeIDs.map((id) => ({ prize_id: id })),
                }).then((res) => {
                    message.destroy();
                    setBagPrizeIDs([]);
                });
            },
            onCancelClick: () => {},
        });
    };

    const showConfirm = ({ onOkClick, onCancelClick }) => {
        modal.confirm({
            title: 'Confirm order',
            icon: <ExclamationCircleFilled />,
            content: (
                <div className='flex justify-start items-center space-x-0 text-md '>
                    <div>
                        {totalQuantity} item{totalQuantity > 1 ? 's' : null} for {totalCost}{' '}
                    </div>
                    <img
                        className='w-[1.5em] mt-[0.2em]'
                        src={'../assets/points-rp.svg'}
                    ></img>
                </div>
            ),
            cancelText: 'cancel order',

            onOk() {
                onOkClick();
            },
            onCancel() {
                onCancelClick();
            },
        });
    };

    useEffect(() => {
        if (isRedeemSuccess) {
            modal.success({ content: 'You have completed your order successfully' });
        }
    }, [isRedeemSuccess]);
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemSelectedBg: '#2A9D8F',
                        itemSelectedColor: 'white',
                        itemHoverBg: lightenColor('#F4A261', 20),
                        colorBgContainer: 'transparent',
                        itemActiveBg: lightenColor('#F4A261', 20),
                    },
                },
            }}
        >
            {contextHolder}
            {console.log(getLoggedInUserV2())}
            <div className='grid grid-cols-10 gap-4 p-4 w-full h-full'>
                <div className='hidden sm:block sm:col-span-3  lg:col-span-2'>
                    <CategoriesMenu />
                </div>


                <div className='col-span-10 sm:col-span-4 lg:col-span-6  p-2 px-8 flex flex-col space-y-2  border-2 border-gray-200 rounded-3xl'>
                    <ShopHeader rp_value={balanceRP?.points} />
                    <Outlet context={[handleAddToBag, prizes,isPrizesLoading]} />
                </div>
                <div className='hidden sm:block sm:col-span-3 lg:col-span-2 flex flex-col justify-start space-y-8 items-center'>
                    <ShopBag
                        items={prizes
                            .filter((prize) => bagPrizeIDs.includes(prize.id))
                            .map((prize) => {
                                const quantity_in_bag = bagPrizeIDs.filter(
                                    (id) => id == prize.prize_details?.prize_id
                                ).length;
                                return { ...prize, quantity_in_bag };
                            })}
                        isLoading={isRedeemLoading}
                        onCheckout={handleCheckout}
                        onAddOnePrize={handleAddToBag}
                        onRemoveOnePrize={handleRemoveOneFromBag}
                        onRemovePrizeFullQuantity={handleRemoveAllFromBag}
                    />
                </div>
            </div>

            {console.log('hist: ', hist)}
            <Popover
                content={
                    <ShopBag
                        className='min-h-[90svh]'
                        onCheckout={handleCheckout}
                        items={prizes
                            .filter((prize) => bagPrizeIDs.includes(prize.id))
                            .map((prize) => {
                                const quantity_in_bag = bagPrizeIDs.filter(
                                    (id) => id == prize.prize_details?.prize_id
                                ).length;
                                return { ...prize, quantity_in_bag };
                            })}
                        onAddOnePrize={handleAddToBag}
                        onRemoveOnePrize={handleRemoveOneFromBag}
                        onRemovePrizeFullQuantity={handleRemoveAllFromBag}
                    />
                }
                trigger='click'
            >
                <FloatButton
                    className='sm:hidden flex justify-center items-center'
                    icon={<ShoppingBag className='text-gray-700' />}
                    badge={{ count: totalQuantity, color: 'volcano' }}
                    onClick={() => console.log('onClick')}
                />
            </Popover>
        </ConfigProvider>
    );
}


