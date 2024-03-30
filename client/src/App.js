import React, { useState, useEffect } from "react";

function App() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Fetch playlists from Flask backend
    fetch("/get_playlists")
      .then((response) => response.json())
      .then((data) => {
        setPlaylists(data);
        console.log(data);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
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
  );
}

export default App;
