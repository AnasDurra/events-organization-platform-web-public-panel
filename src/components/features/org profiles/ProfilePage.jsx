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
import { FacebookFilled, FacebookOutlined, LinkedinFilled, WhatsAppOutlined } from '@ant-design/icons';
const { Text } = Typography;

export default function ProfilePage() {
  return (
    <>
      <Row className='cover-row'>
        <Image
          width={'100%'}
          height={'100%'}
          preview={false}
          src={cover}
          className='cover-image'
        />
      </Row>
      <Row align={'middle'}>
        <Col
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
          xs={{ offset: 10 }}
          sm={{ offset: 8 }}
          lg={{ offset: 2 }}
          span={14}
        >
          <Text type='secondary'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Col>
      </Row>
      <Divider></Divider>
      <Row
        justify={'space-between'}
        gutter={16}
      >
        <Col offset={1} span={16}>
          <Title level={4}>Our Events</Title>
          <List
            pagination={{ position: 'bottom', align: 'center', pageSize: '2' }}
            itemLayout='horizontal'
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <Row
                  align={'top'}
                  gutter={16}
                >
                  <Col span={8}>
                    <Image
                      preview={false}
                      width={'100%'}
                      height={'100%'}
                      src={item.img}
                    />
                  </Col>
                  <Col span={16}>
                    <Row justify={'space-evenly'}>
                      <Col span={16}>
                        <Title
                          level={5}
                          style={{ margin: 0 }}
                        >
                          {item.title}
                        </Title>
                      </Col>

                      <Col
                        span={4}
                        style={{ textAlign: 'center', fontWeight: 'bold' }}
                      >
                        {item.pricing + ' Tokens'}
                      </Col>
                    </Row>
                    <Row
                      justify={'space-evenly'}
                      style={{ marginTop: '2em' }}
                    >
                      <Col span={16}>{item.tags.map((tag) => `#${tag} `)}</Col>
                      <Col
                        span={4}
                        style={{ textAlign: 'center' }}
                      >
                        {item.date}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
        <Col span={4}>
          <Title level={4}>contact us</Title>

          <Button
            icon={<FacebookFilled style={{ fontSize: '2em' }} />}
            type='link'
            style={{ display: 'flex', alignItems: 'center', paddingLeft: '0', color:"blue" }}
          >
            Qiam center
          </Button>

          <Button
            icon={<LinkedinFilled style={{ fontSize: '2em' }} />}
            type='link'
            style={{ display: 'flex', alignItems: 'center', paddingLeft: '0' }}
          >
            Qiam center
          </Button>

          <Button
            icon={<WhatsAppOutlined style={{ fontSize: '2em' }} />}
            type='link'
            style={{ display: 'flex', alignItems: 'center', paddingLeft: '0' , color:"green"}}
          >
            Qiam center
          </Button>
        </Col>
      </Row>
    </>
  );
}

const data = [
  {
    title: 'Programming for kids',
    tags: ['programming', 'social', 'kids'],
    date: 'jan 7, 2024',
    pricing: '150',
    img: cover,
  },
  {
    title: 'Programming for kids',
    tags: ['programming', 'social', 'kids'],
    date: 'jan 7, 2024',
    pricing: '150',
    img: cover,
  },
  {
    title: 'Programming for kids',
    tags: ['programming', 'social', 'kids'],
    date: 'jan 7, 2024',
    pricing: '150',
    img: cover,
  },
  {
    title: 'Programming for kids',
    tags: ['programming', 'social', 'kids'],
    date: 'jan 7, 2024',
    pricing: '150',
    img: cover,
  },
];
