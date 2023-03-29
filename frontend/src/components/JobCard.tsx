import {Card, CardActions, CardContent} from "@mui/material";
import {Job} from "../model/Job";
import React from "react";
import {Link} from "react-router-dom";

type JobCardProps = {
    job: Job
}

export default function JobCard(props: JobCardProps) {
    return (
        <Card sx={{marginBottom: 5, width: '90%'}}>
            <CardContent>
                <div>{props.job.title}</div>
            </CardContent>
            <CardActions sx={{justifyContent: "flex-end"}}>
                <Link to={"/jobs/" + props.job.id}
                      style={{textDecoration: "none", color: "#0077FF"}}> Details </Link>
            </CardActions>
        </Card>
    )
}