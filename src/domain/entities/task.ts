import { Status } from '@/src/infrastructure/prisma/generated/prisma/enums'

export interface Task {
  id: number
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
  title: string
  description: string | null
  status: Status
  authorId: number
}
