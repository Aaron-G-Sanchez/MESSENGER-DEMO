import { socket } from '../../../socket'

export const ConnectionManager = ({ chatId }) => {
  const connect = () => {
    socket.auth = { chatId }
    socket.connect()
  }

  const disconnect = () => {
    socket.disconnect()
  }
  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  )
}
