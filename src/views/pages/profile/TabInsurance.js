import React, { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import Divider from '@mui/material/Divider'
import CustomTextField from 'src/@core/components/mui/text-field'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Fade from '@mui/material/Fade'

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

const TabInsurance = () => {
  const [insurances, setInsurances] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    setInsurances([
      {
        id: 1,
        type: 'BPJS',
        number: '09102912889'
      },
      {
        id: 2,
        type: 'BPJS',
        number: '09102912889'
      }
    ])
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
            <CardHeader title='Insurances' subheader='wwkk' />
            <Box sx={{ px: 6, '& svg': { mr: 2 } }}>
              <Button variant='contained' color='primary' type='button' onClick={() => setShow(true)}>
                <Icon fontSize='1.25rem' icon='tabler:database-plus' />
                Add Insurances
              </Button>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ textAlign: 'center' }}>
            {insurances.length >= 1 ? (
              insurances.map(insurance => (
                <Box key={insurance.id}>
                  <Grid container spacing={5} sx={{ alignItems: 'end', mb: 5, mt: 1 }}>
                    <Grid item xs={12} sm={5}>
                      <CustomTextField fullWidth label='Insurance Type' value={insurance.type} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextField fullWidth label='Insurance Number' value={insurance.number} disabled />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Button variant='contained' color='error' type='button'>
                        <Icon fontSize='1rem' icon='tabler:trash' />
                      </Button>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              ))
            ) : (
              <Typography>The insurance data was not found.</Typography>
            )}
          </CardContent>
        </Card>
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
                  Add Insurances
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Updating user details will receive a privacy audit.
                </Typography>
              </Box>
              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <CustomTextField fullWidth defaultValue='' label='Insurance Type' placeholder='' />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <CustomTextField fullWidth defaultValue='' label='Insurance Number' placeholder='' />
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
      </Grid>
    </Grid>
  )
}

TabInsurance.call = {
  action: 'read',
  subject: 'profile-page'
}

export default TabInsurance
