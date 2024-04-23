// Fetch messages by chatid from the backend
export const fetchMessages = async (chatId) => {
  const response = await fetch(`http://localhost:3001/messages/${chatId}`).then(
    (data) => {
      return data.json()
    }
  )
  console.log(response)
  return response
}
