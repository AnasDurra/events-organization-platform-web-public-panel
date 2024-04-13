import React from 'react';
import { Typography, Badge } from 'antd';
import FormTextField from './fields/FormTextField';
import FormRadioField from './fields/FormRadioField';
import FormNumberField from './fields/FormNumberField';
import FormDateField from './fields/FormDateField';
export default function FormGroup({ group, groupsLength }) {
    return (
        <Badge.Ribbon
            text={`page ${group.position} of ${groupsLength}`}
            className='m-4 p-2'
        >
            <div className='p-4 m-4 bg-gray-50 rounded-lg border-4 border-teal-500/75 shadow-2xl'>
                <Typography.Title level={4}>group name</Typography.Title>
                <Typography.Paragraph>description</Typography.Paragraph>
                <div className='flex flex-col space-y-2'>
                    <FormTextField />
                    <FormRadioField />
                    <FormNumberField />
                    <FormDateField />
                </div>
            </div>
        </Badge.Ribbon>
    );
}
