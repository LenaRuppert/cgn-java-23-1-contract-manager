import {useState} from "react";
import {Job} from "../model/Job";
import axios from "axios/index";

export default function useJobs() {

    const [jobs, setJobs] = useState<Job[]>([])

    function addJob(clientId: string | undefined, job: Job) {
        return axios.post("/api/jobs/add" + clientId, job)
            .then(response => response.data)
            .then(data => setJobs(prevState => [...prevState, data]))
    }

    return {addJob}
}