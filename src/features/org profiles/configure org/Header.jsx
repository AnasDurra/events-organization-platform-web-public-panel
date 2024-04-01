import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    return (
        <Row
            justify={'start'}
            align={'middle'}
            gutter={20}
            style={{ marginTop: '1em', marginBottom: '1em' }}
        >
            <Col>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type='text'
                    onClick={() => navigate(-1)}
                />
            </Col>
            <Col
                xs={{ span: 20 }}
                sm={{ span: 20 }}
                xl={{ span: 14 }}
                span={14}
            >
                <Title
                    level={3}
                    style={{ margin: '0' }}
                >
                    Configure Organization
                </Title>
            </Col>
        </Row>
    );
}
