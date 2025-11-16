import React from 'react'
import { useParams } from 'react-router-dom'

export default function PlayerView() {
  const { roomId } = useParams()
  return (
    <div>
      <h2>Player View</h2>
      <p>Room ID: {roomId}</p>
    </div>
  )
}
