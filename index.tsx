import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App/App.css";
import App from "./App/App";
import Gamemode from "./App/Gamemode";
import Player from "./App/Player";
import Game from "./App/Game/Game";

const root = document.getElementById("root");
if (root)
    ReactDOM.createRoot(root).render(
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Gamemode />} />
                    <Route path="player/:score" element={<Player />} />
                    <Route path="game" element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
