import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import DialogAddProject from './DialogAddProject'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'

const TableHeaderMember = props => {
  // ** Props
  const { handleFilter, value } = props

  // ** States
  const [showRequestDialog, setShowRequestDialog] = useState(false)

  return (
    <>
      <Box
        sx={{
          py: 4,
          px: 0,
          rowGap: 2,
          columnGap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Button color='secondary' variant='tonal' startIcon={<Icon icon='tabler:upload' />}>
          Export
        </Button>
        <Box display='flex'>
          <CustomTextField
            value={value}
            sx={{ mr: 4, width: '55%' }}
            placeholder='Search Member'
            onChange={e => handleFilter(e.target.value)}
          />
          <Button
            onClick={() => setShowRequestDialog(true)}
            color='primary'
            variant='contained'
            startIcon={<Icon icon='tabler:file-plus' />}
            sx={{ width: '45%' }}
          >
            Add Member
          </Button>
        </Box>
      </Box>
      <DialogAddProject open={showRequestDialog} setOpen={setShowRequestDialog} />
    </>
  )
}

export default TableHeaderMember
