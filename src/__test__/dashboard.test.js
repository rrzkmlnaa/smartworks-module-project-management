import { render } from '@testing-library/react'

import Dashboard from 'src/pages/dashboard'

describe('Dashboard', () => {
  it('renders the Components', () => {
    render(<Dashboard />)
  })
})
