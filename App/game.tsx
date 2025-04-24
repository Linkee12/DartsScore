import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router";
import PlayerCard from "./PlayerCard";
import avg from "../assets/avg";
import InputComponent from "./InputComponent";



export type Players = { name: string, score: number, avg: number[] }[];


export default function Game() {

    const location = useLocation();
    const [players, setPlayers] = useState<Players>(location.state)
    const [currentIndex, setCurrentIndex] = useState(0)
    const sortedPlayers = [...players].sort((a, b) => a.score - b.score);


    return (
        <Stack spacing={5} display={"flex"}>
            <Stack spacing={5} display={"flex"} flex={1} direction={"row"} color={"#E3DECE"}>
                <Stack display={"flex"} flex={1} bgcolor={"#11171D"} paddingLeft={3}>
                    <Typography gutterBottom variant="h1" component="div" fontSize={100}>
                        {players[currentIndex].name}
                    </Typography>
                    <Typography variant="h1" component="div" fontWeight={700} fontSize={150}>
                        {players[currentIndex].score}
                    </Typography>
                </Stack>
                <Stack padding={5} bgcolor={"#11171D"}>
                    <Typography variant="body2" fontSize={40}>
                        Avg:
                    </Typography>
                    <Typography variant="body2" fontSize={70}>
                        {avg(players[currentIndex].avg)}
                    </Typography>
                </Stack>
                <Stack display={"flex"} flex={1}>
                    <InputComponent
                        players={players}
                        setPlayers={setPlayers}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                    />
                </Stack>
            </Stack>
            <Stack direction={"row"} flexWrap={"wrap"} display={"flex"} spacing={3}>
                {sortedPlayers.map((e, key) => (<PlayerCard name={e.name} score={e.score} avg={e.avg} key={key} />))}
            </Stack>

        </Stack >
    )
}