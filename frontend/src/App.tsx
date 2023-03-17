import React from 'react';
import './App.css';
import {useClients} from "./hooks/useClients";

function App() {

  const [clients, addClient] = useClients()

  return (
      <div className="App">

      </div>
  );
}

export default App;
