import { CardContent, Typography, Card } from "@mui/material";
import React from "react"
type PlayerCardProps = {
    name: string, score: number
}
export default function PlayerCard(props: PlayerCardProps) {
    return (<Card sx={{ maxWidth: 200, justifyContent: "center" }}>
        <CardContent>
            <Typography variant="h4" component="div" fontWeight={600}>
                {props.name}
            </Typography>
            <Typography variant="h5"> Score: </Typography>
            <Typography variant="h1" component="div" fontWeight={700}>
                {props.score}
            </Typography>
            <Typography variant="body2">
                Avarage:{0}
            </Typography>
        </CardContent>
    </Card>)
}