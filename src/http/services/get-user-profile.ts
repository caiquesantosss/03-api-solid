import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUseProfileUseCaseRequest {
  userId: string
}

interface GetUseProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId, 
  }: GetUseProfileUseCaseRequest): Promise<GetUseProfileUseCaseResponse> {
    const user = await this.usersRepository.findByUserId(userId)

    if (!user) {
        throw new ResourceNotFoundError()
    } 

    return {
        user,
    }
  }
}
