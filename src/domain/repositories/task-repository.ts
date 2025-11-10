import { Task } from '../entities/task'

export interface TaskRepository {
  createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task>
  getAllTasks(): Promise<Task[]>
  updateTask(task: Task): Promise<Task>
  removeTask(task: Task): Promise<Task>
}
