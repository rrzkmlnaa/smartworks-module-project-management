const navigation = () => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',
      path: '/dashboard'
    },
    {
      sectionTitle: 'Base'
    },
    {
      title: 'Inbox',
      icon: 'tabler:mail',
      path: '/base/email'
    },
    {
      title: 'Calendar',
      icon: 'tabler:calendar',
      path: '/base/calendar'
    },
    {
      sectionTitle: 'Modules'
    }
  ]
}

export default navigation
