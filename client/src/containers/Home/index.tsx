import React, { useState, useEffect, useCallback } from "react";
import { API } from "../../api/index.ts";
import { Playlist } from "../../utils/types";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(
    undefined as any as Playlist[]
  );

  const fetchData = useCallback(async () => {
    const isAuthenticated = await checkAuthenticationStatus();
    if (isAuthenticated) {
      const data = await API.getPlaylists();
      const playlistsData = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        external_urls: item.external_urls,
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

  const handleLogin = async () => {
    try {
      const data = await API.login();
      window.location.href = data.auth_url;
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    await API.logout(setIsLoggedIn);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {!playlists ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {playlists.map((playlist, index) => (
                <li key={index}>
                  {`${playlist.name}  Description ----->  ${playlist.description}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
