const getPlaylists = async () => {
  const response = await fetch("/get_playlists");
  const data = await response.json();
  return data;
};

const verify = async () => {
  const response = await fetch("/verify");
  const data = await response.json();
  return data;
};

const login = async () => {
  const response = await fetch("/login");
  const data = await response.json();
  return data;
};

const logout = async (
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    await fetch("/logout");
    setIsLoggedIn(false);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const API = { getPlaylists, verify, login, logout };
