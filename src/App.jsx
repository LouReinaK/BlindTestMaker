import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainView from '@/views/MainView'
import HostView from '@/views/HostView'
import PlayerView from '@/views/PlayerView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/host/*" element={<HostView />} />
        <Route path="/room/:roomId" element={<PlayerView />} />
      </Routes>
    </BrowserRouter>
  )
}
