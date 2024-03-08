// ** MUI Imports
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import IconifyIcon from 'src/@core/components/icon'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const GenderDiversity = () => {
  // ** Hook
  const theme = useTheme()

  const donutColors = {
    male: theme.palette.primary.main,
    female: theme.palette.warning.main
  }

  const options = {
    stroke: { width: 0 },
    labels: ['Male', 'Female'],
    colors: [donutColors.male, donutColors.female],
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: val => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Total',
              formatter: () => '7',
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  value: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  total: {
                    fontSize: theme.typography.body1.fontSize
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card style={{ height: '100%', position: 'relative' }}>
      <Box display='flex' justifyContent='space-between' alignItems='center' px={3} pl={5} pt={3}>
        <Typography variant='h5' fontWeight={550}>
          Gender Diversity
        </Typography>
      </Box>
      <CardContent sx={{ mb: 13 }}>
        <ReactApexcharts type='donut' height={400} options={options} series={[6, 2]} />
      </CardContent>
      <Box p={3} position='absolute' bottom={0} borderTop={1} borderColor='#b7b9bc' width='100%'>
        <Button variant='text' color='secondary' size='small'>
          <IconifyIcon icon='tabler:filter' />
          Filter
        </Button>
      </Box>
    </Card>
  )
}

export default GenderDiversity
