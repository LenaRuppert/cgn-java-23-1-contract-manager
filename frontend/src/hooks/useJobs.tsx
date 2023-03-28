import {useState} from "react";
import {Job} from "../model/Job";
import axios from "axios";

export function useJobs() {

    const [jobs, setJobs] = useState<Job[]>([])

    function getAllJobs() {
        axios.get("/api/jobs/all")
            .then(response => {
                setJobs(response.data)
            })
            .catch(console.error)
    }

    function addJob(id: string | undefined, job: Job) {
        return axios.post("/api/clients/" + id + "/addJob", job)
            .then(response => response.data)
            .then(data => setJobs(prevState => [...prevState, data]))
    }

    return {jobs, addJob}
}
