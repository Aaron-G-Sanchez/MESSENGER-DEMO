const express = require('express')
const { createServer } = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { messageRouter } = require('./routes')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Test route. WIll delete
app.get('/', (req, res, next) => {
  res.send({ msg: 'Hello World' })
})

// Message routes
app.use('/messages', messageRouter)

io.on('connect', (socket) => {
  console.log(socket.id)
})

module.exports = {
  httpServer
}
