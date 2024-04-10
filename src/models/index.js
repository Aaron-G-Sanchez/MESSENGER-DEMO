const { Chat } = require('./Chat')
const { Message } = require('./Message')
const { User } = require('./User')

User.hasMany(Message)
Message.belongsTo(User)

Chat.hasMany(Message)
Message.belongsTo(Chat)

Chat.hasMany(User)
User.belongsTo(Chat)

module.exports = {
  User,
  Chat,
  Message
}
