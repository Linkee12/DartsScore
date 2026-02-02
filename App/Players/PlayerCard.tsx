import React, { memo } from "react";
import avg from "../utils/avg";
import styles from "./playerCard.module.css";

type PlayerCardProps = {
  name: string;
  score: number;
  avg: number[] | undefined;
};

const PlayerCard = memo(function PlayerCard(props: PlayerCardProps) {
  return (
    <div
      className={`${styles.playerCard} ${
        props.score === 0 ? styles.playerCardWinner : styles.playerCardPlaying
      }`}
    >
      <h4 className={styles.playerCardName}>{props.name}</h4>
      <h5 className={styles.playerCardScoreLabel}> Score: </h5>
      <div
        className={
          props.score !== 0
            ? styles.playerCardScoreValue
            : styles.playerCardScoreFinished
        }
      >
        {props.score != 0 ? props.score : "Congrat Bro :))"}
      </div>
      <p className={styles.playerCardAvg}>
        Avarage:{avg(props.avg ? props.avg : [])}
      </p>
    </div>
  );
});
export default PlayerCard;
