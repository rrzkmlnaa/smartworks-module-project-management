// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Badge from '@mui/material/Badge'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'

// ** Custom Components Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import Image from 'next/image'

const data = [
  {
    title: '',
    text: 'Tingkatkan performa bisnis melalui pemantauan kinerja dan pengembangan karyawan yang lebih transparan',
    backgroundColor: '#c02a34',
    img: '/assets/images/banner-performance-review.png'
  },
  {
    title: '',
    text: 'Kurangi proses manual yang ribet, buat form otomatis untuk berbagai survey, pengajuan dan permintaan',
    backgroundColor: '#9359ff',
    img: '/assets/images/banner-forms.png'
  },
  {
    title: 'Yuk jadi bagian dari Smartworks',
    text: 'Kurangi proses manual yang ribet, buat form otomatis untuk berbagai survey, pengajuan dan permintaan',
    backgroundColor: '#2f5573',
    img: '/assets/images/banner-mekari-buddy.png'
  }
]

const Slides = ({ theme }) => {
  return (
    <>
      {data.map((slide, index) => {
        return (
          <Box
            key={index}
            className='keen-slider__slide'
            sx={{ p: 0, '& .MuiTypography-root': { color: 'common.white' } }}
          >
            <Grid container backgroundColor={slide.backgroundColor}>
              <Grid item xs={12} md={4}>
                <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                  <Image
                    src={slide.img}
                    width={240}
                    height={156}
                    style={{ width: '100%', height: 'auto' }}
                    alt='Banner Image'
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8} p={6}>
                <Typography my={4} fontWeight={550}>
                  {slide.text}
                </Typography>
                <a style={{ color: 'white', fontSize: 14 }}>Check Now</a>
              </Grid>
            </Grid>
          </Box>
        )
      })}
    </>
  )
}

const Promotion = () => {
  // ** States
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // ** Hook
  const theme = useTheme()

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: 0,
      rtl: theme.direction === 'rtl',
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      }
    },
    [
      slider => {
        let mouseOver = false
        let timeout

        const clearNextTimeout = () => {
          clearTimeout(timeout)
        }

        const nextTimeout = () => {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 4000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  return (
    <Card sx={{ position: 'relative', backgroundColor: 'primary.main' }}>
      {loaded && instanceRef.current && (
        <Box className='swiper-dots' sx={{ bottom: 15, right: 6, position: 'absolute' }}>
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
            return (
              <Badge
                key={idx}
                variant='dot'
                component='div'
                className={clsx({ active: currentSlide === idx })}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                sx={{
                  mr: `${theme.spacing(3.5)} !important`,
                  '& .MuiBadge-dot': {
                    width: '8px !important',
                    height: '8px !important',
                    backgroundColor: `${hexToRGBA(theme.palette.common.white, 0.4)} !important`
                  },
                  '&.active .MuiBadge-dot': {
                    backgroundColor: `${theme.palette.common.white} !important`
                  }
                }}
              />
            )
          })}
        </Box>
      )}
      <Box ref={sliderRef} className='keen-slider'>
        <Slides theme={theme} />
      </Box>
    </Card>
  )
}

export default Promotion
