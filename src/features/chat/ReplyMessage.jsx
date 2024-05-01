import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import ReplyIcon from '@mui/icons-material/Reply';
import { Button } from 'antd';

const ReplyMessage = ({ message, setIsReplying }) => {
    const cardStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        margin: '0.5rem 0',
        padding: '0.5rem',
        borderRadius: '1rem 1rem 1rem 0rem',
        border: '1px solid #ccc',
        direction: 'ltr',
    };
    console.log(message);
    return (
        <div style={cardStyle}>
            <div style={{ display: 'flex' }}>
                <ReplyIcon style={{ color: '#1679AB', marginRight: '5px' }} />

                <div>
                    <strong style={{ color: '#1679AB' }}>Reply to {message.user.name}</strong>
                    <div style={{ fontSize: '14px', direction: 'ltr' }}>{message.text}</div>
                </div>
            </div>
            <div>
                <Button type="text" icon={<CloseOutlined />} onClick={() => setIsReplying(false)} />
            </div>
        </div>
    );
};

export default ReplyMessage;
