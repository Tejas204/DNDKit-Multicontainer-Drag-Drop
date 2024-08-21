import React from 'react'
import Card from './Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { type } from '@testing-library/user-event/dist/type';

const Columns = ({id, name, cards}) => {
    /**
     * Hook: set droppable context
     */
    const {setNodeRef} = useDroppable({
        id: id,
        data: {
            type: 'column',
            accepts: ['card'],
        },
    });


  return (
    <div className='p-10 w-1/4 h-screen border-2'>
        <p className='text-3xl font-bold text-center'>
            {name}
        </p>
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
            <div className='flex flex-col gap-y-5 p-6' ref={setNodeRef}>
            {
                cards.map((card) => {
                    return(
                        <Card className='p-4 w-[100%] border-2 bg-slate-400 text-white text-2xl font-normal' key={card.id} id={card.id} name={card.name}></Card>
                    )
                })
            }
            </div>
        </SortableContext>
    </div>
  )
}

export default Columns