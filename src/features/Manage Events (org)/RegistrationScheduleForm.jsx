import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Row,
    Space,
    TimePicker,
    Tooltip,
    Typography,
} from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect } from 'react';

const RegistrationScheduleForm = ({ eventRegistrationForm, days, setDays, eventData = null }) => {
    const addSlot = (dayIndex) => {
        setDays((prevDays) => {
            const newDays = prevDays.map((day, index) => {
                if (index === dayIndex) {
                    return {
                        ...day,
                        slots: [
                            ...day.slots,
                            {
                                id: (
                                    parseInt(days[dayIndex]?.slots[days[dayIndex]?.slots?.length - 1]?.id ?? '0') + 1
                                ).toString(),
                                start_time: null,
                                end_time: null,
                                label: null,
                                slot_status: { label: null, value: null },
                            },
                        ],
                    };
                }
                return day;
            });
            return newDays;
        });
    };
    const deleteSlot = (dayIndex, slotIndex) => {
        setDays((prevDays) => {
            const newDays = prevDays.slice();
            if (newDays[dayIndex]?.slots?.length > 1) {
                const newSlots = newDays[dayIndex].slots.slice();
                newSlots.pop();
                newDays[dayIndex] = { ...newDays[dayIndex], slots: newSlots };
            }
            console.log(newDays);
            return newDays;
        });
    };
    const addDay = (dayIndex) => {
        setDays((prevDays) => [
            ...prevDays,
            {
                id: (parseInt(days[dayIndex]?.id ?? '0') + 1).toString(),
                day_date: null,
                slots: [null],
            },
        ]);
        console.log(days);
    };
    const removeDay = (dayIndex) => {
        if (days.length > 1) {
            setDays((prevDays) => prevDays.filter((day, index) => index !== dayIndex));
        }
    };

    const handleSlotChange = (dayIndex, slotIndex, value) => {
        let newValues = [];
        const slotId = days[dayIndex]?.slots[slotIndex]?.id ?? null;
        const slotLabel = days[dayIndex]?.slots[slotIndex]?.label ?? null;
        const slotStatus = days[dayIndex]?.slots[slotIndex]?.slot_status ?? null;

        if (value) {
            const dayDate = days[dayIndex].day_date;
            const [year, month, day] = dayDate ? dayDate.split('-').map(Number) : [null, null, null];

            for (let key in value) {
                value[key]['$y'] = year ?? 0;
                value[key]['$M'] = month - 1 ?? 0;
                value[key]['$D'] = day ?? 0;
                newValues.push(value[key].format('YYYY-MM-DD HH:mm:ss'));
            }
            newValues = {
                id: slotId,
                start_time: newValues[0],
                end_time: newValues[1],
                label: slotLabel,
                slot_status: slotStatus,
            };
        } else {
            newValues = { id: slotId, start_time: null, end_time: null, label: slotLabel, slot_status: slotStatus };
        }

        setDays((prevDays) => {
            const newDays = prevDays.map((day, index) => {
                if (index === dayIndex) {
                    const newSlots = [...day.slots];
                    newSlots[slotIndex] = newValues;
                    return { ...day, slots: newSlots };
                }
                return day;
            });
            return newDays;
        });
    };
    const handleDateChange = (date, dateString, dayIndex) => {
        setDays((prevDays) => {
            const newDays = prevDays.map((day, index) => {
                if (index === dayIndex) {
                    return { ...day, day_date: dateString };
                }
                return day;
            });
            return newDays;
        });
    };
    const handleSlotLabelChange = (dayIndex, slotIndex, value) => {
        const newValues = {
            ...days[dayIndex].slots[slotIndex],
            label: value,
        };

        setDays((prevDays) => {
            const newDays = prevDays.map((day, index) => {
                if (index === dayIndex) {
                    return {
                        ...day,
                        slots: day.slots.map((slot, index) => (slotIndex === index ? newValues : slot)),
                    };
                }
                return day;
            });
            return newDays;
        });
    };

    // useEffect(() => {
    //     console.log(days);
    // }, [days]);
    return (
        <>
            <Form form={eventRegistrationForm} layout='vertical'>
                <Form.Item
                    name='direct_register'
                    valuePropName='checked'
                    initialValue={eventData ? eventData?.result?.direct_register : false}
                    extra={
                        <Typography.Text type='secondary'>
                            If checked, the attendee will be accepted immediately. If unchecked, the attendee will be
                            placed on a waiting list for the organizer to accept or reject.
                        </Typography.Text>
                    }
                >
                    <Checkbox disabled={eventData?.result ? true : false}>Direct Register</Checkbox>
                </Form.Item>
                <Form.Item
                    name='support_attendance'
                    valuePropName='checked'
                    initialValue={eventData ? eventData?.result?.support_attendance : false}
                    extra={
                        <Typography.Text type='secondary'>
                            If checked, this event supports attendance. If unchecked, there is no attendance for this
                            event.
                        </Typography.Text>
                    }
                >
                    <Checkbox disabled={eventData?.result ? true : false}>Support Attendance</Checkbox>
                </Form.Item>
                <Form.Item
                    label={<Typography.Text strong>Registration Date (Start - End)</Typography.Text>}
                    name='registration_start_end_date'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter event Registration Schedule ',
                        },
                    ]}
                    initialValue={[
                        eventData?.result?.registration_start_date
                            ? dayjs(eventData?.result?.registration_start_date, 'YYYY-MM-DD HH:mm')
                            : null,
                        eventData?.result?.registration_end_date
                            ? dayjs(eventData?.result?.registration_end_date, 'YYYY-MM-DD HH:mm')
                            : null,
                    ]}
                >
                    <DatePicker.RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format='YYYY-MM-DD HH:mm'
                        style={{
                            width: '100%',
                            marginTop: '1em',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text strong>Event Schedule</Typography.Text>}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter event Registration Schedule ',
                        },
                    ]}
                >
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '1em',
                        }}
                    >
                        <Row style={{ width: '100%' }} gutter={[25, 50]}>
                            {days?.map((_, dayIndex) => (
                                <div key={dayIndex} style={{ display: 'flex', width: '100%' }}>
                                    <Col span={10}>
                                        <Form.Item
                                            label={`Day ${dayIndex + 1}`}
                                            name={`day_${days[dayIndex].id}`}
                                            initialValue={
                                                days[dayIndex]?.day_date
                                                    ? dayjs(days[dayIndex].day_date, 'YYYY-MM-DD')
                                                    : null
                                            }
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select a date',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                format={'YYYY-MM-DD'}
                                                style={{
                                                    width: '100%',
                                                }}
                                                value={
                                                    days[dayIndex]?.day_date
                                                        ? dayjs(days[dayIndex].day_date, 'YYYY-MM-DD')
                                                        : null
                                                }
                                                onChange={(date, dateString) =>
                                                    handleDateChange(date, dateString, dayIndex)
                                                }
                                            />
                                        </Form.Item>
                                        <Space wrap size={10}>
                                            {days.length === dayIndex + 1 && (
                                                <>
                                                    <Button
                                                        size='small'
                                                        type='primary'
                                                        icon={<PlusCircleFilled />}
                                                        onClick={() => addDay(dayIndex)}
                                                        style={{
                                                            marginRight: '10px',
                                                        }}
                                                    >
                                                        Add Day
                                                    </Button>
                                                    <Button
                                                        size='small'
                                                        danger
                                                        icon={<DeleteFilled />}
                                                        hidden={days.length == 1}
                                                        onClick={() => removeDay(dayIndex)}
                                                    >
                                                        Delete Day
                                                    </Button>
                                                </>
                                            )}
                                        </Space>
                                    </Col>

                                    <Col span={14}>
                                        {days[dayIndex]?.slots?.map((slot, slotIndex) => (
                                            <div key={slotIndex}>
                                                <Tooltip
                                                    title='Click here to add Slot Name'
                                                    placement='leftTop'
                                                    defaultOpen={days[dayIndex]?.day_date}
                                                >
                                                    <Form.Item
                                                        name={`day_${days[dayIndex]?.id}_slotName_${slot?.id}`}
                                                        initialValue={slot?.label ?? null}
                                                        label={`Slot ${slotIndex + 1}`}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please select a Slot Name ',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            size='small'
                                                            placeholder='Enter Slot Name'
                                                            disabled={!days[dayIndex]?.day_date}
                                                            style={{
                                                                border: 'none',
                                                                boxShadow: 'none',
                                                            }}
                                                            onChange={(e) => {
                                                                handleSlotLabelChange(
                                                                    dayIndex,
                                                                    slotIndex,
                                                                    e.target.value
                                                                );
                                                            }}
                                                            value={slot?.label != null ? slot.label : ''}
                                                        />
                                                    </Form.Item>
                                                </Tooltip>

                                                <Form.Item
                                                    name={`day_${days[dayIndex]?.id}_slotDuration_${slot?.id}`}
                                                    initialValue={[
                                                        slot?.start_time
                                                            ? dayjs(slot?.start_time, 'YYYY-MM-DD HH:mm:ss')
                                                            : null,
                                                        slot?.end_time
                                                            ? dayjs(slot?.end_time, 'YYYY-MM-DD HH:mm:ss')
                                                            : null,
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please select a Slot ',
                                                        },
                                                    ]}
                                                >
                                                    <TimePicker.RangePicker
                                                        disabled={!days[dayIndex]?.day_date}
                                                        order={false}
                                                        showTime={{
                                                            format: 'HH:mm',
                                                        }}
                                                        format={'HH:mm'}
                                                        value={
                                                            slot?.start_time != null && slot?.end_time != null
                                                                ? [
                                                                      dayjs(slot?.start_time, 'YYYY-MM-DD HH:mm:ss'),
                                                                      dayjs(slot?.end_time, 'YYYY-MM-DD HH:mm:ss'),
                                                                  ]
                                                                : [null, null]
                                                        }
                                                        onChange={(value) =>
                                                            handleSlotChange(dayIndex, slotIndex, value)
                                                        }
                                                    />
                                                </Form.Item>
                                                {days[dayIndex]?.slots?.length === slotIndex + 1 && (
                                                    <Button
                                                        size='small'
                                                        danger
                                                        // type="primary"
                                                        hidden={days[dayIndex]?.slots?.length == 1}
                                                        icon={<DeleteFilled />}
                                                        onClick={() => deleteSlot(dayIndex, slotIndex)}
                                                        style={{
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        Delete Slot
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <div>
                                            <Button
                                                size='small'
                                                type='primary'
                                                icon={<PlusCircleFilled />}
                                                onClick={() => addSlot(dayIndex)}
                                            >
                                                Add Slot
                                            </Button>
                                        </div>
                                    </Col>
                                    {days.length > 1 && (
                                        <Divider
                                            style={{
                                                margin: '12px 0px',
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </Row>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegistrationScheduleForm;
