import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      try {
        const entity = this.items.find(item => item.email === email)
        if (!entity) {
          throw new NotFoundError(`Entity not found using email ${email}`)
        }
        resolve(entity)
      } catch (error) {
        reject(Error(error))
      }
    })
  }

  async emailExists(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const entity = this.items.find(item => item.email === email)
        if (entity) {
          throw new ConflictError('Email address already used')
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
