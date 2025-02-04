import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { NumberField } from '@base-ui-components/react/number-field';


export default function Game() {
    type Players = [{ name: string, score: number }]
    const location = useLocation();
    const [players, setPlayers] = useState<Players>(location.state)
    const [input, setInput] = useState<number>(0)
    const [currentIndex, setCurrentIncex] = useState(0)

    function setPoint() {

    }
    return (
        <Stack spacing={5}>
            <Stack direction={"row"} spacing={5}>
                <Box sx={{
                    fontSize: 'clamp(30px, 10vw, 170px)',
                    fontWeight: "bold",
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                }}>
                    {players[currentIndex].name}
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    flex: 1,
                    fontSize: 'clamp(30px, 10vw, 170px)',
                    fontWeight: "bold",
                }}>
                    {players[currentIndex].score}
                </Box>
            </Stack>

            <Stack>
                <NumberField.Root >
                    <NumberField.ScrubArea>
                        <NumberField.ScrubAreaCursor />
                    </NumberField.ScrubArea>
                    <NumberField.Group>
                        <NumberField.Input onKeyDown={(e) => {
                            if (e.code === "Enter") {
                                let arr = players
                                arr[currentIndex].score = arr[currentIndex].score - input
                                setPlayers(arr)
                                setCurrentIncex(p => p + 1 != players.length ? p + 1 : 0)

                            }
                        }} onChange={(e) => setInput(parseInt(e.target.value))} />
                    </NumberField.Group>
                </NumberField.Root>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Players:</TableCell>
                                <TableCell align="right">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.map((row) => (
                                < TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack >
    )
}