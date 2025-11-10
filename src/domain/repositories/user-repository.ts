import { User } from '../entities/user'

export interface UserRepository {
  createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User>
  getUser(user: User): Promise<User | null>
}
