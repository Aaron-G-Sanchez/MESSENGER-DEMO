import './messenger.css'
import { useState } from 'react'
import { fetchMessages } from '../../services'

export const Messenger = ({ messages, setMessages }) => {
  const [chatId] = useState(2)

  const getMessages = async () => {
    const data = await fetchMessages(chatId)
    setMessages(data)
  }

  return (
    <>
      <div className="messenger">
        <h1>Messenger!</h1>
        <button onClick={getMessages}>Get Messages</button>
        {messages ? (
          messages.map((message) => (
            <div key={message.id}>
              <p>{message.message}</p>
            </div>
          ))
        ) : (
          <div>This is a test</div>
        )}
      </div>
    </>
  )
}
