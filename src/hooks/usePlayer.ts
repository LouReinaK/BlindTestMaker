import { useEffect, useRef, useState, useCallback } from 'react';

import { WORKER_URL } from '../config';
import { Song } from '../types';

export function usePlayer(roomId: string) {
  const [ searchResults, setSearchResults ] = useState<Song[]>([]);
  const [ selectedSongs, setSelectedSongs ] = useState<Song[]>([]);

  const searchSpotify = useCallback(async (query:string, page:number) => {
    const searchResponse = await fetch(`${WORKER_URL}/spotifySearch/`, {
      method: 'POST',
      body: JSON.stringify({ "query" : query, "page": page }),
    });
    const data = await searchResponse.json();
    console.log("Search Results:", data);
    setSearchResults(data);
  }, [setSearchResults]);

  const sendSelectedSongs = useCallback(async () => {
    selectedSongs.forEach(async (song) => {
      const songId = song.id;
      const addSongResponse = await fetch(`${WORKER_URL}/rooms/${roomId}/add-song/`, {
        method: 'POST',
        body: JSON.stringify({ "songId" : songId }),
      });
      if (addSongResponse.ok) {
        console.log("Song added successfully");
        return true;
      } else {
        console.error("Failed to add song");
        return false;
      }
    });
  }, [selectedSongs, roomId]);

  const addSong = useCallback((song: Song) => {
    setSelectedSongs((prevSelected) => [...prevSelected, song]);
  }, [setSelectedSongs]);

  const removeSong = useCallback((songId: string) => {
    setSelectedSongs((prevSelected) =>
      prevSelected.filter((song) => song.id !== songId)
    );
  }, [setSelectedSongs]);

  return {
    searchResults,
    selectedSongs,
    searchSpotify,
    sendSelectedSongs,
  };
}