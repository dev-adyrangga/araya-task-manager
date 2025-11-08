import { User } from '@/src/domain/entities/user'
import { UserRepository } from '@/src/domain/repositories/user-repository'

export const getUser = async (repo: UserRepository, user: User) => {
  return await repo.getUser(user)
}
