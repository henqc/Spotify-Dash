import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../containers/Home/index.tsx";
import Playlists from "../containers/Playlists/index.tsx";
import Reccomendations from "../containers/Reccomendations/index.tsx";

export default function RoutesContainer() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Playlists" element={<Playlists />} />
      <Route path="/Playlists/:id" element={<Reccomendations />} />
    </Routes>
  );
}
