import { Task } from '@/src/domain/entities/task'
import { TaskRepository } from '@/src/domain/repositories/task-repository'

export const createTask = async (repo: TaskRepository, task: Task) => {
  return await repo.createTask(task)
}

export const getAlltasks = async (repo: TaskRepository) => {
  const result = await repo.getAllTasks()
  return result
}

export const updateTask = async (repo: TaskRepository, task: Task) => {
  return await repo.updateTask(task)
}

export const deleteTask = async (repo: TaskRepository, task: Task) => {
  return await repo.removeTask(task)
}
