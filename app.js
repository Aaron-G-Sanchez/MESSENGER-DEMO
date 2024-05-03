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

// Placeholder parties
const parties = [{ id: 12 }, { id: 2 }]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Test route. WIll delete
app.get('/', (req, res, next) => {
  res.send({ msg: 'Hello World' })
})

// Message routes
app.use('/messages', messageRouter)

/** ######## SOCKET IMPLEMENTATION ######## */

// Socket middleware to validate that the party
// the client is requesting to join is indeed a party.
io.use((socket, next) => {
  const chatId = socket.handshake.auth.chatId

  let gate = false
  // Loop through array of parties and check that the party exists.
  // In PH if there is NO party we don't even want to try and connect.
  for (let party of parties) {
    if (party.id === chatId) {
      gate = true
    }
  }

  if (!gate) {
    return next(new Error('Invalid party id'))
  }

  socket.partyId = chatId
  next()
})

io.on('connection', (socket) => {
  console.log('new connection has been created')

  socket.join(socket.partyId.toString())
  console.log(`Connected ${socket.id} to room ${socket.partyId.toString()}`)

  // // Event?
  // // Event emitted on the front end.
  socket.on('send-message', ({ message, to }) => {
    io.to(to.toString()).emit('return-message', {
      message,
      from: socket.id
    })
    // Maybe create the message in the db here.
    // Then send back the message for the front end to display.
    // const reversedArgs = args.split('').reverse().join('')
    // io.emit('return-message', reversedArgs)
  })
})

module.exports = {
  httpServer
}
