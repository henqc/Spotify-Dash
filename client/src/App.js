import React, { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (checkAuthenticationStatus()) {
      fetch("/get_playlists")
        .then((response) => response.json())
        .then((data) => {
          setPlaylists(data);
          console.log(data);
        });
    }
    // Fetch playlists from Flask backend
  }, []); // Empty dependency array means this effect runs once on mount

  const checkAuthenticationStatus = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("login")) {
      if (searchParams.get("login") === "success") {
        setIsLoggedIn(true);
        return true;
      }
    }
  };

  const handleLogin = () => {
    fetch("/login")
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.auth_url;
      });
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        // Render playlists or other content for logged-in users
        <div>
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
