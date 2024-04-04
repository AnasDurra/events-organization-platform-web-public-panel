import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DroppableGroup from './DroppableGroup';
import PropertiesSidebar from './PropertiesSidebar';
import Sidebar from './Sidebar';
import initialData from './initial-state';
import { onDragEnd } from './utils-drag';
import './EditFormPage.css';
export default function EditFormPage() {
    const [groups, setGroups] = useState(initialData);
    const [selectedField, setSelectedField] = useState(null);

    const handleSelectField = (field) => {
        setSelectedField((prevSelectedField) =>
            prevSelectedField && prevSelectedField.id === field.id ? null : field
        );
    };

    const handleNameChange = (groupId, newName) => {
        setGroups(groups.map((group) => (group.id === groupId ? { ...group, name: newName } : group)));
    };

    const handleDescriptionChange = (groupId, newDescription) => {
        setGroups(groups.map((group) => (group.id === groupId ? { ...group, description: newDescription } : group)));
    };

    const handleUpdateProperties = (updatedField) => {
        setGroups((groups) =>
            groups.map((group) => ({
                ...group,
                fields: group.fields.map((field) => {
                    if (field.id === selectedField.id) {
                        return updatedField;
                    }
                    return field;
                }),
            }))
        );

        setSelectedField(updatedField);
    };

    return (
        <DragDropContext
            onDragEnd={(result) => {
                const newGroups = onDragEnd(result, groups);
                console.log('new groups', newGroups);
                if (newGroups) setGroups(newGroups);
            }}
        >
            <div className='grid grid-cols-6 gap-2 mx-auto'>
                <div className='custom-scrollbar col-start-2 col-span-3 h-[90vh] my-2  p-2 w-full bg-slate-400 bg-transparent overflow-y-auto'>
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
                                                    index={index}
                                                    fields={group.fields}
                                                    selectedField={selectedField}
                                                    onSelectField={handleSelectField}
                                                    onNameChange={handleNameChange}
                                                    onDescriptionChange={handleDescriptionChange}
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
                <div className=' col-start-6 col-span-1 sticky top-0 bg-gray-50'>
                    {selectedField ? (
                        <PropertiesSidebar
                            field={selectedField}
                            onUpdateProperties={handleUpdateProperties}
                        />
                    ) : (
                        <Sidebar />
                    )}
                </div>
            </div>
        </DragDropContext>
    );
}
