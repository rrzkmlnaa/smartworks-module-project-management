// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { addRolePermission, fetchRoleDetail, getAllPermissions, getAllRoles, updateRolePermission } from 'src/libs/api'
import toast from 'react-hot-toast'

const cardData = [
  { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  { totalUsers: 7, title: 'Manager', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
  { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  { totalUsers: 3, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
  { totalUsers: 2, title: 'Restricted User', avatars: ['4.png', '5.png'] }
]

const rolesArr = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const RolesCards = () => {
  // ** States
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [role, setRole] = useState({})
  const [permissionsAbility, setPermissionsAbility] = useState([])
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [selectedPermissionAbilities, setSelectedPermissionAbilities] = useState([])

  const handleClickOpen = () => {
    setOpen(true)
    setSelectedCheckbox([])
    setSelectedPermissionAbilities([])
    setRole({})
  }

  const handleClickOpenDetail = async (roleId, roleName) => {
    try {
      const { permissions } = await fetchRoleDetail(roleId)

      const newPermissionsIds = permissions.map((permissions, idx) => {
        return permissions.permission.id
      })

      const newPermissionsCheckbox = permissions.map((permissions, idx) => {
        return `${permissions.permission.subject}-${permissions.permission.action}`
      })

      setSelectedCheckbox(newPermissionsCheckbox)
      setSelectedPermissionAbilities(newPermissionsIds)
      setRole({ id: roleId, name: roleName })
      setOpen(!open)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
  }

  const togglePermission = (id, abilityId) => {
    const arr = selectedCheckbox
    const abilities = selectedPermissionAbilities
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      abilities.splice(abilities.indexOf(abilityId), 1)
      setSelectedCheckbox([...arr])
      setSelectedPermissionAbilities([...abilities])
    } else {
      arr.push(id)
      abilities.push(abilityId)
      setSelectedCheckbox([...arr])
      setSelectedPermissionAbilities([...abilities])
    }
  }

  const getRoles = async () => {
    try {
      const roles = await getAllRoles()

      setRoles(roles)
    } catch (error) {}
  }

  const getPermissions = async () => {
    try {
      const permissions = await getAllPermissions()

      const groupedData = permissions.reduce((acc, obj) => {
        const { subject, ...rest } = obj
        acc[subject] = acc[subject] || []
        acc[subject].push(rest)

        return acc
      }, {})

      setPermissionsAbility(groupedData)
      setPermissions(permissions)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    const requestBody = {
      name: role?.name,
      permissions: selectedPermissionAbilities
    }

    try {
      if (dialogTitle === 'Add') {
        await addRolePermission(requestBody)
        toast.success('Permission added successfully')
      } else {
        await updateRolePermission(role?.id, requestBody)
        toast.success('Permissions updated successfully')
      }

      getRoles()
      handleClose()
    } catch (error) {
      handleClose()
      toast.error('Failed to create or update role permissions')
    }
  }

  useEffect(() => {
    getRoles()
    getPermissions()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderCards = () =>
    roles.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.totalUsers} users`}</Typography>
              <AvatarGroup
                max={4}
                className='pull-up'
                sx={{
                  '& .MuiAvatar-root': { width: 32, height: 32, fontSize: theme => theme.typography.body2.fontSize }
                }}
              >
                {item?.avatars?.map((img, index) => (
                  <Avatar key={index} alt={item.title} src={`/assets/images/avatars/${img}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ mb: 1 }}>
                  {item.name}
                </Typography>
                <Typography
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                  onClick={e => {
                    handleClickOpenDetail(item.id, item.name)
                    setDialogTitle('Edit')
                  }}
                >
                  Edit Role
                </Typography>
              </Box>
              <IconButton size='small' sx={{ color: 'text.disabled' }}>
                <Icon icon='tabler:copy' />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpenDetail()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 140,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <img height={122} alt='add-role' src='/assets/images/pages/add-new-role-illustration.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent sx={{ pl: 0, height: '100%' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add New Role
                  </Button>
                  <Typography sx={{ color: 'text.secondary' }}>Add role, if it doesn't exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog fullWidth maxWidth='lg' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h3'>{`${dialogTitle} Role`}</Typography>
          <Typography color='text.secondary'>Set Role Permissions</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Box sx={{ my: 4 }}>
            <FormControl fullWidth>
              <CustomTextField
                fullWidth
                label='Role Name'
                placeholder='Enter Role Name'
                value={role?.name}
                onChange={e => setRole(curr => ({ ...curr, name: e.target.value }))}
              />
            </FormControl>
          </Box>
          <Typography variant='h4'>Role Permissions</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                {/* <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                        '& svg': { ml: 1, cursor: 'pointer' },
                        color: theme => theme.palette.text.secondary,
                        fontSize: theme => theme.typography.h6.fontSize
                      }}
                    >
                      Administrator Access
                      <Tooltip placement='top' title='Allows a full access to the system'>
                        <Box sx={{ display: 'flex' }}>
                          <Icon icon='tabler:info-circle' fontSize='1.25rem' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControlLabel
                      label='Select All'
                      sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                      control={
                        <Checkbox
                          size='small'
                          onChange={handleSelectAllCheckbox}
                          indeterminate={isIndeterminateCheckbox}
                          checked={selectedCheckbox.length === rolesArr.length * 3}
                        />
                      }
                    />
                  </TableCell>
                </TableRow> */}
              </TableHead>
              <TableBody>
                {permissions
                  .filter((obj, index, array) => {
                    return array.findIndex(o => o.subject === obj.subject) === index
                  })
                  .map((i, index) => {
                    const id = i.subject.toLowerCase().split(' ').join('-')

                    return (
                      <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            fontSize: theme => theme.typography.h6.fontSize
                          }}
                        >
                          {i.subject}
                        </TableCell>
                        {permissionsAbility[i.subject].map((ability, index) => (
                          <TableCell key={index}>
                            <FormControlLabel
                              label={ability.action}
                              sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                              control={
                                <Checkbox
                                  size='small'
                                  id={`${id}-${ability.action}`}
                                  onChange={() => togglePermission(`${id}-${ability.action}`, ability.id)}
                                  checked={selectedCheckbox.includes(`${id}-${ability.action}`)}
                                />
                              }
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <Button type='submit' variant='contained' onClick={handleSubmit}>
              Submit
            </Button>
            <Button color='secondary' variant='tonal' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
