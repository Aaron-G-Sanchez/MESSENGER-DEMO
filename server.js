const { app } = require('./routes/app')
// const { db } = require('./db/connection')
const port = 3001

app.listen(port, () => {
  // db.sync()
  console.log(`Listening at http://localhost:${port}`)
})
