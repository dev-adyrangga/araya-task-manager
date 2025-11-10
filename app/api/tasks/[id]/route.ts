import {
  deleteTask,
  updateTask,
} from '@/src/application/use-cases/task-use-case'
import { TaskRepositoryImpl } from '@/src/infrastructure/repositories/task-repository-impl'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const data = await req.json()
  const result = await updateTask(TaskRepositoryImpl, data)
  return NextResponse.json({ data: result })
}

export async function DELETE(req: Request) {
  const data = await req.json()
  const result = await deleteTask(TaskRepositoryImpl, data)
  return NextResponse.json({ data: result })
}
