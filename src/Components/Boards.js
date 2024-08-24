import React, { useState } from 'react'
import { columnsArray, cardArray } from '../data'
import { closestCorners, DndContext, useDroppable } from '@dnd-kit/core';
import Columns from './Columns';
import { arrayMove } from '@dnd-kit/sortable';

const Boards = () => {

  /**
   * Hook: set the card array
   */
  const [cards, setCards] = useState(cardArray);
  const [columns, setColumns] = useState(columnsArray);

  /**
   * Function: returns the array to which the element belongs
   * @Params: element
   * @Returns: array [int]
   */
  const findColumn = (element) => {
    return element.data.current.sortable.items;
  }

  /**
   * Function: handles end of dragging action currently for vertical sorting
   * @Params: Drag end event
   */
  const handleDragEnd = (event) => {
    const {active, over} = event;
    console.log(active);
    console.log(over);
  }

  const handleDragOver = (event) => {
    const {active, over} = event;
  }


  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} onDragOver={handleDragOver}>
      <div className='flex flex-row p-8 gap-x-10 justify-center items-center'>
        {
          cards.map((column) => {
            return(
              <Columns id={column.id} name={column.name} cards={column.cards} key={column.id}></Columns>
            )
          })
        }
      </div>
    </DndContext>
  )
}

export default Boards