const { Message } = require('../../models')

// Util function to query the message table on the backend
const getMessages = async (userId, chatId) => {
  // Instantiate error and message variables
  let error
  let messages

  // Query the backend for messages that belong to provided user and chat.
  try {
    const userMessages = await Message.findAll({
      where: { UserId: userId, ChatId: chatId }
    })

    // TODO userMessages should be null if no messages are found so the return values need to be moved from the catch.
    // Set the value of messages and return the message and error variables
    messages = userMessages
    return [messages, error]
  } catch (e) {
    // Set the value of error to the error thrown and return
    error = e
    return [messages, error]
  }
}

// TODO create util function to create a message instance.

module.exports = {
  getMessages
}
