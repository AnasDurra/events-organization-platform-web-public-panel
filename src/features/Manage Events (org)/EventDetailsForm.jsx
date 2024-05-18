import {
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Slider,
    Space,
    Switch,
    Tooltip,
    message,
} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import ShowMap from './ShowMap';
import { EnvironmentFilled } from '@ant-design/icons';
import { useState } from 'react';

const EventDetailsForm = ({
    eventDetailsForm,
    lists,
    listsIsLoading,
    position,
    setIsLocationOnMapModalOpen,
    setPosition,
}) => {
    const [isChatEnabled, setIsChatEnabled] = useState(false);

    const [isFees, setIsFees] = useState(false);
    return (
        <>
            <Form form={eventDetailsForm} layout='vertical'>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Please enter event Title',
                        },
                    ]}
                    label='Event Name'
                    name='title'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Event Descreption'
                    name='description'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter event Description ',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label='Registration Fees'>
                    <Switch checked={isFees} onChange={setIsFees} />
                </Form.Item>

                {isFees && (
                    <Form.Item
                        label='registration fees per seat'
                        name='fees'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter fees or disable them ',
                            },
                        ]}
                    >
                        <InputNumber min={1} defaultValue={1} />
                    </Form.Item>
                )}

                <Form.Item initialValue={1} label='Event Capacity' name='capacity'>
                    <Slider min={1} />
                </Form.Item>
                <Form.Item name='isChatEnabled' valuePropName='checked'>
                    <Checkbox onChange={() => setIsChatEnabled(!isChatEnabled)}>Is Chatting Enabled?</Checkbox>
                </Form.Item>
                {isChatEnabled && (
                    <Form.Item
                        name='groupName'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your group name!',
                            },
                        ]}
                        style={{ marginTop: '-20px' }}
                    >
                        <Input placeholder='Enter Group Name' />
                    </Form.Item>
                )}
                <Form.Item
                    label='Event Type (Online - Onsite)'
                    name='event_type'
                    rules={[
                        {
                            required: true,
                            message: 'Please enter event Type ',
                        },
                    ]}
                >
                    <Select
                        allowClear
                        options={[
                            {
                                value: 'online',
                                label: 'Online',
                            },
                            {
                                value: 'onsite',
                                label: 'Onsite',
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label='Target Age Group'
                    name='age_groups'
                    rules={[
                        {
                            required: true,
                            message: 'Please select at least one from event Age Groups ',
                        },
                    ]}
                >
                    <Select loading={listsIsLoading} allowClear mode='multiple' options={lists?.result.age_groups} />
                </Form.Item>

                <Form.Item
                    label='Tags'
                    name='tags'
                    rules={[
                        {
                            required: true,
                            message: 'Please select at least one from event Tags ',
                        },
                    ]}
                >
                    <Select loading={listsIsLoading} mode='tags' allowClear options={lists?.result.tags} />
                </Form.Item>

                {/* <Form.Item label="Address" name="address_id">
                                    <Cascader
                                        options={[
                                            {
                                                value: "zhejiang",
                                                label: "Zhejiang",
                                                children: [
                                                    {
                                                        value: "hangzhou",
                                                        label: "Hangzhou",
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </Form.Item> */}

                <Form.Item
                    label='Address'
                    name='address_id'
                    rules={[
                        {
                            required: true,
                            message: 'Please select at least one from event Tags ',
                        },
                    ]}
                >
                    <Select loading={listsIsLoading} allowClear options={lists?.result.addresses} />
                </Form.Item>

                <Form.Item label='Address Additional Notes' name='address_notes'>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item label='Select Location on Maps'>
                    <Card size='small'>
                        <Space wrap size={20} direction='vertical' style={{ width: '100%' }}>
                            {!position && (
                                <div style={{ height: '30vh' }}>
                                    <Dragger
                                        style={{
                                            border: '5px',
                                        }}
                                        disabled
                                    >
                                        <p className='ant-upload-hint'>No Location Selected Yet</p>
                                    </Dragger>
                                </div>
                            )}
                            {position && (
                                <Tooltip
                                    trigger='hover'
                                    defaultOpen
                                    title='Click here to show the selected location on Maps'
                                    placement='topRight'
                                >
                                    <div>
                                        <ShowMap position={position} />
                                    </div>
                                </Tooltip>
                            )}
                            <div style={{ textAlign: 'center' }}>
                                <Space size={30} wrap>
                                    <Button
                                        type='primary'
                                        onClick={() => setIsLocationOnMapModalOpen(true)}
                                        icon={<EnvironmentFilled />}
                                    >
                                        {position ? 'Change Location' : 'Select Location'}
                                    </Button>

                                    <Button
                                        type='dashed'
                                        disabled={!position}
                                        danger
                                        onClick={() => {
                                            setPosition(null);
                                            message.warning('Loacation Deleted ..   ');
                                        }}
                                    >
                                        Delete Location
                                    </Button>
                                </Space>
                            </div>
                        </Space>
                    </Card>
                </Form.Item>
            </Form>
        </>
    );
};

export default EventDetailsForm;
