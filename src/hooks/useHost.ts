import { useEffect, useRef, useState, useCallback } from "react";
import { WORKER_URL, WEBSOCKET_URL } from "@/config";

export function useHost() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [titlesList, setTitlesList] = useState<Object[]>([]);
  const [hostConnected, setHostConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const createRoom = useCallback(async () => {
    const res = await fetch(WORKER_URL + 'create-room');
    const data = await res.json();
    const newRoomId = data.roomId;
    setRoomId(newRoomId);
    console.log("Room created with ID:", newRoomId);

    const ws = new WebSocket(WEBSOCKET_URL + 'rooms/' + newRoomId);
    ws.onopen = () => {
      console.log("WebSocket connection opened.");
      setHostConnected(true);
    };
    wsRef.current = ws;

    ws.onmessage = (event) => {
      console.log("New title added:", event.data);
      const title = JSON.parse(event.data);
      addTitle(title);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.warn("WebSocket connection closed.");
      setHostConnected(false);
    };
  }, []);

  const addTitle = useCallback((title: Object) => {
    setTitlesList((prevTitles) => [...prevTitles, title]);
  }, []);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    roomId,
    wsRef,
    titlesList,
    hostConnected,

    createRoom,
  };
}