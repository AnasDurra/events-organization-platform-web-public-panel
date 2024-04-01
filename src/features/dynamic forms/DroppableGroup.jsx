import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import FormTextField from './FormTextField';
import FormRadio from './FormRadio';
import { itemTypes } from './constants';

export default function DroppableGroup({
  groupId,
  fields,
  selectedField,
  onSelectField,
}) {
  const [hoveredField, setHoveredField] = useState(false);

  const handleFieldHover = (field) => {
    setHoveredField(field);
  };

  const handleClickField = (field) => {
    onSelectField(field);
  };
  return (
    <div className=' w-full bg-gray-200 p-2 my-2 '>
      <Title level={5}> Group {groupId}</Title>
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
                      opacity:
                        selectedField?.id !== field.id && selectedField
                          ? 0.5
                          : 1,
                    }}
                    className={
                      'relative bg-white my-2 ' +
                      (selectedField?.id === field.id
                        ? 'border-2 border-blue-500'
                        : '')
                    }
                    onClick={() => handleClickField(field)}
                    onMouseEnter={() => handleFieldHover(field.id)}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    {field.type === itemTypes.TEXTFIELD ? (
                      <FormTextField isDragging={snapshot.isDragging} />
                    ) : field.type === itemTypes.RADIO ? (
                      <FormRadio isDragging={snapshot.isDragging} />
                    ) : null}

                    {hoveredField === field.id && (
                      <div className='absolute top-0 left-0 bg-blue-500 bg-opacity-50 text-gray-800 p-2 w-full h-full flex justify-center items-center cursor-pointer'>
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
