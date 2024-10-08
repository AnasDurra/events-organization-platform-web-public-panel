import React from 'react';
import TextFieldProperties from '../fields properties/TextFieldProperties';
import RadioProperties from '../fields properties/RadioProperties';
import { SidebarItemsIDs } from '../constants';
import DateProperties from '../fields properties/DateProperties';
import NumberProperties from '../fields properties/NumberProperties';
import debounce from 'lodash.debounce';
import { CloseOutlined } from '@ant-design/icons';

export default function PropertiesSidebar({ field, onUpdateProperties, onDeleteField, onClose }) {
    const handleNameChange = (newName) => {
        onUpdateProperties({ ...field, name: newName });
    };

    const handleLabelChange = (newLabel) => {
        onUpdateProperties({ ...field, label: newLabel });
    };

    const handleIsRequiredChange = (newIsRequired) => {
        onUpdateProperties({ ...field, required: newIsRequired });
    };

    const handleOptionsChange = (newOptions) => {
        onUpdateProperties({ ...field, options: newOptions });
    };
    const handleValidationRuleChange = (newValidationRuleWithVal) => {
        onUpdateProperties({ ...field, validationRules: [newValidationRuleWithVal] });
    };

    const debouncedHandleOptionsChange = debounce(handleOptionsChange, 1000);

    return (
        <div className='w-full h-[90vh] overflow-y-auto absolute'>
            <CloseOutlined
                className='absolute top-0 right-0 hover:cursor-pointer hover:shadow-lg m-2'
                onClick={onClose}
            />

            {field.fieldType.id == SidebarItemsIDs.TEXTFIELD && (
                <TextFieldProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                    onDelete={onDeleteField}
                    onValidationRulesChange={handleValidationRuleChange}
                />
            )}

            {field.fieldType.id == SidebarItemsIDs.RADIO && (
                <RadioProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                    onOptionsChange={debouncedHandleOptionsChange}
                    onDelete={onDeleteField}
                />
            )}

            {field.fieldType.id == SidebarItemsIDs.DATE && (
                <DateProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                    onDelete={onDeleteField}
                />
            )}

            {field.fieldType.id == SidebarItemsIDs.NUMBER && (
                <NumberProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                    onDelete={onDeleteField}
                    onValidationRulesChange={handleValidationRuleChange}
                />
            )}
        </div>
    );
}
