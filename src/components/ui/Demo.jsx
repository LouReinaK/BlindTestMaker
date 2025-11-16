import { Button, HStack } from "@chakra-ui/react"
import { WORKER_URL, WEBSOCKET_URL } from "@/config"

const Demo = ({color = "lightgreen"}) => {
  return (
    <HStack>
      <Button bg={color} borderBottom={`2px solid ${color}`} _hover={{borderBottom: `2px solid black`}} _active={{bg:"blue"}} onClick={createRoom}>Click me</Button>
    </HStack>
  )
}

async function createRoom() {
  // appeler l'api worker pour créer une room et récupérer l'id
  const res = await fetch(WORKER_URL + 'create-room');
  const data = await res.json();
  const roomId = data.roomId;
  console.log("Room created with ID:", roomId);

  // créer une connexion websocket avec l'id de la room
  const ws = new WebSocket(WEBSOCKET_URL + 'rooms/' + roomId);

  ws.onopen = () => {
    console.log("WebSocket connection opened.");
  };

  ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
  };
}

export default Demo