import { CardContent, Typography, Card } from "@mui/material";
import React, { memo } from "react"
import avg from "../assets/avg";
type PlayerCardProps = {
    name: string, score: number, avg: number[] | undefined
}

const PlayerCard = memo(function PlayerCard(props: PlayerCardProps) {


    return (<Card sx={{ width: 200, justifyContent: "center", bgcolor: "#11171D", color: "#E3DECE" }}>
        <CardContent >
            <Typography variant="h4" component="div" fontWeight={600}>
                {props.name}
            </Typography>
            <Typography variant="h5"> Score: </Typography>
            <Typography variant="h1" component="div" fontWeight={700}>
                {props.score}
            </Typography>
            <Typography variant="body2">
                Avarage:{avg(props.avg ? props.avg : [])}
            </Typography>
        </CardContent>
    </Card>)
})
export default PlayerCard