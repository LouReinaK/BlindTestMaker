import { Button, HStack } from "@chakra-ui/react"
import { WORKER_URL, WEBSOCKET_URL } from "@/config"

const Demo = ({color = "lightgreen"}) => {
  return (
    <HStack>
      <Button bg={color} borderBottom={`2px solid ${color}`} _hover={{borderBottom: `2px solid black`}} _active={{bg:"blue"}} onClick={createRoom}>Token</Button>
      <Button bg={color} borderBottom={`2px solid ${color}`} _hover={{borderBottom: `2px solid black`}} _active={{bg:"blue"}} onClick={searchSpotify}>Search</Button>
    </HStack>
  )
}
let roomId = null;

const createRoom = async () => {
  const response = await fetch(`${WORKER_URL}/create-room`, {
    method: 'POST',
  });
  const data = await response.json();
  console.log("Room ID:", data.roomId);

  roomId = data.roomId;

  const ws = new WebSocket(`${WEBSOCKET_URL}/rooms/${data.roomId}`);
  ws.onopen = () => {
    console.log('WebSocket connection established');
    ws.send(JSON.stringify({ type: 'join', roomId: data.roomId }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };
}

const searchSpotify = async () => {
  const searchResponse = await fetch(`${WORKER_URL}/spotifySearch/`, {
    method: 'POST',
    body: JSON.stringify({ "query" : "imagine dragons", "page": 1 }),
  });
  const data = await searchResponse.json();
  console.log("Search Results:", data);

  const addSongResponse = await fetch(`${WORKER_URL}/rooms/${roomId}/add-song/`, {
    method: 'POST',
    body: JSON.stringify({ "songId" : "à la peche aux moules moules moules" }),
  });
  if (addSongResponse.ok) {
    console.log("Song added successfully");
  } else {
    console.error("Failed to add song");
  }
};

export default Demo