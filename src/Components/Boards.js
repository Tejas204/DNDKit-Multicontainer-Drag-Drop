import React, { useState } from 'react'
import { cardsArray_1, cardsArray_2, columnsArray } from '../data'
import { closestCorners, DndContext, useDroppable } from '@dnd-kit/core';
import Columns from './Columns';
import { arrayMove } from '@dnd-kit/sortable';

const Boards = () => {

  /**
   * Hook: set the card array
   */
  const [cards_1, setCards_1] = useState(cardsArray_1.cards_1);
  const [cards_2, setCards_2] = useState(cardsArray_2.cards_2);
  const [columns, setColumns] = useState(columnsArray);

  /**
   * Function: handles end of dragging action
   */
  const handleDragEnd = (event) => {
    const {active, over} = event;
    console.log(active.data.current.type.sortable.containerId);
    console.log("Over: "+over.data.current.type);

    // if(active.id && over.data.current.accepts.includes(active.data.current.type)){
    //   // setCards_2([...cards_2, {id:100, name: "Card"}])
    // }
  }

  const handleDragOver = (event) => {
    const {active, over} = event;
    console.log(active);
    console.log(over);
  }


  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} onDragOver={handleDragOver}>
      <div className='flex flex-row p-8 gap-x-10 justify-center items-center'>
        {
          columns.map((column) => {
            if(column.id == 1){
              return(
                <Columns id={column.id} name={column.name} cards={cards_1} key={column.id}></Columns>
              )
            }
            else if(column.id == 2){
              return(
                <Columns id={column.id} name={column.name} cards={cards_2} key={column.id}></Columns>
              )
            }
            
          })
          
        }
        {/* <Columns id={1} name={"Column 1"} cards={cards_1}></Columns>
        <Columns id={2} name={"Column 2"} cards={cards_2}></Columns> */}
      </div>
    </DndContext>
  )
}

export default Boards