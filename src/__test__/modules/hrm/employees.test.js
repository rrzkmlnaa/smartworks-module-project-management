import { render } from '@testing-library/react'

import Employees from 'src/pages/modules/hrm/employees/employee-directory'

describe('Employees', () => {
  it('renders the Components', () => {
    render(<Employees />)
  })
})
