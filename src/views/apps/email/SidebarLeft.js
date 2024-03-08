// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomBadge from 'src/@core/components/mui/badge'

// ** Styled Components
const ListItemStyled = styled(ListItem)(({ theme }) => ({
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  marginBottom: theme.spacing(1)
}))

const ListBadge = styled(CustomBadge)(() => ({
  '& .MuiBadge-badge': {
    height: '18px',
    minWidth: '18px',
    transform: 'none',
    position: 'relative',
    transformOrigin: 'none'
  }
}))

const SidebarLeft = props => {
  // ** Props
  const {
    store,
    hidden,
    lgAbove,
    dispatch,
    leftSidebarOpen,
    leftSidebarWidth,
    toggleComposeOpen,
    setMailDetailsOpen,
    handleSelectAllMail,
    handleLeftSidebarToggle
  } = props

  const RenderBadge = (folder, color) => {
    if (store && store.mailMeta && store.mailMeta[folder] > 0) {
      return <ListBadge skin='light' color={color} sx={{ ml: 2 }} badgeContent={store.mailMeta[folder]} />
    } else {
      return null
    }
  }

  const handleActiveItem = (type, value) => {
    if (store && store.filter[type] !== value) {
      return false
    } else {
      return true
    }
  }

  const handleListItemClick = () => {
    setMailDetailsOpen(false)
    setTimeout(() => dispatch(handleSelectAllMail(false)), 50)
    handleLeftSidebarToggle()
  }

  const activeInboxCondition =
    store && handleActiveItem('folder', 'inbox') && store.filter.folder === 'inbox' && store.filter.label === ''

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }

  return (
    <Drawer
      open={leftSidebarOpen}
      onClose={handleLeftSidebarToggle}
      variant={lgAbove ? 'permanent' : 'temporary'}
      ModalProps={{
        disablePortal: true,
        keepMounted: true // Better open performance on mobile.
      }}
      sx={{
        zIndex: 9,
        display: 'block',
        position: lgAbove ? 'static' : 'absolute',
        '& .MuiDrawer-paper': {
          boxShadow: 'none',
          width: leftSidebarWidth,
          zIndex: lgAbove ? 2 : 'drawer',
          position: lgAbove ? 'static' : 'absolute'
        },
        '& .MuiBackdrop-root': {
          position: 'absolute'
        }
      }}
    >
      <Box sx={{ p: 6, overflowY: 'hidden' }}>
        <Button fullWidth variant='contained' onClick={toggleComposeOpen}>
          Compose
        </Button>
      </Box>
      <ScrollWrapper>
        <Box sx={{ pt: 0, overflowY: 'hidden' }}>
          <List component='div' sx={{ '& .MuiListItemIcon-root': { mr: 2 } }}>
            <ListItemStyled
              component={Link}
              href='/bases/email'
              onClick={handleListItemClick}
              sx={{ py: 1.5, borderLeftColor: activeInboxCondition ? 'primary.main' : 'transparent' }}
            >
              <ListItemIcon sx={{ color: activeInboxCondition ? 'primary.main' : 'text.secondary' }}>
                <Icon icon='tabler:mail' />
              </ListItemIcon>
              <ListItemText
                primary='Inbox'
                primaryTypographyProps={{
                  noWrap: true,
                  sx: { fontWeight: 500, ...(activeInboxCondition && { color: 'primary.main' }) }
                }}
              />
              {RenderBadge('inbox', 'primary')}
            </ListItemStyled>
            <ListItemStyled
              component={Link}
              href='/bases/email/sent'
              onClick={handleListItemClick}
              sx={{
                py: 1.5,
                borderLeftColor: handleActiveItem('folder', 'sent') ? 'primary.main' : 'transparent'
              }}
            >
              <ListItemIcon
                sx={{
                  color: handleActiveItem('folder', 'sent') ? 'primary.main' : 'text.secondary'
                }}
              >
                <Icon icon='tabler:send' />
              </ListItemIcon>
              <ListItemText
                primary='Sent'
                primaryTypographyProps={{
                  noWrap: true,
                  sx: { fontWeight: 500, ...(handleActiveItem('folder', 'sent') && { color: 'primary.main' }) }
                }}
              />
            </ListItemStyled>
          </List>
        </Box>
      </ScrollWrapper>
    </Drawer>
  )
}

export default SidebarLeft
