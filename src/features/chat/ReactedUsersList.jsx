import React from 'react';
import { Avatar, List } from 'antd';

const ReactedUsersList = ({ reactedUsers }) => {
    return (
        <div style={{ minWidth: '30vw' }} className='bg-white rounded overflow-hidden'>
            <List
                itemLayout='horizontal'
                dataSource={reactedUsers}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item?.avatar} />}
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{item?.username}</span>
                                    {item?.is_organizer ? (
                                        <span style={{ color: 'gray' }}>Organizer</span>
                                    ) : (
                                        <span style={{ color: 'gray' }}>Attendee</span>
                                    )}
                                </div>
                            }
                            description={
                                <span className='text-xs text-gray-400'>
                                    {new Date(item?.reaction_date).toLocaleString('en-US', {
                                        timeZone: 'America/New_York',
                                    })}
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ReactedUsersList;
