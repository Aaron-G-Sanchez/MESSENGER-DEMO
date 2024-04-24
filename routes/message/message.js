const { Message } = require('../../models')
const express = require('express')
const { getMessages } = require('../../controllers')

const router = express()

// TODO Should be able to retrieve all messages belonging to a specific chat regardless of user id
router.get('/:chatId', async (req, res, next) => {
  // TODO Add error handling to validate the param.
  const { chatId } = req.params
  try {
    const messages = await Message.findAll({
      where: {
        ChatId: chatId
      }
    })

    res.send(messages)
  } catch (e) {
    next(e)
  }
})

// See all messages belonging to user in a specific chat.
router.get('/:userId/:chatId', async (req, res, next) => {
  const { userId, chatId } = req.params
  // TODO validate userId and chatId.
  let [messages, error] = await getMessages(userId, chatId)
  if (error != undefined) {
    return next(error)
  }
  res.send({ messages: messages })
})

// User sends message in specific chat.
router.post('/:userId/:chatId', async (req, res, next) => {
  // TODO Add error handling to check that the message is a string.
  const { userId, chatId } = req.params
  const { message } = req.body

  try {
    // TODO Move code to separate controller.
    const newMessage = await Message.create({
      message: message,
      UserId: userId,
      ChatId: chatId
    })

    res.send(newMessage)
  } catch (e) {
    next(e)
  }
})

module.exports = router
