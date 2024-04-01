export const itemTypes = {
  TEXTFIELD: 'text-field',
  RADIO: 'radio',
  FORM_ELEMENT: 'form-element',
  GROUP: 'group',
};

export const SidebarItemsIndex = {
  TEXTFIELD: 0,
  RADIO: 1,
  GROUP: 2,
};

export const SidebarItemsTypeByIndex = {
  [SidebarItemsIndex.TEXTFIELD]: itemTypes.TEXTFIELD,
  [SidebarItemsIndex.RADIO]: itemTypes.RADIO,
  [SidebarItemsIndex.GROUP]: itemTypes.GROUP,
};
