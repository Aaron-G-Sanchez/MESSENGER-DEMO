import './messenger.css'
import { useState } from 'react'
import { FetchMessages, PostMessage } from '../../services'

export const Messenger = ({ messages, setMessages }) => {
  const [chatId] = useState(2)
  const [userId] = useState(3)
  const [formValue, setFormValue] = useState('')

  const handleChange = (e) => {
    setFormValue(e.target.value)
  }

  const getMessages = async () => {
    const data = await FetchMessages(chatId)
    setMessages(data)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    const message = {
      message: formValue
    }
    const data = await PostMessage(userId, chatId, message)
    setFormValue('')

    await getMessages(chatId)
  }
  return (
    <>
      <div className="messenger">
        <h1>Messenger!</h1>
        <button onClick={getMessages}>Get Messages</button>
        {messages ? (
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id}>
                <p>{message.message}</p>
              </div>
            ))}
          </div>
        ) : null}

        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={handleChange} />
          <button>Send!</button>
        </form>
      </div>
    </>
  )
}
