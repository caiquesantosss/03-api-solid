import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repostirory'

interface SearchGymUseCaseRequest {
  query: string 
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

// Dependency Inversion Principle
export class SearchGymUseCase {
  constructor(private gymsRepository: GymRepository) {}
  async execute({
    query, 
    page
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
