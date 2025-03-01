import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { UserAlredyExistsError } from '../services/errors/user-alredy-exits-error'
import { AuthenticateUseCase } from '../services/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositoriy'
import { InvalidCredentialsError } from '../services/errors/invalid-credentials-error'
import { makeAutheticateUseCase } from '../services/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAutheticateUseCase()

    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  reply.status(200 ).send()
}
