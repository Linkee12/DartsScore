import { CardContent, Typography, Card } from "@mui/material";
import React, { memo } from "react"
import avg from "../assets/avg";
type PlayerCardProps = {
    name: string, score: number, avg: number[] | undefined
}

const PlayerCard = memo(function PlayerCard(props: PlayerCardProps) {


    return (<Card sx={{ minWidth: 200,flex:1, justifyContent: "center", bgcolor: props.score === 0 ? "#BC6249" : "#11171D", color: "#E3DECE" }}>
        <CardContent >
            <Typography variant="h4" component="div" fontWeight={600}>
                {props.name}
            </Typography>
            <Typography variant="h5"> Score: </Typography>
            <Typography variant={props.score != 0 ? "h1" : "h4"} component="div" fontWeight={700}>
                {props.score != 0 ? props.score : "Congrat Bro :))"}
            </Typography>
            <Typography variant="body2">
                Avarage:{avg(props.avg ? props.avg : [])}
            </Typography>
        </CardContent>
    </Card>)
})
export default PlayerCard