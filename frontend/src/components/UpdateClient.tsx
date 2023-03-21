import {Client} from "../model/Client";
import {useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";

type UpdateClientProps = {
    client: Client[]
    updateClient: (clientToUpdate: Client) => void
}

export default function UpdateClient(props: UpdateClientProps) {

    const params = useParams()
    const id: string | undefined = params.id

    const [clientToUpdate, setClientToUpdate] = useState<Client>({
        id: id ? id : "",
        name: ""
    })

    const [client, setClient] = useState<Client | undefined>()

    const requestURL: string = "/api/clients/" + id

    useEffect(() => {
        axios.get(requestURL)
            .then((response) => {
                setClient(response.data)
            })
            .catch((error) => console.error(error))
    }, [requestURL])

    function onChangeName(event: ChangeEvent<HTMLInputElement>) {
        setClientToUpdate({
            ...clientToUpdate,
            name: event.target.value
        })
    }

    function handleSubmit() {
        props.updateClient(clientToUpdate)
        setClientToUpdate({
            ...clientToUpdate,
            name: ""
        })
    }

    return (
        <div>
            <input value={clientToUpdate.name} onChange={onChangeName} placeholder="name"/>
            <button onClick={handleSubmit}>Update Client</button>
        </div>
    )
}