import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";
import AddClient from "./components/AddClient";
import ClientGallery from "./components/ClientGallery";
import {Route, Routes} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AddJob from "./components/AddJob";
import {useJobs} from "./hooks/useJobs";
import JobGallery from "./components/JobGallery";
import ClientJobs from "./components/ClientJobs";
import JobDetails from "./components/JobDetails";


function App() {

    const {clients, addClient, updateClient, deleteClient} = useClients()
    const {jobs, addJob} = useJobs()

    return (
        <>
            <AppHeader/>
            <Routes>
                <Route path={"/"} element={<ClientGallery clients={clients} deleteClient={deleteClient}
                                                          updateClient={updateClient}/>}/>
                <Route path={"/clients/add"} element={<AddClient addClient={addClient}/>}/>
                <Route path={"/clients/:id/addJob"} element={<AddJob addJob={addJob}/>}/>
                <Route path={"/jobs/all"} element={<JobGallery jobs={jobs}/>}/>
                <Route path={"/clients/:id/getJobs"} element={<ClientJobs/>}/>
                <Route path={"/jobs/:id"} element={<JobDetails/>}/>
            </Routes>
        </>
    );
}

export default App;
