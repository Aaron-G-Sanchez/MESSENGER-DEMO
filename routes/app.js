const express = require('express')
const app = express()
const { getMessages } = require('../controllers')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  res.send({ msg: 'Hello World' })
})

app.get('/messages/:userId/:chatId', async (req, res, next) => {
  const { userId, chatId } = req.params
  let [messages, error] = await getMessages(userId, chatId)
  if (error != undefined) {
    return next(error)
  }
  res.send({ messages: messages })
})
module.exports = {
  app
}
