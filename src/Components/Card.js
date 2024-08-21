import React from 'react'
import { cardsArray } from '../data'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable, useDroppable } from '@dnd-kit/core';

const Card = ({id, name}) => {

  /**
   * Hook: set cards as sortable
   */
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: id,
    data:{
        type: 'card',
    }
    });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='p-4 w-[100%] border-2 bg-slate-400 text-white text-2xl font-normal'>{name}</div>
  )
}

export default Card