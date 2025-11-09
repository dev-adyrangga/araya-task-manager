'use server'

import { Task } from '@/src/domain/entities/task'
import { taskSchema } from '@/src/helpers/validator-schemas/task-schema'

export const createTaskAction = async (data: Partial<Task>) => {
  const authorId = data.authorId
  const title = data.title
  const status = data.status
  const description = data.description || null
  const validatedFields = taskSchema.safeParse({
    title,
    status,
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues?.[0]?.message,
    }
  }
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        status,
        description,
        authorId,
      }),
    }
  )

  if (result.ok) {
    return { success: 'Task created successfully' }
  }

  return {
    error: 'Oops, something went wrong',
  }
}
