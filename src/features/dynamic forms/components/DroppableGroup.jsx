import { Divider, Form, Input, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IoMdClose } from 'react-icons/io';
import { SidebarItemsIDs } from '../constants';
import FormDateOverview from '../fields overview/FormDateOverview';
import FormNumberOverview from '../fields overview/FormNumberOverview';
import FormRadioOverview from '../fields overview/FormRadioOverview';
import FormTextFieldOverview from '../fields overview/FormTextFieldOverview';

export default function DroppableGroup({
    groupIndex,
    group,
    selectedField,
    onSelectField,
    onNameChange,
    onDescriptionChange,
    onDelete,
}) {
    const [hoveredField, setHoveredField] = useState(false);

    const handleFieldHover = (field) => {
        setHoveredField(field);
    };

    const handleClickField = (field) => {
        onSelectField(field);
    };

    const handleNameInputChange = (e) => {
        const newName = e.target.value;
        onNameChange(group?.id, newName);
    };

    const handleDescriptionInputChange = (e) => {
        const newDescription = e.target.value;
        onDescriptionChange(group?.id, newDescription);
    };

    const handleDeleteGroup = () => {
        onDelete(group?.id);
    };

    return (
        <div className='w-full bg-gray-50 bg-slate-100 p-4 my-2 rounded-lg relative '>
            <Popconfirm
                title='Delete this group?'
                onConfirm={handleDeleteGroup}
                okText='Yes'
                cancelText='No'
                placement='bottom'
            >
                <IoMdClose className='absolute hover:cursor-default hover:text-red-600	' />
            </Popconfirm>

            <Divider>Group </Divider>

            <Form.Item
                name={['groups', groupIndex, 'name']}
                label={'name'}
            >
                <Input
                    bordered={true}
                    className='bg-gray-50'
                    placeholder='group name'
                    onChange={handleNameInputChange}
                />
            </Form.Item>

            <Form.Item
                name={['groups', groupIndex, 'description']}
                label={'description'}
            >
                <Input
                    className='bg-gray-50'
                    placeholder='group description'
                    onChange={handleDescriptionInputChange}
                />
            </Form.Item>

            <Divider> Fields</Divider>

            <Droppable
                droppableId={'droppable-group-' + groupIndex}
                type='group-item'
            >
                {(provided, snapshot) => (
                    <div
                        className='h-full w-full p-2'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {group?.fields?.map((field, index) => (
                            <Draggable
                                draggableId={'draggable-inner-group-field-' + field.id}
                                index={index}
                                key={field.id}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        style={{
                                            ...provided.draggableProps.style,
                                            opacity: selectedField?.id !== field.id && selectedField ? 0.5 : 1,
                                        }}
                                        className={
                                            'relative bg-white my-2 ' +
                                            (selectedField?.id === field.id
                                                ? 'border-8 border-slate-500 animate-pulse'
                                                : '')
                                        }
                                        onClick={() => handleClickField(field)}
                                        onMouseEnter={() => handleFieldHover(field.id)}
                                        onMouseLeave={() => setHoveredField(null)}
                                    >
                                        {field.fieldType?.id == SidebarItemsIDs.TEXTFIELD ? (
                                            <FormTextFieldOverview
                                                field={field}
                                                isDragging={snapshot.isDragging}
                                                fieldIndex={index}
                                                groupIndex={groupIndex}
                                            />
                                        ) : field.fieldType?.id == SidebarItemsIDs.RADIO ? (
                                            <FormRadioOverview
                                                field={field}
                                                isDragging={snapshot.isDragging}
                                                fieldIndex={index}
                                                groupIndex={groupIndex}
                                            />
                                        ) : field.fieldType?.id == SidebarItemsIDs.DATE ? (
                                            <FormDateOverview
                                                field={field}
                                                isDragging={snapshot.isDragging}
                                                fieldIndex={index}
                                                groupIndex={groupIndex}
                                            />
                                        ) : field.fieldType?.id == SidebarItemsIDs.NUMBER ? (
                                            <FormNumberOverview
                                                field={field}
                                                isDragging={snapshot.isDragging}
                                                fieldIndex={index}
                                                groupIndex={groupIndex}
                                            />
                                        ) : null}
                                        {hoveredField === field.id && (
                                            <div className='absolute top-0 left-0 bg-pink-950 bg-opacity-30 text-gray-800 py-2 w-full h-[50%] flex justify-center items-center cursor-pointer'>
                                                <span className='text-white font-semibold'>
                                                    {selectedField?.id === field.id
                                                        ? 'Click to unselect'
                                                        : 'Click to configure properties'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
