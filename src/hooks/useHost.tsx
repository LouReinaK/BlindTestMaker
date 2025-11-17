import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { WORKER_URL, WEBSOCKET_URL } from '@/config'

type HostContextType = {
  roomId: string | null
  wsRef: React.MutableRefObject<WebSocket | null>
  trackList: string[]
  hostConnected: boolean
  createRoom: () => Promise<string | null>
  connectToRoom: (id: string) => void
}

const HostContext = createContext<HostContextType | undefined>(undefined)

export function HostProvider({ children }: { children: React.ReactNode }) {
  const [roomId, setRoomId] = useState<string | null>(null)
  const [trackList, setTrackList] = useState<string[]>([])
  const [hostConnected, setHostConnected] = useState<boolean>(false)
  const wsRef = useRef<WebSocket | null>(null)

  const addTrack = (track: string) => {
    setTrackList((prev) => [...prev, track])
  }

  const connectWebSocket = (newRoomId: string) => {
    if (wsRef.current) return
    const ws = new WebSocket(`${WEBSOCKET_URL}/rooms/${newRoomId}`)
    ws.onopen = () => {
      console.log('WebSocket connection opened.')
      setHostConnected(true)
    }
    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data)
        const songId = payload.songId
        if (songId) addTrack(songId)
      } catch (e) {
        console.warn('Failed to parse WS message', e)
      }
    }
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    ws.onclose = () => {
      console.log('WebSocket connection closed.')
      setHostConnected(false)
      wsRef.current = null
    }
    wsRef.current = ws
  }

  const createRoom = async (): Promise<string | null> => {
    const res = await fetch(`${WORKER_URL}/create-room`)
    if (!res.ok) {
      console.error('create-room failed', await res.text())
      return null
    }
    const data = await res.json()
    const newRoomId = data.roomId
    setRoomId(newRoomId)
    connectWebSocket(newRoomId)
    return newRoomId
  }

  const connectToRoom = (id: string) => {
    setRoomId(id)
    connectWebSocket(id)
  }

  // Cleanup on page unload
  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close()
    }
  }, [])

  return (
    <HostContext.Provider
      value={{ roomId, wsRef, trackList, hostConnected, createRoom, connectToRoom }}
    >
      {children}
    </HostContext.Provider>
  )
}

export function useHost() {
  const ctx = useContext(HostContext)
  if (!ctx) {
    throw new Error('useHost must be used within a HostProvider')
  }
  return ctx
}

export default useHost
