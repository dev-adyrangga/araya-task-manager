import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { redirect } from 'next/navigation'
import { getSession } from '@/src/lib/auth'
import Home from '@/app/page'

describe('Home page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to /sign-in if unauthenticated', async () => {
    ;(getSession as jest.Mock).mockResolvedValue(null)
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [{ id: 1, title: 'Test Task' }] }),
    })
    await Home()
    expect(redirect).toHaveBeenCalledWith('/sign-in')
  })

  it('renders task list if authenticated', async () => {
    ;(getSession as jest.Mock).mockResolvedValue(1)
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [{ id: 1, title: 'Test Task' }] }),
    })
    const jsx = await Home()
    render(jsx)
    await waitFor(() => {
      expect(screen.getByTestId('task-list')).toBeInTheDocument()
      expect(screen.getByText('Test Task')).toBeInTheDocument()
    })
  })

  it('renders task list empty if failed get taskList data', async () => {
    ;(getSession as jest.Mock).mockResolvedValue(1)
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })
    const jsx = await Home()
    render(jsx)
    await waitFor(() => {
      expect(screen.getByTestId('task-list')).toBeInTheDocument()
      expect(screen.queryByText('Test Task')).not.toBeInTheDocument()
    })
  })
})
