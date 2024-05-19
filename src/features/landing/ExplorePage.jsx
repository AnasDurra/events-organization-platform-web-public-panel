import { Button, ConfigProvider, DatePicker, Dropdown, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import './ExplorePage.css';
import dayjs from 'dayjs';
import { useGetAddressesQuery, useGetEventsQuery, useLazyGetEventsQuery } from './feedsSlice';
import { key } from 'localforage';
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
    const [selectedDateIdentifier, setSelectedDateIdentifier] = useState('anyTime');
    const [customDateType, setCustomDateType] = useState('day');
    const [popularity, setPopularity] = useState(null);
    const [tickets, setTickets] = useState('tickets');
    const [locationName, setLocationName] = useState('location');
    const [locationId, setLocationId] = useState(null);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { data: { result: addresses } = { result: [] } } = useGetAddressesQuery();
    const [getEvents, { data: { result: events } = { result: [] } }] = useLazyGetEventsQuery();

    function getGroupedStatesWithCities(addresses) {
        if (!addresses || !addresses.length) {
            return []; // Return empty array for invalid input
        }

        const groupedStates = [];

        for (const address of addresses) {
            const {
                state: { id: stateId, stateName },
                city: { id: cityId, cityName },
            } = address;

            const existingState = groupedStates.find((state) => state.id === stateId);

            if (existingState) {
                existingState.cities.push({ cityId, cityName });
            } else {
                groupedStates.push({
                    id: stateId,
                    state: { id: stateId, stateName },
                    cities: [{ cityId, cityName }],
                });
            }
        }
        return groupedStates;
    }

    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setLocationId(null);
        setPopularity(null);
        setSelectedDateIdentifier('anyTime');
        setCustomDateType('day');
        setLocationName('location');
    };
    useEffect(() => {
        const prepareAdParams = () => {
            const params = {};

            if (startDate) {
                try {
                    params['startDate'] = dayjs(startDate).format('YYYY-MM-DD');
                } catch (error) {
                    console.error('Error formatting start date:', error);
                }
            }

            if (endDate) {
                try {
                    params['endDate'] = dayjs(endDate).format('YYYY-MM-DD');
                } catch (error) {
                    console.error('Error formatting start date:', error);
                }
            }

            if (locationId) {
                params['locationId'] = locationId;
            }
            if (popularity != null) {
                params['popularity'] = popularity;
            }

            params['page'] = page;
            params['pageSize'] = pageSize;
            console.log('params: ', params);
            getEvents(params);
        };

        prepareAdParams();
    }, [startDate, endDate, locationId, popularity]);

    useEffect(() => {
        console.log(getGroupedStatesWithCities(addresses));
    }, [addresses]);
    const dateFilterItems = [
        {
            key: 'anytime',
            label: (
                <a
                    onClick={() => {
                        setSelectedDateIdentifier('anyTime');
                        setStartDate(null);
                        setEndDate(null);
                    }}
                >
                    No filter
                </a>
            ),
            className: 'bg-transparent',
        },
        {
            key: 'thisWeek',
            label: (
                <a
                    onClick={() => {
                        setSelectedDateIdentifier('thisWeek');
                        const start = dayjs().startOf('week');
                        const end = dayjs().endOf('week');
                        setStartDate(start);
                        setEndDate(end);
                    }}
                >
                    This Week
                </a>
            ),
        },
        {
            key: 'thisMonth',
            label: (
                <a
                    onClick={() => {
                        setSelectedDateIdentifier('thisMonth');
                        const start = dayjs().startOf('month');
                        const end = dayjs().endOf('month');
                        setStartDate(start);
                        setEndDate(end);
                    }}
                >
                    This Month
                </a>
            ),
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
                            setSelectedDateIdentifier('date');
                        }}
                    >
                        <Option value='year'>Year</Option>
                        <Option value='month'>Month</Option>
                        <Option value='week'>Week</Option>
                        <Option value='day'>Day</Option>
                    </Select>
                    {customDateType == 'year' ? (
                        <DatePicker.YearPicker
                            {...datePickerProps}
                            onChange={(year) => {
                                setStartDate(dayjs(year));
                                setEndDate(dayjs(year).endOf('year'));
                            }}
                        />
                    ) : customDateType == 'month' ? (
                        <DatePicker.MonthPicker
                            {...datePickerProps}
                            onChange={(month) => {
                                setStartDate(dayjs(month).startOf('month'));
                                setEndDate(dayjs(month).endOf('month'));
                            }}
                        />
                    ) : customDateType == 'week' ? (
                        <DatePicker.WeekPicker
                            {...datePickerProps}
                            onChange={(week) => {
                                setStartDate(dayjs(week).startOf('week'));
                                setEndDate(dayjs(week).endOf('week'));
                            }}
                        />
                    ) : customDateType == 'day' ? (
                        <DatePicker
                            {...datePickerProps}
                            onChange={(day) => {
                                setStartDate(dayjs(day));
                                setEndDate(dayjs(day).endOf('day'));
                            }}
                        />
                    ) : null}
                </Space.Compact>
            ),
        },
    ];

    const popularityFilterItems = [
        {
            key: 'popularity',
            label: <a onClick={() => setPopularity(null)}>No filter</a>,
            className: 'bg-transparent',
        },
        {
            key: 'mostPopular',
            label: <a onClick={() => setPopularity(1)}>Most Popular</a>,
        },
        {
            key: 'leastPopular',
            label: <a onClick={() => setPopularity(0)}>Least Popular</a>,
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
            label: (
                <a
                    onClick={() => {
                        setLocationName('location');
                        setLocationId(null);
                    }}
                >
                    No filter
                </a>
            ),
            className: 'bg-transparent',
        },
        ...getGroupedStatesWithCities(addresses).map((address) => ({
            key: address.id,
            label: <a>{address?.state?.stateName}</a>,
            children: address.cities?.map((city) => ({
                key: 'city-' + city.id,
                label: (
                    <a
                        onClick={() => {
                            setLocationName(city.cityName);
                            setLocationId(address.id);
                        }}
                    >
                        {city.cityName}
                    </a>
                ),
            })),
        })),
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
                                {selectedDateIdentifier == 'anyTime'
                                    ? 'Any Time'
                                    : selectedDateIdentifier == 'thisMonth'
                                    ? 'This Month'
                                    : selectedDateIdentifier == 'thisWeek'
                                    ? 'This Week'
                                    : selectedDateIdentifier == 'date'
                                    ? customDateType == 'year'
                                        ? 'Year'
                                        : customDateType == 'month'
                                        ? 'Month'
                                        : customDateType == 'week'
                                        ? 'Week'
                                        : customDateType == 'day'
                                        ? 'Day'
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
                                {popularity == null
                                    ? 'Popularity'
                                    : popularity == 1
                                    ? 'Most Popular'
                                    : popularity == 0
                                    ? 'Least Popular'
                                    : null}
                            </button>
                        </Dropdown>

                        {/* <Dropdown
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
                        </Dropdown> */}

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
                                {locationId == null ? 'Location' : locationName}
                            </button>
                        </Dropdown>
                        {(startDate != null || endDate != null || locationId != null || popularity != null) && (
                            <div className='bg-transparent border-2 border-slate-300 rounded-3xl'>
                                <button
                                    className='rounded-3xl bg-slate-200 p-2 px-4 text-center'
                                    onClick={handleClearFilters}
                                >
                                    clear filters
                                </button>
                            </div>
                        )}
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
