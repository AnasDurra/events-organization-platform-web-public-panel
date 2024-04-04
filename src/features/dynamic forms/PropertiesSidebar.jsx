import React from 'react';
import TextFieldProperties from './fields properties/TextFieldProperties';
import RadioProperties from './fields properties/RadioProperties';
import { itemTypes } from './constants';
import DateProperties from './fields properties/DateProperties';
import NumberProperties from './fields properties/NumberProperties';

export default function PropertiesSidebar({ field, onUpdateProperties }) {
    const handleNameChange = (newName) => {
        onUpdateProperties({ ...field, name: newName });
    };

    const handleLabelChange = (newLabel) => {
        onUpdateProperties({ ...field, label: newLabel });
    };

    const handleIsRequiredChange = (newIsRequired) => {
        onUpdateProperties({ ...field, isRequired: newIsRequired });
    };

    const handleOptionsChange = (newOptions) => {
        onUpdateProperties({ ...field, options: newOptions });
    };

    return (
        <div className='w-full h-[90vh] overflow-y-auto'>
            {field.type === itemTypes.TEXTFIELD && (
                <TextFieldProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                />
            )}

            {field.type === itemTypes.RADIO && (
                <RadioProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                    onOptionsChange={handleOptionsChange}
                />
            )}

            {field.type === itemTypes.DATE && (
                <DateProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                />
            )}

            {field.type === itemTypes.NUMBER && (
                <NumberProperties
                    field={field}
                    onNameChange={handleNameChange}
                    onLabelChange={handleLabelChange}
                    onIsRequiredChange={handleIsRequiredChange}
                />
            )}
        </div>
    );
}
