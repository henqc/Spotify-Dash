import React, { useState, useEffect, useCallback } from "react";
import { API } from "../../api/index.ts";
import { Playlist } from "../../utils/types";
import Card from "../../components/Card/index.tsx";

const PlaylistPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(
    undefined as any as Playlist[]
  );

  const fetchData = useCallback(async () => {
    const isAuthenticated = await checkAuthenticationStatus();
    if (isAuthenticated) {
      const data = await API.getPlaylists();
      const playlistsData: Playlist[] = data.items.map((item: any) => ({
        name: item.name,
        description: item.description,
        images: item.images[0].url,
        id: item.id,
      }));
      setPlaylists(playlistsData);
      console.log(data);
      console.log(playlists);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, isLoggedIn]);

  const checkAuthenticationStatus = async () => {
    const data = await API.verify();
    if (data.logged_in) {
      setIsLoggedIn(true);
      return true;
    } else {
      setIsLoggedIn(false);
      return false;
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>No User</div>
      ) : (
        <div>
          {!playlists ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {playlists.map((playlist, index) => (
                <Card key={index} playlist={playlist} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
