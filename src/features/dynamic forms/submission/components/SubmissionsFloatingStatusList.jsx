import { List } from 'antd';
import React from 'react';

const data = ['⏰ Pending | 100', ' ✅ Accepted | 40', '❌ Rejected | 30', '✍ Filtered out | 33'];

export default function SubmissionsFloatingStatusList({
    pendingCount,
    acceptedCount,
    rejectedCount,
    notRegisteredCount,
}) {
    return (
        <List
            //                    split={false}
            size='small'
            dataSource={[
                `⏰ Pending | ${pendingCount}`,
                `✅ Accepted | ${acceptedCount} `,
                `❌ Rejected | ${rejectedCount}`,
                `✍ Not Registered | ${notRegisteredCount}`,
            ]}
            renderItem={(item) => <List.Item> {item}</List.Item>}
            header={'Status'}
            className='bg-gray-200/95'
            bordered
            //  className='border-2 border-slate-500 p-4 rounded-lg text-center'
        />
    );
}
