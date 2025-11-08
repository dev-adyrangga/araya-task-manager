import { User } from '@/src/domain/entities/user'
import { UserRepository } from '@/src/domain/repositories/user-repository'

export const createUser = async (repo: UserRepository, user: User) => {
  return await repo.createUser(user)
}
