const express = require('express')
const cors = require('cors')
const { messageRouter } = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Test route. WIll delete
app.get('/', (req, res, next) => {
  res.send({ msg: 'Hello World' })
})

// Message routes
app.use('/messages', messageRouter)

module.exports = {
  app
}
