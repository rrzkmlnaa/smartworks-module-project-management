// ** MUI Imports
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'

const BadgesBasic = () => {
  return (
    <div className='demo-space-x'>
      <Badge badgeContent={4} color='primary'>
        <Avatar src='/assets/images/avatars/8.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='secondary'>
        <Avatar src='/assets/images/avatars/8.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='success'>
        <Avatar src='/assets/images/avatars/8.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='error'>
        <Avatar src='/assets/images/avatars/8.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='warning'>
        <Avatar src='/assets/images/avatars/8.png' alt='User Avatar' />
      </Badge>
      <Badge badgeContent={4} color='info'>
        <Avatar src='/assets/images/avatars/8.png' alt='User Avatar' />
      </Badge>
    </div>
  )
}

export default BadgesBasic
