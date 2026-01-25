import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Player } from "../Players/Player";
import PlayerCard from "../Players/PlayerCard";
import avg from "../utils/avg";
import InputComponent from "./InputComponent";
import "./Game.css";
import ConfirmReset from "../ConfirmReset/ConfirmReset";
import { AutoTextSize } from "auto-text-size";

export default function Game() {
  const location = useLocation();
  const [players, setPlayers] = useState<Player[]>(location.state);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sortedPlayers = [...players].sort((a, b) => a.score - b.score);
  const [showConfirm, setShowConfirm] = useState(false);
  const { score } = useParams();
  const handleReset = () => {
    setShowConfirm(true);
  };
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustInputWrapper = () => {
      if (!inputWrapperRef.current) return;

      if (window.matchMedia("(orientation: portrait)").matches) {
        const vh = window.visualViewport
          ? window.visualViewport.height
          : window.innerHeight;
        inputWrapperRef.current.style.maxHeight = `${vh}px`;
      } else {
        inputWrapperRef.current.style.maxHeight = "";
      }
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", adjustInputWrapper);
    } else {
      window.addEventListener("resize", adjustInputWrapper);
    }
    adjustInputWrapper();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", adjustInputWrapper);
      } else {
        window.removeEventListener("resize", adjustInputWrapper);
      }
    };
  }, []);

  const handleConfirm = () => {
    setShowConfirm(false);
    if (score) {
      const resetPlayers = players.map((player) => {
        player.roundScores = [];
        player.score = Number(score);
        player.avg = [];
        return player;
      });
      setPlayers(resetPlayers);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="game-container">
      {showConfirm && (
        <ConfirmReset onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      <div className="current-player-display">
        <div className="currentPlayerRow">
          <h1 className={`current-player-name`}>
            <AutoTextSize maxFontSizePx={250}>
              {players[currentIndex].name}
            </AutoTextSize>
          </h1>
          <div className={`current-player-score `}>
            <AutoTextSize maxFontSizePx={250}>
              {players[currentIndex].score}
            </AutoTextSize>
          </div>
        </div>
        <div className="input-component-wrapper" ref={inputWrapperRef}>
          <div className="divider">
            <InputComponent
              players={players}
              setPlayers={setPlayers}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              handleReset={handleReset}
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
