import { Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { NumberField } from '@base-ui-components/react/number-field';
import PlayerCard from "./PlayerCard";



type Players = [{ name: string, score: number,avg:number[] }]

export default function Game() {

    const location = useLocation();
    const [players, setPlayers] = useState<Players>(location.state)
    const [input, setInput] = useState<number>(0)
    const [currentIndex, setCurrentIncex] = useState(0)
    const [isError, setIsError] = useState(false)

    function avg(arr:number[]):number|undefined{
        let avargeHit=0
        const length=arr.length
        for (let index = 0; index < length; index++) {
           avargeHit+=arr[index]
        }
        return Math.floor(avargeHit=avargeHit/length)
    }

    
  
    return (
        <Stack spacing={5}>
            <Card sx={{  justifyContent: "center" ,alignItems:"center"}}>
        <CardContent>
            <Typography variant="h1" component="div" align="center" fontWeight={700}>{players[currentIndex].name}
            </Typography>
            <Typography variant="h5"> Score:</Typography>
            <Typography variant="h1" component="div" fontWeight={700}>{players[currentIndex].score}
            </Typography>
            <Typography variant="body2">
                Avarage:{avg(players[currentIndex].avg)?avg(players[currentIndex].avg):0}
            </Typography>
            <NumberField.Root style={{ height: "4rem" }}>
                <NumberField.ScrubArea>
                    <NumberField.ScrubAreaCursor />
                </NumberField.ScrubArea>
                <NumberField.Group>
                    <NumberField.Input onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            if (input <= 180 && input >= 0) {
                                let arr = players
                                arr[currentIndex].score = arr[currentIndex].score - input
                                setPlayers(arr)
                                players[currentIndex].avg.push(input)
                                setCurrentIncex(p => p + 1 != players.length ? p + 1 : 0)
                                setIsError(false)
                                setInput(0)
                            }
                            else {
                                setIsError(true)
                            }

                        }
                    }} onChange={(e) => setInput(parseInt(e.target.value))}
                        style={{ height: "3rem", fontSize: 30, backgroundColor: "#5d9294", width: "10rem", borderColor: isError ? "red" : "", borderRadius: 3 }} />
                </NumberField.Group>
            </NumberField.Root>
        </CardContent>
    </Card>
            <Stack direction={"row"} spacing={3}>
                {players.map((e) => (<PlayerCard name={e.name} score={e.score} avg={avg(e.avg)}/>))}
            </Stack>
            
        </Stack>
    )
}