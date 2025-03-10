import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearByParams {
    latitude: number
    longitude: number
}

export interface GymRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findById(id: string): Promise<Gym | null>
    findManyNearby(params: FindManyNearByParams): Promise<Gym[]>
    searchMany(query: string, page: number): Promise<Gym[]>
}