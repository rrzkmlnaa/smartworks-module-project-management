// ** MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

const AvatarsImage = () => {
  return (
    <Box className='demo-space-x' sx={{ display: 'flex' }}>
      <Avatar src='/assets/images/avatars/1.png' alt='Victor Anderson' />
      <Avatar src='/assets/images/avatars/8.png' alt='Alice Cobb' />
      <Avatar src='/assets/images/avatars/7.png' alt='Jeffery Warner' />
    </Box>
  )
}

export default AvatarsImage
