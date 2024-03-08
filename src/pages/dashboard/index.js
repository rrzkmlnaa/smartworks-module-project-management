import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { Avatar, Button, Card, CardContent, Divider, IconButton, InputAdornment, Typography } from '@mui/material'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Box } from '@mui/system'
import Icon from 'src/@core/components/icon'
import { getCurrentDate, getFirstName, getGreeting, getUser, setPermissions } from 'src/configs/helper'
import CustomTextField from 'src/@core/components/mui/text-field'
import { getInitials } from 'src/@core/utils/get-initials'
import Link from 'next/link'
import GenderDiversity from 'src/views/charts/apex-charts/GenderDiversityChart'
import { getUserPermissions } from 'src/libs/api'

const Dashboard = () => {
  const user = getUser()

  // ** State
  const [showFilterEmployment, setShowFilterEmployment] = useState(false)
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getUserPermission = async () => {
    try {
      const { A } = await getUserPermissions()

      setPermissions(JSON.stringify(A))
    } catch (error) {}
  }

  useEffect(() => {
    getUserPermission()
  }, [])

  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant='h4' fontWeight={550}>
                  {getGreeting()}, {getFirstName(user.name)}!
                </Typography>
                <Typography>{getCurrentDate()}</Typography>
                <Box mt={8}>
                  <Typography variant='h6'>Shortcuts</Typography>
                  <Box display='flex' gap={3} mt={2}>
                    <Button
                      LinkComponent={Link}
                      href='/modules/time-management/leave'
                      variant='outlined'
                      color='secondary'
                      size='small'
                      sx={{ borderRadius: 10 }}
                    >
                      Request Leave
                    </Button>
                    <Button
                      LinkComponent={Link}
                      href='/modules/time-management/overtime'
                      variant='outlined'
                      color='secondary'
                      size='small'
                      sx={{ borderRadius: 10 }}
                    >
                      Request Overtime
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6} style={{ height: '100%' }}>
              <Grid item xs={12} md={3}>
                <Card style={{ height: '100%', position: 'relative' }}>
                  <Box display='flex' justifyContent='space-between' alignItems='center' px={3} pl={5} pt={3}>
                    <Typography variant='h5' fontWeight={550}>
                      Employment Status
                    </Typography>
                    <IconButton onClick={() => setShowFilterEmployment(!showFilterEmployment)}>
                      <Icon icon='tabler:dots-vertical' fontSize={20} />
                    </IconButton>
                  </Box>
                  {showFilterEmployment && (
                    <Box position='absolute' bgcolor='white' width='100%' p={3}>
                      <Card>
                        <CardContent>Statistic Under Developing</CardContent>
                      </Card>
                    </Box>
                  )}
                  <CardContent sx={{ mb: 13 }}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
                      <Typography fontSize={13} fontWeight={550}>
                        Total
                      </Typography>
                      <Typography fontSize={13}>8</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {['Permanent', 'Internship'].map((i, idx) => (
                      <Box key={idx}>
                        <Grid container spacing={3} justifyContent='space-between'>
                          <Grid item xs={10}>
                            <Typography fontSize={13} fontWeight={550}>
                              {i}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography fontSize={13} textAlign='end'>
                              {i === 'Permanent' ? 6 : 2}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                      </Box>
                    ))}
                  </CardContent>
                  <Box p={3} position='absolute' bottom={0} borderTop={1} borderColor='#b7b9bc' width='100%'>
                    <Button variant='text' color='secondary' size='small'>
                      <Icon icon='tabler:filter' />
                      Filter
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card style={{ height: '100%', position: 'relative' }}>
                  <Box display='flex' justifyContent='space-between' alignItems='center' px={3} pl={5} pt={3}>
                    <Typography variant='h5' fontWeight={550}>
                      Length of Service
                    </Typography>
                    <IconButton onClick={() => setShowFilterEmployment(!showFilterEmployment)}>
                      <Icon icon='tabler:dots-vertical' fontSize={20} />
                    </IconButton>
                  </Box>
                  {showFilterEmployment && (
                    <Box position='absolute' bgcolor='white' width='100%' p={3}>
                      <Card>
                        <CardContent>Statistic Under Developing</CardContent>
                      </Card>
                    </Box>
                  )}
                  <CardContent sx={{ mb: 13 }}>Statistic Under Developing</CardContent>
                  <Box p={3} position='absolute' bottom={0} borderTop={1} borderColor='#b7b9bc' width='100%'>
                    <Button variant='text' color='secondary' size='small'>
                      <Icon icon='tabler:filter' />
                      Filter
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card style={{ height: '100%', position: 'relative' }}>
                  <Box display='flex' justifyContent='space-between' alignItems='center' px={3} pl={5} pt={3}>
                    <Typography variant='h5' fontWeight={550}>
                      Job Level
                    </Typography>
                    <IconButton onClick={() => setShowFilterEmployment(!showFilterEmployment)}>
                      <Icon icon='tabler:dots-vertical' fontSize={20} />
                    </IconButton>
                  </Box>
                  {showFilterEmployment && (
                    <Box position='absolute' bgcolor='white' width='100%' p={3}>
                      <Card>
                        <CardContent>Statistic Under Developing</CardContent>
                      </Card>
                    </Box>
                  )}
                  <CardContent sx={{ mb: 13 }}>Statistic Under Developing</CardContent>
                  <Box p={3} position='absolute' bottom={0} borderTop={1} borderColor='#b7b9bc' width='100%'>
                    <Button variant='text' color='secondary' size='small'>
                      <Icon icon='tabler:filter' />
                      Filter
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <GenderDiversity />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Card>
              <TabContext value={value}>
                <TabList onChange={handleChange} aria-label='full width tabs example'>
                  <Tab value='1' label='Announcement' />
                  <Tab value='2' label='Contract & Probation' />
                  <Tab LinkComponent={Link} href='modules/project-management/tasks' label='Task' />
                </TabList>
                <TabPanel value='1'>
                  <Box display='flex' gap={6} justifyContent='space-between'>
                    <Button color='secondary' variant='outlined' startIcon={<Icon icon='tabler:filter' />}>
                      Filter
                    </Button>
                    <CustomTextField
                      value={''}
                      sx={{ mr: 4, width: '40%' }}
                      placeholder='Search announcement..'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:search' />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                  <Box
                    py={5}
                    borderTop={1}
                    borderBottom={1}
                    borderColor='#b7b9bc'
                    mt={6}
                    display='flex'
                    alignItems='center'
                    gap={3}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Avatar src={user?.avatar}>{getInitials(user?.name)}</Avatar>
                    <Typography>What do you want to announce..</Typography>
                  </Box>
                  <Box>
                    <Typography align='center' py={10}>
                      No announcement to display
                    </Typography>
                  </Box>
                </TabPanel>
                <TabPanel value='2'>
                  <Box display='flex' gap={6} justifyContent='space-between'>
                    <Button
                      onClick={() => setShowRequestDialog(true)}
                      color='secondary'
                      variant='outlined'
                      startIcon={<Icon icon='tabler:filter' />}
                    >
                      Filter
                    </Button>
                    <CustomTextField
                      value={''}
                      sx={{ mr: 4, width: '40%' }}
                      placeholder='Search announcement..'
                      onChange={e => handleFilter(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon icon='tabler:search' />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card style={{ position: 'relative' }}>
              <Box display='flex' justifyContent='space-between' alignItems='center' px={3} pl={5} pt={3}>
                <Typography variant='h5' fontWeight={550}>
                  Who's Off
                </Typography>
                <IconButton onClick={() => setShowFilterEmployment(!showFilterEmployment)}>
                  <Icon icon='tabler:dots-vertical' fontSize={20} />
                </IconButton>
              </Box>
              {showFilterEmployment && (
                <Box position='absolute' bgcolor='white' width='100%' p={3}>
                  <Card>
                    <CardContent>Statistic Under Developing</CardContent>
                  </Card>
                </Box>
              )}
              <CardContent sx={{ mb: 13 }}>
                <Typography align='center'>No employee off today</Typography>
              </CardContent>
              <Box p={3} position='absolute' bottom={0} borderTop={1} borderColor='#b7b9bc' width='100%'>
                <Button variant='text' color='secondary' size='small'>
                  <Icon icon='tabler:filter' />
                  Filter
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

Dashboard.acl = {
  action: 'read',
  subject: 'Dashboard'
}

export default Dashboard
