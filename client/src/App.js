import React, { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const isAuthenticated = await checkAuthenticationStatus();
      if (isAuthenticated) {
        const response = await fetch("/get_playlists");
        const data = await response.json();
        setPlaylists(data);
        console.log(data);
      }
    };
    fetchData();
  }, []);

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

  const handleLogin = () => {
    fetch("/login")
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.auth_url;
      });
  };

  const handleLogout = () => {
    fetch("/logout").then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        // Render playlists or other content for logged-in users
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
