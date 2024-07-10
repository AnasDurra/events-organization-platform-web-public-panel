import { Modal, message } from 'antd';
import { ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useDeleteMutation } from '../../../api/services/events';
import { useNotification } from '../../../utils/NotificationContext';
import { useNavigate } from 'react-router-dom';

const useEventHandlers = () => {
    const navigate = useNavigate();
    const [deleteEvent] = useDeleteMutation();
    const { openNotification } = useNotification();

    const handleDeleteEvent = (eventId) => {
        Modal.confirm({
            title: (
                <div style={styles.titleContainer}>
                    <span>Are you sure you want to delete this event?</span>
                </div>
            ),
            content: (
                <div style={styles.content}>Deleting this event cannot be undone. Please confirm your action.</div>
            ),
            okText: 'Yes, delete it',
            cancelText: 'No, keep it',
            okButtonProps: { style: styles.okButton },
            cancelButtonProps: { style: styles.cancelButton },
            onOk: () => {
                Modal.confirm({
                    icon: <WarningOutlined style={styles.warningIcon} />,
                    title: (
                        <div style={styles.titleContainer}>
                            <span>Warning</span>
                        </div>
                    ),
                    content: (
                        <div style={styles.content}>
                            Deleting multiple events can lead to severe consequences, such as a block on your account.
                            Please confirm your action.
                        </div>
                    ),
                    okText: 'Yes, I understand',
                    cancelText: 'No, go back',
                    okButtonProps: { style: styles.okButton },
                    cancelButtonProps: { style: styles.cancelButton },
                    onOk: () => {
                        deleteEvent(eventId)
                            .unwrap()
                            .then((res) => {
                                console.log(res);
                                if (res.statusCode === 200) {
                                    openNotification(
                                        'success',
                                        'Event Deleted Successfully',
                                        `The event has been deleted successfully.`
                                    );
                                    navigate('/org/our-events');
                                }
                            })
                            .catch((error) => {
                                openNotification('warning', 'Event Deleted can not be deleted', error?.data?.message);
                            });
                    },
                });
            },
        });
    };

    return {
        handleDeleteEvent,
    };
};

const styles = {
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        color: '#333',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    icon: {
        color: '#faad14',
        marginRight: '8px',
        fontSize: '18px',
    },
    warningIcon: {
        color: '#ff4d4f',
        marginRight: '8px',
        fontSize: '18px',
    },
    content: {
        fontSize: '14px',
        color: '#555',
    },
    okButton: {
        backgroundColor: '#ff4d4f',
        borderColor: '#ff4d4f',
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#d9d9d9',
        borderColor: '#d9d9d9',
        color: '#333',
    },
};

export default useEventHandlers;
