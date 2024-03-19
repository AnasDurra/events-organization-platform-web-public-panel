import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import React from 'react';

export default function ModalNewMember({ isOpen, onOk, onCancel }) {
  return (
    <Modal
      open={isOpen}
      title='Add new member'
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button
          key='new-member'
          type='primary'
          onClick={() => {}}
        >
          Add
        </Button>,
      ]}
    >
      <Form
        name='basic'
        wrapperCol={{
          span: 14,
        }}
        labelCol={{
          span: 10,
        }}
        labelAlign='left'
        initialValues={{
          remember: true,
        }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        autoComplete='off'
      >
        <Row gutter={[16, 12]}>
          <Col span={12}>
            <Form.Item
              label='first name'
              name='first name'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='last name'
              name='last name'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='username'
              name='username'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='password'
              name='password'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Form.Item
              label='permissions'
              name='permissions'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                defaultValue='lucy'
                options={[
                  {
                    value: 'lucy',
                    label: 'Lucy',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={16}>
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
          <Col span={12}></Col>
        </Row>
      </Form>
    </Modal>
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
