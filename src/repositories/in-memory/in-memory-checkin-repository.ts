import { CheckIn, Prisma, User } from '@prisma/client'
import { CheckInsRepository } from '../check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {

  public items: CheckIn[] = []
  
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')
    
    const checkInOnSameDate = this.items.find((checkIn) => {
      const CheckInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
      CheckInDate.isAfter(startOfDay) && CheckInDate.isBefore(endOfDay)
      
      return checkIn.user_id === userId && isOnSameDate
    })
    
    if (!checkInOnSameDate) {
      return null
    }
    
    return checkInOnSameDate
  }
  
  async findById(id: string) {
    const checkinId = this.items.find((item) => item.id === id)

    if (!checkinId) {
      return null
    }

    return checkinId
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id) 
  
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }
  
  async findManyByUserId(userId: string, page: number) {
    return this.items
    .filter((item) => item.user_id === userId)
    .slice((page - 1) * 20, page * 20)
  }
  
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gymId: data.gymId,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    
    this.items.push(checkIn)
    
    return checkIn
  }
}
