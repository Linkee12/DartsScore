import React from "react";
import { useState } from "react";
import "./InputComponent.css";
import { Player } from "../Players/Player";

type InputComponentProps = {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  handleReset: () => void;
};

export default function InputComponent({
  players,
  setPlayers,
  currentIndex,
  setCurrentIndex,
  handleReset,
}: InputComponentProps) {
  const [input, setInput] = useState<string>("");
  const [isError, setIsError] = useState(false);

  function goBack() {
    const prevIdx = findActiveIndex(players, currentIndex, true);
    setCurrentIndex(prevIdx);
    players[prevIdx].score += players[prevIdx].roundScores.pop() ?? 0;
  }

  function findActiveIndex(
    players: Player[],
    currentIndex: number,
    rev: boolean = false,
  ): number {
    const arrLength = players.length;
    let index = rev
      ? (currentIndex - 1 + arrLength) % arrLength
      : (currentIndex + 1) % arrLength;
    let checked = 0;

    while (checked < arrLength) {
      if (players[index].score !== 0) {
        return index;
      }
      index = rev
        ? (index - 1 + arrLength) % arrLength
        : (index + 1) % arrLength;
      checked++;
    }

    return currentIndex;
  }

  function handleSubmit() {
    const scoreToSubtract = parseInt(input);
    if (isNaN(scoreToSubtract)) return;
    if (scoreToSubtract > 180) {
      setIsError(true);
    }
    const updatedPlayers = [...players];
    if (
      scoreToSubtract < 181 &&
      updatedPlayers[currentIndex].score - scoreToSubtract > -1
    ) {
      updatedPlayers[currentIndex].score -= scoreToSubtract;
      setPlayers(updatedPlayers);
      setIsError(false);
      setInput("");
      setCurrentIndex(findActiveIndex(players, currentIndex));
      players[currentIndex].avg.push(scoreToSubtract);
      players[currentIndex].roundScores.push(scoreToSubtract);
    }
  }

  return (
    <div className="input-container">
      <input
        placeholder="Score"
        type="number"
        value={input}
        className={`score-input ${isError ? "error" : ""}`}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <button
        className="number-button"
        onClick={() => goBack()}
        onMouseDown={(e) => e.preventDefault()}
      >
        ←
      </button>
      <button
        className="number-button"
        onClick={() => handleReset()}
        onMouseDown={(e) => e.preventDefault()}
      >
        ↻
      </button>
    </div>
  );
}
