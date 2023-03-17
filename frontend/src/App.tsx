import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";
import AddClient from "./components/AddClient";

function App() {

  const {addClient} = useClients()

  return (
      <div className="App">

          <AddClient addClient={addClient}/>

      </div>
  );
}

export default App;
