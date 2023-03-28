import {Card, CardContent} from "@mui/material";
import {Job} from "../model/Job";
import React from "react";

type JobCardProps = {
    job: Job
}

export default function JobCard(props: JobCardProps) {
    return (
        <Card sx={{marginBottom: 5, width: '90%'}}>
            <CardContent>
                <div>{props.job.title}</div>
            </CardContent>
        </Card>
    )
}