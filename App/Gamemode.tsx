import React from "react";
import { useNavigate } from "react-router";
import "./Gamemode.css";

export default function Gamemode() {
  type GameProps = {
    score: number;
    bgColor: string;
    textColor: string;
  };

  function GameModeButton(props: GameProps) {
    const navigate = useNavigate();

    return (
      <div
        onClick={() => {
          navigate(`/player/${props.score}`);
        }}
        className="game-mode-button"
        style={{ backgroundColor: props.bgColor, color: props.textColor }}
      >
        <div className="game-mode-button-content">{props.score}</div>
      </div>
    );
  }

  return (
    <div className="gamemodeContainer">
      <GameModeButton
        score={301}
        bgColor={"#0D2847"}
        textColor={"#3B9EFF"}
      ></GameModeButton>
      <GameModeButton
        score={501}
        bgColor={"#331E0B"}
        textColor={"#FF801F"}
      ></GameModeButton>
      <GameModeButton
        score={701}
        bgColor={"#132D21"}
        textColor={"#32B074"}
      ></GameModeButton>
    </div>
  );
}
