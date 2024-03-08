import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const CardComponent = ({ id, columnIndex, cardIndex, title, moveCard, isSpacer, columnId, columnTitle }) => {
  const [, drag, preview] = useDrag({
    type: 'CARD',
    item: {
      cardId: id,
      columnIndex,
      cardIndex,
      title,
      columnId,
      columnTitle
    }
  })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (_, monitor) => {
      moveCard(monitor.getItem().cardId, cardIndex, columnId)
    }
  })

  const ref = useRef(null)
  drag(drop(ref))

  return (
    <Box ref={preview} sx={{ cursor: 'move' }}>
      <Box ref={ref} sx={{ my: 3 }}>
        <Card sx={{ borderLeft: 2, borderBottom: 1, borderColor: '#2d6aa4' }}>
          <CardContent>
            <Typography variant='h6' noWrap>
              {title}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default CardComponent
