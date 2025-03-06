import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/http/services/factories/make-create-gym-use-case'
import { makeCheckInUseCase } from '@/http/services/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = checkInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createGymUseCase = makeCheckInUseCase()
  await createGymUseCase.execute({
    gymId,
    userId: request.user.sub,
    UserLatitude: latitude,
    UserLongitude: longitude,
  })

  reply.status(201).send()
}
