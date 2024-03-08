// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const searchData = [
  {
    id: 1,
    url: '/bases/email',
    icon: 'tabler:mail',
    title: 'Inbox',
    category: 'bases'
  },
  {
    id: 2,
    url: '/bases/calendar',
    icon: 'tabler:calendar',
    title: 'Calendar',
    category: 'bases'
  },
  {
    id: 3,
    url: '/modules/hrm/contracts',
    icon: 'tabler:brand-asana',
    title: 'Contracts',
    category: 'modules'
  },
  {
    id: 4,
    url: '/modules/hrm/employees',
    icon: 'tabler:brand-asana',
    title: 'Employees',
    category: 'modules'
  },
  {
    id: 5,
    url: '/modules/hrm/departments',
    icon: 'tabler:brand-asana',
    title: 'Departments',
    category: 'modules'
  },
  {
    id: 6,
    url: '/modules/hrm/job-levels',
    icon: 'tabler:brand-asana',
    title: 'Job Levels',
    category: 'modules'
  },
  {
    id: 7,
    url: '/modules/hrm/job-positions',
    icon: 'tabler:brand-asana',
    title: 'Contracts',
    category: 'modules'
  },
  {
    id: 8,
    url: '/modules/hrm/organization-chart',
    icon: 'tabler:brand-asana',
    title: 'Organization Chart',
    category: 'modules'
  },
  {
    id: 9,
    url: '/modules/performance-management/goals/goals-setting',
    icon: 'tabler:chart-histogram',
    title: 'Goals Setting (KPI)',
    category: 'modules'
  },
  {
    id: 10,
    url: '/modules/performance-management/goals/midyear-review',
    icon: 'tabler:chart-histogram',
    title: 'Mid Year Review (KPI)',
    category: 'modules'
  },
  {
    id: 11,
    url: '/modules/performance-management/goals/final-annual',
    icon: 'tabler:chart-histogram',
    title: 'Final Annual (KPI)',
    category: 'modules'
  },
  {
    id: 12,
    url: '/modules/performance-management/key-succession',
    icon: 'tabler:chart-histogram',
    title: 'Key Succession',
    category: 'modules'
  },
  {
    id: 13,
    url: '/modules/performance-management/performance-management-evaluation',
    icon: 'tabler:chart-histogram',
    title: 'Performance Management Evaluation',
    category: 'modules'
  },
  {
    id: 14,
    url: '/modules/performance-management/talent-card',
    icon: 'tabler:chart-histogram',
    title: 'Talent Card',
    category: 'modules'
  },
  {
    id: 15,
    url: '/modules/performance-management/nine-box-matrix',
    icon: 'tabler:chart-histogram',
    title: 'Nine Box Matrix',
    category: 'modules'
  },
  {
    id: 16,
    url: '/modules/time-management/attendance',
    icon: 'tabler:clock-cog',
    title: 'Attendance',
    category: 'modules'
  },
  {
    id: 17,
    url: '/modules/time-management/overtime',
    icon: 'tabler:clock-cog',
    title: 'Overtime',
    category: 'modules'
  },
  {
    id: 18,
    url: '/modules/time-management/leave',
    icon: 'tabler:clock-cog',
    title: 'Leave',
    category: 'modules'
  },
  {
    id: 19,
    url: '/modules/project-management/projects',
    icon: 'tabler:layout-kanban',
    title: 'Projects',
    category: 'modules'
  },
  {
    id: 20,
    url: '/modules/project-management/tasks',
    icon: 'tabler:layout-kanban',
    title: 'Tasks',
    category: 'modules'
  }
]

// ** GET Search Data
mock.onGet('/app-bar/search').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const exactData = {
    bases: [],
    modules: [],
    userInterface: [],
    formsTables: [],
    chartsMisc: []
  }

  const includeData = {
    bases: [],
    modules: [],
    userInterface: [],
    formsTables: [],
    chartsMisc: []
  }
  searchData.forEach(obj => {
    const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
    if (isMatched && exactData[obj.category].length < 5) {
      exactData[obj.category].push(obj)
    }
  })
  searchData.forEach(obj => {
    const isMatched =
      !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)
    if (isMatched && includeData[obj.category].length < 5) {
      includeData[obj.category].push(obj)
    }
  })
  const categoriesCheck = []
  Object.keys(exactData).forEach(category => {
    if (exactData[category].length > 0) {
      categoriesCheck.push(category)
    }
  })
  if (categoriesCheck.length === 0) {
    Object.keys(includeData).forEach(category => {
      if (includeData[category].length > 0) {
        categoriesCheck.push(category)
      }
    })
  }
  const resultsLength = categoriesCheck.length === 1 ? 5 : 3

  return [
    200,
    [
      ...exactData.bases.concat(includeData.bases).slice(0, resultsLength),
      ...exactData.modules.concat(includeData.modules).slice(0, resultsLength),
      ...exactData.userInterface.concat(includeData.userInterface).slice(0, resultsLength),
      ...exactData.formsTables.concat(includeData.formsTables).slice(0, resultsLength),
      ...exactData.chartsMisc.concat(includeData.chartsMisc).slice(0, resultsLength)
    ]
  ]
})
