import { Avatar, Button, List, Modal } from 'antd';
import React from 'react';
import { useGetFormEventsQuery } from '../dynamicFormsSlice';

export default function SelectFormEventModal({ form_id, onSelectEvent, isOpen, onClose }) {
    const {
        data: { result: events } = { result: [] },
        isLoading: isFormEventsLoading,
        isFetching: isFormEventsFetching,
    } = useGetFormEventsQuery(form_id);

    return (
        <Modal
            title='Select Event'
            open={isOpen}
            onCancel={onClose}
        >
            <List
                itemLayout='horizontal'
                dataSource={events}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a onClick={() => onSelectEvent(item.id)}>{item.title}</a>}
                            // description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
}
