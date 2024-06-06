import { CalendarOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, ConfigProvider } from 'antd';
import Title from 'antd/es/typography/Title';
import { Outlet } from 'react-router-dom';

const BasicLayout = () => {
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
    return (
        <ConfigProvider theme={theme}>
            <div className='min-h-screen flex flex-col bg-gray-100'>
                <header className='header bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10'>
                    <div className='flex items-center space-x-2'>
                        <Icon icon='line-md:calendar' style={{ fontSize: '32px', marginRight: '10px' }} />
                        <Title style={{ margin: 0, color: 'black' }} level={3} className='font-serif'>
                            Eventure
                        </Title>
                    </div>
                    <div>
                        <Button type='primary' size='large' className='mr-2'>
                            Login
                        </Button>
                        <Button type='default' size='large'>
                            Register
                        </Button>
                    </div>
                </header>
                <main className='flex-grow p-6 mt-16'>
                    <Outlet />
                </main>
            </div>
        </ConfigProvider>
    );
};

export default BasicLayout;
