import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaPlay, FaTrash } from "react-icons/fa";
import Logo from "/public/icons/logo.svg";
import styles from "./player.module.css";

export type Player = {
  name: string;
  score: number;
  avg: number[];
  roundScores: number[];
};

export default function AddPlayer() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { score } = useParams();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [players]);

  if (!score) return;
  return (
    <div className={styles.playerContainer} ref={listRef}>
      <div className={styles.playerHeader}>
        <h2 className={styles.playerTitle}>Add player:</h2>
        <img src={Logo} className={styles.playerLogo} alt="logo"></img>
      </div>
      <div className={styles.playerRowsContainer}>
        {players.map((e, i) => (
          <div className={styles.playerItem} key={i}>
            <div className={styles.playerName}>{e.name}</div>
            <button
              className={styles.deleteButton}
              onClick={() =>
                // eslint-disable-next-line sonarjs/no-nested-functions
                setPlayers((prev) => prev.filter((current) => current !== e))
              }
            >
              <FaTrash size="1.5em" />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.playerInputRow}>
        <input
          className={styles.playerInput}
          id="playerName"
          placeholder="Player Name"
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
            )
          }
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (input != "") {
                setPlayers((p) => [
                  ...p,
                  {
                    name: input,
                    score: parseInt(score),
                    avg: [],
                    roundScores: [],
                  },
                ]);
                setInput("");
              }
            }
          }}
        />
      </div>
      {players.length > 0 ? (
        <button
          className={styles.playButton}
          onClick={() => navigate(`/game/${score}`, { state: players })}
        >
          <FaPlay />
          {"Play"}
        </button>
      ) : null}
    </div>
  );
}
