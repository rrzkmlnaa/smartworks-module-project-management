import React, { useState, forwardRef, Fragment } from 'react'

// ** MUI Imports
import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  FormLabel,
  Grid,
  List,
  ListItem,
  MenuItem,
  useTheme
} from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import CustomInput from '../../forms/form-elements/pickers/PickersCustomInput'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

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

const TabCareer = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [files, setFiles] = useState([])
  const [currently_working, setCurrentlyWorking] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const [endMonthYear, setEndMonthYear] = useState(new Date())
  const [startMonthYear, setStartMonthYear] = useState(new Date())

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    maxSize: 2000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload 2 files & maximum size of 2 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem
      key={file.name}
      sx={{
        width: '100%',
        border: 'solid 1px #e4e4e6',
        mb: 3,
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ p: 1, border: 'solid 1px #e4e4e6', borderRadius: 1 }}>{renderFilePreview(file)}</Box>
        <Box>
          <Typography sx={{ fontWeight: '500' }}>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleCurrentlyWorking = () => {
    setCurrentlyWorking(prevCurrentlyWorking => !prevCurrentlyWorking)
  }

  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        <CardHeader title='Career Experiences' subheader='wwkk' />
        <Box sx={{ px: 6, '& svg': { mr: 2 } }}>
          <Button variant='contained' color='primary' type='submit' onClick={() => setShow(true)}>
            <Icon fontSize='1.25rem' icon='tabler:database-plus' />
            Add Career Experience
          </Button>
        </Box>
      </Box>
      <Divider />
      <CardContent>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom', mx: 4 } }}>
              <Box
                sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Typography sx={{ mr: 2 }} variant='h6'>
                  SMKN 1 BANJAR
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Wednesday
                </Typography>
              </Box>
              <Typography variant='body2'>Rekayasa Perangkat Lunak</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                2019 - 2022
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
      <Card>
        <Dialog
          fullWidth
          open={show}
          maxWidth='md'
          scroll='body'
          onClose={() => setShow(false)}
          TransitionComponent={Transition}
          onBackdropClick={() => setShow(false)}
          sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <CustomCloseButton onClick={() => setShow(false)}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h3' sx={{ mb: 3 }}>
                Add Career Experience
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Updating user details will receive a privacy audit.
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <CustomTextField fullWidth defaultValue='' label='Company Name' placeholder='' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField fullWidth defaultValue='' label='Job Title' placeholder='' />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomTextField select defaultValue='' fullWidth id='degree-select' label='Employee Type'>
                  <MenuItem value='ft'>Full Time</MenuItem>
                  <MenuItem value='pt'>Part Time</MenuItem>
                  <MenuItem value='c'>Contract</MenuItem>
                  <MenuItem value='i'>Internship</MenuItem>
                  <MenuItem value='v'>Volunteer</MenuItem>
                  <MenuItem value='o'>Other</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField fullWidth defaultValue='' label='Location' placeholder='' />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    sx={{ '& svg': { height: 20, width: 20 }, fontSize: 'small' }}
                    label='I am Currently Working Here'
                    control={<Checkbox name='currently_working' onChange={handleCurrentlyWorking} />}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <DatePicker
                    id='start-date'
                    selected={startMonthYear}
                    showMonthYearPicker
                    dateFormat='MMMM, yyyy'
                    popperPlacement={popperPlacement}
                    onChange={date => setStartMonthYear(date)}
                    customInput={<CustomInput label='Start' />}
                  />
                </DatePickerWrapper>
              </Grid>
              {!currently_working && (
                <Grid item xs={12} sm={6}>
                  <DatePickerWrapper>
                    <DatePicker
                      id='end-date'
                      selected={endMonthYear}
                      showMonthYearPicker
                      dateFormat='MMMM, yyyy'
                      popperPlacement={popperPlacement}
                      onChange={date => setEndMonthYear(date)}
                      customInput={<CustomInput label='End' />}
                    />
                  </DatePickerWrapper>
                </Grid>
              )}
              {currently_working && (
                <Grid item xs={12}>
                  <FormGroup row>
                    <FormControlLabel
                      sx={{ '& svg': { height: 20, width: 20 }, fontSize: 'small' }}
                      label='End current position as of now - Web Developer at HR Academy Indonesia'
                      control={<Checkbox name='currently_working' />}
                    />
                  </FormGroup>
                </Grid>
              )}
              <Grid item xs={12}>
                <CustomTextField fullWidth multiline maxRows={4} label='Description' placeholder='' defaultValue='' />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Files</FormLabel>
                <Fragment>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <Box
                      sx={{
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        border: 'dashed 2px #e4e4e6',
                        p: 5
                      }}
                    >
                      <Box
                        sx={{
                          mb: 8.75,
                          width: 48,
                          height: 48,
                          display: 'flex',
                          borderRadius: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: theme => hexToRGBA(theme.palette.customColors.dark, 0.08)
                        }}
                      >
                        <Icon icon='tabler:upload' fontSize='1.75rem' />
                      </Box>
                      <Typography variant='h4' sx={{ mb: 2.5 }}>
                        Drop files here or click to upload.
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>Max 2 files and max size of 2 MB</Typography>
                    </Box>
                  </div>
                  {files.length ? (
                    <Fragment>
                      <List>{fileList}</List>
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                          Remove All
                        </Button>
                        <Button variant='contained'>Upload Files</Button>
                      </Box>
                    </Fragment>
                  ) : null}
                </Fragment>
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
            <Button variant='contained' sx={{ mr: 1 }} onClick={() => setShow(false)}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => setShow(false)}>
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Card>
  )
}

TabCareer.acl = {
  action: 'read',
  subject: 'profile-page'
}

export default TabCareer
