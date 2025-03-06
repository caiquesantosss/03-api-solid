import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/http/services/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchemaa = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchemaa.parse(request.query)

  const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase()
  const { gyms } = await fetchNearbyGymUseCase.execute({
    userlatitude: latitude,
    userlongitude: longitude,
  })

  reply.status(201).send({
    gyms,
  })
}
