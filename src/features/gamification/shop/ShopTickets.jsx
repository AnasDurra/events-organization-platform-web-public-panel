import React, { useState } from 'react';
import ShopTicketsCard from './ShopTicketsCard';
import { useOutletContext } from 'react-router-dom';
import { useGetPrizesQuery } from '../gamificationSlice';
import { Pagination } from 'antd';

export default function ShopTickets() {
    const [handleAddToBag, prizes] = useOutletContext();

    const ticketsPrizes = prizes.filter((prz) => prz.type_id == 1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ticketsPrizes.slice(indexOfFirstItem, indexOfLastItem);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className='flex flex-col items-center justify-between w-full '>
            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-8 w-full'>
                {currentItems.map((prz) => (
                    <ShopTicketsCard
                        key={prz.id}
                        title={prz.name}
                        rp_price={prz.rp_value}
                        tickets_value={prz.prize_details?.tickets_value}
                        onAddToBag={() => handleAddToBag({ prize_id: prz.prize_details?.prize_id })}
                    />
                ))}
            </div>
            
            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={ticketsPrizes.length}
                onChange={handleChangePage}
                className='mt-8 text-center'
            />
        </div>
    );
}
