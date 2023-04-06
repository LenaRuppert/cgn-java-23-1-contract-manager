import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Job} from "../model/Job";
import axios from "axios";
import {Box, Card, CardContent, Typography} from "@mui/material";
import Layout from "./Layout";

type JobDetailsProps = {
    updateJob: (id: string | undefined, updatedJob: Job) => void
}

export default function JobDetails(props: JobDetailsProps) {
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

    const [updatedJob, setUpdatedJob] = useState<Job>({
        id: id ? id : "",
        title: details?.title ?? "",
        description: details?.description ?? "",
        street: details?.street ?? "",
        houseNumber: details?.houseNumber ?? "",
        postalCode: details?.postalCode ?? "",
        city: details?.city ?? "",
        clientId: details?.clientId ?? ""
    });
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);

    function handleUpdateClick() {
        setIsUpdateVisible(true);
    }

    function handleUpdateCancel() {
        setIsUpdateVisible(false);
    }

    function handleUpdateSave() {
        setIsUpdateVisible(false);
        props.updateJob(updatedJob.id, updatedJob);
    }

    return (
        <Layout>
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
                            <Typography>{details?.postalCode} {details?.city}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Layout>)
}