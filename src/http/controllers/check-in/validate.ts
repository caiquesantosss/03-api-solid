import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/http/services/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInsParamsSchema = z.object({
    checkinId: z.string().uuid(),
  })

  const { checkinId } = validateCheckInsParamsSchema.parse(request.params)

  const ValidadeCheckInUseCase = makeValidateCheckInUseCase()
  await ValidadeCheckInUseCase.execute({
    checkinId
  })

  reply.status(204).send()
}
