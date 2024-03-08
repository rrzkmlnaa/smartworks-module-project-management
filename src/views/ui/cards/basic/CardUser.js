// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'

const CardUser = () => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia sx={{ height: '12.625rem' }} image='/assets/images/cards/background-user.png' />
      <Avatar
        alt='Robert Meyer'
        src='/assets/images/avatars/1.png'
        sx={{
          width: 75,
          height: 75,
          left: '1.313rem',
          top: '10.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>Robert Meyer</Typography>
            <Typography variant='body2'>London, UK</Typography>
          </Box>
          <Button variant='contained'>Send Request</Button>
        </Box>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            18 mutual friends
          </Typography>
          <AvatarGroup max={4}>
            <Avatar src='/assets/images/avatars/8.png' alt='Alice Cobb' />
            <Avatar src='/assets/images/avatars/7.png' alt='Jeffery Warner' />
            <Avatar src='/assets/images/avatars/3.png' alt='Howard Lloyd' />
            <Avatar src='/assets/images/avatars/2.png' alt='Bettie Dunn' />
            <Avatar src='/assets/images/avatars/4.png' alt='Olivia Sparks' />
            <Avatar src='/assets/images/avatars/5.png' alt='Jimmy Hanson' />
            <Avatar src='/assets/images/avatars/6.png' alt='Hallie Richards' />
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardUser