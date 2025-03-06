import { SearchGymUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const GymRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(GymRepository)

  return useCase
}
