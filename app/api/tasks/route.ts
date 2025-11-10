import { getAlltasks } from '@/src/application/use-cases/task-use-case'
import { TaskRepositoryImpl } from '@/src/infrastructure/repositories/task-repository-impl'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await getAlltasks(TaskRepositoryImpl)
  return NextResponse.json({ data: result })
}
