import React from 'react';
import { Image, Space, Button } from 'antd';
import { FileImageOutlined, DeleteOutlined } from '@ant-design/icons';
import { fallback_img } from '../fallback_img';
import { URL } from '../../../api/constants';

export default function ProfileImage({ org, onNewProfilePic, onRemoveProfilePic }) {
    return (
        <Image
            src={org?.main_picture ? `${URL}/organization/mainPicture/${org?.main_picture}` : undefined}
            className='pp-img'
            preview={{
                maskClassName: 'pp-img-mask',
                mask: (
                    <Space>
                        <Button
                            icon={<FileImageOutlined />}
                            type='primary'
                            onClick={onNewProfilePic}
                        >
                            new
                        </Button>

                        <Button
                            type='primary'
                            icon={<DeleteOutlined />}
                            onClick={onRemoveProfilePic}
                        >
                            delete
                        </Button>
                    </Space>
                ),
                visible: false,
            }}
            fallback={'/public/assets/fakeProfile.png'}
        />
    );
}
