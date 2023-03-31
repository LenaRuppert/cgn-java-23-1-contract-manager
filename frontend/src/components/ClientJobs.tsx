import {Link, useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Job} from "../model/Job";
import axios from "axios";
import JobCard from "./JobCard";
import {Box, Button, Grid, Typography} from "@mui/material";
import Layout from "./Layout";
import {useClients} from "../hooks/useClients";

export default function ClientJobs() {
    const params = useParams()
    const id: string | undefined = params.id

    const [jobsClient, setJobsClient] = useState<Job[] | undefined>()
    const requestURL: string = "/api/clients/" + id + "/getJobs"

    const {clients} = useClients();
    const client = clients.find(c => c.id === id)

    useEffect(() => {
        axios.get(requestURL)
            .then(response => {
                setJobsClient(response.data)
            })
            .catch(error => console.error(error))
    }, [requestURL])

    const jobCards = jobsClient?.map(job =>
        <JobCard job={job} key={job.id}/>)

    return (
        <Layout>
            <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3}}>
                <Typography sx={{textAlign: 'center'}} variant='h6'>{client?.name}</Typography>
                <Box sx={{marginTop: 3}}>
                    <Button sx={{marginTop: 2}} variant="contained" component={Link} to={`/clients/${id}/addJob`}>
                        NEUER AUFTRAG
                    </Button>
                </Box>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    {jobCards}
                </Grid>
            </Grid>
        </Layout>
    )
}