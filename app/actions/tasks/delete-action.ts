'use server'

import { Task } from '@/src/domain/entities/task'

export const deleteAction = async (data: Partial<Task>) => {
  const id = data.id
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        deletedAt: new Date(),
      }),
    }
  )

  if (result.ok) {
    return { success: 'Task deleted successfully' }
  }

  return {
    error: 'Oops, something went wrong',
  }
}
