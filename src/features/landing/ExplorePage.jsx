import { Button, ConfigProvider, DatePicker, Dropdown, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import './ExplorePage.css';
const dimensions = [
    [400, 300],
    [950, 300],
    [450, 300],
    [700, 400],
    [500, 400],
    [600, 400],
    [1800, 250],
    [200, 350],
    [400, 350],
    [900, 350],
    [300, 350],
    [700, 200],
    [1100, 200],
];

const { Option } = Select;

const datePickerProps = {
    onChange: (props) => {
        console.log(props);
    },
    variant: 'borderless',
    size: 'small',
    className: 'bg-transparent',
    onClick: (e) => e.stopPropagation(),
};

export default function ExplorePage() {
    const [selectedDate, setSelectedDate] = useState('anyTime');
    const [customDateType, setCustomDateType] = useState('day');
    const [popularity, setPopularity] = useState('popularity');
    const [tickets, setTickets] = useState('tickets');
    const [location, setLocation] = useState('location');

    const dateFilterItems = [
        {
            key: 'anytime',
            label: <a onClick={() => setSelectedDate('anyTime')}>Any Time</a>,
            className: 'bg-transparent',
        },
        {
            key: 'thisWeek',
            label: <a onClick={() => setSelectedDate('thisWeek')}>This Week</a>,
        },
        {
            key: 'thisMonth',
            label: <a onClick={() => setSelectedDate('thisMonth')}>This Month</a>,
        },
        {
            key: 'date',
            label: (
                <Space.Compact>
                    <Select
                        size='small'
                        variant='borderless'
                        defaultValue='day'
                        style={{
                            width: '50%',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(value) => {
                            setCustomDateType(value);
                            setSelectedDate('date');
                        }}
                    >
                        <Option value='year'>Year</Option>
                        <Option value='month'>Month</Option>
                        <Option value='week'>Week</Option>
                        <Option value='day'>Day</Option>
                    </Select>
                    {customDateType == 'year' ? (
                        <DatePicker.YearPicker {...datePickerProps} />
                    ) : customDateType == 'month' ? (
                        <DatePicker.MonthPicker {...datePickerProps} />
                    ) : customDateType == 'week' ? (
                        <DatePicker.WeekPicker {...datePickerProps} />
                    ) : customDateType == 'day' ? (
                        <DatePicker {...datePickerProps} />
                    ) : null}
                </Space.Compact>
            ),
        },
    ];

    const popularityFilterItems = [
        {
            key: 'popularity',
            label: <a onClick={() => setPopularity('popularity')}>Popularity</a>,
            className: 'bg-transparent',
        },
        {
            key: 'mostPopular',
            label: <a onClick={() => setPopularity('mostPopular')}>Most Popular</a>,
        },
        {
            key: 'leastPopular',
            label: <a onClick={() => setPopularity('leastPopular')}>Least Popular</a>,
        },
    ];

    const ticketFilterItems = [
        {
            key: 'tickets',
            label: <a onClick={() => setTickets('tickets')}>Tickets</a>,
            className: 'bg-transparent',
        },
        {
            key: 'availableTickets',
            label: <a onClick={() => setTickets('availableTickets')}>Available Tickets</a>,
        },
        {
            key: 'soldOut',
            label: <a onClick={() => setTickets('soldOut')}>Sold Out</a>,
        },
    ];

    const locationFilterITems = [
        {
            key: 'location',
            label: <a onClick={() => setLocation('location')}>location</a>,
            className: 'bg-transparent',
        },
        {
            key: 'city',
            label: 'City',
            className: 'bg-transparent',
            children: [
                {
                    key: 'Damascus',
                    label: <a onClick={() => setLocation('Damascus')}>Damascus</a>,
                },
                {
                    key: 'Homs',
                    label: <a onClick={() => setLocation('Homs')}>Homs</a>,
                },
            ],
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Dropdown: {
                        colorBgContainer: 'transparent',
                        colorBgElevated: 'rgb(241,245,249)',
                    },
                    Select: {
                        optionSelectedBg: 'transparent',
                        colorBgContainer: 'transparent',
                        colorBgElevated: 'rgb(241,245,249)',

                        //optionSelectedColor:'transparent'
                    },
                },
            }}
        >
            <div className='flex flex-col '>
                <div className='min-h-[20svh] md:min-h-[30svh] flex flex-col justify-start mt-6  md:mt-0 md:justify-center items-center px-2 md:px-8 space-y-10 md:space-y-10 '>
                    <div className='w-full flex space-x-2  md:space-x-4 '>
                        <Dropdown
                            menu={{ items: dateFilterItems }}
                            placement='bottom'
                            openClassName='bg-slate-100 rounded-lg'
                            rootClassName='bg-slate-100  rounded-lg'
                            overlayClassName='bg-slate-100  rounded-lg'
                            arrow
                            trigger={'click'}
                            className='bg-transparent border-2 border-slate-300 rounded-3xl'
                        >
                            <button className='rounded-3xl bg-slate-200 p-2 px-4 text-center'>
                                {selectedDate == 'anyTime'
                                    ? 'Any Time'
                                    : selectedDate == 'thisMonth'
                                    ? 'This Month'
                                    : selectedDate == 'thisWeek'
                                    ? 'This Week'
                                    : selectedDate == 'date'
                                    ? customDateType == 'year'
                                        ? 'Year x'
                                        : customDateType == 'month'
                                        ? 'Month x'
                                        : customDateType == 'week'
                                        ? 'Week x'
                                        : customDateType == 'day'
                                        ? 'Day x'
                                        : null
                                    : null}
                            </button>
                        </Dropdown>

                        <Dropdown
                            menu={{ items: popularityFilterItems }}
                            placement='bottom'
                            openClassName='bg-slate-100 rounded-lg'
                            rootClassName='bg-slate-100  rounded-lg'
                            overlayClassName='bg-slate-100  rounded-lg'
                            arrow
                            trigger={'click'}
                            className='bg-transparent border-2 border-slate-300 rounded-3xl'
                        >
                            <button className='rounded-3xl bg-slate-200 p-2 px-4 text-center'>
                                {popularity == 'popularity'
                                    ? 'Popularity'
                                    : popularity == 'mostPopular'
                                    ? 'Most Popular'
                                    : popularity == 'leastPopular'
                                    ? 'Least Popular'
                                    : null}
                            </button>
                        </Dropdown>

                        <Dropdown
                            menu={{ items: ticketFilterItems }}
                            placement='bottom'
                            openClassName='bg-slate-100 rounded-lg'
                            rootClassName='bg-slate-100 rounded-lg'
                            overlayClassName='bg-slate-100 rounded-lg'
                            arrow
                            trigger={'click'}
                            className='bg-transparent border-2 border-slate-300 rounded-3xl'
                        >
                            <button className='rounded-3xl bg-slate-200 p-2 px-4 text-center'>
                                {tickets === 'tickets'
                                    ? 'Tickets'
                                    : tickets === 'availableTickets'
                                    ? 'Available Tickets'
                                    : tickets === 'soldOut'
                                    ? 'Sold Out'
                                    : null}
                            </button>
                        </Dropdown>

                        <Dropdown
                            menu={{ items: locationFilterITems }}
                            placement='bottom'
                            openClassName='bg-slate-100 rounded-lg'
                            rootClassName='bg-slate-100 rounded-lg'
                            overlayClassName='bg-slate-100 rounded-lg'
                            arrow
                            trigger={'click'}
                            className='bg-transparent border-2 border-slate-300 rounded-3xl'
                        >
                            <button className='rounded-3xl bg-slate-200 p-2 px-4 text-center'>
                                {location === 'location' ? 'Location' : location}
                            </button>
                        </Dropdown>
                    </div>
                    <Space.Compact className='w-full'>
                        <Input.Search
                            variant='filled'
                            className='w-full'
                        ></Input.Search>
                    </Space.Compact>
                </div>
                <div className='w-full flex-1'>
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 3, 900: 4 }}>
                        <Masonry gutter='1em'>
                            {dimensions.map(([w, h], index) => (
                                <img
                                    key={index}
                                    alt='Image 1'
                                    src={`https://source.unsplash.com/random/${200}x${300}?space`}
                                />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>
        </ConfigProvider>
    );
}
