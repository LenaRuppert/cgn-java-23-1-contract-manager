import {useState} from "react";
import {Client} from "../model/Client";
import axios from "axios";

export function useClients() {

    const [clients, setClients] = useState<Client[]>([])

    function addClient(client: Client) {
        return axios.post("api/clients/add", client)
            .then(response => response.data)
            .then(data => setClients(prevState => [...prevState, data]))
    }

    return {clients, addClient}
}