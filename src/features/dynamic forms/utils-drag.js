import { SidebarItemsTypeByID, itemTypes } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const handleReorderGroupItems = (currentGroups, source, destination) => {
    return currentGroups.map((group) => {
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
    });
};

export const handleReorderGroups = (currentGroups, source, destination) => {
    const newGroups = [...currentGroups];
    newGroups.splice(source.index, 1);
    newGroups.splice(destination.index, 0, currentGroups[source.index]);
    return newGroups;
};

export const handleSidebarToGroup = (currentGroups, source, destination) => {
    const itemType = SidebarItemsTypeByID[source.index];
    if (itemType === itemTypes.GROUP) {
        const newGroups = [...currentGroups];
        newGroups.splice(destination.index, 0, { id: uuidv4(), fields: [] });
        return newGroups;
    } else
        return currentGroups.map((group) => {
            if (destination.droppableId === group.id) {
                const newFields = [...group.fields];
                newFields.splice(destination.index, 0, {
                    type: itemType,
                    id: uuidv4(),
                });
                return {
                    ...group,
                    fields: newFields,
                };
            } else return group;
        });
};

export const handleMoveItemFromGroupToAnotherGroup = (currentGroups, source, destination) => {
    let newGroups = [...currentGroups];

    const sourceGroup = newGroups.find((group) => group.id === source.droppableId);
    const destinationGroup = newGroups.find((group) => group.id === destination.droppableId);

    const removedItem = sourceGroup.fields.splice(source.index, 1)[0];

    destinationGroup.fields.splice(destination.index, 0, removedItem);

    return newGroups;
};

export const onDragEnd = (result, currentGroups) => {
    const { source, destination, type } = result;

    console.log(result);
    if (!destination) {
        return;
    } else if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
    } else if ((destination.droppableId === source.droppableId) & (type === 'group-item')) {
        console.log('same droppable / group-item');

        return handleReorderGroupItems(currentGroups, source, destination);
    } else if ((destination.droppableId === source.droppableId) & (type === 'group')) {
        console.log('same droppable / group');

        return handleReorderGroups(currentGroups, source, destination);
    } else if (
        destination.droppableId !== source.droppableId &&
        currentGroups.some((group) => group.id === source.droppableId)
    ) {
        console.log('group to group');

        return handleMoveItemFromGroupToAnotherGroup(currentGroups, source, destination);
    } else if (destination.droppableId !== source.droppableId && (type === 'group-item' || type === 'group')) {
        console.log('sidebar to group');
        return handleSidebarToGroup(currentGroups, source, destination);
    } else return;
};
