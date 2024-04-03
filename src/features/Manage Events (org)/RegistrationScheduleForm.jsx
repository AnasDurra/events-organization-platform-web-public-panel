import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Form, Input, Row, Space, TimePicker, Tooltip } from 'antd';
import dayjs from 'dayjs';

const RegistrationScheduleForm = ({ eventRegistrationForm, days, setDays }) => {
    const addSlot = (dayIndex) => {
        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].slots.push({
                start_time: null,
                end_time: null,
                label: null,
            });
            return newDays;
        });
    };
    const deleteSlot = (dayIndex, slotIndex) => {
        const newDays = [...days];
        if (newDays[dayIndex]?.slots?.length > 1) {
            newDays[dayIndex].slots.splice(slotIndex, 1);
            setDays(newDays);
        }
    };
    const addDay = () => {
        setDays((prevDays) => [...prevDays, { day_date: null, slots: [null] }]);
        console.log(days);
    };
    const removeDay = (dayIndex) => {
        if (days.length > 1) {
            setDays((prevDays) => prevDays.filter((day, index) => index !== dayIndex));
        }
    };

    const handleSlotChange = (dayIndex, slotIndex, value) => {
        let newValues = [];
        const slotLabel = days[dayIndex]?.slots[slotIndex]?.label ?? null;
        if (value) {
            const dayDate = days[dayIndex].day_date;
            const [day, month, year] = dayDate ? dayDate.split('-').map(Number) : [null, null, null];

            for (let key in value) {
                value[key]['$y'] = year ?? 0;
                value[key]['$M'] = month - 1 ?? 0;
                value[key]['$D'] = day ?? 0;
                newValues.push(value[key].format('YYYY-MM-DD HH:mm:ss'));
            }
            newValues = {
                start_time: newValues[0],
                end_time: newValues[1],
                label: slotLabel,
            };
        } else {
            newValues = { start_time: null, end_time: null, label: slotLabel };
        }

        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].slots[slotIndex] = newValues;
            return newDays;
        });
    };
    const handleDateChange = (date, dateString, dayIndex) => {
        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].day_date = dateString;
            return newDays;
        });
    };
    const handleSlotLabelChange = (dayIndex, slotIndex, value) => {
        const newValues = {
            ...days[dayIndex].slots[slotIndex],
            label: value,
        };

        setDays((prevDays) => {
            const newDays = [...prevDays];
            newDays[dayIndex].slots[slotIndex] = newValues;
            return newDays;
        });
    };
    return (
        <>
            <Form form={eventRegistrationForm} layout="vertical">
                <Form.Item
                    label="Registration Date (Start - End)"
                    name="registration_start_end_date"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter event Registration Schedule ',
                        },
                    ]}
                >
                    <DatePicker.RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row style={{ width: '100%' }} gutter={[25, 16]}>
                        {days.map((_, dayIndex) => (
                            <>
                                <Col span={10}>
                                    <Form.Item
                                        label={`Day ${dayIndex + 1}`}
                                        name={`day_${dayIndex}`}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select a date',
                                            },
                                        ]}
                                    >
                                        <DatePicker
                                            format={'DD-MM-YYYY'}
                                            style={{
                                                width: '100%',
                                            }}
                                            value={
                                                days[dayIndex].day_date
                                                    ? dayjs(days[dayIndex].day_date, 'DD-MM-YYYY')
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
                                                    size="small"
                                                    type="primary"
                                                    icon={<PlusCircleFilled />}
                                                    onClick={() => addDay()}
                                                    style={{
                                                        marginRight: '10px',
                                                    }}
                                                >
                                                    Add Day
                                                </Button>
                                                <Button
                                                    size="small"
                                                    danger
                                                    // type="primary"
                                                    icon={<DeleteFilled />}
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
                                                title="Click here to add Slot Name"
                                                placement="leftTop"
                                                defaultOpen={days[dayIndex]?.day_date}
                                            >
                                                <Form.Item
                                                    name={`${dayIndex}_${slotIndex}_slot_name`}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please select a Slot Name ',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        size="small"
                                                        placeholder="Enter Slot Name"
                                                        disabled={!days[dayIndex]?.day_date}
                                                        style={{
                                                            border: 'none',
                                                            boxShadow: 'none',
                                                        }}
                                                        onChange={(e) => {
                                                            handleSlotLabelChange(dayIndex, slotIndex, e.target.value);
                                                        }}
                                                        value={slot?.label != null ? slot.label : ''}
                                                    />
                                                </Form.Item>
                                            </Tooltip>
                                            <Form.Item
                                                name={`${dayIndex}_${slotIndex}`}
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
                                                    onChange={(value) => handleSlotChange(dayIndex, slotIndex, value)}
                                                />
                                            </Form.Item>
                                            {days[dayIndex]?.slots?.length === slotIndex + 1 && (
                                                <Button
                                                    size="small"
                                                    danger
                                                    // type="primary"
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
                                            size="small"
                                            type="primary"
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
                            </>
                        ))}
                    </Row>
                </div>
            </Form>
        </>
    );
};

export default RegistrationScheduleForm;
