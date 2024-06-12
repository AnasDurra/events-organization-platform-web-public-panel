import { Button, Divider } from 'antd';
import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import BagTicketCard from './BagTicketCard';

export default function ShopBag({
    items,
    onCheckout,
    onAddOnePrize,
    onRemovePrizeFullQuantity,
    onRemoveOnePrize,
    isLoading,
}) {
    const totalCost = items.reduce((acc, item) => acc + item.rp_value * item.quantity_in_bag, 0);
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity_in_bag, 0);

    return (
        <>
            {console.log(items)}
            <div className='w-full flex justify-center items-center flex-col'>
                <div className='text-lg text-gray-500 flex space-x-2 items-center'>
                    <div>shopping bag</div>
                    <FiShoppingBag />
                </div>

                <Divider />
            </div>

            <div
                className=' flex flex-col space-y-4 w-full max-h-[60%] overflow-auto p-1'
                style={{ scrollbarWidth: 'thin' }}
            >
                {items.map((item) => {
                    if (item.type_id == 1) {
                        return (
                            <BagTicketCard
                                key={item.id}
                                title={item.name}
                                rp_value={item.rp_value}
                                tickets_value={item.prize_details?.tickets_value}
                                quantity={item.quantity_in_bag}
                                onRemove={() => onRemovePrizeFullQuantity({ prize_id: item.prize_details?.prize_id })}
                                onAddOne={() => onAddOnePrize({ prize_id: item.prize_details?.prize_id })}
                                onRemoveOne={() => onRemoveOnePrize({ prize_id: item.prize_details?.prize_id })}
                            />
                        );
                    }
                })}

                {!totalQuantity && (
                    <div className='text-lg text-gray-500 text-pretty text-center'>No items in shopping bag yet</div>
                )}
            </div>

            <div className='w-full max-h-[15%]'>
                <Divider>checkout</Divider>
                <div className=' h-full  w-full flex flex-col justify-start items-center px-4 space-y-2'>
                    <div className=' flex justify-between items-center w-full'>
                        <div className='flex flex-col justify-start items-start  '>
                            <div className=' font-semibold'>Items</div>
                            <div>{totalQuantity} pcs</div>
                        </div>
                        <div className='flex flex-col justify-start items-start  '>
                            <div className='font-semibold'>Cost</div>
                            <div className='flex justify-start items-center'>
                                {totalCost}
                                <img
                                    className='w-[1.5em]'
                                    src='../assets/points-rp.svg'
                                ></img>
                            </div>
                        </div>
                    </div>
                    <Button
                        type='primary'
                        className='w-full'
                        onClick={onCheckout}
                        disabled={!totalQuantity}
                        loading={isLoading}
                    >
                        REDEEM
                    </Button>
                </div>
            </div>
        </>
    );
}
