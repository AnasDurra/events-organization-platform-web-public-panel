import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import FormTextField from './FormTextField';
import FormRadio from './FormRadio';
import { itemTypes } from './constants';
import { Badge, Divider, Form, Input, Space, Tooltip } from 'antd';
import FormTextFieldOverview from './fields overview/FormTextFieldOverview';
import FormRadioOverview from './fields overview/FormRadioOverview';
import FormDateOverview from './fields overview/FormDateOverview';
import FormNumberOverview from './fields overview/FormNumberOverview';

export default function DroppableGroup({
    groupId,
    fields,
    selectedField,
    onSelectField,
    index,
    onNameChange,
    onDescriptionChange,
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
        onNameChange(groupId, newName);
    };

    const handleDescriptionInputChange = (e) => {
        const newDescription = e.target.value;
        onDescriptionChange(groupId, newDescription);
    };

    return (
        <div className='w-full bg-gray-50 bg-slate-100 p-2 my-2 rounded-lg relative'>
            <Divider>Group</Divider>
            <Space.Compact
                align={'center'}
                className='w-full px-4'
            >
                <Title
                    level={5}
                    className='w-[20%] text-left'
                >
                    name
                </Title>
                <Input
                    bordered={true}
                    className='bg-gray-50 w-[40%]'
                    placeholder='group name'
                    onChange={handleNameInputChange}
                />
            </Space.Compact>

            <Space.Compact
                align={'center'}
                className='w-full px-4'
            >
                <Title
                    level={5}
                    className='w-[20%] text-left'
                >
                    description
                </Title>
                <Input
                    className='bg-gray-50 w-[40%]'
                    placeholder='group description'
                    onChange={handleDescriptionInputChange}
                />
            </Space.Compact>

            <Divider> Fields</Divider>

            <Droppable
                droppableId={groupId}
                type='group-item'
            >
                {(provided, snapshot) => (
                    <div
                        className='h-full w-full p-2'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {fields.map((field, index) => (
                            <Draggable
                                draggableId={field.id}
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
                                            (selectedField?.id === field.id ? 'border-2 border-blue-500' : '')
                                        }
                                        onClick={() => handleClickField(field)}
                                        onMouseEnter={() => handleFieldHover(field.id)}
                                        onMouseLeave={() => setHoveredField(null)}
                                    >
                                        {field.type === itemTypes.TEXTFIELD ? (
                                            <FormTextFieldOverview
                                                field={field}
                                                isDragging={snapshot.isDragging}
                                            />
                                        ) : field.type === itemTypes.RADIO ? (
                                            <FormRadioOverview
                                                field={field}
                                                isDragging={snapshot.isDragging}
                                            />
                                        ) : field.type === itemTypes.DATE ? (
                                            <FormDateOverview
                                                field={field}
                                                isDragging={snapshot.isDragging}
                                            />
                                        ) : field.type === itemTypes.NUMBER ? (
                                            <FormNumberOverview
                                                field={field}
                                                isDragging={snapshot.isDragging}
                                            />
                                        ) : null}

                                        {hoveredField === field.id && (
                                            <div className='absolute top-0 left-0 bg-pink-950	 bg-opacity-30 text-gray-800 py-2 w-full h-[50%] flex justify-center items-center cursor-pointer'>
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
