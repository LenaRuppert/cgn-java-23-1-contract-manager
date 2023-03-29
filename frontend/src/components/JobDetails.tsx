import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Job} from "../model/Job";
import axios from "axios";
import {Card, CardContent} from "@mui/material";

export default function JobDetails() {
    const params = useParams()
    const id: string | undefined = params.id
    const [details, setDetails] = useState<Job | undefined>()
    const requestURL: string = "/api/jobs/" + id

    useEffect(() => {
        axios.get(requestURL)
            .then((response) => {
                setDetails(response.data)
            })
            .catch((error) => console.error(error))
    }, [requestURL])

    return (
        <Card sx={{marginBottom: 5, width: '90%'}}>
            <CardContent>
                <div>{details?.title}</div>
            </CardContent>
        </Card>
    )

}