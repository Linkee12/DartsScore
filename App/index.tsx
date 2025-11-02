import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import App from "./App";
import Gamemode from "./Mode/Gamemode";
import Player from "./Players/Player";
import Game from "./Game/Game";

const root = document.getElementById("root");
if (root)
  ReactDOM.createRoot(root).render(
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Gamemode />} />
          <Route path="player/:score" element={<Player />} />
          <Route path="game" element={<Game />} />
        </Route>
      </Routes>
    </HashRouter>,
  );
