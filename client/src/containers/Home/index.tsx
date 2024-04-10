import React, { useState, useEffect, useCallback } from "react";
import { User } from "../../utils/types";
import { API } from "../../api/index.ts";
import UserCard from "../../components/UserCard/index.tsx";
import { Link } from "react-router-dom";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  const fetchData = useCallback(async () => {
    const isAuthenticated = await checkAuthenticationStatus();
    if (isAuthenticated) {
      const data = await API.getUser();
      const user = {
        id: data.id,
        name: data.display_name,
        external_urls: data.external_urls.spotify,
        image: data.images[0].url,
      };
      setUser(user);
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
          {!user ? <p>Loading...</p> : <UserCard user={user} />}
          <Link to="/Playlists">
            <button>Get Started</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
