import React from 'react';

export default function SidebarItem({ title, Icon, isDragging }) {
  return (
    <div className='flex flex-col p-2 justify-center items-center'>
      {Icon}
      <div>{title}</div>
    </div>
  );
}
