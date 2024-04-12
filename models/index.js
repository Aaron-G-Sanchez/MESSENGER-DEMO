const { Chat } = require('./Chat')
const { Message } = require('./Message')
const { User } = require('./User')

User.hasMany(Message)
Message.belongsTo(User)

Chat.hasMany(Message)
Message.belongsTo(Chat)

Chat.belongsToMany(User, { through: 'User_Chat' })
User.belongsToMany(Chat, { through: 'User_Chat' })

module.exports = {
  User,
  Chat,
  Message
}
