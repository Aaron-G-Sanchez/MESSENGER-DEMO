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
        userId: 123,
        userName: 'User 123'
      }

      const createdUser = await User.create(newUser)

      expect(createdUser).toBeInstanceOf(User)
      expect(createdUser).toEqual(expect.objectContaining(newUser))
    })
  })

  describe('Message', () => {
    test('User can creeate a message', async () => {
      const testMessage = {
        message: 'This is a trial message'
      }

      const createdMessage = await Message.create(testMessage)

      expect(createdMessage).toBeInstanceOf(Message)
      expect(createdMessage).toEqual(expect.objectContaining(testMessage))
    })
  })

  describe('Chat', () => {
    test('Can create a chat', async () => {
      const createdChat = await Chat.create()

      expect(createdChat).toBeInstanceOf(Chat)
    })
  })

  describe('Associations', () => {
    test('Should associate a message to a user', async () => {
      const userWithAssociation = {
        userId: 456,
        userName: 'User 456'
      }

      const messageWithAssociation = {
        message: 'Message for user 456'
      }

      const newUser = await User.create(userWithAssociation)
      const newMessage = await Message.create(messageWithAssociation)

      await newUser.addMessage(newMessage)

      const userWithMessage = await User.findByPk(newUser.id, {
        include: Message
      })

      expect(userWithMessage).toBeInstanceOf(User)
      expect(userWithMessage.Messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining(messageWithAssociation)
        ])
      )
    })
  })
})
