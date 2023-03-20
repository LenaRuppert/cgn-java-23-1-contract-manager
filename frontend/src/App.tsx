import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";
import AddClient from "./components/AddClient";
import ClientGallery from "./components/ClientGallery";
import {Route, Routes} from "react-router-dom";

function App() {

    const {clients, addClient} = useClients()

    return (
        <Routes>
            <Route path={"/"} element={<ClientGallery clients={clients}/>}/>
            <Route path={"/clients/add"} element={<AddClient addClient={addClient}/>}/>
        </Routes>

    );
}

export default App;
