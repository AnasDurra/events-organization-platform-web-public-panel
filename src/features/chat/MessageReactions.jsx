import { Button, Popover, Space } from 'antd';
import ReactedUsersList from './ReactedUsersList';
import { Icon } from '@iconify/react';

const MessageReactions = ({ message, handleReaction }) => {
    return (
        <>
            {message?.reactions_meta_data?.length != 0 && (
                <Space size={0}>
                    {message?.reactions_meta_data?.map((item, index) => (
                        <div key={index}>
                            <div
                                key={item?.reaction?.id}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    marginRight: '10px',
                                    direction: 'ltr',
                                }}
                            >
                                <>
                                    <Popover
                                        destroyTooltipOnHide
                                        mouseEnterDelay={1}
                                        title={'Reactions'}
                                        content={<ReactedUsersList reactedUsers={item?.reacted_users} />}
                                    >
                                        <Space size={0}>
                                            <Button
                                                size='small'
                                                type='text'
                                                icon={
                                                    <Icon
                                                        icon={item?.reaction?.icon.split('/').pop()}
                                                        style={{
                                                            fontSize: '18px',
                                                            color:
                                                                item?.reaction?.label === 'Like' ||
                                                                item?.reaction?.label === 'Dislike'
                                                                    ? 'blue'
                                                                    : item?.reaction?.label === 'Love'
                                                                    ? 'red'
                                                                    : 'black',
                                                        }}
                                                    />
                                                }
                                                onClick={() =>
                                                    handleReaction(
                                                        item?.reaction?.label?.toLowerCase(),
                                                        message?.message_id
                                                    )
                                                }
                                            />
                                            <div style={{ marginLeft: '2px', fontSize: '14px' }}>
                                                {item?.no_reactions}
                                            </div>
                                        </Space>
                                    </Popover>
                                </>
                            </div>
                        </div>
                    ))}
                </Space>
            )}
        </>
    );
};

export default MessageReactions;
