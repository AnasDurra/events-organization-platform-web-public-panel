import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { CiText } from 'react-icons/ci';
import { MdRadioButtonChecked } from 'react-icons/md';
import SidebarItem from './SidebarItem';
import { SidebarItemsIndex } from './constants';
import Title from 'antd/es/typography/Title';

export default function Sidebar() {
  return (
    <div className='flex flex-col  items-center w-full bg-gray-50 h-full'>
      <Title level={3} className='mt-4'>Elements</Title>

      <Droppable
        droppableId='sidebar-items'
        key='sidebar-items'
        type='group-item'
        isDropDisabled={true}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='text-sm'
          >
            <Draggable
              key={'draggable-textField'}
              draggableId={'draggable-textField'}
              index={SidebarItemsIndex.TEXTFIELD}
            >
              {(provided, snapshot) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                  ref={provided.innerRef}
                >
                  <SidebarItem
                    title={'text field'}
                    Icon={<CiText />}
                  />
                </div>
              )}
            </Draggable>

            <Draggable
              key={'draggable-radio'}
              draggableId={'draggable-radio'}
              index={SidebarItemsIndex.RADIO}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{ ...provided.draggableProps.style }}
                  ref={provided.innerRef}
                >
                  <SidebarItem
                    title={'radio'}
                    Icon={<MdRadioButtonChecked />}
                  />
                </div>
              )}
            </Draggable>

            {provided.placeholder}

            <Droppable
              droppableId='sidebar-item-group'
              key='sidebar-item-group'
              type='group'
              isDropDisabled={true}
            >
              {(provided, snapshot) => (
                <div
                  className='w-full'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Draggable
                    key={'draggable-new-group'}
                    draggableId={'draggable-new-group'}
                    index={SidebarItemsIndex.GROUP}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                        }}
                        ref={provided.innerRef}
                      >
                        <SidebarItem
                          title={'Group'}
                          Icon={<CiText />}
                        />
                      </div>
                    )}
                  </Draggable>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Droppable>
    </div>
  );
}
