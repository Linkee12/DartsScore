import React, { memo } from "react";
import avg from "../utils/avg";
import "./PlayerCard.css";

type PlayerCardProps = {
  name: string;
  score: number;
  avg: number[] | undefined;
};

const PlayerCard = memo(function PlayerCard(props: PlayerCardProps) {
  return (
    <div
      className={`player-card ${props.score === 0 ? "player-card-winner" : "player-card-playing"}`}
    >
      <h4 className="player-card-name">{props.name}</h4>
      <h5 className="player-card-score-label"> Score: </h5>
      <div
        className={
          props.score !== 0
            ? "player-card-score-value"
            : "player-card-score-finished"
        }
      >
        {props.score != 0 ? props.score : "Congrat Bro :))"}
      </div>
      <p className="player-card-avg">
        Avarage:{avg(props.avg ? props.avg : [])}
      </p>
    </div>
  );
});
export default PlayerCard;
