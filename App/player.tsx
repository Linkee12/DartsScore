import { Box, Button, createTheme, Stack, TextField, Typography, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


export default function Player() {
    type Players = {
        name: string,
        score: number
        avg: number[]
    }
    const [players, setPlayers] = useState<Players[]>([])
    const [input, setInput] = useState("")
    const navigate = useNavigate();
    const { score } = useParams();
    if (!score) return
    return (<Stack spacing={2}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant='h2' color='secondary' sx={{ fontWeight: 'bold', }} >Add player:</Typography>
            <img src={"../assets/logo.svg"} width={'200px'} height={"150px"}></img>
        </Stack>
        {players.map((e, i) => <Box sx={{ fontWeight: 'bold', m: 0, p: 0, paddingLeft: 2, borderRadius: 2, bgcolor: "#1F1F1F", }} key={i}>
            <Stack direction={'row'} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h2" component="div" fontWeight={'bold'} color='secondary'>{e.name}</Typography>
                <Button onClick={() => setPlayers((prev) => prev.filter((current) => current != e))}>
                    <DeleteIcon fontSize={"large"} color='secondary'> </DeleteIcon>
                </Button>
            </Stack>
        </Box>)
        }

        <Stack direction={'row'} spacing={2}>
            <TextField
                error={false}
                id="playerName"
                label="Player Name"
                variant="filled"
                value={input}
                color="secondary"
                sx={{ bgcolor: '#c0c0c0', width: "100%" }}
                onChange={e => setInput(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                autoFocus={true}
                onKeyDown={(e) => { if (e.code === 'Enter') { if (input != "") { setPlayers((p) => [...p, { name: input, score: parseInt(score), avg: [] }]); setInput(''); } } }}
            />
        </Stack>
        {players.length > 0 ? <Button color='primary' sx={{ height: "3.5rem" }}
            onClick={() => navigate("/game", { state: players })}
            variant="contained" size='large' startIcon={<PlayArrowIcon />}
        >
            {"Play"}
        </Button> : ""}
    </Stack >)
}