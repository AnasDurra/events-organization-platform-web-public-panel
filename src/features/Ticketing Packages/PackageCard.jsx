import { Button, Card, Col, Divider, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { TiTicket } from 'react-icons/ti';

export default function PackageCard({ name, price, tickets, onClick, onBuyClick }) {
    return (
        <Card
            className='shadow-lg hover:shadow-sm'
            title={<div className='text-center'>{name}</div>}
            onClick={onClick}
            actions={[
                <div onClick={onBuyClick} key={'buy-bt'} className='font-bold text-lg text-white'>
                    BUY
                </div>,
            ]}
            styles={{
                header: { backgroundColor: '#00474f', color: 'whitesmoke' },
                actions: { backgroundColor: '#00474f', color: 'whitesmoke' },
            }}
        >
            <div className='flex justify-center items-center'>
                <TiTicket className='text-[5em] text-yellow-500 ' />
            </div>
            <Meta
                description={
                    <div className='flex flex-col mt-4'>
                        <Divider />
                        <Row justify={'center'}>
                            <Col span={8}>Price</Col>
                            <Col span={8} className='text-black text-center'>
                                {price}$
                            </Col>
                        </Row>
                        <Row justify={'center'}>
                            <Col span={8}>Tickets</Col>
                            <Col span={8} className='text-black text-center'>
                                {tickets}
                            </Col>
                        </Row>
                    </div>
                }
            />
        </Card>
    );
}
