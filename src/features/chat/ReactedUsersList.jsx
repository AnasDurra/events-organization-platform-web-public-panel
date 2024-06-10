import React from 'react';
import { Avatar, List } from 'antd';

const ReactedUsersList = ({ message, reaction_id }) => {
    const filteredReactions = message.reactions.filter((reaction) => reaction.reaction.id === reaction_id);

    const users = filteredReactions.map((reaction) => ({
        ...reaction.reacted_by,
        reactionDate: reaction.reaction_date,
    }));

    return (
        <div style={{ minWidth: '30vw' }} className='bg-white rounded overflow-hidden'>
            <List
                itemLayout='horizontal'
                dataSource={users}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={user.avatar} />}
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{user.username}</span>
                                    {user.is_organizer ? (
                                        <span style={{ color: 'gray' }}>Organizer</span>
                                    ) : (
                                        <span style={{ color: 'gray' }}>Attendee</span>
                                    )}
                                </div>
                            }
                            description={
                                <span className='text-xs text-gray-400'>
                                    {new Date(user.reactionDate).toLocaleString('en-US', {
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
