import { ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CategoriesMenu from './CategoriesMenu';
import ShopBag from './ShopBag';
import ShopHeader from './ShopHeader';
import { useGetPrizesQuery } from '../gamificationSlice';

export default function ViewShop() {
    const [bagPrizeIDs, setBagPrizeIDs] = useState([]);

    const { data: { result: prizes } = { result: [] } } = useGetPrizesQuery();

    const handleAddToBag = ({ prize_id }) => {
        setBagPrizeIDs((prev) => [...prev, prize_id]);
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

    const handleCheckout = () => {};

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemSelectedBg: '#4E6C50',
                        itemSelectedColor: 'white',
                        itemHoverBg: lightenColor('#4E6C50', 40),
                        colorBgContainer: 'transparent',
                        itemActiveBg: lightenColor('#4E6C50', 40),
                    },
                },
            }}
        >
            <div className='grid grid-cols-10 gap-4 p-4 w-full h-full'>
                <div className='sm:col-span-3  lg:col-span-2'>
                    <CategoriesMenu />
                </div>

                <div className='sm:col-span-4 lg:col-span-6  p-4 px-8 flex flex-col space-y-8  border-2 border-gray-200 rounded-3xl'>
                    <ShopHeader />

                    <Outlet context={[handleAddToBag, prizes]} />
                </div>

                <div className='sm:col-span-3 lg:col-span-2 flex flex-col justify-start space-y-8 items-center'>
                    <ShopBag
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
                </div>
            </div>
        </ConfigProvider>
    );
}

function lightenColor(color, amount) {
    const colorValue = color.replace('#', '');
    const num = parseInt(colorValue, 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;
    const newColor = (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
        .toString(16)
        .slice(1);

    return `#${newColor}`;
}
