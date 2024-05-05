import {
    ExperimentFilled,
    ExperimentOutlined,
    FireFilled,
    FireOutlined,
    HomeFilled,
    HomeOutlined,
} from '@ant-design/icons';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Badge, Button, Col, Layout, Row, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { BsTicketPerforated } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Outlet, useNavigate } from 'react-router-dom';
import './Landing.css';
import { v4 as uuidv4 } from 'uuid';

const { useToken } = theme;

export default function HomeLayout() {
    const { token } = useToken();
    const navigate = useNavigate();
    const [navIndex, setNavIndex] = useState(0);

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
                        <SiderNavigationItem
                            key={uuidv4()}
                            filledIcon={<HomeFilled />}
                            outLinedIcon={<HomeOutlined />}
                            isActive={navIndex == 0}
                            label={'Home'}
                            onClick={() => {
                                setNavIndex(0);
                                navigate('/home');
                            }}
                        />

                        <SiderNavigationItem
                            key={uuidv4()}
                            filledIcon={<FireFilled className='text-red-300 text-[1.2em]' />}
                            outLinedIcon={<FireOutlined className='text-red-300 text-[1.2em]' />}
                            isActive={navIndex == 1}
                            label={'Popular'}
                            onClick={() => {
                                setNavIndex(1);
                                navigate('popular');
                            }}
                            fire
                        />

                        <SiderNavigationItem
                            key={uuidv4()}
                            filledIcon={<ExperimentFilled />}
                            outLinedIcon={<ExperimentOutlined />}
                            isActive={navIndex == 2}
                            label={'Explore'}
                            onClick={() => {
                                setNavIndex(2);
                                navigate('explore');
                            }}
                        />
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
                    value={navIndex}
                    onChange={(event, newValue) => {
                        setNavIndex(newValue);
                    }}
                    style={{ height: '100%', backgroundColor: token.colorPrimary }}
                >
                    <BottomNavigationAction
                        label={<div className='mt-[0.8em]'>Home</div>}
                        style={{ color: 'white' }}
                        icon={
                            navIndex == 0 ? (
                                <HomeFilled className='text-[1.2em]' />
                            ) : (
                                <HomeOutlined className='text-[1.2em]' />
                            )
                        }
                    />
                    <BottomNavigationAction
                        label={
                            navIndex == 1 ? (
                                <div className='mt-[0.8em]  text-red-500'>Popular</div>
                            ) : (
                                <div className='mt-[0.8em] '>Popular</div>
                            )
                        }
                        style={{ color: 'white ' }}
                        icon={
                            navIndex == 1 ? (
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
                            navIndex == 2 ? (
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

function SiderNavigationItem({ label, outLinedIcon, filledIcon, isActive, onClick, fire }) {
    return (
        <div
            className={`rounded-lg flex space-x-2 p-4 bg-[#00474f]/0 hover:bg-[#00474f]/30 hover:cursor-pointer ${
                isActive ? 'bg-[#00474f]/30 ' : null
            }
            ${fire ? '  hover:bg-red-300/30' : null}
            `}
            onClick={onClick}
        >
            {isActive ? filledIcon : outLinedIcon}
            <span className='text-lg'>{label}</span>
        </div>
    );
}

function BottomNavigationItem({ label, outLinedIcon, filledIcon, isActive, id }) {
    return (
        <BottomNavigationAction
            label={<div className='mt-2'>{label}</div>}
            style={{ color: 'white' }}
            icon={isActive ? filledIcon : outLinedIcon}
            value={id}
        />
    );
}
