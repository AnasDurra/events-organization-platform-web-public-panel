import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Dropdown, Menu, Row, Spin, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFollowedOrgsQuery } from '../../api/services/following';
const { Meta } = Card;
const { Text } = Typography;

const ShowFollowingOrgsList = () => {
    const { data: data2, error, isLoading } = useFollowedOrgsQuery();
    const data = {
        status: true,
        path: '/api/attendee/followed-organizations',
        statusCode: 200,
        result: [
            {
                organization: {
                    name: 'ORG1',
                    bio: 'Hi, here is Road Ride Organization',
                    description: 'An offside event organizer',
                    cover_image: 'https://picsum.photos/300/200?random=1', // Fake cover image URL
                },
                following_date: '2024-04-14 15:19:05',
            },
            {
                organization: {
                    name: 'ORG2',
                    bio: 'Hello, here is Adventure Seekers Club',
                    description: 'A club for adventure enthusiasts',
                    cover_image: 'https://picsum.photos/300/200?random=2', // Fake cover image URL
                },
                following_date: '2024-04-14 15:19:05',
            },
            {
                organization: {
                    name: 'ORG3',
                    bio: 'Hey, here is Sports Enthusiasts Association',
                    description: 'A community for sports lovers',
                    cover_image: 'https://picsum.photos/300/200?random=3', // Fake cover image URL
                },
                following_date: '2024-04-14 15:19:05',
            },
        ],
    };
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
            <Menu.Item key="name">Search by Name</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        console.log(data);
        setFilteredOrgs(data?.result);
    }, []);

    return (
        <div>
            <Typography.Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>
                Following Organizations
            </Typography.Title>
            <Spin size="large" spinning={isLoading}>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Dropdown overlay={searchMenu} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
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
                            enterButton="Search"
                            size="large"
                            onSearch={handleSearch}
                        />
                    )}
                </div>

                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <Text style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '8px' }}>
                        Total Organizations:
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#1890ff' }}>{data?.result?.length}</Text>
                </div>
                <Row gutter={[16, 16]}>
                    {filteredOrgs?.map((org, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Card
                                hoverable
                                style={{ width: '100%', height: '100%' }}
                                cover={<img alt="organization cover" src={org?.organization?.cover_image} />}
                                onClick={() => {
                                    navigate(`/org/${org?.organization?.id}`);
                                }}
                            >
                                <Meta
                                    title={org.organization.name}
                                    description={
                                        <div>
                                            <Text>{org.organization.bio}</Text>
                                            <br />
                                            <Text type="secondary">{org.organization.description}</Text>
                                            <Divider style={{ margin: '10px 0px' }} />
                                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                                Following since {moment(org.following_date).format('MMMM D, YYYY')}
                                            </Text>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Spin>
        </div>
    );
};

export default ShowFollowingOrgsList;
