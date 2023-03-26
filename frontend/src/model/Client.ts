import {Job} from "./Job";

export type Client = {
    id?: string,
    name: string
    jobList: Job[]
}