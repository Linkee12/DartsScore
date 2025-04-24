import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Players } from "./game";

type Player = {
    name: string;
    score: number;
    avg: number[];
};

type InputComponentProps = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Players>>
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
};

export default function InputComponent({
    players,
    setPlayers,
    currentIndex,
    setCurrentIndex,
}: InputComponentProps) {
    const [input, setInput] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const handleClick = (digit: number) => {
        setInput((prev) => prev + digit.toString());
    };
    function nextIndex(players: Players, currentIndex: number): number {
        const arrLength = players.length;
        let index = (currentIndex + 1) % arrLength;
        let checked = 0;

        while (checked < arrLength) {
            if (players[index].score !== 0) {
                return index;
            }
            index = (index + 1) % arrLength;
            checked++;
        }
        return currentIndex;
    }
    const numberButtonStyle = {
        margin: "2px",
        fontWeight: "bold",
        fontSize: "24px",
        flex: 1,
    };

    const buttonRows = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];

    return (
        <Stack spacing={1}>
            {buttonRows.map((row, i) => (
                <Stack key={i} direction="row" spacing={1}>
                    {row.map((num) => (
                        <Button
                            key={num}
                            onMouseDown={(e) => e.preventDefault()}
                            variant="contained"
                            sx={numberButtonStyle}
                            onClick={() => handleClick(num)}
                        >
                            {num}
                        </Button>
                    ))}
                </Stack>
            ))}
            <Button
                variant="contained"
                sx={numberButtonStyle}
                onClick={() => handleClick(0)}
                onMouseDown={(e) => e.preventDefault()}
            >
                0
            </Button>

            <TextField
                label="Score"
                type="number"
                variant="filled"
                value={input}
                color={isError ? "error" : "secondary"}
                sx={{
                    input: {
                        color: "#007C7C",
                    },
                    width: "100%",
                    marginTop: "1rem",
                    'input[type=number]': { MozAppearance: "textfield" },
                    'input::-webkit-outer-spin-button': { WebkitAppearance: "none", margin: 0 },
                    'input::-webkit-inner-spin-button': { WebkitAppearance: "none", margin: 0 },
                }}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                    if (e.code === "Enter" && input !== "") {
                        const scoreToSubtract = parseInt(input);
                        if (isNaN(scoreToSubtract)) return;
                        if (scoreToSubtract > 180) { setIsError(true) }
                        const updatedPlayers = [...players];
                        if (scoreToSubtract < 181 && updatedPlayers[currentIndex].score - scoreToSubtract > -1) {
                            updatedPlayers[currentIndex].score -= scoreToSubtract;
                            setPlayers(updatedPlayers);
                            setIsError(false);
                            setInput("");
                            setCurrentIndex(nextIndex(players, currentIndex))
                            players[currentIndex].avg.push(scoreToSubtract)
                        }
                    }
                }}
            />
        </Stack>
    );
}
