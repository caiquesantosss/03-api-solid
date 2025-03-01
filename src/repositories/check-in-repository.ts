import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    save(checkin: CheckIn): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findById(checkinId: string): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    countByUserId(userId: string): Promise<number>
}