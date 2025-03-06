import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlredyExistsError } from '../../services/errors/user-alredy-exits-error'
import { makeRegisterUseCase } from '../../services/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerbOdySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerbOdySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  reply.status(201).send()
}
