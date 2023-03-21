import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";
import AddClient from "./components/AddClient";
import ClientGallery from "./components/ClientGallery";
import {Route, Routes} from "react-router-dom";
import UpdateClient from "./components/UpdateClient";

function App() {

    const {clients, addClient, updateClient} = useClients()

    return (
        <Routes>
            <Route path={"/"} element={<ClientGallery clients={clients}/>}/>
            <Route path={"/clients/add"} element={<AddClient addClient={addClient}/>}/>
            <Route path={"/clients/:id"} element={<UpdateClient client={clients} updateClient={updateClient}/>}/>
        </Routes>

    );
}

export default App;
