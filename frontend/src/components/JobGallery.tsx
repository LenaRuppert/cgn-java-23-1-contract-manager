import {Job} from "../model/Job";
import JobCard from "./JobCard";
import {Grid} from "@mui/material";

type JobGalleryProps = {
    jobs: Job[]
}

export default function JobGallery(props: JobGalleryProps) {
    const jobCards = props.jobs.map(job => {
        return (
            <JobCard job={job} key={job.id}/>
        )
    })

    return (
        (
            <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    {jobCards}
                </Grid>
            </Grid>
        )
    )
}