// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { styled, useTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomInput from '../../forms/form-elements/pickers/PickersCustomInput'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { formatDateQuery, removeObjNullValues } from 'src/configs/helper'
import { getEmployeeData, getMyProfile, updateMyProfile } from 'src/libs/modules/hrm/employees'
import toast from 'react-hot-toast'
import { DataContext } from 'src/context/DataContext'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

const TabAccount = () => {
  // ** State
  const { data, setSharedData } = useContext(DataContext)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [userInput, setUserInput] = useState('yes')
  const [formData, setFormData] = useState({})
  const [formUpdate, setFormUpdate] = useState({})
  const [imgSrc, setImgSrc] = useState('/assets/images/avatars/15.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const onSubmit = () => setOpen(true)

  const handleConfirmation = value => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleInputImageChange = async file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }

    const body = new FormData()
    body.append('avatar', files[0])

    try {
      await updateMyProfile(null, body)
    } catch (error) {}
  }

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/assets/images/avatars/15.png')
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    setFormUpdate({ ...formUpdate, [field]: value })
  }

  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  const getProfile = async () => {
    try {
      let res = {}
      if (data?.employeeDetail) {
        res = await getEmployeeData(data.employeeDetail.id)
      } else {
        res = await getMyProfile()
      }

      setFormData({ ...res, birthday: res.birthday ? new Date(res.birthday) : null })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    removeObjNullValues(formUpdate)
    delete formUpdate['id']
    delete formUpdate['hrcode']
    delete formUpdate['email']

    if (formUpdate.birthday) {
      formUpdate.birthday = formatDateQuery(formUpdate.birthday)
    }

    try {
      await updateMyProfile(null, formUpdate)
      getProfile()
      setFormUpdate({})
      toast.success('Profile Updated!')
    } catch (error) {
      setFormUpdate({})
    }
  }

  useEffect(() => {
    return () => {
      // This function will be called when the component is about to unmount
      setSharedData(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!isLoading ? (
        <Grid container spacing={6}>
          {/* Account Details Card */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Profile Details' subheader='Personal data about yourself' />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled
                    src={formData.avatar ? `${formData.avatar}?not-from-cache-please` : imgSrc}
                    alt='Profile Pic'
                  />
                  <div>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      Upload New Photo
                      <input
                        hidden
                        type='file'
                        value={inputValue}
                        accept='image/png, image/jpeg'
                        onChange={handleInputImageChange}
                        id='account-settings-upload-image'
                      />
                    </ButtonStyled>
                    <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                      Reset
                    </ResetButtonStyled>
                    <Typography sx={{ mt: 4, color: 'text.disabled' }}>
                      Allowed PNG or JPEG. Max size of 800K.
                    </Typography>
                  </div>
                </Box>
              </CardContent>
              <Divider />
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField fullWidth label='HR Code' readOnly value={formData.hrcode} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Fullname'
                      value={formData.name}
                      onChange={e => handleFormChange('name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <DatePicker
                        id='birthday'
                        selected={formData.birthday}
                        showYearDropdown
                        showMonthDropdown
                        dateFormat='MMMM d, yyyy'
                        popperPlacement={popperPlacement}
                        onChange={date => handleFormChange('birthday', date)}
                        customInput={<CustomInput label='Birthday' />}
                      />
                    </DatePickerWrapper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Birthplace'
                      placeholder=''
                      value={formData.birthplace}
                      onChange={e => handleFormChange('birthplace', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      label='Marital Status'
                      value={formData.maritalStatus}
                      onChange={e => handleFormChange('maritalStatus', e.target.value)}
                    >
                      <MenuItem value='single'>Single</MenuItem>
                      <MenuItem value='married'>Married</MenuItem>
                      <MenuItem value='divorced'>Divorced</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Dependent'
                      SelectProps={{
                        value: formData.dependent,
                        onChange: e => handleFormChange('dependent', e.target.value)
                      }}
                    >
                      <MenuItem value='not marry'>Not Married Yet</MenuItem>
                      <MenuItem value='marry'>Married</MenuItem>
                      <MenuItem value='married one child'>Has Married One Child</MenuItem>
                      <MenuItem value='married two child'>Has Married Two Child</MenuItem>
                      <MenuItem value='married three child'>Has Married Three Child</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      label='Religion'
                      value={formData.religion}
                      onChange={e => handleFormChange('religion', e.target.value)}
                    >
                      <MenuItem value='islam'>Islam</MenuItem>
                      <MenuItem value='christianity'>Christianity (which includes various denominations)</MenuItem>
                      <MenuItem value='hinduism'>Hinduism</MenuItem>
                      <MenuItem value='buddhism'>Buddhism</MenuItem>
                      <MenuItem value='confucianism'>Confucianism</MenuItem>
                      <MenuItem value='other'>Other</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Nationality'
                      SelectProps={{
                        value: formData.nationality,
                        onChange: e => handleFormChange('nationality', e.target.value)
                      }}
                    >
                      <MenuItem value='indonesia'>Indonesia</MenuItem>
                      <MenuItem value='singapore'>Singapore</MenuItem>
                      <MenuItem value='malaysia'>Malaysia</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='National Identification Number'
                      placeholder=''
                      value={formData.numberOfIdentity}
                      onChange={e => handleFormChange('numberOfIdentity', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Place of Issue'
                      placeholder=''
                      value={formData.placeOfIssue}
                      onChange={e => handleFormChange('placeOfIssue', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                    <Button variant='contained' onClick={handleUpdate} color='primary'>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid item xs={12} mt={3}>
              <Card>
                <CardHeader title='Deactivate Account' />
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 4 }}>
                      <FormControl>
                        <Controller
                          name='checkbox'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <FormControlLabel
                              label='I confirm my account deactivation'
                              sx={{
                                '& .MuiTypography-root': {
                                  color: errors.checkbox ? 'error.main' : 'text.secondary'
                                }
                              }}
                              control={
                                <Checkbox
                                  {...field}
                                  size='small'
                                  name='validation-basic-checkbox'
                                  sx={errors.checkbox ? { color: 'error.main' } : null}
                                />
                              }
                            />
                          )}
                        />
                        {errors.checkbox && (
                          <FormHelperText
                            id='validation-basic-checkbox'
                            sx={{
                              mx: 0,
                              color: 'error.main',
                              fontSize: theme => theme.typography.body2.fontSize
                            }}
                          >
                            Please confirm you want to deactivate account
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <Button variant='contained' color='error' type='submit' disabled={errors.checkbox !== undefined}>
                      Deactivate Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(6)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '& svg': { mb: 6, color: 'warning.main' }
                }}
              >
                <Icon icon='tabler:alert-circle' fontSize='5.5rem' />
                <Typography>Are you sure you would like to cancel your subscription?</Typography>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
                Yes
              </Button>
              <Button variant='tonal' color='secondary' onClick={() => handleConfirmation('cancel')}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={handleSecondDialogClose}>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(6)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  '& svg': {
                    mb: 8,
                    color: userInput === 'yes' ? 'success.main' : 'error.main'
                  }
                }}
              >
                <Icon fontSize='5.5rem' icon={userInput === 'yes' ? 'tabler:circle-check' : 'tabler:circle-x'} />
                <Typography variant='h4' sx={{ mb: 5 }}>
                  {userInput === 'yes' ? 'Deleted!' : 'Cancelled'}
                </Typography>
                <Typography>
                  {userInput === 'yes' ? 'Your subscription cancelled successfully.' : 'Unsubscription Cancelled!!'}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      ) : (
        <Typography align='center'>Loading..</Typography>
      )}
    </>
  )
}

TabAccount.acl = {
  action: 'read',
  subject: 'profile-page'
}

export default TabAccount
