import React from 'react';
import { Typography, Badge } from 'antd';
import FormTextField from './fields/FormTextField';
import FormRadioField from './fields/FormRadioField';
import FormNumberField from './fields/FormNumberField';
import FormDateField from './fields/FormDateField';
import { SidebarItemsIDs } from '../constants';
export default function FormGroup({ group, groupsLength, groupIndex, isCustomStyle }) {
    return (
        <div
            className={`min-h-[80vh] p-4 m-4 bg-gray-100/75 rounded-lg  shadow-lg ${
                isCustomStyle ? 'border-2 border-slate-500/75' : 'border-4 border-teal-500/75'
            } `}
        >
            <Typography.Title level={4}>{group?.name}</Typography.Title>
            <Typography.Paragraph>{group?.description}</Typography.Paragraph>

            <div className='flex flex-col space-y-2'>
                {group?.fields?.map((field, index) => {
                    return field.fieldType?.id == SidebarItemsIDs.TEXTFIELD ? (
                        <FormTextField
                            key={field.id}
                            field={field}
                            fieldIndex={index}
                            groupIndex={groupIndex}
                        />
                    ) : field.fieldType?.id == SidebarItemsIDs.RADIO ? (
                        <FormRadioField
                            key={field.id}
                            field={field}
                            fieldIndex={index}
                            groupIndex={groupIndex}
                        />
                    ) : field.fieldType?.id == SidebarItemsIDs.DATE ? (
                        <FormDateField
                            key={field.id}
                            field={field}
                            fieldIndex={index}
                            groupIndex={groupIndex}
                        />
                    ) : field.fieldType?.id == SidebarItemsIDs.NUMBER ? (
                        <FormNumberField
                            key={field.id}
                            field={field}
                            fieldIndex={index}
                            groupIndex={groupIndex}
                        />
                    ) : null;
                })}
            </div>
        </div>
    );
}
