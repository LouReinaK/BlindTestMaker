import React from 'react'
import { Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { usePlayer } from '@/hooks/usePlayer'

export default function PlayerView() {
  const {
    rearchResults,
    selectedSongs,
    searchSpotify,
    sendSelectedSongs
  } = usePlayer();
  
  const { roomId } = useParams()
  return (
    <div>
      <h2>Player View</h2>
      <p>Room ID: {roomId}</p>
      <Button onClick={() => searchSpotify("test", 1)}>Test Spotify API</Button>
    </div>
  )
}
