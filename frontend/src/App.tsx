import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";
import AddClient from "./components/AddClient";
import ClientGallery from "./components/ClientGallery";
import {Route, Routes} from "react-router-dom";
import UpdateClient from "./components/UpdateClient";

function App() {

    const {clients, addClient, updateClient, deleteClient} = useClients()

    return (
        <Routes>
            <Route path={"/"} element={<ClientGallery clients={clients}/>}/>
            <Route path={"/clients/add"} element={<AddClient addClient={addClient}/>}/>
            <Route path={"/clients/:id"} element={<UpdateClient updateClient={updateClient}/>}/>
            <Route path={"/clients/"}
        </Routes>

    );
}

export default App;
