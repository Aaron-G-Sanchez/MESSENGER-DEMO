import { socket } from '../socket'
import { useState } from 'react'

export const HelloEvent = () => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('send-message', message)
    setMessage('')
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={message} onChange={handleChange} />
        <button>Send</button>
      </form>
    </>
  )
}
