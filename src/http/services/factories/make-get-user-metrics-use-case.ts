import { GetUsersMetricsUseCase } from '../get-users-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMetricsUseCase() {
  const CheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUsersMetricsUseCase(CheckInsRepository)

  return useCase
}
