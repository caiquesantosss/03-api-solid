import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchCheckInUserHistoryUseCase } from '@/http/services/factories/make-fecth-check-in-user-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const checkInHistoryUseCase = makeFetchCheckInUserHistoryUseCase()
  const { checkIns } = await checkInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  reply.status(200).send({
    checkIns,
  })
}
