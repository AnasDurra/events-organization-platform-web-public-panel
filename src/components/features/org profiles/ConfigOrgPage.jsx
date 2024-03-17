import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import React from 'react';

export default function ConfigOrgPage() {
  return (
    <>
      <Form
        name='basic'
        wrapperCol={{
          span: 16,
        }}
        labelCol={{
          span: 8,
        }}
        labelAlign='left'
        initialValues={{
          remember: true,
        }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        autoComplete='off'
      >
        <Title level={4}> New organization registration </Title>

        <Row
          justify={'start'}
          gutter={40}
          style={{ width: '90%' }}
        >
          <Col span={10}>
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText' }}
                >
                  Basic
                </Title>
              </Col>
            </Row>

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
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea
                    placeholder='Autosize height with minimum and maximum number of lines'
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
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea
                    placeholder='Autosize height with minimum and maximum number of lines'
                    autoSize={{
                      minRows: 4,
                      maxRows: 6,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col
            style={{ backgroundColor: '#f5f5f5' }}
            span={10}
          >
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText' }}
                >
                  Contact info
                </Title>
              </Col>
            </Row>

            <Row
              justify={'start'}
              gutter={40}
            >
              <Col span={24}>
                <Form.Item
                  label='phone number'
                  name='phone number'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Space.Compact>
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
            </Row>
            <Row
              justify={'start'}
              gutter={40}
            >
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
                  <Space.Compact>
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
            </Row>
          </Col>
        </Row>

        <Row
          justify={'start'}
          gutter={40}
          style={{ width: '90%' }}
        >
          <Col
            style={{ backgroundColor: '#f5f5f5' }}
            span={10}
          >
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText' }}
                >
                  Address
                </Title>
              </Col>
            </Row>
            <>
              <Row
                justify={'start'}
                gutter={40}
              >
                <Col span={24}>
                  <Form.Item
                    label='country'
                    name='country'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      defaultValue='lucy'
                      style={{
                        width: 120,
                      }}
                      options={[
                        {
                          value: 'lucy',
                          label: 'Lucy',
                        },
                      ]}
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
                    label='city'
                    name='city'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      defaultValue='lucy'
                      style={{
                        width: 120,
                      }}
                      options={[
                        {
                          value: 'lucy',
                          label: 'Lucy',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          </Col>
          <Col span={10}>
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText' }}
                >
                  Pictures
                </Title>
              </Col>
            </Row>
            <>
              <Row
                justify={'start'}
                gutter={40}
              >
                <Col span={24}>
                  <Form.Item
                    label='profile'
                    name='profile'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row
                justify={'start'}
                gutter={40}
              >
                <Col span={24}>
                  <Form.Item
                    label='cover'
                    name='cover'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </>
          </Col>
        </Row>

        <Row justify={'start'}>
          <Col offset={6} span={8}>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%', marginTop: '2em ' }}
              >
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

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
