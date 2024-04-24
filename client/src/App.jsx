import './App.css'
import { Messenger } from './components/messenger/Messenger'
import { useState, useEffect } from 'react'

// SOCKET.IO.
import { socket } from './socket'
import { ConnectionState } from './components/ConnectionState'
import { Events } from './components/Events'
import { ConnectionManager } from './components/ConnectionManager'
import { MyForm } from './components/MyForm'

function App() {
  const [messages, setMessages] = useState(null)
  // SOCKET STATE.
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [fooEvents, setFooEvents] = useState([])

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    const onFooEvent = (value) => {
      setFooEvents((previous) => [...previous, value])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('foo', onFooEvent)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('foo', onFooEvent)
    }
  }, [])

  return (
    <>
      <Messenger messages={messages} setMessages={setMessages} />

      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
    </>
  )
}

export default App
