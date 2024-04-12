const express = require('express')
const app = express()
const { getMessages } = require('../controllers')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Test route. WIll delete
app.get('/', (req, res, next) => {
  res.send({ msg: 'Hello World' })
})

// TODO Need to move route to sepereate file
app.get('/messages/:userId/:chatId', async (req, res, next) => {
  const { userId, chatId } = req.params
  // TODO Add logic to check if messages come back empty
  let [messages, error] = await getMessages(userId, chatId)
  if (error != undefined) {
    return next(error)
  }
  res.send({ messages: messages })
})
module.exports = {
  app
}
