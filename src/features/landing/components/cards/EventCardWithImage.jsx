import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Tag, theme } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { useNavigate } from 'react-router-dom';
dayjs.extend(minMax);

const { useToken } = theme;

export default function EventCardWithImage({
    id,
    title,
    description,
    tags,
    event_type,
    organizationProfilePictureURL,
    eventImageURL,
    days,
}) {
    const { token } = useToken();
    const navigate = useNavigate();

    const cardCoverStyle = {
        backgroundImage: `url(${eventImageURL})`,
        borderColor: token.colorPrimary,
    };

    const minDate = days?.length > 0 ? dayjs.min(days.map((day) => dayjs(day.day_date))) : null;

    const formattedDate = minDate ? minDate.format('DD MMM | HH:mm') : '';

    return (
        <div
            className={`bg-red bg-white flex flex-col border-0 border-[${token.colorPrimary}] justify-between h-full rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300`}
            style={{ borderColor: '#00474f' }}
        >
            <div>
                <Card
                    className='w-full border-0 rounded-none rounded-t-xl pt-[0.1em]'
                    cover={
                        <div
                            className={`relative flex flex-col items-center justify-center h-[20svh] bg-no-repeat bg-cover bg-center text-white font-bold font-mono`}
                            style={cardCoverStyle}
                        >
                            <div className='absolute inset-0 bg-black opacity-25 rounded-t-xl'></div>
                            <div className='flex flex-col w-full h-full justify-between'>
                                <div className='w-full px-4 flex justify-between items-start pt-2 flex-1'>
                                    <div className='flex items-center z-20'>{formattedDate}</div>{' '}
                                    {/* Display formatted minimum date */}
                                    <div className='flex items-center z-20'>
                                        <MdLocationOn />
                                        <span>Damascus</span>
                                    </div>
                                </div>

                                <div className='flex flex-wrap justify-start  mx-2 my-2'>
                                    {' '}
                                    {/* Added justify-between for horizontal alignment */}
                                    <Tag color='green'>form</Tag>
                                    <Tag color='blue'>payment</Tag>
                                    <Tag color='orange'>{event_type}</Tag>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Meta
                        avatar={<Avatar src={organizationProfilePictureURL} />}
                        title={title}
                        description={<div className='line-clamp-2'>{description}</div>}
                    />
                </Card>
                <div className='flex flex-wrap w-full mx-2'>
                    {tags.map((tag, index) => (
                        <Tag
                            key={index}
                            className='my-1'
                            bordered={false}
                        >
                            {tag}
                        </Tag>
                    ))}
                </div>
            </div>
            <div className='p-4'>
                <Button
                    className='w-full'
                    type='primary'
                    onClick={() => navigate(`../event/show/${id}`)}
                >
                    REGISTER
                </Button>
            </div>
        </div>
    );
}
