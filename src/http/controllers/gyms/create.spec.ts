import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { profile } from 'console'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { title } from 'process'

describe('Create Gym (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description', 
        phone: '11999999999', 
        latitude: -27.2092052, 
        longitude: -49.6401091,
      })

      expect(response.statusCode).toEqual(201)
  })
})
