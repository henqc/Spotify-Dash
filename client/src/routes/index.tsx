import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../containers/Home/index.tsx";

export default function RoutesContainer() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
