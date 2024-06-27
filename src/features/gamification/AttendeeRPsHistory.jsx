import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';
import { Button, Image, theme } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link or useNavigate
import { getLoggedInUserV2 } from '../../api/services/auth';
import { useGetAttendeeRPsHistoryQuery } from './gamificationSlice';

const { useToken } = theme;

export default function AttendeeRPsHistory() {
    const [showAll, setShowAll] = useState(false);

    const { data: { result: pointsHistory } = { result: [] } } = useGetAttendeeRPsHistoryQuery(
        getLoggedInUserV2().attendee_id
    );

    const displayedTickets = showAll
        ? [...pointsHistory].sort((a, b) => {
              const createdAtA = dayjs(a.rps_created_at);
              const createdAtB = dayjs(b.rps_created_at);
              return createdAtB.diff(createdAtA);
          })
        : [...pointsHistory]
              .sort((a, b) => {
                  const createdAtA = dayjs(a.rps_created_at);
                  const createdAtB = dayjs(b.rps_created_at);
                  return createdAtB.diff(createdAtA);
              })
              .slice(0, 3);

    const getTimeAgo = (createdAt) => {
        const now = dayjs();
        const created = dayjs(createdAt);
        const diff = now.diff(created, 'second');

        if (diff < 60) {
            return `${diff} seconds ago`;
        } else if (diff < 3600) {
            return `${Math.floor(diff / 60)} minutes ago`;
        } else if (diff < 86400) {
            return `${Math.floor(diff / 3600)} hours ago`;
        } else if (diff < 2592000) {
            return `${Math.floor(diff / 86400)} days ago`;
        } else if (diff < 31536000) {
            return `${Math.floor(diff / 2592000)} months ago`;
        } else {
            return `${Math.floor(diff / 31536000)} years ago`;
        }
    };

    return (
        <Timeline
            className='w-full'
            position='right'
        >
            {displayedTickets.map((rp) => (
                <TimelineItem key={rp.id}>
                    <TimelineOppositeContent
                        sx={{ flex: 1, m: 'auto 0' }}
                        align='right'
                        variant='body2'
                        color='text.secondary'
                    >
                        {dayjs(rp.rps_created_at).format('YYYY MMM DD')}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <Image
                            preview={false}
                            src='/public/assets/points-rp.svg'
                            width={'2.5em'}
                        />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography
                            variant='h6'
                            component='span'
                        >
                            {/* {getTimeAgo(rp.ticketsPrize_created_at)} */}
                            {rp.rps_value > 0 ? 'Win' : `Shop (${rp.prize_name})`}
                        </Typography>
                        <Typography className={`${rp.rps_value > 0 ? 'text-emerald-700' : 'text-red-700'} `}>{`${
                            rp.rps_value > 0 ? '+' + rp.rps_value : rp.rps_value
                        } points`}</Typography>
                    </TimelineContent>
                    {console.log('rp:', rp)}
                </TimelineItem>
            ))}

            {pointsHistory.length > 3 && (
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
