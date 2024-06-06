import { CloseOutlined } from '@ant-design/icons';
import { MdOutlineReply } from 'react-icons/md';
import { Button, Space, Typography } from 'antd';

const ReplyMessage = ({ message, setIsReplying }) => {
    const cardStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        // margin: '0.5rem 0',
        padding: '0.5rem',
        // borderRadius: '1rem 1rem 1rem 0rem',
        // border: '1px solid #ccc',
        direction: 'ltr',
    };
    console.log(message);
    return (
        <div style={cardStyle}>
            <Space direction='vertical'>
                <Space size={15}>
                    <MdOutlineReply style={{ fontSize: '24px', color: '#1679AB' }} />
                    <Space direction='vertical'>
                        <strong style={{ width: '100%', color: '#1679AB' }}>Reply to {message?.user?.username}</strong>
                        <Typography.Text style={{ fontSize: '14px', direction: 'ltr' }}>{message.text}</Typography.Text>
                    </Space>
                </Space>
            </Space>

            <div>
                <Button type='text' icon={<CloseOutlined />} onClick={() => setIsReplying(false)} />
            </div>
        </div>
    );
};

export default ReplyMessage;
