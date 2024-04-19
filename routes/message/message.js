const express = require('express')
const { getMessages } = require('../../controllers')

const router = express()

router.get('/:userId/:chatId', async (req, res, next) => {
  const { userId, chatId } = req.params
  // TODO Add logic to check if messages come back empty
  let [messages, error] = await getMessages(userId, chatId)
  if (error != undefined) {
    return next(error)
  }
  res.send({ messages: messages })
})

module.exports = router
