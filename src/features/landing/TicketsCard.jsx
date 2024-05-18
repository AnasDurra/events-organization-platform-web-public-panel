import React from 'react';
import { BsTicketPerforated } from 'react-icons/bs';

export default function TicketsCard({ ticketsCount }) {
    return (
        <>
            <BsTicketPerforated
                type='text'
                className={'text-xl bg-yellow-600 text-white rounded-lg p-1'}
                icon={<BsTicketPerforated />}
            />
            <span className='bg-transparent text-black font-mono'>{ticketsCount}</span>
        </>
    );
}
