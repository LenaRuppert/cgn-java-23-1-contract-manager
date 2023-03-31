import {Link, useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Job} from "../model/Job";
import axios from "axios";
import JobCard from "./JobCard";
import {Box, Grid} from "@mui/material";
import Layout from "./Layout";

export default function ClientJobs() {
    const params = useParams()
    const id: string | undefined = params.id

    const [jobsClient, setJobsClient] = useState<Job[] | undefined>()
    const requestURL: string = "/api/clients/" + id + "/getJobs"

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
            <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box sx={{marginTop: 3}}>
                    <Link to={"/clients/" + id + "/addJob"} style={{textDecoration: "none", color: "#0077FF"}}>NEUER
                        AUFTRAG</Link>
                </Box>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    {jobCards}
                </Grid>
            </Grid>
        </Layout>
    )
}