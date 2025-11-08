import { User } from '@/src/domain/entities/user'
import { UserRepository } from '@/src/domain/repositories/user-repository'
import { prisma } from '../prisma/client'

export const UserRepositoryImpl: UserRepository = {
  createUser: async (user: User) => prisma.user.create({ data: user }),
  getUser: async (user: User) =>
    prisma.user.findFirst({
      where: { email: user.email, password: user.password },
    }),
}
