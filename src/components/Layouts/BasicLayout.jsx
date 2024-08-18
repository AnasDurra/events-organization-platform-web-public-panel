import { CalendarOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, ConfigProvider, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { Children } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useCheckAccessTokenQuery } from '../../api/services/auth';
import { useEffect } from 'react';
import { lightenColor } from '../../utils/colors';

const BasicLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { data: checkAccessTokenObj, isLoading: isAccessTokenLoading, error } = useCheckAccessTokenQuery();

    const defaultTheme = {
        token: { colorPrimary: '#2A9D8F', fontFamily: 'Roboto' },
        components: {
            Layout: { headerBg: lightenColor('#2A9D8F', 100), bodyBg: '#F9F9F9' },
        },
        cssVar: true,
    };

    const orgLoginTheme = {
        token: {
            colorPrimary: '#265077',
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

    const theme = location.pathname === '/org/login' ? orgLoginTheme : defaultTheme;
    return (
        <ConfigProvider theme={theme}>
            <div className='min-h-screen flex flex-col bg-gray-100'>
                <header className='header bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10'>
                    <div className='flex items-center space-x-2'>
                        {/* <Icon
                            icon='line-md:calendar'
                            style={{ fontSize: '32px', marginRight: '10px' }}
                            className='text-primary'
                        /> */}
                        <div
                            className='text-nowrap text-3xl  font-[bangers]  hover:cursor-pointer'
                            onClick={() => navigate('/login')}
                            style={{ color: theme.token.colorPrimary }}
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
