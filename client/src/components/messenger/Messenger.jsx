import './messenger.css'
import { useState } from 'react'
import { ConnectionManager } from './components/ConnectionManager'
import { socket } from '../../socket'

export const Messenger = ({ messages, setMessages }) => {
  // Might need for posting a message to a specific chat
  const [chatId] = useState(2)
  // const [userId] = useState(3)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = async (e) => {
    e.preventDefault()

    // SOCKET.IO
    socket.volatile.emit('send-message', message)
    setMessage('')
  }

  // Catch event emitted from the backend.
  socket.on('return-message', (args) => {
    setMessages([...messages, args])
  })

  return (
    <>
      <div className="messenger">
        <ConnectionManager chatId={chatId} />
        <h1>Messenger!</h1>
        {messages.length > 0 ? (
          <div className="messages-container">
            {messages.map((message, idx) => (
              <div key={idx}>
                <p>{message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Messages yet!</p>
        )}

        <form onSubmit={sendMessage}>
          <input value={message} onChange={handleChange} />
          <button>Send!</button>
        </form>
      </div>
    </>
  )
}
