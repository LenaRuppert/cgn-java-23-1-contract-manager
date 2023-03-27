import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";
import AddClient from "./components/AddClient";
import ClientGallery from "./components/ClientGallery";
import {Route, Routes} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AddJob from "./components/AddJob";
import {useJobs} from "./hooks/useJobs";


function App() {

    const {clients, addClient, updateClient, deleteClient} = useClients()
    const {addJob} = useJobs()

    return (
        <>
            <AppHeader/>
            <Routes>
                <Route path={"/"} element={<ClientGallery clients={clients} deleteClient={deleteClient}
                                                          updateClient={updateClient}/>}/>
                <Route path={"/clients/add"} element={<AddClient addClient={addClient}/>}/>
                <Route path={"/clients/:id/addJob"} element={<AddJob addJob={addJob}/>}/>
            </Routes>
        </>
    );
}

export default App;
