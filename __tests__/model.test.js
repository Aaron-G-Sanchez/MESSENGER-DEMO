const { describe, test, expect, beforeAll } = require('@jest/globals')
const { User, Chat, Message } = require('../src/models')
const { db } = require('../db/connection')

describe('Models', () => {
  beforeAll(async () => {
    await db.sync({ force: true })
  })

  describe('User', () => {
    test('Can create a user', async () => {
      const newUser = {
        userId: 123456,
        userName: 'Chravis'
      }

      const createdUser = await User.create(newUser)

      expect(createdUser).toEqual(expect.objectContaining(newUser))
    })
  })
})
