import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { CiText } from 'react-icons/ci';
import { MdRadioButtonChecked } from 'react-icons/md';
import SidebarItem from './SidebarItem';
import Title from 'antd/es/typography/Title';
import { RxGroup } from 'react-icons/rx';
import { BsCalendarDate } from 'react-icons/bs';
import { GoNumber } from 'react-icons/go';
import { SidebarItemsIDs } from '../constants';
import { Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default function Sidebar() {
    return (
        <div className='flex flex-col  items-center w-full  h-full'>
            <Divider>
                <Title level={4}>Elements</Title>
            </Divider>

            <Droppable
                droppableId='dummy-droppable'
                key='dummy-droppable'
                isDropDisabled={true}
            >
                {(provided, snapshot) => (
                    <div
                        className='w-full'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <SidebarItemWithDrag
                            title='Text field'
                            icon={<CiText />}
                            id={SidebarItemsIDs.TEXTFIELD}
                        />
                        <SidebarItemWithDrag
                            title='Number'
                            icon={<GoNumber />}
                            id={SidebarItemsIDs.NUMBER}
                        />
                        <SidebarItemWithDrag
                            title='Date'
                            icon={<BsCalendarDate />}
                            id={SidebarItemsIDs.DATE}
                        />
                        <SidebarItemWithDrag
                            title='Radio'
                            icon={<MdRadioButtonChecked />}
                            id={SidebarItemsIDs.RADIO}
                        />

                        <SidebarItemWithDrag
                            title='Group'
                            icon={<RxGroup />}
                            id={SidebarItemsIDs.GROUP}
                        />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

function SidebarItemWithDrag({ title, icon, id }) {
    return (
        <Droppable
            droppableId={`sidebar-item-${title}`}
            key={`sidebar-item-${title}`}
            type={id == SidebarItemsIDs.GROUP ? 'group' : 'group-item'}
            isDropDisabled={true}
        >
            {(provided, snapshot) => (
                <div
                    className='w-full'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <Draggable
                        key={`draggable-new-${title}`}
                        draggableId={`draggable-new-${title}`}
                        index={id}
                    >
                        {(provided, snapshot) => (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ ...provided.draggableProps.style }}
                                ref={provided.innerRef}
                            >
                                <SidebarItem
                                    title={title}
                                    Icon={icon}
                                />
                            </div>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
