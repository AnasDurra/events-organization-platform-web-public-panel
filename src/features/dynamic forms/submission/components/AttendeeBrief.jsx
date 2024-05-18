import { Col, Row, Image } from 'antd';
import React from 'react';

export default function AttendeeBrief({ username, onClick }) {
    return (
        <Row
            gutter={16}
            className='hover:cursor-pointer'
            onClick={onClick}
        >
            <Col span={6}>
                <Image
                    preview={false}
                    className='rounded-lg'
                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                />
            </Col>
            <Col span={16}>
                <div className='flex flex-col items-start justify-center'>
                    <div>@{username}</div>
                    {/* <span>submission time</span> */}
                </div>
            </Col>
        </Row>
    );
}
