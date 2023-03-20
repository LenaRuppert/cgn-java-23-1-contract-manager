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
        return axios.post("api/clients/add", client)
            .then(response => response.data)
            .then(data => setClients(prevState => [...prevState, data]))
    }

    return {clients, addClient, getAllClients}
}
