// ** React Imports
import { useState, forwardRef, Fragment, useCallback, useEffect } from 'react'
import DatePicker from 'react-datepicker'

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
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomInput from 'src/views/forms/form-elements/pickers/PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useTheme } from '@mui/material/styles'
import { CircularProgress, DialogActions, MenuItem } from '@mui/material'

// ** Third Party Imports
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Helpers
import { debounce, formatDateISO } from 'src/configs/helper'

// ** Data
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { addProject, getProjectDetail } from 'src/libs/modules/project-management/project'
import { getEmployeesData } from 'src/libs/modules/hrm/employees'
import toast from 'react-hot-toast'

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

const DialogAddProject = props => {
  // ** Props
  const { open, setOpen, getProjects, projectId } = props

  // ** States
  const [projectName, setProjectName] = useState('')
  const [projectMembers, setProjectMembers] = useState([])
  const [projectStart, setProjectStart] = useState(null)
  const [projectEnd, setProjectEnd] = useState(null)
  const [projectStatus, setProjectStatus] = useState('')
  const [projectPriority, setProjectPriority] = useState('')
  const [projectDescription, setProjectDescription] = useState(EditorState.createEmpty())
  const [checked, setChecked] = useState(false)
  const [fetchEmployee, setFetchEmployee] = useState(false)
  const [options, setOptions] = useState([])

  const loading = fetchEmployee && options.length === 0

  const handleClose = () => setOpen(false)

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await getEmployeesData({ limit: 20 }, true)

      setOptions(res)
      setFetchEmployee(false)
    } catch (error) {}
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleSearchEmployee = useCallback(
    debounce(async query => {
      try {
        const response = await getEmployeesData({ searchQuery: query, limit: 20 })

        setOptions(response.data)
      } catch (error) {
        setOptions([])
      }
    }, 500),
    []
  )

  const handleSearchEmployee = event => {
    const newQuery = event.target.value
    debouncedHandleSearchEmployee(newQuery)
  }

  const handleSubmit = async () => {
    const body = {
      userId: projectMembers,
      name: projectName,
      description: draftToHtml(convertToRaw(projectDescription.getCurrentContent())),
      priority: projectPriority,
      status: projectStatus,
      startDate: formatDateISO(projectStart),
      dueDate: formatDateISO(projectEnd),
      dateCompleted: formatDateISO(projectEnd)
    }

    try {
      await addProject(body)

      getProjects()
      toast.success('Project has added!')
    } catch (error) {}

    handleClose()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProject = async () => {
    try {
      const res = await getProjectDetail(projectId)

      setProjectName(res.name)
      setProjectMembers(res.people.map(person => person.user.id))

      setProjectStart(new Date(res.startDate))
      setProjectEnd(new Date(res.dueDate))
      setProjectStatus(res.status)
      setProjectPriority(res.priority)
      setProjectDescription(EditorState.createWithContent(res.description))
    } catch (error) {}
  }

  useEffect(() => {
    fetchEmployees()

    if (projectId) {
      getProject()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchEmployees])

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
        <DialogContent
          sx={{
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={handleClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h3'>Add New Project</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Please fill out all the provided forms.</Typography>
          </Box>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12}>
              <CustomTextField
                label='Project Name'
                id='Project Name'
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='tabler:box' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomAutocomplete
                multiple
                open={fetchEmployee}
                options={options}
                value={projectMembers}
                onOpen={() => setFetchEmployee(true)}
                onClose={() => setFetchEmployee(false)}
                id='for-employee'
                getOptionLabel={option => `${option.name} - [Employee ID : ${option.hrcode}]`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, value) =>
                  setProjectMembers(
                    value.map(i => {
                      return i.id
                    })
                  )
                }
                onInputChange={handleSearchEmployee}
                renderInput={params => (
                  <CustomTextField
                    {...params}
                    label='Project Members'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerWrapper>
                <DatePicker
                  id='start-date'
                  selected={projectStart}
                  dateFormat='MMMM d, yyyy'
                  showMonthDropdown
                  showYearDropdown
                  popperPlacement={popperPlacement}
                  onChange={date => setProjectStart(date)}
                  customInput={
                    <CustomInput
                      label='Start Date'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:calendar' />
                          </InputAdornment>
                        )
                      }}
                    />
                  }
                />
              </DatePickerWrapper>
              {/* <FormControlLabel
                label={<Typography variant='body2'>Without End Date</Typography>}
                sx={{ '& svg': { height: 20, width: 20 } }}
                control={<Checkbox checked={checked} onChange={handleChange} name='controlled' />}
              /> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerWrapper>
                <DatePicker
                  id='end-date'
                  selected={projectEnd}
                  dateFormat='MMMM d, yyyy'
                  showMonthDropdown
                  showYearDropdown
                  popperPlacement={popperPlacement}
                  onChange={date => setProjectEnd(date)}
                  disabled={checked}
                  customInput={
                    <CustomInput
                      label='Due Date'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:calendar-due' />
                          </InputAdornment>
                        )
                      }}
                    />
                  }
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                value={projectStatus}
                onChange={e => setProjectStatus(e.target.value)}
                label='Project Status'
                id='status'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='tabler:list' />
                    </InputAdornment>
                  )
                }}
              >
                <MenuItem value='new'>New</MenuItem>
                <MenuItem value='in progress'>In Progress</MenuItem>
                <MenuItem value='completed'>Completed</MenuItem>
                <MenuItem value='canceled'>Canceled</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomTextField
                select
                value={projectPriority}
                onChange={e => setProjectPriority(e.target.value)}
                label='Project Priority'
                id='priority'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='tabler:list' />
                    </InputAdornment>
                  )
                }}
              >
                <MenuItem value='low'>Low</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='high'>High</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>Project Description</Typography>
              <ReactDraftWysiwyg
                editorState={projectDescription}
                toolbarClassName='wysiwyg-toolbar'
                editorClassName='wysiwyg-editor'
                onEditorStateChange={data => setProjectDescription(data)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogAddProject
