import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

describe('Create Gym Use Case', () => {
  let GymRepository: InMemoryGymRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    GymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(GymRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -27.2092052,
      longitude:  -49.6401091
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
