import {
    CiOutlined,
    CrownFilled,
    CrownOutlined,
    DeploymentUnitOutlined,
    ExperimentFilled,
    ExperimentOutlined,
    FireFilled,
    FireOutlined,
    HomeFilled,
    HomeOutlined,
    MonitorOutlined,
    NotificationOutlined,
    RestOutlined,
} from '@ant-design/icons';
import { Badge, Button, Col, Image, Layout, Row, Tag, Typography, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsTicketPerforated } from 'react-icons/bs';
import Title from 'antd/es/typography/Title';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FaVolumeMute } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';
import './Landing.css';
import Sider from 'antd/es/layout/Sider';

const { useToken } = theme;

export default function HomeLayout() {
    const { token } = useToken();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    return (
        <Layout className='h-[100svh]'>
            <Header className='h-[8svh] px-2'>
                <Row
                    justify={'space-between'}
                    className='h-full px-2'
                >
                    <Col
                        xs={{ span: 8 }}
                        className='h-full flex items-center'
                    >
                        {' '}
                        <Title
                            style={{ margin: 0, color: 'whitesmoke' }}
                            level={3}
                            className='font-serif'
                        >
                            Eventure
                        </Title>
                    </Col>
                    <Col
                        xs={{ span: 16 }}
                        className='h-full pr-2'
                    >
                        <div className='w-full flex  mx-2 h-full items-center justify-end'>
                            <div className='flex items-center mr-2 space-x-2  px-2 bg-gray-400 shadow-sm shadow-gray-300  rounded-3xl  h-[4svh]'>
                                <BsTicketPerforated
                                    type='text'
                                    className={'text-xl bg-yellow-600 text-white rounded-lg p-1'}
                                    icon={<BsTicketPerforated />}
                                />
                                <span className='bg-transparent text-black font-mono'>150</span>
                            </div>

                            <Badge
                                count={5}
                                size='small'
                            >
                                <Button
                                    type='text'
                                    classNames={{ icon: 'text-2xl text-white' }}
                                    icon={<IoMdNotificationsOutline />}
                                />
                            </Badge>
                            <img
                                className='w-[2.5em] aspect-square rounded-full hidden md:block md:ml-4'
                                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                            />
                        </div>
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Sider
                    theme='light'
                    className='hidden md:block'
                    style={{ backgroundColor: 'whitesmoke' }}
                    width={'20%'}
                >
                    <div className='flex flex-col h-full mt-4 p-4 space-y-2'>
                        <div
                            className={`rounded-lg flex space-x-2 p-4 bg-[#00474f]/0  hover:bg-[#00474f]/30 hover:cursor-pointer `}
                        >
                            <HomeOutlined className='text-[1.2em]' />
                            <span className='text-lg'>Home</span>
                        </div>
                        <div
                            className={`rounded-lg flex space-x-2 p-4 bg-red-300/20  hover:bg-red-300/30 hover:cursor-pointer `}
                        >
                            <FireFilled className='text-red-300 text-[1.2em]' />
                            <span className='text-lg'>Popular</span>
                        </div>
                        <div
                            className={`rounded-lg flex space-x-2 p-4 bg-[#00474f]/0  hover:bg-[#00474f]/30 hover:cursor-pointer `}
                        >
                            <ExperimentOutlined className='text-[1.2em]' />
                            <span className='text-lg'>Explore</span>
                        </div>
                    </div>
                </Sider>
                <div className='md:grid md:grid-cols-10 w-full'>
                    <Content
                        className='md:col-span-7 md:col-start-2 h-[84svh] md:h-[92svh] overflow-y-scroll scroll-0 '
                        style={{ scrollbarWidth: 'none' }}
                    >
                        <Outlet />
                    </Content>
                </div>
            </Layout>

            <Footer
                className={`h-[8svh] p-0 md:hidden`}
                style={{ backgroundColor: token.colorPrimary }}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        if (newValue == 1) {
                            navigate('/home/popular');
                        } else if (newValue == 0) {
                            navigate('/home');
                        }
                        else if(newValue==2){
                            navigate('/home/explore');

                        }
                    }}
                    style={{ height: '100%', backgroundColor: token.colorPrimary }}
                >
                    <BottomNavigationAction
                        label={<div className='mt-[0.8em]'>Home</div>}
                        style={{ color: 'white' }}
                        icon={
                            value == 0 ? (
                                <HomeFilled className='text-[1.2em]' />
                            ) : (
                                <HomeOutlined className='text-[1.2em]' />
                            )
                        }
                    />
                    <BottomNavigationAction
                        label={
                            value == 1 ? (
                                <div className='mt-[0.8em]  text-red-500'>Popular</div>
                            ) : (
                                <div className='mt-[0.8em] '>Popular</div>
                            )
                        }
                        style={{ color: 'white ' }}
                        icon={
                            value == 1 ? (
                                <FireFilled className='text-[1.2em]  text-red-300' />
                            ) : (
                                <FireOutlined className='text-[1.2em]' />
                            )
                        }
                        
                    />

                    <BottomNavigationAction
                        label={<div className='mt-[0.8em]'>Explore</div>}
                        style={{ color: 'white ' }}
                        icon={
                            value == 2 ? (
                                <ExperimentFilled className='text-[1.2em] ' />
                            ) : (
                                <ExperimentOutlined className='text-[1.2em]' />
                            )
                        }
                    />

                    <BottomNavigationAction
                        label='profile'
                        style={{ color: 'white ' }}
                        icon={
                            <img
                                className='w-[2em] aspect-square rounded-full'
                                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                            />
                        }
                    />
                </BottomNavigation>
            </Footer>
        </Layout>
    );
}
