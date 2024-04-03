import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const fetchData = useCallback(async () => {
    const isAuthenticated = await checkAuthenticationStatus();
    if (isAuthenticated) {
      const response = await fetch("/get_playlists");
      const data = await response.json();
      setPlaylists(data);
      console.log(data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const checkAuthenticationStatus = async () => {
    const response = await fetch("/verify");
    const data = await response.json();
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
      const response = await fetch("/login");
      const data = await response.json();
      window.location.href = data.auth_url;
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/logout");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {typeof playlists.items === "undefined" ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {playlists.items.map((playlist, index) => (
                <li key={index}>
                  {`${playlist.name}  URL ----->  ${playlist.external_urls["spotify"]}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
