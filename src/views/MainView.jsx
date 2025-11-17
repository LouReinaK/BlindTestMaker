import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useHost } from '@/hooks/useHost'

export default function MainView() {
  const navigate = useNavigate()
  const { createRoom } = useHost()

  const handleStart = async () => {
    const id = await createRoom()
    if (id) {
      navigate(`/host/${id}`)
    } else {
      console.error('Failed to create room')
    }
  }

  return (
    <div>
      <h2>Main View</h2>
      <p>Bienvenue sur BlindTestMaker</p>
      <Button colorScheme="teal" size="md" onClick={handleStart}>
        Commencer
      </Button>
    </div>
  )
}
