import './messenger.css'
import { useState } from 'react'
// import { FetchMessages, PostMessage } from '../../services'
import { ConnectionManager } from './components/ConnectionManager'
import { socket } from '../../socket'

export const Messenger = () => {
  // Might need for posting a message to a specific chat
  // const [chatId] = useState(2)
  // const [userId] = useState(3)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    // PRE-SOCKET.IO IMPLEMENTATION
    // Probably don't need to await here.
    // await PostMessage(userId, chatId, message)

    // SOCKET.IO
    socket.volatile.emit('send-message', message)
    setMessage('')
  }

  return (
    <>
      <div className="messenger">
        <ConnectionManager />
        <h1>Messenger!</h1>
        {/* {messages ? (
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id}>
                <p>{message.message}</p>
              </div>
            ))}
          </div>
        ) : null} */}

        <form onSubmit={sendMessage}>
          <input value={message} onChange={handleChange} />
          <button>Send!</button>
        </form>
      </div>
    </>
  )
}
