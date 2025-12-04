import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import App from "./App";
import Gamemode from "./Mode/Gamemode";
import Game from "./Game/Game";
import AddPlayer from "./Players/Player";

const root = document.getElementById("root");
if (root)
  ReactDOM.createRoot(root).render(
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Gamemode />} />
          <Route path="player/:score" element={<AddPlayer />} />
          <Route path="game/:score" element={<Game />} />
        </Route>
      </Routes>
    </HashRouter>,
  );
