import axios from "axios";
import {useEffect, useState} from "react";
import {Client} from "../model/Client";


export function useClients() {

    const [clients, setClients] = useState<Client[]>([])

    function getAllClients() {
        axios.get("/api/clients/all")
            .then(response => {
                setClients(response.data)
            })
            .catch(console.error)
    }

    useEffect(() => {
        getAllClients()
    }, [])

    function addClient(client: Client) {
        return axios.post("/api/clients/add", client)
            .then(response => response.data)
            .then(data => setClients(prevState => [...prevState, data]))
    }

    function updateClient(id: string | undefined, updatedClient: Client) {
        axios.put("/api/clients/" + id, updatedClient)
            .then(response => {
                const index = clients.findIndex((client) => client.id === id);
                if (index !== -1) {
                    const newClients = [...clients];
                    newClients[index] = updatedClient;
                    setClients(newClients);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    function deleteClient(id: string | undefined) {
        axios.delete("/api/clients/" + id)
            .then(response => response.data)
            .then(data => {
                setClients(prevState => {
                    const currentClients = prevState.filter(client => client.id !== id)
                    return currentClients
                })
            })
            .catch(error => console.error(error))
    }

    return {clients, addClient, updateClient, deleteClient, getAllClients}
}
