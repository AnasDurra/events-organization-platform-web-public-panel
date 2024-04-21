import React from 'react';
import TextFieldProperties from '../fields properties/TextFieldProperties';
import RadioProperties from '../fields properties/RadioProperties';
import { SidebarItemsIDs } from '../constants';
import DateProperties from '../fields properties/DateProperties';
import NumberProperties from '../fields properties/NumberProperties';
import debounce from 'lodash.debounce';

export default function PropertiesSidebar({ field, onUpdateProperties, onDeleteField }) {
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
    
    const debouncedHandleOptionsChange = debounce(handleOptionsChange, 1000);

    return (
        <div className='w-full h-[90vh] overflow-y-auto'>
            {field.fieldType.id == SidebarItemsIDs.TEXTFIELD && (
                <TextFieldProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                    onDelete={onDeleteField}
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
                />
            )}
        </div>
    );
}
