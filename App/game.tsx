import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { NumberField } from '@base-ui-components/react/number-field';
import PlayerCard from "./PlayerCard";



type Players = [{ name: string, score: number }]

export default function Game() {

    const location = useLocation();
    const [players, setPlayers] = useState<Players>(location.state)
    const [input, setInput] = useState<number>(0)
    const [currentIndex, setCurrentIncex] = useState(0)
    const [isError, setIsError] = useState(false)

    return (
        <Stack spacing={5}>
            <Stack direction={"row"} spacing={3}>
                {players.map((e) => (<PlayerCard name={e.name} score={e.score} />))}
            </Stack>
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
        </Stack>
    )
}