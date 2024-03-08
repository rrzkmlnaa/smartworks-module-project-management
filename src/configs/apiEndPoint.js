export default {
  // Authentication and User Management
  employeePost: '/users',
  employeeVerifyEmail: '/auth/verify-email',
  employees: '/users',
  employee: '/users',
  profile: '/profile',

  // Authorization
  userPermissions: '/authorization/permissions/user',
  permissions: '/authorization/permissions',
  roles: '/authorization/roles',

  // Time and Attendance
  overtime: '/time/overtimes',
  myOvertime: '/time/overtimes/user',
  staffOvertime: '/time/overtimes/staff',
  requestOvertime: '/time/overtimes/request',
  leaveTypes: '/time/leave-types',
  leave: '/time/leaves',
  attendances: '/time/attendances',
  attendancesMe: '/time/attendances/me',
  attendancesResport: '/time/attendances/report',
  attendancesByMonth: '/time/attendances/month',

  // Human Resource Management
  department: '/hrm/departments',
  assignDepartment: '/hrm/departments/add-user',
  jobLevel: '/hrm/levels',
  jobPosition: '/hrm/positions',
  assignJobPosition: '/hrm/positions/add-user',

  // Project Management
  project: '/pm/projects',
  task: '/pm/tasks',
  goals: '/pme/goal-settings'
}
