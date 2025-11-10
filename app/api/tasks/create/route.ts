import { createTask } from '@/src/application/use-cases/task-use-case'
import { TaskRepositoryImpl } from '@/src/infrastructure/repositories/task-repository-impl'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  const result = await createTask(TaskRepositoryImpl, data)
  return NextResponse.json({ data: result })
}
