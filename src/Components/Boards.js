import React, { useState } from 'react'
import { columnsArray, cardArray } from '../data'
import { closestCorners, DndContext, DragOverlay, useDroppable } from '@dnd-kit/core';
import Columns from './Columns';
import { arrayMove } from '@dnd-kit/sortable';
import Card from './Card';

const Boards = () => {

  /**
   * Hook: set the card array
   */
  const [cards, setCards] = useState(cardArray);
 

  /**
   * Function: returns the array to which the element belongs
   * @Params: element
   * @Returns: array [int]
   */
  const findColumn = (id) => {
    //If item is dropped in some other area
    if(!id){
      return null;
    }

    //If item is dropped over a column
    if(cards.some((c) => c.id == id)){
      return cards.find((c) => c.id == id)
    }

    //Create a flatmap like {card.id, column.id} from the cards
    const itemWithColumnId = cards.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({itemId: i.id, columnId: columnId}));
    })

    //find the record with matching item id, return column id
    console.log(itemWithColumnId);
    const columnId = itemWithColumnId.find((i) => i.itemId == id);
    return cards.find((c) => c.id == columnId.columnId)
  }

  /**
   * Function: handles end of dragging action currently for vertical sorting
   * @Params: Drag end event
   */
  const handleDragEnd = (event) => {
    const {active, over} = event;
    
    //Find active and over column
    const activeColumn = findColumn(active.id);
    const overColumn = over ? findColumn(over.id) : null;

    //If the element is dropped over the same column, 
    //find old & new index of the element
    if(activeColumn && overColumn && activeColumn.id === overColumn.id){
      const oldIndex = activeColumn.cards.findIndex((c) => c.id == active.id);
      const newIndex = activeColumn.cards.findIndex((c) => c.id == over.id);

      //Return the new column structure
      setCards((activeCards) => {
        return activeCards.map((column) => {
          //If the active column id matches the column id
          if(column.id == activeColumn.id){
            column.cards = arrayMove(activeColumn.cards, oldIndex, newIndex);
            return column;
          }
          else{
            return column;
          }
        })
      })
    }
  }


  /**
   * Function: handles dragging action, determines if card moved to another container
   * @Params: Drag end event
   */
  const handleDragOver = (event) => {
    const {active, over, delta} = event;

    const activeColumn = findColumn(active.id);
    const overColumn = over ? findColumn(over.id) : null;

    if(!activeColumn || !overColumn || activeColumn == overColumn){
      return null;
    }
    
    //If card is moved to a different column
    //Insert a new card temporarily
    setCards((prevState) => {
      const activeCards = activeColumn.cards;
      const overCards = overColumn.cards;

      const activeIndex = activeCards.findIndex((c) => c.id == active.id);
      const overIndex = activeCards.findIndex((c) => c.id == over.id);

      //If item is placed below last item
      const newIndex = () => {
        const putBelowLastItem = overIndex == overCards.length -1 && delta.y > 0;
        const modifier = putBelowLastItem ? 1: 0;
        return overIndex >= 0 ? overIndex + modifier : overCards.length + 1;
      }

      return(prevState.map((c) => {
        //Remove the active card from the active column
        if(c.id == activeColumn.id){
          c.cards = activeCards.filter((card) => card.id != active.id);
          return c;
        }
        //Place the active card in the over column
        else if(c.id == overColumn.id){
          c.cards = [...overCards.slice(0, newIndex()), activeCards[activeIndex], ...overCards.slice(newIndex(), overCards.length)];
          return c;
        }
        //Return cards as is
        else{
          return c;
        }
      }))
    });
  }


  return (
    // Start of the content for drag and drop
    // Place columns
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