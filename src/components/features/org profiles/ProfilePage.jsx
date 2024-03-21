import {
  Button,
  Col,
  Divider,
  Image,
  List,
  Row,
  Skeleton,
  Space,
  Typography,
  message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useRef } from 'react';
import cover from '/public/TimelineCovers.pro_beautiful-abstract-colors-facebook-cover.jpg';
import './ProfilePage.css';
import {
  DeleteOutlined,
  DeleteRowOutlined,
  FacebookFilled,
  FacebookOutlined,
  FileAddOutlined,
  FileImageOutlined,
  GifOutlined,
  LinkedinFilled,
  PhoneFilled,
  PhoneOutlined,
  PhoneTwoTone,
  SettingFilled,
  SettingOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { FaLocationDot } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetOrgQuery,
  useNewCoverPicMutation,
  useNewProfilePicMutation,
  useRemoveCoverPicMutation,
  useRemoveProfilePicMutation,
} from './orgSlice';
import { URL } from '../../../api/constants';
const { Text } = Typography;

const contactOrder = [
  'Phone Number',
  'Email',
  'Facebook',
  'WhatsApp',
  'LinkedIn',
];

export default function ProfilePage() {
  const navigate = useNavigate();
  let { orgId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: { result: org } = { result: {} }, isLoading } =
    useGetOrgQuery(orgId);
  const [newCoverPic, { isLoading: isUpdateCoverLoading }] =
    useNewCoverPicMutation();
  const [newProfilePic, { isLoading: isUpdateProfilePicLoading }] =
    useNewProfilePicMutation();
  const [removeCoverPic] = useRemoveCoverPicMutation();
  const [removeProfilePic] = useRemoveProfilePicMutation();

  const inputCoverFile = useRef(null);
  const inputProfilePicFile = useRef(null);

  useEffect(() => {
    if (isUpdateCoverLoading || isUpdateProfilePicLoading) {
      messageApi.loading('updating picture...');
    }
  }, [isUpdateCoverLoading, isUpdateProfilePicLoading]);

  return (
    <>
      {contextHolder}
      <Skeleton loading={isLoading}>
        <Row
          className='cover-row'
          justify={'start'}
        >
          <Col
            span={20}
            sm={24}
            xs={24}
            lg={20}
            style={{ height: '100%' }}
          >
            <Image
              width={'100%'}
              height={'100%'}
              //TODO only if member
              preview={{
                mask: (
                  <>
                    <Space>
                      <Button
                        icon={<FileImageOutlined></FileImageOutlined>}
                        type='primary'
                        onClick={() => {
                          inputCoverFile.current.click();
                        }}
                      >
                        new
                      </Button>

                      <Button
                        type='primary'
                        icon={<DeleteOutlined />}
                        onClick={() => removeCoverPic(orgId)}
                      >
                        delete
                      </Button>
                    </Space>
                  </>
                ),
                visible: false,
              }}
              src={
                org?.cover_picture
                  ? `${URL}/organization/coverPicture/${org?.cover_picture}`
                  : undefined
              }
              className='cover-image'
              fallback='data:image/png;base64,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'
            />
          </Col>
        </Row>

        <Row justify={'start'}>
          <Col
            style={{ height: '100%' }}
            offset={1}
            xs={{ span: 8 }}
            sm={{ span: 6 }}
            lg={{ span: 4 }}
          >
            <Image
              fallback='data:image/png;base64,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'
              src={
                org?.main_picture
                  ? `${URL}/organization/mainPicture/${org?.main_picture}`
                  : undefined
              }
              style={{
                marginTop: '-60%',
                borderRadius: '50%',
                width: '100%',
                aspectRatio: '1/1',
              }}
              preview={{
                maskClassName: 'pp-img-mask',
                mask: (
                  <Space>
                    <Button
                      icon={<FileImageOutlined></FileImageOutlined>}
                      type='primary'
                      onClick={() => {
                        inputProfilePicFile.current.click();
                      }}
                    >
                      new
                    </Button>

                    <Button
                      type='primary'
                      icon={<DeleteOutlined></DeleteOutlined>}
                      onClick={() => removeProfilePic(orgId)}
                    >
                      delete
                    </Button>
                  </Space>
                ),
                visible: false,
              }}
            />
          </Col>
          <Col offset={1}>
            <Title
              level={4}
              style={{ marginTop: '1.5em' }}
            >
              {org?.name}
            </Title>
          </Col>

          {/*  TODO only if member */}
          <Col
            xs={{ offset: 5 }}
            sm={{ offset: 5 }}
            lg={{ offset: 10 }}
          >
            <Button
              type='text'
              style={{ marginTop: '2em' }}
              icon={<SettingOutlined />}
              onClick={() => {
                navigate('config');
              }}
            />
          </Col>
        </Row>

        <Row justify={'center'}>
          <Col
            xs={{ span: 20, offset: 1 }}
            sm={{ span: 20, offset: 1 }}
            lg={{ span: 14, offset: 2 }}
            span={14}
          >
            <Text
              type='secondary'
              style={{ textWrap: 'wrap' }}
            >
              {org?.bio}
            </Text>
          </Col>
        </Row>

        <Row
          justify={'start'}
          gutter={16}
        >
          <Col
            sm={{ span: 21 }}
            xs={{ span: 21 }}
            lg={{ span: 5 }}
          >
            <div style={{ width: '100%' }}>
              <Title
                level={5}
                style={{ marginBottom: '1em' }}
              >
                {' '}
                Address
              </Title>
              {org?.addresses?.map((addr) => (
                <Space.Compact
                  key={addr.id}
                  style={{ color: 'darkblue' }}
                >
                  <FaLocationDot
                    style={{
                      fontSize: '1.5em',
                      marginRight: '0.5em',
                      marginBottom: '0.5em',
                    }}
                  />
                  <Text style={{ color: 'darkblue' }}>
                    {addr.address?.city?.cityName},{' '}
                    {addr.address?.state?.stateName}
                  </Text>
                </Space.Compact>
              ))}
            </div>

            <Title level={5}> contact us</Title>
            {/*TODO sort phone first */}
            {org?.contacts?.map((contact) => (
              <Button
                key={contact.id}
                icon={
                  // Determine icon based on the contact name
                  contact.contact.name === 'Phone Number' ? (
                    <PhoneOutlined
                      rotate={'90'}
                      style={{ fontSize: '1.5em' }}
                    />
                  ) : contact.contact.name === 'Facebook' ? (
                    <FacebookFilled style={{ fontSize: '1.5em' }} />
                  ) : contact.contact.name === 'WhatsApp' ? (
                    <WhatsAppOutlined style={{ fontSize: '1.5em' }} />
                  ) : contact.contact.name === 'LinkedIn' ? (
                    <LinkedinFilled style={{ fontSize: '1.5em' }} />
                  ) : null
                }
                type='link'
                style={{
                  marginTop: '1em',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '0',
                  color:
                    contact.contact.name === 'Phone Number'
                      ? 'GrayText'
                      : contact.contact.name === 'Facebook'
                      ? 'blue'
                      : contact.contact.name === 'WhatsApp'
                      ? 'green'
                      : undefined,
                  textWrap: 'wrap',
                }}
                href={contact.content}
                target='_blank'
              >
                {contact.content}
              </Button>
            ))}
          </Col>
          <Col
            sm={{ span: 23 }}
            xs={{ span: 23 }}
            lg={{ span: 14, offset: 1 }}
          >
            <Title level={4}>Our Events</Title>

            <List
              pagination={{
                position: 'bottom',
                align: 'center',
                pageSize: '3',
              }}
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => {}}
                  style={{}}
                >
                  <Row
                    align={'top'}
                    gutter={16}
                    style={{ height: '100%' }}
                  >
                    <Col
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                      lg={{ span: 8 }}
                      style={{ display: 'inline-flex', alignSelf: 'stretch' }}
                    >
                      <div>
                        <Image
                          preview={false}
                          width={'100%'}
                          height={'100%'}
                          src={item.img}
                          style={{ borderRadius: '5%', objectFit: 'cover' }}
                        />
                      </div>
                    </Col>
                    <Col
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                      lg={{ span: 16 }}
                    >
                      <Row
                        justify={'start'}
                        style={{ height: '100%' }}
                      >
                        <Col
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                          lg={{ span: 16 }}
                        >
                          <Title
                            level={5}
                            style={{ margin: 0, marginTop: '0.5em' }}
                          >
                            {item.title}
                          </Title>
                        </Col>

                        <Col
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                          lg={{ span: 6 }}
                          style={{
                            fontWeight: 'bold',
                            color: 'green',
                            marginTop: '0.6em',
                          }}
                        >
                          {item.pricing + ' Tokens'}
                        </Col>
                      </Row>
                      <Row
                        justify={'start'}
                        style={{ marginTop: '1.5em', color: 'GrayText' }}
                      >
                        <Col
                          sm={{ span: 16 }}
                          xs={{ span: 16 }}
                          lg={{ span: 16 }}
                        >
                          {item.tags.map((tag) => `#${tag} `)}
                        </Col>
                        <Col
                          sm={{ span: 8 }}
                          xs={{ span: 8 }}
                          lg={{ span: 4 }}
                          style={{ color: 'GrayText', textAlign: 'end' }}
                        >
                          <Text type='secondary'>{item.date}</Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Skeleton>

      <input
        type='file'
        id='coverFile'
        ref={inputCoverFile}
        style={{ display: 'none' }}
        onChangeCapture={(event) => {
          event.stopPropagation();
          event.preventDefault();
          var file = event.target.files[0];
          console.log('file', file);
          newCoverPic({ file, orgId });
        }}
      />

      <input
        type='file'
        id='coverFile'
        ref={inputProfilePicFile}
        style={{ display: 'none' }}
        onChangeCapture={(event) => {
          event.stopPropagation();
          event.preventDefault();
          var file = event.target.files[0];
          console.log('file', file);
          newProfilePic({ file, orgId });
        }}
      />
    </>
  );
}

const data = [
  {
    title: 'Programming for kids',
    tags: ['programming', 'social', 'kids'],
    date: 'jan 7 | 2024',
    pricing: '150',
    img: cover,
  },
  {
    title: 'Programming for kids',
    tags: ['programming', 'social', 'kids'],
    date: 'jan 7 | 2024',
    pricing: '150',
    img: cover,
  },
  {
    title: 'Programming for kids',
    tags: ['programming', 'social', 'kids'],
    date: 'jan 7 | 2024',
    pricing: '150',
    img: cover,
  },
  {
    title: 'Programming for kids',
    tags: ['programming', 'social', 'kids'],
    date: 'jan 7 | 2024',
    pricing: '150',
    img: cover,
  },
];
