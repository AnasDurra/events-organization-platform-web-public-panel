import { v4 as uuidv4 } from 'uuid';
import { itemTypes } from './constants';

const initialData = [
    {
        id: uuidv4(),
        fields: [
            { type: itemTypes.TEXTFIELD, id: uuidv4() },
            { type: itemTypes.RADIO, id: uuidv4() },
        ],
    },
    {
        id: uuidv4(),
        fields: [
            { type: itemTypes.RADIO, id: uuidv4() },
            { type: itemTypes.TEXTFIELD, id: uuidv4() },
        ],
    },
];

export default initialData;
