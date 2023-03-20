import {Client} from "../model/Client";

type ClientCardProps = {
    client: Client
}

export default function ClientCard(props: ClientCardProps) {
    return (
        <div className="client-card">
            <p>{props.client.name}</p>
        </div>
    )
}
