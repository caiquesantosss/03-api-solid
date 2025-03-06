import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data: {
      name: 'Joe Doe',
      email: 'joedoe@gmail.com', 
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER', 
    }
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'joedoe@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token
  }
}
