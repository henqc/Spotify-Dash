import { BrowserRouter } from "react-router-dom";
import RoutesContainer from "./routes/index.tsx";
import React from "react";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesContainer />
      </BrowserRouter>
    </>
  );
}
