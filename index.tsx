import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App/app";
import Player from "./App/player";
import Gamemode from "./App/gamemode";
import Game from "./App/game";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route element={<App />}>
                <Route path="/" element={<Gamemode />} />
                <Route path="player" element={<Player />} />
                <Route path="game" element={<Game />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
