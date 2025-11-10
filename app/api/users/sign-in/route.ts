import { getUser } from '@/src/application/use-cases/get-user'
import { UserRepositoryImpl } from '@/src/infrastructure/repositories/user-repository-impl'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const user = await req.json()
  const result = await getUser(UserRepositoryImpl, user)
  return NextResponse.json({ data: result })
}
