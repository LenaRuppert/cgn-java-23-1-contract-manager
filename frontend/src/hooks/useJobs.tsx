import {useEffect, useState} from "react";
import {Job} from "../model/Job";
import axios from "axios";

export function useJobs() {

    const [jobs, setJobs] = useState<Job[]>([])

    function getAllJobs() {
        axios.get("/api/jobs/all")
            .then(response => {
                setJobs(response.data)
            })
            .catch(error => {
                console.error("Sorry, something went wrong." + error)
            })
    }

    useEffect(() => {
        getAllJobs()
    }, [])

    function addJob(clientId: string | undefined, job: Job) {
        return axios.post("/api/jobs/add/" + clientId, job)
            .then(response => response.data)
            .then(data => setJobs(prevState => [...prevState, data]))
    }

    function deleteJobById(id: string | undefined) {
        axios.delete("/api/jobs/" + id)
            .then(response => response.data)
            .then(data => {
                setJobs(prevState => {
                    const currentJobs = prevState.filter(job => job.id !== data.id)
                    return currentJobs
                })
                return id
            })
            .catch(console.error)
    }

    return {jobs, addJob, getAllJobs, deleteJobById}
}
