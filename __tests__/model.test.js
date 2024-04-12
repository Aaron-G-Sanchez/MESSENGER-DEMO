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
        message: 'This is an unassociated message'
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
        message: 'Message for User 456'
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

    test('Should associate a user and message to a chat', async () => {
      const userWithAssociation = {
        userId: 789,
        userName: 'User 789'
      }

      const messageWithAssociation = {
        message: 'Message for User 789'
      }

      // Create new instances of each model
      const createdUser = await User.create(userWithAssociation)
      const createdMessage = await Message.create(messageWithAssociation)
      const createdChat = await Chat.create()

      // Associate the a user and their message to a chat
      await createdUser.setChat(createdChat)

      await createdMessage.setUser(createdUser)
      await createdMessage.setChat(createdChat)

      // Requery for the chat and include messages and the user
      const chatWithUser = await Chat.findByPk(createdChat.id, {
        include: [User, Message]
      })

      // Validate that associations were set accordingly
      expect(chatWithUser).toBeInstanceOf(Chat)
      expect(chatWithUser.Users).toEqual(
        expect.arrayContaining([expect.objectContaining(userWithAssociation)])
      )
      expect(chatWithUser.Messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining(messageWithAssociation)
        ])
      )
    })
  })
})
