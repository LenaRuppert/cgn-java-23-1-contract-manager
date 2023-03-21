import {Client} from "../model/Client";
import {useParams} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import "./Input.css";

type UpdateClientProps = {
    updateClient: (clientToUpdate: Client) => void
}

export default function UpdateClient(props: UpdateClientProps) {

    const params = useParams()
    const id: string | undefined = params.id

    const [clientToUpdate, setClientToUpdate] = useState<Client>({
        id: id ? id : "",
        name: ""
    })

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
        <div className={"input-component"}>
            <input value={clientToUpdate.name} onChange={onChangeName} placeholder="name"/>
            <button className={"button"} onClick={handleSubmit}>Update Client</button>
        </div>
    )
}