import { ArrowLeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Dropdown, Image, Menu, Row, Spin, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFollowedOrgsQuery } from '../../api/services/following';
import { URL } from '../../api/constants';
import Paragraph from 'antd/es/typography/Paragraph';
const { Meta } = Card;
const { Text } = Typography;

import fallbackImage from '../../../public/assets/fallback-image.png';

const ShowFollowingOrgsList = () => {
    const { data: data, isLoading } = useFollowedOrgsQuery();
    const navigate = useNavigate();

    const [filteredOrgs, setFilteredOrgs] = useState([]);
    const [searchType, setSearchType] = useState('name');
    const handleSearchTypeSelect = ({ key }) => {
        setSearchType(key);
    };
    const handleSearch = (value) => {
        const filtered = data?.result?.filter((org) => {
            if (searchType === 'name') {
                return org.organization.name.toLowerCase().includes(value.toLowerCase());
            }
            return false;
        });
        setFilteredOrgs(filtered);
    };

    const searchMenu = (
        <Menu onClick={handleSearchTypeSelect}>
            <Menu.Item key='name'>Search by Name</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        setFilteredOrgs(data?.result);
    }, [data]);

    return (
        <div className='grid grid-cols-24 p-4 md:p-10'>
            <Button size='large' icon={<ArrowLeftOutlined />} type='text' onClick={() => navigate(-1)} />

            <Typography.Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>
                Following Organizations
            </Typography.Title>
            <Spin size='large' spinning={isLoading}>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Dropdown overlay={searchMenu} trigger={['click']}>
                        <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                            <EllipsisOutlined
                                style={{
                                    fontSize: '24px',
                                    color: '#017568',
                                    cursor: 'pointer',
                                    border: '1px solid #017568',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    marginRight: '5px',
                                }}
                            />
                        </a>
                    </Dropdown>
                    {searchType === 'name' && (
                        <Search
                            placeholder={`Search by ${searchType}`}
                            allowClear
                            enterButton='Search'
                            size='large'
                            onSearch={handleSearch}
                        />
                    )}
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Text style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '8px' }}>
                        Total Organizations:
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#1890ff' }}>{filteredOrgs?.length}</Text>
                </div>
                <Row gutter={[16, 16]}>
                    {!data?.result || data?.result?.length == 0 ? (
                        <Col span={24}>
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <Text type='secondary' style={{ fontSize: '16px' }}>
                                    You are not following any organizations yet.
                                </Text>
                            </div>
                        </Col>
                    ) : filteredOrgs && filteredOrgs.length > 0 ? (
                        filteredOrgs.map((org, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                                <Card
                                    hoverable
                                    style={{ width: '100%', height: '100%' }}
                                    cover={
                                        <Image
                                            preview={false}
                                            alt='organization cover'
                                            src={(
                                                URL +
                                                '/organizations/pictures/' +
                                                org?.organization?.cover_picture
                                            ).replace('/api/', '/')}
                                            fallback={fallbackImage}
                                        />
                                    }
                                    onClick={() => {
                                        navigate(`/org/${org?.organization?.id}`);
                                    }}
                                >
                                    <Meta
                                        title={org.organization.name}
                                        description={
                                            <div>
                                                <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                                                    <Text>{org.organization.bio}</Text>
                                                </Paragraph>
                                                <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                                                    <Text type='secondary'>{org.organization.description}</Text>
                                                </Paragraph>
                                                <Divider style={{ margin: '10px 0px' }} />
                                                <Text type='secondary' style={{ fontSize: '12px' }}>
                                                    Following since {moment(org.following_date).format('MMMM D, YYYY')}
                                                </Text>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col span={24}>
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <Text type='secondary' style={{ fontSize: '16px' }}>
                                    No organizations match your search criteria. Please try adjusting your filters or
                                    search terms.
                                </Text>
                            </div>
                        </Col>
                    )}
                </Row>
            </Spin>
        </div>
    );
};

export default ShowFollowingOrgsList;
