import React from 'react';
import ShopTicketsCard from './ShopTicketsCard';
import { useOutletContext } from 'react-router-dom';
import { useGetPrizesQuery } from '../gamificationSlice';

export default function ShopTickets() {
    const [handleAddToBag, prizes] = useOutletContext();

    const ticketsPrizes = prizes.filter((prz) => prz.type_id == 1);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-8'>
            {ticketsPrizes.map((prz) => (
                <ShopTicketsCard
                    key={prz.id}
                    title={prz.name}
                    rp_price={prz.rp_value}
                    tickets_value={prz.prize_details?.tickets_value}
                    onAddToBag={() => handleAddToBag({ prize_id: prz.prize_details?.prize_id })}
                />
            ))}
        </div>
    );
}
