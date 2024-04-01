import React from 'react';
import TextFieldProperties from './fields properties/TextFieldProperties';
import RadioProperties from './fields properties/RadioProperties';
import { itemTypes } from './constants';

export default function PropertiesSidebar({ field, onUpdateProperties }) {
    return (
        <div className='w-full'>
            {field.type === itemTypes.TEXTFIELD && <TextFieldProperties field={field} />}

            {field.type === itemTypes.RADIO && <RadioProperties field={field} />}
        </div>
    );
}
