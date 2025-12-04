import React, { useEffect, useRef, useState } from "react";
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
    const buttonRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState(10);

    const fitText = () => {
      const button = buttonRef.current;
      const content = contentRef.current;
      if (!button || !content) return;

      let newFontSize = 10;
      const maxFontSize = 1000;
      const step = 1;

      const span = document.createElement("span");
      span.style.visibility = "hidden";
      span.style.whiteSpace = "nowrap";
      span.style.position = "absolute";
      span.innerText = content.innerText;
      document.body.appendChild(span);

      while (newFontSize < maxFontSize) {
        span.style.fontSize = newFontSize + "px";
        if (
          span.offsetWidth > button.clientWidth ||
          span.offsetHeight > button.clientHeight
        ) {
          newFontSize -= step;
          break;
        }
        newFontSize += step;
      }

      document.body.removeChild(span);
      setFontSize(newFontSize);
    };

    useEffect(() => {
      fitText();

      const resizeObserver = new ResizeObserver(() => {
        fitText();
      });

      if (buttonRef.current) resizeObserver.observe(buttonRef.current);

      return () => resizeObserver.disconnect();
    }, []);

    return (
      <div
        ref={buttonRef}
        onClick={() => navigate(`/player/${props.score}`)}
        className="game-mode-button"
        style={{ backgroundColor: props.bgColor, color: props.textColor }}
      >
        <div
          ref={contentRef}
          className="game-mode-button-content"
          style={{ fontSize: `${fontSize}px` }}
        >
          {props.score}
        </div>
      </div>
    );
  }

  return (
    <div className="gamemodeContainer">
      <GameModeButton score={301} bgColor={"#0D2847"} textColor={"#3B9EFF"} />
      <GameModeButton score={501} bgColor={"#331E0B"} textColor={"#FF801F"} />
      <GameModeButton score={701} bgColor={"#132D21"} textColor={"#32B074"} />
    </div>
  );
}
