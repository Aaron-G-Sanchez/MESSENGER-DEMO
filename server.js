const { httpServer } = require('./app')
const { db } = require('./db/connection')
const port = 3001

httpServer.listen(port, () => {
  db.sync()
  console.log(`Listening at http://localhost:${port}`)
})
