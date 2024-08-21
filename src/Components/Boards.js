import React, { useState } from 'react'
import { cardsArray_1, cardsArray_2, columnsArray, cardsArray } from '../data'
import { closestCorners, DndContext, useDroppable } from '@dnd-kit/core';
import Columns from './Columns';
import { arrayMove } from '@dnd-kit/sortable';

const Boards = () => {

  /**
   * Hook: set the card array
   */
  const [cards, setCards_1] = useState(cardsArray);
  //const [cards_2, setCards_2] = useState(cardsArray.cards_2);
  const [columns, setColumns] = useState(columnsArray);

  /**
   * Function: check if item is moved to different column
   */
  const checkDifferentColumn = (cardValues, id) => {
    cardValues.map((cardValue) => {
      cardValue.map((cardVal) => {
        if(id === cardVal["id"]){
          return true;
        }
      })
    })
  }

  /**
   * Function: handles end of dragging action
   */
  const handleDragEnd = (event) => {
    const {active, over} = event;
    console.log("Over: "+over.data.current.type);

    // if(active.id && over.data.current.accepts.includes(active.data.current.type)){
    //   // setCards_2([...cards_2, {id:100, name: "Card"}])
    // }
  }

  const handleDragOver = (event) => {
    const {active, over} = event;
    console.log(active);
    console.log(over)
    
    
    //Fetch the column Id of over
    var cardKeys = Object.values(cards.cards_1);
    cardKeys.map((cardKey) => {
      console.log(cardKey["id"]);
    })
    
    console.log(cardKeys);
    //console.log(cardValues[1][0]['name']);
  }


  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} onDragOver={handleDragOver}>
      <div className='flex flex-row p-8 gap-x-10 justify-center items-center'>
        {
          columns.map((column) => {
            if(column.id == 1){
              return(
                <Columns id={column.id} name={column.name} cards={cards.cards_1} key={column.id}></Columns>
              )
            }
            else if(column.id == 2){
              return(
                <Columns id={column.id} name={column.name} cards={cards.cards_2} key={column.id}></Columns>
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