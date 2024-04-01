import { Button, Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { useConfigureOrgMutation, useGetOrgQuery } from '../orgSlice';

export default function BasicForm({ form, orgData, onFinish }) {
  return (
    <Form
      name='basic'
      form={form}
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
      onFinish={onFinish}
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
  );
}
