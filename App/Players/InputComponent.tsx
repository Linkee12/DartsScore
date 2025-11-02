import React from "react";
import { useState } from "react";
import { Players } from "../Game/Game";
import "./InputComponent.css";

type Player = {
  name: string;
  score: number;
  avg: number[];
};

type InputComponentProps = {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Players>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function InputComponent({
  players,
  setPlayers,
  currentIndex,
  setCurrentIndex,
}: InputComponentProps) {
  const [input, setInput] = useState<string>("");
  const [isError, setIsError] = useState(false);

  const handleClick = (digit: number) => {
    setInput((prev) => prev + digit.toString());
  };
  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  function nextIndex(players: Players, currentIndex: number): number {
    const arrLength = players.length;
    let index = (currentIndex + 1) % arrLength;
    let checked = 0;

    while (checked < arrLength) {
      if (players[index].score !== 0) {
        return index;
      }
      index = (index + 1) % arrLength;
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
      setCurrentIndex(nextIndex(players, currentIndex));
      players[currentIndex].avg.push(scoreToSubtract);
    }
  }

  const buttonRows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <div className="input-container">
      {buttonRows.map((row, i) => (
        <div key={i} className="button-row">
          {row.map((num) => (
            <button
              key={num}
              onMouseDown={(e) => e.preventDefault()}
              className="number-button"
              onClick={() => handleClick(num)}
            >
              {num}
            </button>
          ))}
        </div>
      ))}
      <div className="button-row">
        <button
          className="number-button"
          onClick={() => handleBackspace()}
          onMouseDown={(e) => e.preventDefault()}
        >
          ⌫
        </button>
        <button
          className="number-button"
          onClick={() => handleClick(0)}
          onMouseDown={(e) => e.preventDefault()}
        >
          0
        </button>
        <button
          className="number-button"
          onClick={() => handleSubmit()}
          onMouseDown={(e) => e.preventDefault()}
        >
          ⏎
        </button>
      </div>

      <input
        placeholder="Score"
        type="number"
        inputMode="none"
        value={input}
        className={`score-input ${isError ? "error" : ""}`}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            handleSubmit();
          }
        }}
      />
    </div>
  );
}
