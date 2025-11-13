import React, { useState } from "react";
import { useLocation } from "react-router";
import PlayerCard from "../Players/PlayerCard";
import avg from "../utils/avg";
import InputComponent from "./InputComponent";
import "./Game.css";

export type Players = { name: string; score: number; avg: number[] }[];

export default function Game() {
  const location = useLocation();
  const [players, setPlayers] = useState<Players>(location.state);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sortedPlayers = [...players].sort((a, b) => a.score - b.score);

  return (
    <div className="game-container">
      <div className="current-player-display">
        <div className="currentPlayerRow">
          <h1 className={`current-player-name`}>
            {players[currentIndex].name}
          </h1>
          <div className={`current-player-score `}>
            {players[currentIndex].score}
          </div>
        </div>
        <div className="input-component-wrapper">
          <div className="divider">
            <InputComponent
              players={players}
              setPlayers={setPlayers}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
          <div className="divider">
            <div className="current-player-avg">
              <p>Avg:&nbsp;</p>
              <p>{avg(players[currentIndex].avg)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="player-cards-container">
        {sortedPlayers.map((e, key) => (
          <PlayerCard name={e.name} score={e.score} avg={e.avg} key={key} />
        ))}
      </div>
    </div>
  );
}
