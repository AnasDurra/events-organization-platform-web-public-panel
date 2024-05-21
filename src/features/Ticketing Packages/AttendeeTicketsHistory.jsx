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
import { theme } from 'antd';
import React from 'react';
import { TiTicket } from 'react-icons/ti';
import { useGetAttendeeTicketsHistoryQuery } from './TicketingPackagesSlice';
import { getLoggedInUserV2 } from '../../api/services/auth';
import dayjs from 'dayjs';

const { useToken } = theme;

export default function AttendeeTicketsHistory() {
    const { token } = useToken();
    const navigate = useNavigate();

    const { data: { result: ticketsHistory } = { result: [] } } = useGetAttendeeTicketsHistoryQuery(
        getLoggedInUserV2().attendee_id
    );

    const handleEventClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <Timeline
            className='w-full'
            position='right'
        >
            {ticketsHistory.map((ticket) => (
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
                                <TiTicket className='text-yellow-500 text-[1.5em]' />
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
                                <span>Package name</span>
                            )}
                        </Typography>
                        <Typography>
                            {ticket.attendee_tickets_value < 0
                                ? `You Payed ${ticket.attendee_tickets_value}`
                                : `Bought ${Math.abs(ticket.attendee_tickets_value)} tickets for xxx$`}
                        </Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}

            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ flex: 1, m: 'auto 0' }}
                    align='right'
                    variant='body2'
                    color='text.secondary'
                >
                    2024 May 14
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ color: 'transparent', backgroundColor: 'transparent' }}>
                        <FestivalIcon
                            style={{ color: token.colorPrimary, backgroundColor: 'transparent', fontSize: '1.5em' }}
                        />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography
                        variant='h6'
                        component='span'
                    >
                        Event Title
                    </Typography>
                    <Typography>You Payed 40 tickets</Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ flex: 1, m: 'auto 0' }}
                    align='right'
                    variant='body2'
                    color='text.secondary'
                >
                    2024 May 10
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ color: 'transparent', backgroundColor: 'transparent' }}>
                        <TiTicket className='text-yellow-500 text-[1.5em]'></TiTicket>
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography
                        variant='h6'
                        component='span'
                    >
                        Package name
                    </Typography>
                    <Typography>Bought package for 100$</Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ flex: 1, m: 'auto 0' }}
                    align='right'
                    variant='body2'
                    color='text.secondary'
                >
                    2024 May 9
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot style={{ color: 'transparent', backgroundColor: 'transparent' }}>
                        <FestivalIcon
                            style={{ color: token.colorPrimary, backgroundColor: 'transparent', fontSize: '1.5em' }}
                        />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography
                        variant='h6'
                        component='span'
                    >
                        Event Title
                    </Typography>
                    <Typography>You Payed 40 tickets</Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}
