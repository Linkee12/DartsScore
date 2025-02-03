import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Player() {
    type Players = {
        name: string,
        score: number
    }
    const [players, setPlayers] = useState<Players[]>([])
    const [input, setInput] = useState("")
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state)
    return (
        <Stack spacing={2}>
            <Typography variant='h2' sx={{ fontWeight: 'bold', color: "#fff" }} >Add player:</Typography>
            {players.map((e, i) => <Box sx={{ fontWeight: 'bold', p: 2, m: 0, marginBottom: 3, borderRadius: 2, bgcolor: "#1F1F1F", }} key={i}>
                <Stack direction={'row'} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h2" component="div" color='primary' fontWeight={'bold'} marginTop={'1rem'}>{e.name}</Typography>
                    <Button onClick={() => setPlayers((prev) => prev.filter((current) => current != e))}>
                        <DeleteIcon fontSize={"large"} color='primary'> </DeleteIcon>
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
                    sx={{ bgcolor: '#c0c0c0', width: "100%" }}
                    onChange={e => setInput(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                    autoFocus={true}
                    onKeyDown={(e) => { if (e.code === 'Enter') { setPlayers((p) => [...p, { name: input, score: location.state.score }]); setInput(''); } }}
                />
            </Stack>
            {players.length > 0 ? <Button
                onClick={() => navigate("/game", { state: players })}
                variant="contained" size='large' startIcon={<PlayArrowIcon />}
            >
                {"Play"}
            </Button> : ""}
        </Stack >)
}