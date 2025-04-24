import { Box, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export default function Gamemode() {
    type GameProps = {
        score: number;
        bgColor: string;
        textColor: string;
    };

    function GameModeButton(props: GameProps) {

        const navigate = useNavigate();

        return (
            <Box
                onClick={() => {
                    navigate(`/player/${props.score}`)

                }}
                sx={{
                    backgroundColor: props.bgColor,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    fontSize: 'clamp(30px, 10vw, 170px)',
                    fontWeight: "bold",
                    borderRadius: 4,
                    color: props.textColor,
                    cursor: 'pointer',
                }
                }
            >
                <Box>{props.score}</Box>
            </Box >
        );
    }

    return (
        <Stack
            spacing={6}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                maxWidth: "100%",
            }}
        >
            <GameModeButton score={301} bgColor={"#0D2847"} textColor={"#3B9EFF"}></GameModeButton>
            <GameModeButton score={501} bgColor={"#331E0B"} textColor={"#FF801F"}></GameModeButton>
            <GameModeButton score={701} bgColor={"#132D21"} textColor={"#32B074"}></GameModeButton>
        </Stack>
    );
}
