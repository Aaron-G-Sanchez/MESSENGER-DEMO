const { db } = require('../db/connection')

const Chat = db.define(
  'Chat',
  {},
  {
    timestamps: true
  }
)

module.exports = {
  Chat
}
