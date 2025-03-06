import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/http/services/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricesUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricesUseCase.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({
    checkInsCount,
  })
}
