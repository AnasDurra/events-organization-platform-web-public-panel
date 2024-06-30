import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Typography from '@mui/material/Typography';
import { Button, Image, theme } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { TiTicket } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom'; // Import Link or useNavigate
import { getLoggedInUserV2 } from '../../api/services/auth';
import { useGetAttendeePointsHistoryQuery } from './gamificationSlice';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const { useToken } = theme;

export default function AttendeePointsHistory() {
    const { token } = useToken();
    const navigate = useNavigate();

    const [showAll, setShowAll] = useState(false);

    const { data: { result: pointsHistory } = { result: [] } } = useGetAttendeePointsHistoryQuery(
        getLoggedInUserV2().attendee_id
    );

    const displayedTickets = showAll ? pointsHistory : pointsHistory.slice(0, 3);

    const fakeHistoryEntries = [
        {
            id: 'fake-2',
            createdAt: '2024-06-04T15:02:19.082Z',
            updatedAt: '2024-06-04T15:02:19.082Z',
            deletedAt: null,
            value: 20,
            metaData: {},
        },
        {
            id: 'fake-3',
            createdAt: '2024-05-04T15:23:01.264Z',
            updatedAt: '2024-06-04T15:23:01.264Z',
            deletedAt: null,
            value: 10,
            metaData: {},
        },
        {
            id: 'fake-4',
            createdAt: '2024-06-07T15:24:39.057Z',
            updatedAt: '2024-06-04T15:24:39.057Z',
            deletedAt: null,
            value: 20,
            metaData: {},
        },
        {
            id: 'fake-5',
            createdAt: '2020-06-04T15:24:39.057Z',
            updatedAt: '2024-06-04T15:24:39.057Z',
            deletedAt: null,
            value: 20,
            metaData: {},
        },
    ];

    const updatedPointsHistory = showAll
        ? [...displayedTickets].sort((a, b) => {
              const createdAtA = dayjs(a.createdAt);
              const createdAtB = dayjs(b.createdAt);
              return createdAtB.diff(createdAtA);
          })
        : [...displayedTickets]
              .sort((a, b) => {
                  const createdAtA = dayjs(a.createdAt);
                  const createdAtB = dayjs(b.createdAt);
                  return createdAtB.diff(createdAtA);
              })
              .slice(0, 3);

  /*   const getTimeAgo = (createdAt) => {
        const now = dayjs()
        const diff = now.diff(createdAt, 'second');

        if (diff < 0) {
            return `In the future`;
        } else if (diff < 60) {
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
    }; */

    return (
        <Timeline
            className='w-full'
            position='right'
        >
            {updatedPointsHistory.map((pointHis) => (
                <TimelineItem key={pointHis.id}>
                    <TimelineOppositeContent
                        sx={{ flex: 1, m: 'auto 0' }}
                        align='right'
                        variant='body2'
                        color='text.secondary'
                    >
                        {dayjs(pointHis.createdAt).format('YYYY MMM DD')}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <Image
                            preview={false}
                            src='/static/images/game-point.svg'
                            width={'2.5em'}
                        />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography
                            variant='h6'
                            component='span'
                        >
                            {/* {console.log('pointhis: ', pointHis)}
                            {getTimeAgo(pointHis.createdAt)} */}
                            Win
                        </Typography>
                        <Typography className='text-emerald-700'>{`+${pointHis.value} points`}</Typography>
                    </TimelineContent>
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
