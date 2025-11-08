import { createUser } from '@/src/application/use-cases/create-user'
import { UserRepositoryImpl } from '@/src/infrastructure/repositories/user-repository-impl'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const user = await req.json()
  await createUser(UserRepositoryImpl, user)
  return NextResponse.json({ message: 'Todo added' })
}
