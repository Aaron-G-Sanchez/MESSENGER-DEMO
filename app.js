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

io.on('connection', (socket) => {
  // console.log(socket.id)
  console.log('new connection has been created')

  // Event?
  // Event emitted on the front end.
  socket.on('send-message', (args) => {
    console.log(args)
    // Maybe create the message in the db here.
    // Then send back the message for the front end to display.
    const reversedArgs = args.split('').reverse().join('')
    socket.emit('return-message', reversedArgs)
  })
})

module.exports = {
  httpServer
}
