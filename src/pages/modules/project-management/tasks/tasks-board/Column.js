import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDrop } from 'react-dnd'
import toast from 'react-hot-toast'
import { updateTask } from 'src/libs/modules/project-management/task'

const Column = props => {
  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (_, monitor) => {
      if (!props.hasTasks) {
        props.moveCard(monitor.getItem().cardId, 0, props.colIndex)

        // debugger
      }
    },
    drop: async (_, monitor) => {
      const { cardId } = _
      const { title: columnTitle } = props

      try {
        await updateTask(cardId, { status: columnTitle })

        toast.success('Task updated successfully')
      } catch (error) {
        toast.error('Task updated successfully')
      }
    }
  })

  return (
    <Grid item xs={12} md={3} ref={drop}>
      <Box p={4} bgcolor='#2c74b5' display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' color='white'>
          {props.title} ({props.totalColumn[props.colIndex].cardIds.length})
        </Typography>
      </Box>
      <Box px={4} border={2} borderColor='#2c74b5' sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
        {props.children}
      </Box>
    </Grid>
  )
}

export default Column
