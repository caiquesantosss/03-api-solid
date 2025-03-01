import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Validate Check-in Use Case', () => {
  let CheckInRepository: InMemoryCheckInsRepository
  let sut: ValidateCheckInUseCase

  beforeEach(async () => {
    CheckInRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(CheckInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await CheckInRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    })

    await sut.execute({
      checkinId: createdCheckIn.id,
    })

    expect(createdCheckIn.validated_at).toEqual(expect.any(Date))
    expect(CheckInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(
      sut.execute({
        checkinId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await CheckInRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkinId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
