import { Button, Col, Form, Row, Select, Skeleton, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { CiLocationOff } from 'react-icons/ci';
import { FaLocationDot } from 'react-icons/fa6';
import { useGetAddressesQuery } from '../orgSlice';

export default function AddressesForm({
  org,
  isGetOrgLoading,
  form,
  addOrgAddress,
  removeOrgAddress,
}) {
  const {
    data: { result: addresses } = { result: [] },
    isLoading: isAddressesLoading,
  } = useGetAddressesQuery();

  const cityValue = Form.useWatch('city', form);

  useEffect(() => {
    form.resetFields(['state']);
  }, [form, cityValue]);

  return (
    <>
      <Row>
        <Col>
          <Title level={5}>Current Addresses</Title>
        </Col>
      </Row>

      <Row>
        <Col span={15}>
          <Skeleton
            title={false}
            loading={isGetOrgLoading}
            active
          >
            {org?.addresses?.map((addr) => (
              <div
                key={addr.id}
                className='w-full flex items-center py-2 text-green-900'
              >
                <Button
                  type='text'
                  icon={<CiLocationOff style={{ fontSize: '1.2em' }} />}
                  onClick={() => removeOrgAddress(addr.address?.id)}
                />

                <FaLocationDot
                  style={{
                    marginRight: '0.5em',
                  }}
                />
                <Typography.Text style={{ color: 'darkblue' }}>
                  {addr.address?.city?.cityName},{' '}
                  {addr.address?.state?.stateName}
                </Typography.Text>
              </div>
            ))}
          </Skeleton>
        </Col>
      </Row>

      <Form
        form={form}
        name='address'
        labelAlign='left'
        initialValues={{
          remember: true,
        }}
        onFinish={addOrgAddress}
        onFinishFailed={() => {}}
        autoComplete='off'
      >
        <Title level={5}>New address</Title>
        <Row
          justify={'start'}
          gutter={16}
        >
          <Col
            span={5}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            xl={{ span: 5 }}
          >
            <Form.Item
              label='city'
              name='city'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={addresses
                  ?.filter(
                    (addr) =>
                      !org?.addresses?.some(
                        (orgAddr) => orgAddr.address?.id == addr.id
                      )
                  )
                  ?.map((addr) => ({
                    value: addr.id,
                    label: addr.city?.cityName,
                  }))}
                loading={isAddressesLoading}
              />
            </Form.Item>
          </Col>

          <Col
            span={5}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            xl={{ span: 5 }}
          >
            <Form.Item
              label='state'
              name='state'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={addresses
                  .filter((addr) => addr.id == cityValue)
                  .map((addr) => ({
                    value: addr.id,
                    label: addr.state?.stateName,
                  }))}
                loading={isAddressesLoading}
              />
            </Form.Item>
          </Col>

          <Col
            span={5}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            xl={{ span: 5 }}
          >
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{}}
            >
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
              >
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
