import {
  Button,
  Col,
  Divider,
  Image,
  List,
  Row,
  Space,
  Typography,
} from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import cover from '/public/TimelineCovers.pro_beautiful-abstract-colors-facebook-cover.jpg';
import './ProfilePage.css';
import {
  FacebookFilled,
  FacebookOutlined,
  LinkedinFilled,
  PhoneFilled,
  PhoneOutlined,
  PhoneTwoTone,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { FaLocationDot } from 'react-icons/fa6';

const { Text } = Typography;

export default function ProfilePage() {
  return (
    <>
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
            preview={false}
            src={cover}
            className='cover-image'
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
            preview={false}
            width={'100%'}
            height={'100%'}
            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            style={{ marginTop: '-60%', borderRadius: '50%' }}
          />
        </Col>
        <Col offset={1}>
          <Title level={4}>Qiam center</Title>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Col>
      </Row>

      <Row justify={'start'}>
        <Col
          sm={{ span: 21 }}
          xs={{ span: 21 }}
          lg={{ span: 5 }}
        >
          <div style={{ width: '100%' }}>
            <Title level={5}> Address</Title>
            <Button
              icon={<FaLocationDot style={{ fontSize: '1.5em' }} />}
              type='link'
              style={{
                marginTop: '1em',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '0',
                width: '100%',
                textWrap: 'wrap',
               
              }}
            >
              Syria, Damascus, Mazzeh
            </Button>
            <Button
              icon={<FaLocationDot style={{ fontSize: '1.5em' }} />}
              type='link'
              style={{
                marginTop: '1em',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '0',
                textWrap: 'wrap',
              }}
            >
              Syria, Damascus, Maysat
            </Button>
          </div>

          <Title level={5}> contact us</Title>

          <Button
            icon={
              <PhoneOutlined
                rotate={'90'}
                style={{ fontSize: '1.5em' }}
              />
            }
            type='link'
            style={{
              marginTop: '1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '0',
              color: 'GrayText',
              textWrap: 'wrap',
            }}
          >
            +963 995 453 1944
          </Button>

          <Button
            icon={<FacebookFilled style={{ fontSize: '1.5em' }} />}
            type='link'
            style={{
              marginTop: '1em',

              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0',
              color: 'blue',
              textWrap: 'wrap',
            }}
          >
            Qiam center
          </Button>

          <Button
            icon={<LinkedinFilled style={{ fontSize: '1.5em' }} />}
            type='link'
            style={{
              marginTop: '1em',

              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0',
              textWrap: 'wrap',
            }}
          >
            Qiam center
          </Button>

          <Button
            icon={<WhatsAppOutlined style={{ fontSize: '1.5em' }} />}
            type='link'
            style={{
              marginTop: '1em',

              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0',
              color: 'green',
              textWrap: 'wrap',
            }}
          >
            Qiam center
          </Button>
        </Col>
        <Col
          sm={{ span: 23 }}
          xs={{ span: 23 }}
          lg={{ span: 14, offset: 1 }}
        >
          <Title level={4}>Our Events</Title>

          <List
            pagination={{ position: 'bottom', align: 'center', pageSize: '3' }}
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
