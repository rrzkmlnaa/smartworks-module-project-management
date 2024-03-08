// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

const AvatarsGrouped = () => {
  return (
    <div className='demo-space-y'>
      <AvatarGroup max={4}>
        <Avatar src='/assets/images/avatars/4.png' alt='Olivia Sparks' />
        <Avatar src='/assets/images/avatars/5.png' alt='Howard Lloyd' />
        <Avatar src='/assets/images/avatars/6.png' alt='Hallie Richards' />
        <Avatar src='/assets/images/avatars/8.png' alt='Alice Cobb' />
        <Avatar src='/assets/images/avatars/7.png' alt='Jeffery Warner' />
      </AvatarGroup>
      <AvatarGroup max={4} sx={{ justifyContent: 'center' }}>
        <Avatar src='/assets/images/avatars/4.png' alt='Olivia Sparks' />
        <Avatar src='/assets/images/avatars/5.png' alt='Howard Lloyd' />
        <Avatar src='/assets/images/avatars/6.png' alt='Hallie Richards' />
        <Avatar src='/assets/images/avatars/8.png' alt='Alice Cobb' />
        <Avatar src='/assets/images/avatars/7.png' alt='Jeffery Warner' />
      </AvatarGroup>
      <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
        <Avatar src='/assets/images/avatars/4.png' alt='Olivia Sparks' />
        <Avatar src='/assets/images/avatars/5.png' alt='Howard Lloyd' />
        <Avatar src='/assets/images/avatars/6.png' alt='Hallie Richards' />
        <Avatar src='/assets/images/avatars/8.png' alt='Alice Cobb' />
        <Avatar src='/assets/images/avatars/7.png' alt='Jeffery Warner' />
      </AvatarGroup>
    </div>
  )
}

export default AvatarsGrouped
