import {Client} from "../model/Client";
import ClientCard from "./ClientCard";

type ClientGalleryProps = {
    clients: Client[]
}

export default function ClientGallery(props: ClientGalleryProps) {
    const clients = props.clients.map(client => {
        return (
            <ClientCard client={client} key={client.id}/>
        )
    })

    return (
        <div>
            {clients}
        </div>
    )
}