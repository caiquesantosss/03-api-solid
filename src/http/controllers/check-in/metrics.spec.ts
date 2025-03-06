import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { profile } from 'console'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-In Metrics (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the total count of check-ins', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym', 
        latitude: -27.2092052,
        longitude: -49.6401091
      }
    })

    const checkIns = await prisma.checkIn.createMany({
        data: [
            {
                gymId: gym.id, 
                user_id: user.id
            }, 
            {
                gymId: gym.id, 
                user_id: user.id
            }
        ]
    })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

      expect(response.statusCode).toEqual(200)
      expect(response.body.checkInsCount).toEqual(2)
  })
})
