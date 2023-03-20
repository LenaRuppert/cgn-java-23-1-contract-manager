import {Client} from "../model/Client";
import ClientCard from "./ClientCard";
import "./ClientGallery.css";

type ClientGalleryProps = {
    clients: Client[]
}

export default function ClientGallery(props: ClientGalleryProps) {
    const clientCards = props.clients.map(client => {
        return (
            <ClientCard client={client} key={client.id}/>
        )
    })

    return (
        <div className="client-gallery">
            {clientCards}
        </div>
    )
}
