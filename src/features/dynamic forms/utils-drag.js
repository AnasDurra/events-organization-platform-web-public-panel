import { SidebarItemsIDs, SidebarItemsTypeByID, itemTypes } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const handleReorderGroupItems = ({ form_id, currentGroups, source, destination, updateGroupField }) => {
    /*  return currentGroups.map((group) => {
        if (destination.droppableId === group.id) {
            const newFields = [...group.fields];

            newFields.splice(source.index, 1);
            newFields.splice(destination.index, 0, group.fields[source.index]);

            return {
                ...group,
                fields: newFields,
            };
        } else {
            return group;
        }
    }); */

    const sourceGroupIndex = source.droppableId.split('-')[2];
    updateGroupField({
        fields: {
            field_id: currentGroups[sourceGroupIndex].fields[source.index].id,
            position: destination.index + 1,
        },
        form_id,
        isNewPosition: true,
    });
};

export const handleReorderGroups = ({ form_id, currentGroups, source, destination, updateGroup }) => {
    /*  const newGroups = [...currentGroups];
    newGroups.splice(source.index, 1);
    newGroups.splice(destination.index, 0, currentGroups[source.index]);
    return newGroups; */
    updateGroup({
        fields: { position: destination.index + 1 },
        group_id: currentGroups[source.index].id,
        isNewPosition: true,
        form_id,
    });
};

export const handleSidebarToForm = ({ form_id, currentGroups, source, destination, addNewField, addNewGroup }) => {
    const itemType = SidebarItemsTypeByID[source.index];
    if (itemType === itemTypes.GROUP) {
        console.log(source);
        console.log(destination);

        addNewGroup({
            form_id,
            name: `group ${currentGroups?.length ? currentGroups.length + 1 : uuidv4()}`,
            position: destination.index + 1,
            fields: [],
        });

        /* const newGroups = [...currentGroups];
        newGroups.splice(destination.index, 0, { id: uuidv4(), fields: [] });
        return newGroups; */
    } else {
        let options = [];

        if (source.index === SidebarItemsIDs.RADIO) {
            options = [{ name: 'default 1' }, { name: 'default 2' }];
        }
        const destinationGroupIndex = destination.droppableId.split('-')[2];

        addNewField({
            group_id: currentGroups[destinationGroupIndex].id,
            fields: {
                type_id: source.index,
                position: destination.index + 1,
                required: false,
                name: 'deafult name',
                label: 'default label',
                ...(source.index === SidebarItemsIDs.RADIO && { options }),
            },
            form_id,
        });
    }
};

export const handleMoveItemFromGroupToAnotherGroup = ({ currentGroups, source, destination, updateGroupField }) => {
    /*  let newGroups = [...currentGroups];

    const sourceGroup = newGroups.find((group) => group.id === source.droppableId);
    const destinationGroup = newGroups.find((group) => group.id === destination.droppableId);

    const removedItem = sourceGroup.fields.splice(source.index, 1)[0];

    destinationGroup.fields.splice(destination.index, 0, removedItem);

    return newGroups; */

    console.log('src: ', source);
    console.log('dest: ', destination);

    const sourceGroupIndex = source.droppableId.split('-')[2];
    const destinationGroupIndex = destination.droppableId.split('-')[2];

    updateGroupField({
        field_id: currentGroups[sourceGroupIndex].fields[source.index].id,
        position: destination.index + 1,
        group_id: currentGroups[destinationGroupIndex].id,
    });
};

export const onDragEnd = ({
    result,
    form_id,
    currentGroups,
    addNewField,
    addNewGroup,
    updateGroup,
    updateGroupField,
}) => {
    const { source, destination, type } = result;

    console.log(result);
    const sourceGroupIndex = source.droppableId.split('-')[2];

    if (!destination) {
        return;
    } else if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
    } else if (destination.droppableId === source.droppableId && type === 'group-item') {
        console.log('same droppable / group-item');

        return handleReorderGroupItems({ form_id, currentGroups, source, destination, updateGroupField });
    } else if (destination.droppableId === source.droppableId && type === 'group') {
        console.log('same droppable / group');

        return handleReorderGroups({ form_id, currentGroups, source, destination, updateGroup });
    } else if (destination.droppableId !== source.droppableId && currentGroups[sourceGroupIndex] !== undefined) {
        console.log('group to group');
        return handleMoveItemFromGroupToAnotherGroup({ currentGroups, source, destination, updateGroupField });
    } else if (destination.droppableId !== source.droppableId && (type === 'group-item' || type === 'group')) {
        console.log('sidebar to group');
        return handleSidebarToForm({ currentGroups, source, destination, addNewField, addNewGroup, form_id });
    } else return;
};
