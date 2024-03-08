import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import DialogAddProject from '../projects/DialogAddProject'
import { ExportProjectsToXLSX } from 'src/exports'

const TableHeader = ({ handleFilter, value, getProjects, data }) => {
  const [showRequestDialog, setShowRequestDialog] = useState(false)

  const handleShowRequestDialog = () => setShowRequestDialog(true)

  const handleExport = () => ExportProjectsToXLSX(data)

  return (
    <>
      <Box
        sx={{
          py: 4,
          px: 6,
          rowGap: 2,
          columnGap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={handleExport} color='secondary' variant='tonal' startIcon={<Icon icon='tabler:upload' />}>
            Export
          </Button>
        </Box>
        <Box display='flex' gap={3}>
          <Box>
            <CustomTextField value={value} placeholder='Search Project' onChange={e => handleFilter(e.target.value)} />
          </Box>
          <Button
            onClick={handleShowRequestDialog}
            color='primary'
            variant='contained'
            startIcon={<Icon icon='tabler:file-plus' />}
          >
            Add Project
          </Button>
        </Box>
      </Box>
      <DialogAddProject open={showRequestDialog} setOpen={setShowRequestDialog} getProjects={getProjects} />
    </>
  )
}

export default TableHeader
