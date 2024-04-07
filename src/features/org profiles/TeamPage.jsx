import { Avatar, Button, Col, Divider, List, Row, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import ModalNewMember from './configure org/modal-new member';
import ModalEditMember from './configure org/modal-edit member';

export default function TeamPage() {
    return (
        <div className='grid grid-cols-12'>
            <div className='sm:col-start-2 sm:col-span-10  col-span-12'>
                <List
                    header={
                        <Row justify={'space-between'}>
                            <Col>
                                <Title
                                    level={4}
                                    style={{ margin: '0' }}
                                >
                                    Team Members
                                </Title>
                            </Col>
                            <Col>
                                <Button
                                    style={{ margin: '0' }}
                                    type='primary'
                                >
                                    new member
                                </Button>
                            </Col>
                        </Row>
                    }
                    itemLayout='horizontal'
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <a
                                    key='list-edit'
                                    style={{ color: 'darkblue' }}
                                >
                                    edit
                                </a>,
                                <a
                                    key='list-activate'
                                    style={{ color: 'darkblue' }}
                                >
                                    activate
                                </a>,
                                <a
                                    key='list-remove'
                                    style={{ color: 'red' }}
                                >
                                    remove
                                </a>,
                            ]}
                        >
                            <Skeleton
                                avatar
                                title={false}
                                loading={item.loading}
                                active
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            size={'large'}
                                            src={item.picture.large}
                                        />
                                    }
                                    title={<a href='https://ant.design'>{item.name}</a>}
                                    description={item.desc}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>

            <ModalNewMember isOpen={false} />
            <ModalEditMember isOpen={false} />
        </div>
    );
}

const data = [
    {
        gender: 'male',
        name: 'abo abdo',
        desc: 'abo_abdo',
        picture: {
            large: 'https://randomuser.me/api/portraits/men/6.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/6.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
        },
    },
    {
        gender: 'male',
        name: 'abo abdo',
        desc: 'abo_abdo',
        picture: {
            large: 'https://randomuser.me/api/portraits/men/6.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/6.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
        },
    },
    {
        gender: 'male',
        name: 'abo abdo',
        desc: 'abo_abdo',
        picture: {
            large: 'https://randomuser.me/api/portraits/men/6.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/6.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
        },
    },
];
