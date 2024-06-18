import React, { useRef } from 'react';
import { Col, Image, Space, Button } from 'antd';
import { FileImageOutlined, DeleteOutlined } from '@ant-design/icons';
import { fallback_img } from '../fallback_img';
import { URL } from '../../../api/constants';

const CoverImage = ({ org, onNewCoverPic, onRemoveCoverPic }) => {
    return (
        <Image
            width={'100%'}
            height={'100%'}
            
            //TODO only if member
            preview={{
                mask: (
                    <>
                        <Space>
                            <Button
                                icon={<FileImageOutlined />}
                                type='primary'
                                onClick={onNewCoverPic}
                            >
                                new
                            </Button>

                            <Button
                                type='primary'
                                icon={<DeleteOutlined />}
                                onClick={onRemoveCoverPic}
                            >
                                delete
                            </Button>
                        </Space>
                    </>
                ),
                visible: false,
            }}
            src={org?.cover_picture ? `${URL}/organization/coverPicture/${org?.cover_picture}` : ''}
            className=' w-[100%] object-fill rounded-none'
            fallback={'/public/assets/fakeCover.jpg'}
        />
    );
};

export default CoverImage;
