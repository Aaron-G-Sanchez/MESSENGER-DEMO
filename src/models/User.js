const { db, DataTypes } = require('../../db/connection')

const User = db.define(
  'User',
  {
    userId: DataTypes.NUMBER,
    userName: DataTypes.STRING
  },
  {
    timestamps: true
  }
)

module.exports = {
  User
}
