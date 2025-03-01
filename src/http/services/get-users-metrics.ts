import { CheckInsRepository } from '@/repositories/check-in-repository'

interface GetUsersMetricsUseCaseRequest {
  userId: string
}

interface GetUsersMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUsersMetricsUseCase {
  constructor(private CheckInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUsersMetricsUseCaseRequest): Promise<GetUsersMetricsUseCaseResponse> {
    const checkInsCount = await this.CheckInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
