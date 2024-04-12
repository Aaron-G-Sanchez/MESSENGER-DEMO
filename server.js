const { app } = require('./app')
// const { db } = require()
const port = 3001

app.listen(port, () => {
  // db.sync()
  console.log(`Listening at http://localhost:${port}`)
})
