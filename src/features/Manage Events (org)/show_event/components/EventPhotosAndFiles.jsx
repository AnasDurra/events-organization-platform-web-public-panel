import React, { useState } from 'react';
import { Modal, Button, Typography, Space } from 'antd';

const EventPhotosAndFiles = ({ photos, attachments }) => {
    const [visible, setVisible] = useState(false);
    const [activeImage, setActiveImage] = useState('');

    const showModal = (photo_url) => {
        setActiveImage(photo_url);
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Space direction='vertical' size={20}>
            <Typography.Title style={{ margin: '0px' }} level={2} strong>
                <span
                    style={{
                        borderBottom: '5px solid #000',
                        paddingBottom: '4px',
                    }}
                >
                    Event
                </span>{' '}
                Gallery
            </Typography.Title>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {photos.map((photo) => (
                    <div key={photo.id} className='cursor-pointer'>
                        <img
                            src={photo.photo_url}
                            alt={photo.photo_name}
                            className='w-full h-60 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
                            onClick={() => showModal(photo.photo_url)}
                        />
                    </div>
                ))}
                <Modal
                    title='Photo View'
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key='back' onClick={handleCancel}>
                            Return
                        </Button>,
                    ]}
                >
                    <img src={activeImage} alt='Event' className='w-full h-auto' />
                </Modal>
            </div>
        </Space>
    );
};

export default EventPhotosAndFiles;
