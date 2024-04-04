export const itemTypes = {
    TEXTFIELD: 'text-field',
    RADIO: 'radio',
    FORM_ELEMENT: 'form-element',
    GROUP: 'group',
    DATE: 'DATE',
    NUMBER: 'NUMBER',
};

export const SidebarItemsIDs = {
    TEXTFIELD: 0,
    RADIO: 1,
    GROUP: 2,
    DATE: 3,
    NUMBER: 4,
};

export const SidebarItemsTypeByID = {
    [SidebarItemsIDs.TEXTFIELD]: itemTypes.TEXTFIELD,
    [SidebarItemsIDs.RADIO]: itemTypes.RADIO,
    [SidebarItemsIDs.GROUP]: itemTypes.GROUP,
    [SidebarItemsIDs.DATE]: itemTypes.DATE,
    [SidebarItemsIDs.NUMBER]: itemTypes.NUMBER,
};
