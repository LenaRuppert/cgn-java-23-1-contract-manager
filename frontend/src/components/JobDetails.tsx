import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Job} from "../model/Job";
import axios from "axios";
import {Box, Card, CardContent, Typography} from "@mui/material";

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
        <>
            <Box sx={{
                marginTop: '30px'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <Card sx={{marginBottom: 5, width: '80%', justifyContent: 'space-around'}}>
                        <CardContent>
                            <Typography variant="h6">{details?.title}</Typography>
                            <Typography sx={{mt: 2}}>{details?.description}</Typography>
                            <Typography sx={{mt: 3}}>{details?.street} {details?.houseNumber}</Typography>
                            <Typography>{details?.postalCode}{details?.city}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    )

}