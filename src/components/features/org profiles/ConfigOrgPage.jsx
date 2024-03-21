import {
  ArrowLeftOutlined,
  DeleteColumnOutlined,
  DeleteOutlined,
  DeleteRowOutlined,
  FacebookFilled,
  LeftOutlined,
  LinkedinFilled,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  List,
  Row,
  Select,
  Skeleton,
  Space,
  Tabs,
  Typography,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddOrgAddressMutation,
  useConfigureOrgMutation,
  useGetAddressesQuery,
  useGetOrgQuery,
  useRemoveOrgAddressMutation,
} from './orgSlice';
import { CiLocationOff } from 'react-icons/ci';

const list = [
  {
    loading: false,
    country: 'syria',
    city: 'damascus',
  },
  {
    country: 'syria',
    city: 'homs',
  },
];

const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function ConfigOrgPage() {
  const navigate = useNavigate();

  const [basicForm] = Form.useForm();
  const [addressForm] = Form.useForm();

  const cityValue = Form.useWatch('city', addressForm);

  let { orgId } = useParams();
  const {
    data: { result: org } = { result: {} },
    isLoading,
    isSuccess,
  } = useGetOrgQuery(orgId);
  const {
    data: { result: addresses } = { result: [] },
    isLoading: isAddressesLoading,
  } = useGetAddressesQuery();
  const [
    configureOrg,
    { isLoading: isConfigLoading, isSuccess: isConfigSuccess },
  ] = useConfigureOrgMutation();
  const [removeOrgAddress] = useRemoveOrgAddressMutation();
  const [addOrgAddress] = useAddOrgAddressMutation();

  useEffect(() => {
    if (isSuccess) {
      basicForm.setFieldsValue({
        name: org?.name,
        bio: org?.bio,
        description: org?.description,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    addressForm.resetFields(['state']);
  }, [cityValue]);

  const tabsItems = [
    {
      key: '1',
      label: 'basic',
      children: (
        <>
          <Form
            name='basic'
            form={basicForm}
            wrapperCol={{
              span: 10,
            }}
            labelCol={{
              span: 5,
            }}
            labelAlign='left'
            initialValues={{
              remember: true,
            }}
            onFinish={(fields) => {
              configureOrg({ ...fields, organization_id: orgId });
            }}
            onFinishFailed={() => {}}
            autoComplete='off'
          >
            <Row
              justify={'start'}
              gutter={40}
            >
              <Col span={24}>
                <Form.Item
                  label='name'
                  name='name'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row
              justify={'start'}
              gutter={40}
            >
              <Col span={24}>
                <Form.Item
                  label='bio'
                  name='bio'
                >
                  <TextArea
                    placeholder='brief introduction into your organization'
                    autoSize={{
                      minRows: 2,
                      maxRows: 6,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row
              justify={'start'}
              gutter={40}
            >
              <Col span={24}>
                <Form.Item
                  label='description'
                  name='description'
                >
                  <TextArea
                    placeholder='describe your organization'
                    autoSize={{
                      minRows: 4,
                      maxRows: 6,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 15 }}
                >
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ width: '100%', marginTop: '2em ' }}
                  >
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ),
    },
    {
      key: '2',
      label: 'address',
      children: (
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
                loading={isLoading}
                active
              >
                {org?.addresses?.map((addr) => (
                  <div
                    key={addr.id}
                    style={{
                      width: '100%',
                      color: 'darkblue',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      type='text'
                      icon={<CiLocationOff style={{ fontSize: '1.2em' }} />}
                      onClick={() =>
                        removeOrgAddress({
                          address_id: addr.address?.id,
                          orgId,
                        })
                      }
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
                {/*  <List
                  className='demo-loadmore-list'
                  itemLayout='horizontal'
                  dataSource={list}
                  renderItem={(item) => (
                    <List.Item actions={[<a key='list-remove'>remove</a>]}>
                      <Typography.Text>
                        {item.country}, {item.city}
                      </Typography.Text>
                    </List.Item>
                  )}
                /> */}
              </Skeleton>
            </Col>
          </Row>

          <Form
            form={addressForm}
            name='address'
            labelAlign='left'
            initialValues={{
              remember: true,
            }}
            onFinish={(fields) => {
              addOrgAddress({ address_id: fields['city'], orgId })
                .unwrap()
                .then(() => {
                  addressForm.resetFields();
                })
                .catch(() => {});
            }}
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
      ),
    },
    {
      key: '3',
      label: 'contact info',
      children: (
        <>
          <Form
            name='contact_info'
            wrapperCol={{
              span: 8,
            }}
            labelCol={{
              span: 7,
            }}
            labelAlign='left'
            initialValues={{
              remember: true,
            }}
            onFinish={(fields) => {
              console.log(fields);
            }}
            onFinishFailed={() => {}}
            autoComplete='off'
          >
            <Row justify={'start'}>
              <Col span={24}>
                <Form.Item
                  label='phone number'
                  name='phone_number'
                  rules={[
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row justify={'start'}>
              <Col span={24}>
                <Form.Item
                  label='landline number'
                  name='landline number'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Space.Compact style={{ width: '100%' }}>
                    <Input
                      style={{
                        width: '20%',
                      }}
                      defaultValue='0571'
                    />
                    <Input
                      style={{
                        width: '80%',
                      }}
                      defaultValue='26888888'
                    />
                  </Space.Compact>
                </Form.Item>
              </Col>
            </Row> */}
            <Row justify={'start'}>
              <Col span={24}>
                <Form.Item
                  label={
                    <Space.Compact>
                      <FacebookFilled />
                      <Typography.Text style={{ marginLeft: '1.1em' }}>
                        Facebook
                      </Typography.Text>
                    </Space.Compact>
                  }
                  name='fb'
                >
                  <Input placeholder='URL link' />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={'start'}>
              <Col span={24}>
                <Form.Item
                  label={
                    <Space.Compact>
                      <LinkedinFilled />
                      <Typography.Text style={{ marginLeft: '1.1em' }}>
                        Linkedin
                      </Typography.Text>
                    </Space.Compact>
                  }
                  name='linkedin'
                >
                  <Input placeholder='URL link' />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={15}>
                <Form.Item
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ width: '100%', marginTop: '2em ' }}
                  >
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ),
    },
  ];

  return (
    <>
      <Row
        justify={'start'}
        align={'middle'}
        gutter={20}
      >
        <Col>
          <Button
            icon={<ArrowLeftOutlined />}
            type='text'
            onClick={() => navigate(-1)}
          />
        </Col>
        <Col span={14}>
          <Title
            level={3}
            style={{ margin: '0' }}
          >
            Configure Organization
          </Title>
        </Col>
      </Row>

      <Skeleton loading={isLoading}>
        <Tabs
          style={{ marginTop: '1.5em' }}
          defaultActiveKey='1'
          items={tabsItems}
          onChange={() => {}}
        />
      </Skeleton>
    </>
  );
}
