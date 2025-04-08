import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
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
            <Stack spacing={5} display={"flex"} direction={"row"} >
                <Card sx={{ display: "flex", bgcolor: "#11171D", color: "#E3DECE", flex: 1 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h2" component="div">
                                {players[currentIndex].name}
                            </Typography>
                            <Typography variant="h5"> Score: </Typography>
                            <Typography variant="h1" component="div" fontWeight={700}>
                                {players[currentIndex].score}
                            </Typography>
                            <Typography variant="body2">
                                Avarage:{avg(players[currentIndex].avg)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Stack sx={{ display: "flex", flex: 1 }}>
                    <InputComponent
                        players={players}
                        setPlayers={setPlayers}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                    />
                </Stack>
            </Stack>
            <Stack direction={"row"} flex={"wrap"} display={"flex"} spacing={3}>
                {sortedPlayers.map((e, key) => (<PlayerCard name={e.name} score={e.score} avg={e.avg} key={key} />))}
            </Stack>

        </Stack >
    )
}