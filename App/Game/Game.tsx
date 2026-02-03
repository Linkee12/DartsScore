import React, { useState, useRef, useEffect } from "react";
import { Player } from "../Players/Player";
import PlayerCard from "../Players/PlayerCard";
import avg from "../utils/avg";
import InputComponent from "./InputComponent";
import styles from "./game.module.css";
import ConfirmReset from "../ConfirmReset/ConfirmReset";
import { useLocation, useParams } from "react-router";

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
    <div className={styles.gameContainer}>
      {showConfirm && (
        <ConfirmReset onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      <div className={styles.currentPlayerDisplay}>
        <div className={styles.currentPlayerRow}>
          <h1 className={styles.currentPlayerName}>
            {players[currentIndex].name}
          </h1>
          <div className={styles.currentPlayerScore}>
            {players[currentIndex].score}
          </div>
        </div>
        <div className={styles.inputComponentWrapper} ref={inputWrapperRef}>
          <div className={styles.divider}>
            <InputComponent
              players={players}
              setPlayers={setPlayers}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              handleReset={handleReset}
            />
          </div>
          <div className={styles.divider}>
            <div className={styles.currentPlayerAvg}>
              <p>Avg:&nbsp;</p>
              <p>{avg(players[currentIndex].avg)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.playerCardsContainer}>
        {sortedPlayers.map((e, key) => (
          <PlayerCard name={e.name} score={e.score} avg={e.avg} key={key} />
        ))}
      </div>
    </div>
  );
}
