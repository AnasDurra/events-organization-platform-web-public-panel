import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Tag, theme } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';

const { useToken } = theme;

export default function EventCardWithImage({ title, description, tags, organizationProfilePicture, eventImage }) {
    const { token } = useToken();

    const cardCoverStyle = {
        backgroundImage: `url(${eventImage})`,
        borderColor: token.colorPrimary,
    };

    return (
        <div
            className={`bg-red bg-white flex flex-col border-4  border-[${token.colorPrimary}] justify-between h-full rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105  duration-300`}
            style={{ borderColor: '#00474f' }}
        >
            {console.log(token.colorPrimary)}
            <div>
                <Card
                    className='w-full border-0 rounded-none rounded-t-xl pt-[0.1em]'
                    cover={
                        <div
                            className={`relative flex flex-col items-center justify-center h-[20svh] bg-no-repeat bg-cover bg-center text-white font-bold font-mono`}
                            style={cardCoverStyle}
                        >
                            <div className='absolute inset-0 bg-black opacity-25 rounded-t-xl'></div>
                            <div className='w-full px-4 flex justify-between items-start pt-2 flex-1'>
                                <div className='flex items-center z-20'>14 sep | 11am</div>
                                <div className='flex items-center z-20'>
                                    <MdLocationOn />
                                    <span>Damascus</span>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Meta
                        avatar={<Avatar src={organizationProfilePicture} />}
                        title={title}
                        description={<div className=' line-clamp-2'>{description}</div>}
                    />
                </Card>
                <div className='flex flex-wrap w-full my-2 p-4'>
                    {tags.map((tag, index) => (
                        <Tag
                            key={index}
                            className='my-1'
                            color='blue'
                        >
                            {tag}
                        </Tag>
                    ))}
                </div>
            </div>
            <div className='p-4'>
                <Button
                    className='w-full '
                    type='primary'
                >
                    BUY TICKETS
                </Button>
            </div>
        </div>
    );
}
