import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
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
import { useNewEmployeeMutation } from '../employeeSlice';
import moment from 'moment';

export default function ModalNewMember({ isOpen, onOk, onCancel, orgId }) {
  const [createNewEmployee] = useNewEmployeeMutation();
  const [form] = Form.useForm();
  return (
    <Modal
      open={isOpen}
      title='Add new member'
      onOk={onOk}
      onCancel={onCancel}
      width={'60vw'}
      footer={
        <Button
          type='primary'
          onClick={() => form.submit()}
        >
          Add
        </Button>
      }
    >
      <Form
        form={form}
        name='new-member'
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
        onFinish={(fields) => {
          console.log(fields);
          console.log(moment(fields.birth_date).format('YYYY-MM-DD'));

          createNewEmployee({
            ...fields,
            organization_id: parseInt(orgId),
            birth_date: moment(fields.birth_date).format('YYYY-MM-DD'),
          })
            .unwrap()
            .then(() => {
              onOk();
              form.resetFields();
            })
            .catch(() => {});
        }}
        onFinishFailed={() => {}}
        autoComplete='off'
      >
        <Row gutter={[40]}>
          <Col span={12}>
            <Form.Item
              label='first name'
              name='first_name'
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
              name='last_name'
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

          <Col span={12}>
            <Form.Item
              label='email'
              name={'email'}
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='phone_number'
              label='phone number'
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[0-9]+$/),
                },
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='birth date'
              name='birth_date'
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                mode='multiple'
                options={[
                  {
                    value: 'lucy',
                    label: 'Lucy',
                  },
                  {
                    value: 'suzy',
                    label: 'suzy',
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='profile picture'
              name='profile_picture'
              rules={[
                {
                  required: true,
                },
              ]}
              style={{ width: '100%' }}
            >
              <Upload
                {...props}
                listType='picture-circle'
                maxCount={1}
              >
                <span style={{ padding: '1em' }}>Click to Upload</span>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

const props = {
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log('success');
    } else if (info.file.status === 'error') {
      console.log('fail');
    }
  },
};
