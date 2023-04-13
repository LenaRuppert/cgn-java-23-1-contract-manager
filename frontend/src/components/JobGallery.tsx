import {Job} from "../model/Job";
import JobCard from "./JobCard";
import {Grid} from "@mui/material";
import Layout from "./Layout";
import {ChangeEvent, useState} from "react";

type JobGalleryProps = {
    jobs: Job[]
    deleteJobById: (id: string | undefined) => void
}

export default function JobGallery(props: JobGalleryProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    const sortedJobs = props.jobs.slice().sort((a, b) => {
        if (a.orderDate && b.orderDate) {
            return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        } else if (a.orderDate) {
            return -1;
        } else if (b.orderDate) {
            return 1;
        } else {
            return 0;
        }
    })
        .filter((job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase())
            || job.description.toLowerCase().includes(searchQuery.toLowerCase())
            || job.city.toLowerCase().includes(searchQuery.toLowerCase())
            || job.street.toLowerCase().includes(searchQuery.toLowerCase())
            || job.postalCode.includes(searchQuery)
        );

    const jobCards = sortedJobs.map(job => {
        return (
            <JobCard job={job} key={job.id} deleteJobById={props.deleteJobById}/>
        )
    })

    return (
        <Layout>
            <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    <input type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Auftrag suchen'/>
                </Grid>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    {jobCards}
                </Grid>
            </Grid>
        </Layout>
    )
}