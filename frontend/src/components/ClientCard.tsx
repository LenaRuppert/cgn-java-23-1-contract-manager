import {Client} from "../model/Client";
import {Link} from "react-router-dom";

type ClientCardProps = {
    client: Client
}

export default function ClientCard(props: ClientCardProps) {
    return (
        <div className="client-card">
            <div>
                <p>{props.client.name}</p>
            </div>
            <div className={"position-nav"}>
                <nav className={"nav"}>
                    <ul>
                        <li>
                            <Link to={"/clients/" + props.client.id}>bearbeiten</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
