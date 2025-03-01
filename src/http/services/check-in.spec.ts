import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

describe('Register Use Case', () => {
  let CheckInRepository: InMemoryCheckInsRepository
  let GymRepository: InMemoryGymRepository
  let sut: CheckInUseCase

  beforeEach(async () => {
    CheckInRepository = new InMemoryCheckInsRepository()
    GymRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(CheckInRepository, GymRepository)
    

    await GymRepository.create({
      id: 'gym-01',
      title: 'JavascriptGym',
      description: 'teste',
      phone: '1111111111',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    vi.useRealTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      UserLatitude: -27.2092052,
      UserLongitude:  -49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      UserLatitude: -27.2092052,
      UserLongitude:  -49.6401091,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        UserLatitude: -27.2092052,
        UserLongitude:  -49.6401091,
      })
    ).rejects.instanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check twice, but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      UserLatitude: -27.2092052,
      UserLongitude:  -49.6401091,
    })

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      UserLatitude: -27.2092052,
      UserLongitude:  -49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {

    GymRepository.items.push({
      id: 'gym-02',
      title: 'JavascriptGym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.4999945),
      longitude: new Decimal( -46.3493934),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        UserLatitude: -27.2092052,
        UserLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
