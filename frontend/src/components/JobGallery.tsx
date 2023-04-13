import {Job} from "../model/Job";
import JobCard from "./JobCard";
import {Button, Grid, Typography} from "@mui/material";
import Layout from "./Layout";
import {ChangeEvent, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type JobGalleryProps = {
    jobs: Job[]
    deleteJobById: (id: string | undefined) => void
}

export default function JobGallery(props: JobGalleryProps) {

    const PAGE_SIZE = 3
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

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

    const jobsForCurrentPage = sortedJobs.slice(startIndex, endIndex);

    const totalPages = Math.ceil(sortedJobs.length / PAGE_SIZE);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const jobCards = jobsForCurrentPage.map(job => {
        return (
            <JobCard job={job} key={job.id} deleteJobById={props.deleteJobById}/>
        )
    })

    return (
        <Layout>
            <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    <input type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Auftrag suchen'/>
                    <SearchIcon/>
                </Grid>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    <Button onClick={handlePrevPage} disabled={currentPage === 1}><NavigateBeforeIcon
                        color='action'/></Button>
                    <Typography sx={{mt: 0.7}}>Seite {currentPage} von {totalPages}</Typography>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages}><NavigateNextIcon
                        color='action'/></Button>
                </Grid>
                <Grid container item xs={10} justifyContent='center' marginTop={5}>
                    {jobCards}
                </Grid>
            </Grid>
        </Layout>
    )
}