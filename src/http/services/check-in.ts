import { CheckInsRepository } from '@/repositories/check-in-repository'
import { GymRepository } from '@/repositories/gym-repostirory'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { error } from 'console'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

interface ChekInUseCaseRequest {
  userId: string
  gymId: string
  UserLatitude: number
  UserLongitude: number
}

interface ChekInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private CheckInsRepository: CheckInsRepository,
    private GymsRepository: GymRepository
  ) {}

  async execute({
    userId,
    gymId,
    UserLatitude,
    UserLongitude,
  }: ChekInUseCaseRequest): Promise<ChekInUseCaseResponse> {
    const gym = await this.GymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: UserLatitude, longitude: UserLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }
    

    const checkInOnSameDay = await this.CheckInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.CheckInsRepository.create({
      gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
