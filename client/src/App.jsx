import './App.css'
import { Messenger } from './components/messenger/Messenger'
import { useState } from 'react'

function App() {
  const [messages, setMessages] = useState([])

  return (
    <>
      <Messenger messages={messages} setMessages={setMessages} />
    </>
  )
}

export default App
