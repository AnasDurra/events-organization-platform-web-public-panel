import FestivalIcon from '@mui/icons-material/Festival';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom'; // Import Link or useNavigate
import { Button, theme } from 'antd';
import React, { useState } from 'react';
import { TiTicket } from 'react-icons/ti';
import { useGetAttendeeTicketsHistoryQuery } from './TicketingPackagesSlice';
import { getLoggedInUserV2 } from '../../api/services/auth';
import dayjs from 'dayjs';

const { useToken } = theme;

export default function AttendeeTicketsHistory() {
    const { token } = useToken();
    const navigate = useNavigate();

    const [showAll, setShowAll] = useState(false);

    const { data: { result: ticketsHistory } = { result: [] } } = useGetAttendeeTicketsHistoryQuery(
        getLoggedInUserV2().attendee_id
    );

    const handleEventClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    const displayedTickets = showAll ? ticketsHistory : ticketsHistory.slice(0, 3);

    const fakeHistoryEntries = [
        {
            attendee_tickets_id: '1',
            attendee_tickets_created_at: '2024-05-14',
            attendee_tickets_data: {
                event_id: '1',
            },
            event_title: 'Event Title',
            attendee_tickets_value: -40,
        },
        {
            attendee_tickets_id: '2',
            attendee_tickets_created_at: '2024-05-10',
            attendee_tickets_data: null,
            attendee_tickets_value: 100,
        },
        {
            attendee_tickets_id: '3',
            attendee_tickets_created_at: '2024-05-09',
            attendee_tickets_data: {
                event_id: '2',
            },
            event_title: 'Event Title',
            attendee_tickets_value: -40,
        },
    ];

    const updatedTicketsHistory = showAll
        ? [...displayedTickets, ...fakeHistoryEntries]
        : [...displayedTickets, ...fakeHistoryEntries].slice(0, 3);

    return (
        <Timeline
            className='w-full'
            position='right'
        >
            {updatedTicketsHistory.map((ticket) => (
                <TimelineItem key={ticket.attendee_tickets_id}>
                    <TimelineOppositeContent
                        sx={{ flex: 1, m: 'auto 0' }}
                        align='right'
                        variant='body2'
                        color='text.secondary'
                    >
                        {dayjs(ticket.attendee_tickets_created_at).format('YYYY MMM DD')}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        {ticket.attendee_tickets_data?.event_id ? (
                            <TimelineDot
                                style={{ color: 'transparent', backgroundColor: 'transparent' }}
                                onClick={() => handleEventClick(ticket.attendee_tickets_data.event_id)}
                            >
                                <FestivalIcon
                                    style={{
                                        color: token.colorPrimary,
                                        backgroundColor: 'transparent',
                                        fontSize: '1.5em',
                                    }}
                                />
                            </TimelineDot>
                        ) : (
                            <TimelineDot style={{ color: 'transparent', backgroundColor: 'transparent' }}>
                                <TiTicket className='text-rose-500 text-[1.5em]' />
                            </TimelineDot>
                        )}
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography
                            variant='h6'
                            component='span'
                        >
                            {ticket.attendee_tickets_data?.event_id ? (
                                <Link to={`/events/${ticket.attendee_tickets_data.event_id}`}>
                                    {ticket.event_title || 'Event Title'}
                                </Link>
                            ) : (
                                <span>{`Package ${ticket.attendee_tickets_data?.package_name || 'Package name'}`}</span>
                            )}
                            {console.log(ticket)}
                        </Typography>
                        {/* TODO check after event registration */}
                        <Typography>
                            {ticket.attendee_tickets_value < 0
                                ? `You Payed ${Math.abs(ticket.attendee_tickets_value)}`
                                : `You bought ${Math.abs(ticket.attendee_tickets_value)} tickets for ${
                                      ticket.attendee_tickets_data?.payed / 1000
                                  }$`}
                        </Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}

            {ticketsHistory?.length > 3 && (
                <div className='flex justify-center'>
                    <Button
                        type='text'
                        onClick={() => setShowAll(!showAll)}
                    >
                        show {showAll ? 'last 3 actions' : 'all'}
                    </Button>
                </div>
            )}
        </Timeline>
    );
}
