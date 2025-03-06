import { FetchNearByGymsUserCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const GymRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymsUserCase(GymRepository)

  return useCase
}
