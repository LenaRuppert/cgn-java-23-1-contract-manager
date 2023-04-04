import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";
import AddClient from "./components/AddClient";
import ClientGallery from "./components/ClientGallery";
import {Route, Routes} from "react-router-dom";
import AddJob from "./components/AddJob";
import {useJobs} from "./hooks/useJobs";
import JobGallery from "./components/JobGallery";
import ClientJobs from "./components/ClientJobs";
import JobDetails from "./components/JobDetails";
import axios from "axios";
import Cookies from "js-cookie";
import SignInPage from "./components/SignInPage";

axios.interceptors.request.use(function (config) {
    return fetch("/api/csrf").then(() => {
        config.headers["X-XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");
        return config;
    });
}, function (error) {
    return Promise.reject(error);
});

function App() {

    const {clients, addClient, updateClient, deleteClient, getAllClients} = useClients()
    const {jobs, addJob, getAllJobs, deleteJobById} = useJobs()

    return (
        <>
            <Routes>
                <Route path={"/login"} element={<SignInPage getAllClients={getAllClients} getAllJobs={getAllJobs}/>}/>
                <Route path={"/"} element={<ClientGallery clients={clients} deleteClient={deleteClient}
                                                          updateClient={updateClient}/>}/>
                <Route path={"/clients/add"} element={<AddClient addClient={addClient}/>}/>
                <Route path={"/jobs/add/:id"} element={<AddJob addJob={addJob}/>}/>
                <Route path={"/jobs/all"} element={<JobGallery jobs={jobs} deleteJobById={deleteJobById}/>}/>
                <Route path={"/jobs/get/:id"} element={<ClientJobs deleteJobById={deleteJobById}/>}/>
                <Route path={"/jobs/:id"} element={<JobDetails/>}/>
            </Routes>
        </>
    );
}

export default App;
