import {Client} from "../model/Client";
import {ChangeEvent, useState} from "react";

type AddClientProps = {

    addClient: (clientToAdd: Client) => void
}

export default function AddClient(props: AddClientProps) {

    const [clientToAdd, setClientToAdd] = useState<Client>({
        id: "",
        name: ""
    })

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setClientToAdd({
            ...clientToAdd,
            name: event.target.value
        })
    }

    function handleSubmit() {
        props.addClient(clientToAdd)
        setClientToAdd({
            ...clientToAdd,
            name: ""
        })
    }

    return (
        <div>
            <input value={clientToAdd.name} onChange={handleChangeName} placeholder="name"/>
            <button onClick={handleSubmit}>Add Client</button>
        </div>
    )
}