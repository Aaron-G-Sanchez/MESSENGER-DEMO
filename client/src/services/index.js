// Fetch messages by chatId from the backend.
export const FetchMessages = async (chatId) => {
  const response = await fetch(`http://localhost:3001/messages/${chatId}`).then(
    (data) => {
      return data.json()
    }
  )
  return response
}

// fetch method to send a message.
export const PostMessage = async (userId, chatId, message) => {
  try {
    fetch(`http://localhost:3001/messages/${userId}/${chatId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(message)
    })
  } catch (e) {
    throw new Error(e)
  }
}
