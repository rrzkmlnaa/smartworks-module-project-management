import React from 'react'
import Column from './Column'
import Card from './Card'
import { Grid } from '@mui/material'

const Board = ({ cards, columns, moveCard, addCard, addColumn }) => {
  return (
    <Grid container spacing={3}>
      {columns.map((column, colIndex) => (
        <Column
          key={column.id}
          title={column.title}
          colIndex={colIndex}
          moveCard={moveCard}
          hasTasks={column.cardIds.length > 0}
          totalColumn={columns}
        >
          {column.cardIds
            .map(cardId => cards.find(card => card.id === cardId))
            .map((card, index) => {
              return (
                <Card
                  key={card?.id}
                  id={card?.id}
                  columnIndex={colIndex}
                  columnId={column.id}
                  columnTitle={column.title}
                  cardIndex={index}
                  title={card?.name}
                  moveCard={moveCard}
                />
              )
            })}
          {column.cardIds.length === 0 && <Card key={'efc37989-1ef7-4db1-a019-b41867e3b208'} isSpacer />}
        </Column>
      ))}
    </Grid>
  )
}

export default Board
