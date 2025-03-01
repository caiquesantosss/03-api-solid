import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let CheckInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch Check-in History Use Case', () => {
  beforeEach(async () => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(CheckInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await CheckInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    })

    await CheckInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
        expect.objectContaining({ gymId: 'gym-01' }),
        expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })

  it('should be able fetch paignated check-in history', async () => {
    for(let i = 1; i <= 22; i++) {
        await CheckInsRepository.create({
            gymId: `gym-${i}`,
            user_id: 'user-01',
          })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
        expect.objectContaining({ gymId: 'gym-21' }),
        expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})
