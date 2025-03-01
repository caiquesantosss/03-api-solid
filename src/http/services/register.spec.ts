import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exits-error'

describe('Register Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Joe Doe',
      email: 'joedoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Joe Doe',
      email: 'joedoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same emai twice', async () => {
    const email = 'joedoeteste@gmail.com'

    await sut.execute({
      name: 'Joe Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Joe Doe',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlredyExistsError)
  })
})
