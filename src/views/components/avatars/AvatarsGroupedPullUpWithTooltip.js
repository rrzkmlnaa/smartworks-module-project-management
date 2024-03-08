// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import AvatarGroup from '@mui/material/AvatarGroup'

const AvatarsGroupedPullUpWithTooltip = () => {
  return (
    <AvatarGroup className='pull-up' max={4}>
      <Tooltip title='Olivia Sparks'>
        <Avatar src='/assets/images/avatars/4.png' alt='Olivia Sparks' />
      </Tooltip>
      <Tooltip title='Howard Lloyd'>
        <Avatar src='/assets/images/avatars/5.png' alt='Howard Lloyd' />
      </Tooltip>
      <Tooltip title='Hallie Richards'>
        <Avatar src='/assets/images/avatars/6.png' alt='Hallie Richards' />
      </Tooltip>
      <Tooltip title='Alice Cobb'>
        <Avatar src='/assets/images/avatars/8.png' alt='Alice Cobb' />
      </Tooltip>
      <Tooltip title='Jeffery Warner'>
        <Avatar src='/assets/images/avatars/7.png' alt='Jeffery Warner' />
      </Tooltip>
    </AvatarGroup>
  )
}

export default AvatarsGroupedPullUpWithTooltip
