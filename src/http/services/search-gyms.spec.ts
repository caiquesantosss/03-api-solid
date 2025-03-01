import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'
import { title } from 'process'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude:  -49.6401091
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude:  -49.6401091
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
        expect.objectContaining({ title: 'Javascript Gym' }),
    ])
  })

  it('should be able fetch paignated gyms search', async () => {
    for(let i = 1; i <= 22; i++) {
        await gymsRepository.create({
            title: `Javascript Gym ${i}`,
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude:  -49.6401091
          })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
        expect.objectContaining({ title: 'Javascript Gym 21' }),
        expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
