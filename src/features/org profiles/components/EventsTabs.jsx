import React from 'react';
import { List, Row, Col, Typography, Image, Tabs, Tag } from 'antd';
import { TwitterCircleFilled } from '@ant-design/icons';
import { TiTicket } from 'react-icons/ti';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../api/constants';

const { Title, Text } = Typography;

const EventsTab = ({ data }) => {
    const navigate = useNavigate();

    const renderEventItem = (item) => {
        return (
            <List.Item
                onClick={() => {}}
                style={{ borderBottomColor: 'transparent' }}
            >
                <div
                    onClick={() => navigate(`/event/show/${item?.id}`)}
                    className='border-2 border-primary/25   hover:border-primary  hover:cursor-pointer  p-4 rounded-lg min-h-[18svh] flex justify-center items-center'
                >
                    <div className='grid grid-cols-4 w-full h-full'>
                        <div>
                            <Image
                                preview={false}
                                width='100%'
                                height='100%'
                                src={`${URL.slice(0, -4)}${item?.coverPictureUrl}`}
                                style={{ borderRadius: '5%', objectFit: 'cover' }}
                            />
                        </div>

                        <div className='flex flex-col space-y-8 h-full w-full col-span-3 px-4 '>
                            <div className='flex flex-col '>
                                <div className='text-gray-500 text-md font-sans'>
                                    {dayjs(item?.starting_date).format('dddd - MMM DD, YYYY. h:mm A')}
                                </div>
                                <div className='font-semibold text-lg'>{item?.title}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    {item?.tags.map((tag) => (
                                        <Tag
                                            color='green'
                                            key={tag.id}
                                        >
                                            {tag.tag?.tagName}
                                        </Tag>
                                    ))}
                                </div>

                                {item?.fees && (
                                    <div className='flex gap-x-1 font-mono justify-center items-center text-lg'>
                                        {item?.fees} <TiTicket className='text-yellow-500 text-lg'></TiTicket>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </List.Item>
        );
    };

    return (
        <Tabs
            defaultActiveKey='1'
            items={getTabsItems(data, renderEventItem, navigate)}
            onChange={() => {}}
        />
    );
};

const getTabsItems = (data, renderEventItem, navigate) => {
    return [
        {
            key: '1',
            label: <div className='text-textPrimary text-lg'>Events</div>,
            children: (
                <List
                    pagination={{ position: 'bottom', align: 'center', pageSize: '3' }}
                    itemLayout='vertical'
                    dataSource={data?.events}
                    bordered={false}
                    renderItem={renderEventItem}
                />
            ),
        },
        {
            key: '2',
            label: <div className='text-textPrimary text-lg'>About us</div>,
            children: (
                <div className='w-full'>
                    {data?.description}

                    {console.log('about: ', data)}
                </div>
            ),
        },
    ];
};

export default EventsTab;
