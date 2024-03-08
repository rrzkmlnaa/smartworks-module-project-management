const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/dashboard',
      action: 'read',
      subject: 'Dashboard'
    },
    {
      sectionTitle: 'Modules',
      action: 'read',
      subject: 'Dashboard'
    },
    {
      title: 'Project Management',
      icon: 'tabler:layout-kanban',
      children: [
        {
          title: 'Projects',
          path: '/modules/project-management/projects',
          action: 'read',
          subject: 'project'
        },
        {
          title: 'Tasks',
          path: '/modules/project-management/tasks',
          action: 'read',
          subject: 'task'
        },
        {
          title: 'Tasks',
          path: '/modules/project-management/tasks',
          action: 'read',
          subject: 'own_task'
        }
      ]
    }
  ]
}

export default navigation
