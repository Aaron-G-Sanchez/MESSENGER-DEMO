import './messenger.css'
import { useState } from 'react'
import { ConnectionManager } from './components/ConnectionManager'
import { socket } from '../../socket'

export const Messenger = ({ messages, setMessages }) => {
  // Might need for posting a message to a specific chat
  const [chatId, setChatId] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    // SOCKET.IO
    socket.volatile.emit('send-message', {
      message,
      to: chatId
    })
    setMessage('')
  }

  const assignChatId = (e) => {
    const intChatId = Number(e.target.value)
    setChatId(intChatId)
  }

  // Catch events emitted from the backend.
  // TODO for a connection error, a loader or message should be added
  // and a boolean should be set.
  socket.on('connect_error', (error) => {
    console.log(error)
  })

  socket.on('return-message', ({ message, from }) => {
    setMessages([...messages, message])
  })

  return (
    <>
      <div>
        <label>Chat Id: {chatId && chatId}</label>
        <select id="chat-id-select" onChange={assignChatId}>
          <option>-- SELECT CHAT --</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="12">12</option>
        </select>
      </div>

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
