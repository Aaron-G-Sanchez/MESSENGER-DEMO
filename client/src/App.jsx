import './App.css'
// import { Messenger } from './components/messenger/Messenger'
// import { useState } from 'react'

// SOCKET.IO.
// import { ConnectionState } from './components/ConnectionState'
import { ConnectionManager } from './components/ConnectionManager'
import { HelloEvent } from './components/HelloEvent'

function App() {
  // const [messages, setMessages] = useState(null)
  // SOCKET STATE.
  // const [isConnected] = useState(false)

  return (
    <>
      {/* <Messenger messages={messages} setMessages={setMessages} /> */}
      <>
        {/* <ConnectionState isConnected={isConnected} /> */}
        <ConnectionManager />
        <HelloEvent />
      </>
    </>
  )
}

export default App
