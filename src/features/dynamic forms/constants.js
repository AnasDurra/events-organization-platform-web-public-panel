export const itemTypes = {
    TEXTFIELD: 'text-field',
    RADIO: 'radio',
    FORM_ELEMENT: 'form-element',
    GROUP: 'group',
    DATE: 'DATE',
    NUMBER: 'NUMBER',
};

export const SidebarItemsIDs = {
    TEXTFIELD: 1,
    NUMBER: 2,
    DATE: 3,
    RADIO: 4,
    GROUP: 5,
};

export const SidebarItemsTypeByID = {
    [SidebarItemsIDs.TEXTFIELD]: itemTypes.TEXTFIELD,
    [SidebarItemsIDs.RADIO]: itemTypes.RADIO,
    [SidebarItemsIDs.GROUP]: itemTypes.GROUP,
    [SidebarItemsIDs.DATE]: itemTypes.DATE,
    [SidebarItemsIDs.NUMBER]: itemTypes.NUMBER,
};
