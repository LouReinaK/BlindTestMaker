import React from 'react'
import { useParams } from 'react-router-dom'
import { useHost } from '@/hooks/useHost'

export default function HostView() {
  const { roomId: paramId } = useParams()
  const { roomId } = useHost()
  const displayId = roomId || paramId

  return (
    <div>
      <h2>Host View</h2>
      <p>Interface du MJ</p>
      <p>Room ID: {displayId || '—'}</p>
    </div>
  )
}
