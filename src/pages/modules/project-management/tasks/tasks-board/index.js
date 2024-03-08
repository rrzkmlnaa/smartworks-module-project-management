import { Card, CardContent, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Board from './Board'
import { fetchTask } from 'src/libs/modules/project-management/task'

const Kanban = () => {
  const [cards, setCards] = useState([])
  const [columns, setColumns] = useState([])

  function moveCard(cardId, indexInColumn, destColumnId) {
    const updatedColumns = columns.map(column => {
      const filteredColumnTasks = column.cardIds.filter(id => id !== cardId)
      let updatedTasks = []
      if (column.id === destColumnId) {
        updatedTasks = [
          ...filteredColumnTasks.slice(0, indexInColumn),
          cardId,
          ...filteredColumnTasks.slice(indexInColumn)
        ]
      } else {
        updatedTasks = [...filteredColumnTasks]
      }

      return { ...column, cardIds: updatedTasks }
    })

    setColumns(updatedColumns)
  }

  const getTasks = async () => {
    try {
      const tasks = await fetchTask({}, true)
      const initialCards = tasks.map(task => ({ id: task.id, ...task }))

      const initialColumns = ['new', 'in progress', 'completed', 'canceled'].map((title, i) => ({
        id: i,
        title,
        cardIds: initialCards.filter((_, index) => _.status === title).map(card => card.id)
      }))

      setCards(initialCards)
      setColumns(initialColumns)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <Card>
        <CardHeader title='Task Scrum Board' subheader='Task Kanban mode' />
        <CardContent>
          <DndProvider backend={HTML5Backend}>
            <Board cards={cards} columns={columns} moveCard={moveCard} />
          </DndProvider>
        </CardContent>
      </Card>
    </>
  )
}

Kanban.acl = {
  action: 'read',
  subject: 'own_task'
}

export default Kanban
