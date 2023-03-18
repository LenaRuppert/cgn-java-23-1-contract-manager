import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";
import AddClient from "./components/AddClient";
import ClientGallery from "./components/ClientGallery";

function App() {

    const {clients, addClient} = useClients()

  return (
      <div className="App">

          <ClientGallery clients={clients}/>
          <AddClient addClient={addClient}/>

      </div>
  );
}

export default App;
