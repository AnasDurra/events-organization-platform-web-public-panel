import { useState } from 'react';
import ReplyMessage from './ReplyMessage';
import { Button, Input } from 'antd';
import { sendMessage } from '../../chatSocket';

const InputMessage = ({ isReplying, setIsReplying, replyMessage, setReplyMessage, chat_group_id }) => {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            let newMessage = {
                content: inputValue,
                group_id: chat_group_id,
            };
            if (isReplying) {
                newMessage = {
                    ...newMessage,
                    reply_to: replyMessage?.message_id,
                };
            }
            console.log(newMessage);
            sendMessage(newMessage);
            setIsReplying(false);
            setReplyMessage(null);
            setInputValue('');
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {isReplying && <ReplyMessage message={replyMessage} setIsReplying={setIsReplying} />}

            <div style={{ display: 'flex', width: '100%' }}>
                <Input.TextArea
                    style={{ flex: 1, marginRight: '10px' }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (e.ctrlKey) {
                                e.preventDefault();
                                setInputValue(inputValue + '\n');
                            } else {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }
                    }}
                    placeholder='Type your message...'
                    autoSize={{
                        minRows: 1,
                        maxRows: 4,
                    }}
                />
                <Button size='l' style={{ width: '80px' }} type='primary' onClick={handleSendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default InputMessage;
