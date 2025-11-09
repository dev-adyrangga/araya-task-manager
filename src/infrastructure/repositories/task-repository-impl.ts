import { TaskRepository } from '@/src/domain/repositories/task-repository'
import { Task } from '../prisma/generated/prisma/client'
import { prisma } from '../prisma/client'

export const TaskRepositoryImpl: TaskRepository = {
  createTask: async (task: Task) => prisma.task.create({ data: task }),
  getAllTasks: async () => prisma.task.findMany({ where: { deletedAt: null } }),
  updateTask: async (task: Task) =>
    prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        status: task.status,
        description: task.description,
      },
    }),
  removeTask: async (task: Task) =>
    prisma.task.update({
      where: { id: task.id },
      data: { deletedAt: task.deletedAt },
    }),
}
