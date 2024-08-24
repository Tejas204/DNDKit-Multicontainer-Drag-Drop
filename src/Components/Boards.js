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
  const findColumn = (id) => {
    if(!id){
      return null;
    }

    if(cards.some((c) => c.id == id)){
      return cards.find((c) => c.id == id)
    }

    const itemWithColumnId = cards.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({itemId: i.id, columnId: columnId}));
    })

    console.log(itemWithColumnId)

    const columnId = itemWithColumnId.find((i) => i.itemId == id);
    console.log(columnId)
    return cards.find((c) => c.id == columnId.columnId)
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

    const activeColumn = findColumn(active.id);
    const overColumn = over ? findColumn(over.id) : null;
    console.log(activeColumn, overColumn)
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