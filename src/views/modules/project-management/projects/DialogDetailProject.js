// ** React Imports
import { useState, forwardRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'

// ** Custom Component Import
import { Chip, Menu, MenuItem, Tab } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Helpers
import { formatDateISO, textCapitalize } from 'src/configs/helper'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { DataGrid } from '@mui/x-data-grid'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { getProjectDetail } from 'src/libs/modules/project-management/project'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const tabs = [
  {
    label: 'Overview',
    icon: 'tabler:home'
  },
  {
    label: 'Members',
    icon: 'tabler:users'
  },
  {
    label: 'Tasks',
    icon: 'tabler:list-check'
  },
  {
    label: 'Files',
    icon: 'tabler:files'
  },

  // {
  //   label: 'Discussions',
  //   icon: 'tabler:brand-wechat'
  // },
  {
    label: 'Notes',
    icon: 'tabler:file-pencil'
  }
]

const projectStatusObj = {
  new: 'secondary',
  'in progress': 'warning',
  completed: 'success',
  canceled: 'error'
}

const renderClient = row => {
  if (row.user.avatar) {
    return <CustomAvatar src={row.user.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color='primary'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.user.name)}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [showDialogDetailLeave, setShowDialogDetailLeave] = useState(false)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
    setShowDialogDetailLeave(true)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleRowOptionsClose}>
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
      </Menu>
    </>
  )
}

const memberColumns = [
  {
    flex: 0.25,
    minWidth: 220,
    field: 'name',
    headerName: 'Project Member',
    renderCell: ({ row }) => {
      const { name } = row.user

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href='/apps/user/view/account'
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              Jabatan, Department
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const taskColumns = [
  {
    flex: 0.25,
    minWidth: 220,
    field: 'name',
    headerName: 'Task Name',
    renderCell: ({ row }) => {
      const { name } = row

      return (
        <Typography
          noWrap
          component={Link}
          href='/apps/user/view/account'
          sx={{
            fontWeight: 500,
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {name}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const DialogDetailProject = props => {
  // ** Props
  const { open, setOpen, id } = props

  // ** States
  const handleClose = () => setOpen(false)
  const [project, setProject] = useState({})
  const [tab, setTab] = useState('Overview')
  const [message, setMessage] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  const getMemberId = row => row.user.id

  const fetchProjectDetail = useCallback(async () => {
    try {
      const res = await getProjectDetail(id)

      setProject(res)
    } catch (error) {
      console.log(error)
    }
  }, [id])

  useEffect(() => {
    fetchProjectDetail()
  }, [fetchProjectDetail])

  return (
    <Card>
      <Dialog
        fullWidth
        open={open}
        maxWidth='md'
        scroll='body'
        onClose={handleClose}
        TransitionComponent={Transition}
        onBackdropClick={handleClose}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent>
          <CustomCloseButton onClick={handleClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <TabContext value={tab}>
            <TabList variant='fullWidth' onChange={handleChange} aria-label='Detail Project'>
              {tabs.map((item, idx) => (
                <Tab value={item.label} label={item.label} icon={<Icon icon={item.icon} />} key={idx} />
              ))}
            </TabList>
            <TabPanel value='Overview'>
              <Grid container spacing={6}>
                <Grid item md={7}>
                  <Typography variant='h4' fontWeight={700}>
                    {project.name}
                  </Typography>
                  <Typography
                    variant='body1'
                    dangerouslySetInnerHTML={{
                      __html: project.description
                        ?.replace(/&lt;/g, '<')
                        ?.replace(/&gt;/g, '>')
                        ?.replace(/&quot;/g, '"')
                        ?.replace(/&#39;/g, "'")
                    }}
                  />
                </Grid>
                <Grid item md={5}>
                  <Box mb={4}>
                    <Button variant='contained' color='success' size='small'>
                      Mark as Completed
                    </Button>
                  </Box>
                  <table>
                    <tr>
                      <th>Status</th>
                      <td>
                        <span style={{ marginLeft: '5px', marginRight: '9px' }}>:</span>
                        <Chip
                          color={projectStatusObj[project.status]}
                          label={textCapitalize(project.status)}
                          size='small'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Start Date</th>
                      <td>
                        <span style={{ marginLeft: '5px', marginRight: '5px' }}>:</span>{' '}
                        {project.startDate ? formatDateISO(project.startDate) : '-'}
                      </td>
                    </tr>
                    <tr>
                      <th>Progress</th>
                      <td>
                        <span style={{ marginLeft: '5px', marginRight: '5px' }}>:</span> {project.progress ?? 0}%
                      </td>
                    </tr>
                    <tr>
                      <th>Due Date</th>
                      <td>
                        <span style={{ marginLeft: '5px', marginRight: '5px' }}>:</span>{' '}
                        {project.dueDate ? formatDateISO(project.dueDate) : '-'}
                      </td>
                    </tr>
                    <tr>
                      <th>Completed Date</th>
                      <td>
                        <span style={{ marginLeft: '5px', marginRight: '5px' }}>:</span>{' '}
                        {project.dateCompleted ? formatDateISO(project.dateCompleted) : '-'}
                      </td>
                    </tr>
                  </table>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='Members'>
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={project.people}
                columns={memberColumns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                getRowId={getMemberId}
              />
            </TabPanel>
            <TabPanel value='Tasks'>
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={project.tasks}
                columns={taskColumns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </TabPanel>
            <TabPanel value='Files'>Files</TabPanel>
            {/* <TabPanel value='Discussions'>
              <Box
                border={2}
                borderColor='#5d94c6'
                borderRadius={1}
                sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              >
                <Typography variant='h5' bgcolor='#5d94c6' color='white' p={3}>
                  Member Discussions
                </Typography>
                <Box
                  p={3}
                  bgcolor='#80808040'
                  display='flex'
                  flexDirection='column'
                  gap={4}
                  maxHeight='420px'
                  overflow='auto'
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <Box key={i}>
                      <Box display='flex' alignItems='end' gap={2} mb={4}>
                        <Avatar src='' sx={{ bgcolor: 'white' }}>
                          {getInitials('ASU')}
                        </Avatar>
                        <Box
                          bgcolor='white'
                          width='100%'
                          px={3}
                          py={2}
                          borderRadius={1}
                          sx={{ borderBottomLeftRadius: 0 }}
                        >
                          <Box display='flex' justifyContent='space-between'>
                            <Box>
                              <Typography variant='h6'>Hari Agus</Typography>
                              <Typography variant='body2'>HRCODE</Typography>
                            </Box>
                            <Typography>Time</Typography>
                          </Box>
                          <Typography mt={3}>
                            loremmaslalsalsalskaksjjahbfhsbjbdva
                            gyufghdgfhhdfghgjhgshaghgsjdgasgdhasgdhagsdyagdhashgadhjg
                          </Typography>
                        </Box>
                      </Box>
                      <Box display='flex' alignItems='end' gap={2}>
                        <Box
                          bgcolor='white'
                          width='100%'
                          px={3}
                          py={2}
                          borderRadius={1}
                          sx={{ borderBottomRightRadius: 0 }}
                        >
                          <Box display='flex' justifyContent='space-between'>
                            <Box>
                              <Typography variant='h6'>Hari Agus</Typography>
                              <Typography variant='body2'>HRCODE</Typography>
                            </Box>
                            <Typography>Time</Typography>
                          </Box>
                          <Typography mt={3}>
                            loremmaslalsalsalskaksjjahbfhsbjbdva
                            gyufghdgfhhdfghgjhgshaghgsjdgasgdhasgdhagsdyagdhashgadhjg
                          </Typography>
                        </Box>
                        <Avatar src='' sx={{ bgcolor: 'white' }}>
                          {getInitials('ASU')}
                        </Avatar>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <CustomTextField
                  id='Message'
                  multiline
                  maxRows={5}
                  value={message}
                  placeholder='Write a message here...'
                  onChange={e => setMessage(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end' sx={{ cursor: 'pointer' }}>
                        <Icon icon='tabler:send' style={{ color: '#5d94c6' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </TabPanel> */}
            <TabPanel value='Notes'>Notes</TabPanel>
          </TabContext>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogDetailProject
