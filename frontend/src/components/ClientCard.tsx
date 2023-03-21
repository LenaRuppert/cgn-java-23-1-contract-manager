import {Client} from "../model/Client";
import {Link} from "react-router-dom";

type ClientCardProps = {
    client: Client
}

export default function ClientCard(props: ClientCardProps) {
    return (
        <div className="client-card">
            <p>{props.client.name}</p>
            <Link to={"/clients/" + props.client.id}>bearbeiten</Link>
        </div>
    )
}
