import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import DroppableGroup from './DroppableGroup';
import Sidebar from './Sidebar';
import { SidebarItemsTypeByIndex, itemTypes } from './constants';
import initialData from './initial-state';
import PropertiesSidebar from './PropertiesSidebar';
import Header from '../../components/Header';

const handleReorderGroupItems = (prevGroups, source, destination) => {
    return prevGroups.map((group) => {
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

const handleReorderGroups = (prevGroups, source, destination) => {
    const newGroups = [...prevGroups];
    newGroups.splice(source.index, 1);
    newGroups.splice(destination.index, 0, prevGroups[source.index]);
    return newGroups;
};

const handleSidebarToGroup = (prevGroups, source, destination) => {
    const itemType = SidebarItemsTypeByIndex[source.index];
    if (itemType === itemTypes.GROUP) {
        const newGroups = [...prevGroups];
        newGroups.splice(destination.index, 0, { id: uuidv4(), fields: [] });
        return newGroups;
    } else
        return prevGroups.map((group) => {
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

const handleMoveItemFromGroupToAnotherGroup = (prevGroups, source, destination) => {
    let newGroups = [...prevGroups];

    const sourceGroup = newGroups.find((group) => group.id === source.droppableId);
    const destinationGroup = newGroups.find((group) => group.id === destination.droppableId);

    const removedItem = sourceGroup.fields.splice(source.index, 1)[0];

    destinationGroup.fields.splice(destination.index, 0, removedItem);

    return newGroups;
};

export default function EditFormPage() {
    const [groups, setGroups] = useState(initialData);
    const [selectedField, setSelectedField] = useState(null);

    const handleSelectField = (field) => {
        setSelectedField((prevSelectedField) =>
            prevSelectedField && prevSelectedField.id === field.id ? null : field
        );
    };

    const handleUpdateFieldProperties = (updatedProperties) => {
        setGroups(
            groups.map((group) => ({
                ...group,
                fields: group.fields.map((field) => {
                    if (field.id === selectedField.id) {
                        return { ...field, properties: updatedProperties };
                    }
                    return field;
                }),
            }))
        );
    };

    return (
        <DragDropContext
            onDragEnd={(result) => {
                const { source, destination, type } = result;

                console.log(result);
                if (!destination) {
                    return;
                }

                if (destination.droppableId === source.droppableId && destination.index === source.index) {
                    return;
                }

                if ((destination.droppableId === source.droppableId) & (type === 'group-item')) {
                    console.log('same droppable / group-item');
                    setGroups((prevGroups) => {
                        return handleReorderGroupItems(prevGroups, source, destination);
                    });
                }

                if ((destination.droppableId === source.droppableId) & (type === 'group')) {
                    console.log('same droppable / group');
                    setGroups((prevGroups) => {
                        return handleReorderGroups(prevGroups, source, destination);
                    });
                }

                if (
                    (destination.droppableId !== source.droppableId && source.droppableId === 'sidebar-items') ||
                    source.droppableId === 'sidebar-item-group'
                ) {
                    console.log('sidebar to group');
                    setGroups((prevGroups) => {
                        return handleSidebarToGroup(prevGroups, source, destination);
                    });
                }

                if (
                    destination.droppableId !== source.droppableId &&
                    groups.some((group) => group.id === source.droppableId)
                ) {
                    console.log('group to group');
                    setGroups((prevGroups) => {
                        return handleMoveItemFromGroupToAnotherGroup(prevGroups, source, destination);
                    });
                }
            }}
        >
            <div className='grid grid-cols-6 gap-2 mx-auto'>
                <div className='col-start-2 col-span-3 h-[90vh] my-2  p-2 w-full bg-slate-400 overflow-y-auto'>
                    <Droppable
                        droppableId={'base-form'}
                        type='group'
                    >
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {groups.map((group, index) => (
                                    <Draggable
                                        key={'draggable' + group.id}
                                        draggableId={group.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{ ...provided.draggableProps.style }}
                                                ref={provided.innerRef}
                                            >
                                                <DroppableGroup
                                                    key={group.id}
                                                    groupId={group.id}
                                                    fields={group.fields}
                                                    selectedField={selectedField}
                                                    onSelectField={handleSelectField}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

                <div className=' col-start-6 col-span-1 sticky top-0'>
                    {selectedField ? (
                        <PropertiesSidebar
                            field={selectedField}
                            onUpdateProperties={handleUpdateFieldProperties}
                        />
                    ) : (
                        <Sidebar />
                    )}
                </div>
            </div>
        </DragDropContext>
    );
}
