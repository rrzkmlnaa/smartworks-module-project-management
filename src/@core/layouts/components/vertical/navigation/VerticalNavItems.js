// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { getPermissions } from 'src/configs/helper'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle
  if (item.children) return VerticalNavGroup

  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props

  const filteredItems = verticalNavItems.filter((item, index) => {
    // Check if the subject starts with "own_"
    const isOwn = item.subject?.startsWith('own_')

    // Check if there exists another item with the same subject but prefixed with "own_"
    const hasOwnEquivalent = verticalNavItems.some((otherItem, otherIndex) => {
      return otherItem.subject === `own_${item.subject}` && otherIndex !== index
    })

    // Check if user has 'manage' permission for 'all' subjects
    const hasManageAllPermission = getPermissions().some(permission => {
      return permission.action === 'manage' && permission.subject === 'all'
    })

    // Retain the item if it's "own_" and the user doesn't have "manage" permission for "all" subjects
    // Or if it's not "own_" prefixed
    return (!hasManageAllPermission && isOwn) || !isOwn
  })

  const RenderMenuItems = filteredItems.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
