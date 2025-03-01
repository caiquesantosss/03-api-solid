import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repostirory'

interface FetchNearByGymsUserCaseRequest {
  userlatitude: number
  userlongitude: number
}

interface FetchNearByGymsUserCaseResponse {
  gyms: Gym[]
}

// Dependency Inversion Principle
export class FetchNearByGymsUserCase {
  constructor(private gymsRepository: GymRepository) {}
  async execute({
    userlatitude, 
    userlongitude
  }: FetchNearByGymsUserCaseRequest): Promise<FetchNearByGymsUserCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userlatitude,
      longitude: userlongitude
    })

    return { gyms }
  }
}
