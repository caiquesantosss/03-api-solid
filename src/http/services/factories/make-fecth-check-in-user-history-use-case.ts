import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeFetchCheckInUserHistoryUseCase() {
  const CheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(CheckInsRepository)

  return useCase
}
