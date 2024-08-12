import { CalendarOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, ConfigProvider, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCheckAccessTokenQuery } from '../../api/services/auth';
import { useEffect } from 'react';

const BasicLayout = () => {
    const navigate = useNavigate();

    const { data: checkAccessTokenObj, isLoading: isAccessTokenLoading, error } = useCheckAccessTokenQuery();

    const theme = {
        token: {
            colorPrimary: '#022140',
        },
        components: {
            Layout: {
                headerBg: '#265077',
            },
        },
        cssVar: true,
    };

    useEffect(() => {
        console.log(checkAccessTokenObj?.result?.user_role?.id);

        if (
            window.location.pathname.startsWith('/login') ||
            window.location.pathname.startsWith('/org/login') ||
            window.location.pathname.startsWith('/register') ||
            window.location.pathname === '/'
        ) {
            if (checkAccessTokenObj?.result?.user_role?.id == 2) {
                navigate('/org/our-events');
            } else if (checkAccessTokenObj?.result?.user_role?.id == 3) {
                navigate('/home');
            }
        }
    }, [checkAccessTokenObj]);

    return (
        <ConfigProvider theme={theme}>
            <div className='min-h-screen flex flex-col bg-gray-100'>
                <header className='header bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10'>
                    <div className='flex items-center space-x-2'>
                        <Icon icon='line-md:calendar' style={{ fontSize: '32px', marginRight: '5px' }} />
                        <div
                            className='text-nowrap text-3xl  font-[bangers]  hover:cursor-pointer '
                            // onClick={() => navigate('/org/our-events')}
                        >
                            WEEVENTS
                        </div>
                    </div>
                    {/* <div>
                        <Button type='primary' size='large' className='mr-2'>
                            Login
                        </Button>
                        <Button type='default' size='large'>
                            Register
                        </Button>
                    </div> */}
                </header>
                <main className='flex-grow p-6 mt-16'>
                    <Spin spinning={isAccessTokenLoading}>
                        <Outlet />
                    </Spin>
                </main>
            </div>
        </ConfigProvider>
    );
};

export default BasicLayout;
