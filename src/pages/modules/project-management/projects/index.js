import { useState, useEffect, useCallback, useContext } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import CircularProgress from '@mui/material/CircularProgress'
import Icon from 'src/@core/components/icon'
import TableHeader from 'src/views/modules/project-management/projects/TableHeader'
import DialogDetailProject from 'src/views/modules/project-management/projects/DialogDetailProject'
import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import { getProject } from 'src/libs/modules/project-management/project'
import { formatDateISO } from 'src/configs/helper'
import { DataContext } from 'src/context/DataContext'
import DialogAddProject from 'src/views/modules/project-management/projects/DialogAddProject'

const RenderProjectMembers = _ => {
  const { setSharedData } = useContext(DataContext)

  return (
    <AvatarGroup className='pull-up' max={9}>
      {_.people.map(member => (
        <Tooltip title={member.user.name} key={member.user.id}>
          <Avatar
            onClick={() => setSharedData({ employeeId: member.user.id })}
            component={Link}
            href='/modules/hrm/employees/employee-directory/detail/general'
            src={member.user.avatar ?? '/vuexy-nextjs-admin-template/demo-4/assets/images/avatars/4.png'}
            alt={member.user.name}
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  )
}

const RowOptions = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [showDialogDetailProject, setShowDialogDetailProject] = useState(false)
  const [showEditProject, setShowEditProject] = useState(false)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={() => setShowDialogDetailProject(true)}>
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={() => setShowEditProject(true)}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
      </Menu>
      {showEditProject && <DialogAddProject open={showEditProject} setOpen={setShowEditProject} projectId={id} />}
      {showDialogDetailProject && (
        <DialogDetailProject open={showDialogDetailProject} setOpen={setShowDialogDetailProject} id={id} />
      )}
    </>
  )
}

const columns = [
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Project Name',
    field: 'project_name',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 340,
    headerName: 'Project Members',
    field: 'leave_type',
    renderCell: ({ row }) => RenderProjectMembers(row)
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'startdate',
    headerName: 'Start Date',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatDateISO(row.startDate)}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'enddate',
    headerName: 'End Date',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatDateISO(row.dueDate)}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 50,
    field: 'status',
    headerName: 'Progress',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant='determinate' value={row.progress ?? 0} size={50} />
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant='caption' component='div' color='text.secondary'>
              {row.progress ?? 0}%
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

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const handleFilter = useCallback(val => setValue(val), [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const fetchProject = async () => {
    try {
      const res = await getProject({}, true)
      setProjects(res)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Project Statistics' />
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            getProjects={fetchProject}
            data={projects}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={projects}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Projects
